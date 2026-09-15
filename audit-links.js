#!/usr/bin/env node
/**
 * Site-wide link audit: for every model, compare each upstream artifact (name, size,
 * fileId) with what the generated site links and what the HF mirror actually holds
 * (byte size via the Hub API). A row is OK only when the linked file's size equals the
 * upstream declaration (or the served size the scraper recorded). Exit code 1 on any
 * WRONG/MISSING so daily-sync.js refuses to commit a site that links the wrong bytes.
 *
 * Usage: node audit-links.js [--json report.json] [--only ModelA,ModelB]
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// Node's fetch ignores HTTP(S)_PROXY unless NODE_USE_ENV_PROXY=1 is set at startup.
const proxyConfigured = ['HTTPS_PROXY', 'https_proxy', 'HTTP_PROXY', 'http_proxy'].some((key) => process.env[key]);
if (proxyConfigured && process.env.NODE_USE_ENV_PROXY !== '1') {
    const result = spawnSync(process.execPath, ['--no-warnings', __filename, ...process.argv.slice(2)], {
        stdio: 'inherit',
        env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
    });
    process.exit(result.status == null ? 1 : result.status);
}

const ROOT = __dirname;
const argv = process.argv.slice(2);
const jsonOut = argv.includes('--json') ? argv[argv.indexOf('--json') + 1] : null;
const only = argv.includes('--only') ? new Set(argv[argv.indexOf('--only') + 1].split(',')) : null;
const { modelsData } = require(path.join(ROOT, 'assets/js/models.js'));
const details = new Map(JSON.parse(fs.readFileSync(path.join(ROOT, 'api_all_details.json'), 'utf8')).map(d => [d.name, d]));

async function hfSizes(repoId) {
    const res = await fetch(`https://huggingface.co/api/models/${repoId}?blobs=true`);
    if (!res.ok) return { error: `HTTP ${res.status}`, sizes: new Map() };
    const j = await res.json();
    return { sizes: new Map((j.siblings || []).map(s => [s.rfilename, s.size])) };
}
function decodeHref(href) {
    const m = String(href || '').match(/\/resolve\/main\/(.+)$/);
    return m ? decodeURIComponent(m[1]) : null;
}
(async () => {
    const report = [];
    let wrong = 0, missing = 0, ok = 0, unverifiable = 0;
    for (const model of modelsData) {
        if (only && !only.has(model.name)) continue;
        const detail = details.get(model.name);
        const api = detail ? detail.apiDetail || {} : {};
        const upstream = [];
        for (const om of api.originModel || []) upstream.push({ kind: 'origin', engine: '', quant: '', name: om.name, size: Number(om.size) || 0, fileId: String(om.id || '') });
        for (const a of api.modelAdaptor || []) for (const q of a.supportQuantify || []) for (const om of q.omOfflineModel || [])
            upstream.push({ kind: 'om', engine: a.name, quant: String(q.name || '').toUpperCase(), name: om.name, size: Number(om.size) || 0, fileId: String(om.id || '') });
        if (!upstream.length || !model.hfRepoId) continue;
        const { sizes, error } = await hfSizes(model.hfRepoId);
        // Served-size policy: when the portal served a completed file whose length differs
        // from its own metadata, the scraper records size (served) + declaredSize; the served
        // bytes are the truth for the mirror, and the discrepancy is reported, not hidden.
        const servedByFileId = new Map();
        for (const row of (detail && detail.downloadUrls) || []) {
            if (row && row.fileId && row.size && row.declaredSize && Number(row.size) !== Number(row.declaredSize)) {
                servedByFileId.set(String(row.fileId), Number(row.size));
            }
        }
        const rows = [...(model.downloads || []), ...(model.originModels || []).map(o => ({ ...o, group: '源模型', title: o.name }))];
        const entry = { model: model.name, repo: model.hfRepoId, hfError: error || null, artifacts: [] };
        for (let art of upstream) {
            // find the site row for this artifact. A variant can list several files
            // (TinySam: 3 OMs), so among the variant's rows prefer the one whose linked
            // file has this artifact's size, then one whose name matches, then the first.
            const stem = (v) => String(v || '').toLowerCase().replace(/\.[^.]+$/, '');
            const variantRows = art.kind === 'om'
                ? rows.filter(r => r.group === '编译模型' && r.engine === art.engine && String(r.quantization || '').toUpperCase() === art.quant)
                : rows.filter(r => r.group === '源模型' && (r.title === art.name || stem(r.title).startsWith(stem(art.name))));
            const row = variantRows.find(r => r.href && sizes.get(decodeHref(r.href)) === art.size)
                || variantRows.find(r => stem(r.title) === stem(art.name) || stem(r.localFile) === stem(art.name) || stem(r.title).startsWith(stem(art.name) + '_'))
                || variantRows[0];
            const linked = row ? decodeHref(row.href) : null;
            const hfSize = linked ? sizes.get(linked) : undefined;
            // HF files whose byte size equals upstream's declaration: the file is mirrored
            // (possibly under another name) even if the site does not link it.
            const served = servedByFileId.get(art.fileId);
            if (served) art = { ...art, declaredSize: art.size, size: served, note: `portal serves ${served} B, metadata declares ${art.size} B` };
            const sizeMatches = art.size ? [...sizes.entries()].filter(([, s]) => s === art.size).map(([n]) => n) : [];
            let status;
            if (art.size && art.size < 1024) status = 'PLACEHOLDER';
            else if (error) status = 'UNVERIFIABLE';
            else if (!row || !row.href) status = sizeMatches.length ? 'MISSING-LINK' : 'MISSING-FILE';
            else if (hfSize === undefined) status = sizeMatches.length ? 'WRONG-LINK' : 'MISSING-FILE';
            else if (art.size && hfSize !== art.size) status = sizeMatches.length ? 'WRONG-LINK' : 'WRONG-FILE';
            else status = 'OK';
            if (status === 'OK' || status === 'PLACEHOLDER') ok++; else if (status.startsWith('WRONG')) wrong++; else if (status === 'UNVERIFIABLE') unverifiable++; else missing++;
            entry.artifacts.push({ ...art, linked, hfSize: hfSize ?? null, sizeMatches, status });
            if (art.note && status === 'OK') console.log(`   [NOTE] ${model.name}: ${art.name} — ${art.note}`);
        }
        report.push(entry);
        const bad = entry.artifacts.filter(a => a.status !== 'OK' && a.status !== 'PLACEHOLDER');
        if (bad.length) {
            console.log(`== ${model.name} (${model.hfRepoId})${error ? ' hf:' + error : ''}`);
            for (const a of bad) console.log(`   [${a.status}] ${a.kind}${a.engine ? ' ' + a.engine + '/' + a.quant : ''}  ${a.name}  upstream=${a.size}  linked=${a.linked || '-'}  hf=${a.hfSize ?? '-'}  sizeMatch=${a.sizeMatches.join('|') || '-'}`);
        }
    }
    const byStatus = {};
    for (const e of report) for (const a of e.artifacts) byStatus[a.status] = (byStatus[a.status] || 0) + 1;
    console.log(`\nAUDIT: ${JSON.stringify(byStatus)}`);
    const needScrape = [...new Set(report.filter(e => e.artifacts.some(a => /FILE$/.test(a.status))).map(e => e.model))];
    const linkOnly = [...new Set(report.filter(e => !needScrape.includes(e.model) && e.artifacts.some(a => /LINK$/.test(a.status))).map(e => e.model))];
    console.log(`needs download+upload (${needScrape.length}): ${needScrape.join(', ')}`);
    console.log(`link-only fixes (${linkOnly.length}): ${linkOnly.join(', ')}`);
    if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(report, null, 2));
    process.exitCode = wrong || missing ? 1 : 0;
})();
