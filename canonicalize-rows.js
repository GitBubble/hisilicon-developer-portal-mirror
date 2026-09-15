#!/usr/bin/env node
// Resolve same-model filename clashes in a scrape output: when two captured rows of one
// model share a name but describe different upstream files (different fileId/size), the
// variant listed first in the API keeps the bare name and later ones get
// <stem>_<QUANT>_<Engine-with-dashes><ext>; the matching file in models/ is renamed.
// Usage: node canonicalize-rows.js <details.json>   (edits the file in place)
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const MODELS_DIR = path.join(ROOT, 'models');
const file = process.argv[2];
const details = JSON.parse(fs.readFileSync(file, 'utf8'));
const slugify = (v) => String(v || '').normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').toLowerCase();
const engineTag = (v) => String(v || '').trim().replace(/\s+/g, '-');
const isCaptured = (row) => row && row.name && row.fileId && /^(om-|source-)/.test(String(row.source || ''));
let renamed = 0;

for (const detail of details) {
    const api = detail.apiDetail || {};
    // Upstream artifacts in API order; the FIRST artifact carrying a name owns the bare
    // name, whether or not it was captured this run (it may already sit in the snapshot).
    const artifacts = [];
    (api.originModel || []).forEach((f) => f && f.name && artifacts.push({ id: String(f.id), name: f.name }));
    for (const a of api.modelAdaptor || []) for (const q of a.supportQuantify || []) (q.omOfflineModel || []).forEach((f) => f && f.name && artifacts.push({ id: String(f.id), name: f.name }));
    const ownerByName = new Map();
    for (const art of artifacts) if (!ownerByName.has(art.name)) ownerByName.set(art.name, art.id);

    const slug = slugify(detail.name);
    for (const row of (detail.downloadUrls || []).filter(isCaptured)) {
        const owner = ownerByName.get(row.name);
        if (!owner || owner === String(row.fileId)) continue;
        const ext = path.extname(row.name);
        const alias = `${path.basename(row.name, ext)}_${String(row.quantify || '').toUpperCase() || 'VARIANT'}_${engineTag(row.computing) || 'engine'}${ext}`;
        const size = Number(row.size) || 0;
        const candidates = [path.join(MODELS_DIR, slug, row.name), path.join(MODELS_DIR, row.name)];
        const src = candidates.find((p) => fs.existsSync(p) && size && fs.statSync(p).size === size);
        if (src) {
            const dst = path.join(path.dirname(src), alias);
            if (fs.existsSync(dst) && fs.statSync(dst).size !== size) fs.unlinkSync(dst);
            if (!fs.existsSync(dst)) fs.renameSync(src, dst);
            renamed += 1;
            console.log(`[${detail.name}] ${row.name} (${size} bytes, ${row.computing}/${row.quantify}) -> ${alias}`);
        } else {
            console.log(`[${detail.name}] ${row.name} (${size} bytes, ${row.computing}/${row.quantify}) -> ${alias} (row renamed; no models/ copy of that size)`);
        }
        row.name = alias;
    }
}
fs.writeFileSync(file, JSON.stringify(details, null, 2));
console.log(`canonicalized: ${renamed} file(s) renamed`);
