#!/usr/bin/env node
/**
 * Site-wide link validity checker.
 *
 * Collects every outbound URL advertised by the mirror (models.js data plus
 * href/src attributes in the generated HTML) and probes each one, then reports
 * the broken ones grouped by model / source file.
 *
 * Usage:
 *   node check-links.js                 # check everything
 *   node check-links.js --only CrowdCount,TinySam
 *   node check-links.js --concurrency 12 --json report.json
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const MODELS_JS = path.join(ROOT, 'assets', 'js', 'models.js');
const HTML_GLOB_DIRS = [ROOT, path.join(ROOT, 'detail')];
const DEFAULT_CONCURRENCY = 8;
const REQUEST_TIMEOUT_MS = 30000;
// Hosts like gitee and GitHub answer automated probes with these instead of the real
// resource state, so they are reported separately rather than counted as dead links.
const INCONCLUSIVE_STATUSES = new Set([401, 403, 405, 429, 503]);
// github/gitee start refusing connections outright under parallel probing, which looks
// identical to a dead link, so requests to the same host are paced instead.
const HOST_MIN_INTERVAL_MS = { 'github.com': 1200, 'gitee.com': 1200 };
const DEFAULT_HOST_INTERVAL_MS = 0;
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const hostGates = new Map();

function hostOf(url) {
    try {
        return new URL(url).host;
    } catch (_) {
        return '';
    }
}

// Serialises same-host requests behind a promise chain and spaces them out.
function withHostPacing(url, task) {
    const host = hostOf(url);
    const interval = HOST_MIN_INTERVAL_MS[host] ?? DEFAULT_HOST_INTERVAL_MS;
    if (!interval) return task();

    const previous = hostGates.get(host) || Promise.resolve();
    const scheduled = previous.then(() => sleep(interval));
    hostGates.set(host, scheduled.catch(() => {}));
    return scheduled.then(task);
}

function parseArgs(argv) {
    const options = { only: null, concurrency: DEFAULT_CONCURRENCY, json: null, htmlOnly: false, dataOnly: false };
    for (let i = 0; i < argv.length; i += 1) {
        const arg = argv[i];
        if (arg === '--only') {
            options.only = new Set(String(argv[i + 1] || '').split(',').map(v => v.trim()).filter(Boolean));
            i += 1;
        } else if (arg === '--concurrency') {
            options.concurrency = Math.max(1, Number(argv[i + 1]) || DEFAULT_CONCURRENCY);
            i += 1;
        } else if (arg === '--json') {
            options.json = argv[i + 1] || 'link-report.json';
            i += 1;
        } else if (arg === '--html-only') {
            options.htmlOnly = true;
        } else if (arg === '--data-only') {
            options.dataOnly = true;
        }
    }
    return options;
}

function loadModelsData() {
    const code = fs.readFileSync(MODELS_JS, 'utf8');
    const sandbox = { window: {}, module: { exports: {} }, exports: {} };
    vm.runInNewContext(code, sandbox);
    return sandbox.window.modelsData || sandbox.module.exports.modelsData || [];
}

function collectDataUrls(models, only) {
    const found = [];
    const push = (url, model, field) => {
        if (!url || typeof url !== 'string') return;
        if (!/^https?:\/\//i.test(url)) return;
        found.push({ url, owner: model.name, field });
    };

    for (const model of models) {
        if (only && !only.has(model.name)) continue;
        push(model.repositoryUrl, model, 'repositoryUrl');
        push(model.licenseUrl, model, 'licenseUrl');
        push(model.quickStartUrl, model, 'quickStartUrl');
        push(model.quickStartMarkdownUrl, model, 'quickStartMarkdownUrl');
        push(model.hfRepoUrl, model, 'hfRepoUrl');
        push(model.hfReadmeUrl, model, 'hfReadmeUrl');
        push(model.primaryDownloadUrl, model, `primaryDownloadUrl (${model.primaryDownloadLabel || ''})`);
        for (const item of model.originModels || []) {
            push(item.href, model, `originModels/${item.name}`);
        }
        for (const item of model.downloads || []) {
            push(item.href, model, `downloads/${item.group}/${item.title}`);
        }
    }
    return found;
}

function listHtmlFiles() {
    const files = [];
    for (const dir of HTML_GLOB_DIRS) {
        if (!fs.existsSync(dir)) continue;
        for (const entry of fs.readdirSync(dir)) {
            if (entry.endsWith('.html')) files.push(path.join(dir, entry));
        }
    }
    return files;
}

function collectHtmlUrls() {
    const found = [];
    for (const file of listHtmlFiles()) {
        const html = fs.readFileSync(file, 'utf8');
        const rel = path.relative(ROOT, file);
        const matches = html.matchAll(/(?:href|src)\s*=\s*["'](https?:\/\/[^"'\s>]+)["']/gi);
        for (const match of matches) {
            found.push({ url: match[1].replace(/&amp;/g, '&'), owner: rel, field: 'html' });
        }
    }
    return found;
}

function dedupe(entries) {
    const byUrl = new Map();
    for (const entry of entries) {
        if (!byUrl.has(entry.url)) byUrl.set(entry.url, { url: entry.url, refs: [] });
        byUrl.get(entry.url).refs.push({ owner: entry.owner, field: entry.field });
    }
    return [...byUrl.values()];
}

async function probe(url) {
    const attempt = async (method) => withHostPacing(url, async () => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
        try {
            const response = await fetch(url, {
                method,
                redirect: 'follow',
                signal: controller.signal,
                headers: { 'User-Agent': USER_AGENT, Accept: '*/*' },
            });
            // Drain GET bodies so sockets are released promptly.
            if (method === 'GET' && response.body) await response.body.cancel().catch(() => {});
            return { status: response.status, finalUrl: response.url || url };
        } finally {
            clearTimeout(timer);
        }
    });

    let outcome;
    try {
        outcome = await attempt('HEAD');
        // Some hosts reject HEAD; retry with GET before declaring failure.
        if (outcome.status === 405 || outcome.status === 403 || outcome.status === 501) {
            outcome = await attempt('GET');
        }
    } catch (error) {
        try {
            outcome = await attempt('GET');
        } catch (retryError) {
            return { status: 0, error: retryError.name === 'AbortError' ? 'timeout' : String(retryError.message || retryError) };
        }
    }

    // GitHub throttles bursts; back off so rate limits are not reported as dead links.
    for (let backoff = 2000; outcome.status === 429 && backoff <= 8000; backoff *= 2) {
        await sleep(backoff);
        try {
            outcome = await attempt('GET');
        } catch (_) {
            break;
        }
    }

    return outcome;
}

async function runPool(items, concurrency, worker) {
    let index = 0;
    const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
        while (index < items.length) {
            const current = items[index];
            index += 1;
            await worker(current);
        }
    });
    await Promise.all(workers);
}

async function main() {
    const options = parseArgs(process.argv.slice(2));
    const models = loadModelsData();

    const entries = [];
    if (!options.htmlOnly) entries.push(...collectDataUrls(models, options.only));
    if (!options.dataOnly && !options.only) entries.push(...collectHtmlUrls());

    const targets = dedupe(entries);
    console.log(`Checking ${targets.length} unique URLs (${entries.length} references)...\n`);

    const results = [];
    let done = 0;
    await runPool(targets, options.concurrency, async (target) => {
        const outcome = await probe(target.url);
        done += 1;
        const ok = outcome.status >= 200 && outcome.status < 400;
        const inconclusive = !ok && INCONCLUSIVE_STATUSES.has(outcome.status);
        results.push({ ...target, ...outcome, ok, inconclusive });
        if (!ok) {
            console.log(`[${done}/${targets.length}] ${outcome.status || 'ERR'}${inconclusive ? ' (inconclusive)' : ''}  ${target.url}`);
        } else if (done % 25 === 0) {
            console.log(`[${done}/${targets.length}] ...`);
        }
    });

    const broken = results.filter(item => !item.ok && !item.inconclusive).sort((a, b) => a.url.localeCompare(b.url));
    const inconclusive = results.filter(item => item.inconclusive).sort((a, b) => a.url.localeCompare(b.url));

    console.log(`\n${'='.repeat(72)}`);
    console.log(`OK: ${results.length - broken.length - inconclusive.length}    BROKEN: ${broken.length}    INCONCLUSIVE: ${inconclusive.length}    TOTAL: ${results.length}`);
    console.log('='.repeat(72));

    const printGrouped = (items, heading) => {
        if (!items.length) return;
        console.log(`\n${heading}`);
        const byOwner = new Map();
        for (const item of items) {
            for (const ref of item.refs) {
                if (!byOwner.has(ref.owner)) byOwner.set(ref.owner, []);
                byOwner.get(ref.owner).push({ ...item, field: ref.field });
            }
        }
        for (const [owner, entries] of [...byOwner.entries()].sort()) {
            console.log(`\n${owner}`);
            for (const item of entries) {
                console.log(`  ${String(item.status || 'ERR').padEnd(4)} ${item.field}`);
                console.log(`       ${item.url}${item.error ? `  (${item.error})` : ''}`);
            }
        }
    };

    printGrouped(broken, `${'-'.repeat(72)}\nBROKEN — needs fixing`);
    printGrouped(inconclusive, `${'-'.repeat(72)}\nINCONCLUSIVE — host blocked the probe, verify manually`);

    if (options.json) {
        const target = path.isAbsolute(options.json) ? options.json : path.join(ROOT, options.json);
        fs.writeFileSync(target, JSON.stringify({
            checkedAt: new Date().toISOString(),
            total: results.length,
            brokenCount: broken.length,
            inconclusiveCount: inconclusive.length,
            broken,
            inconclusive,
            results,
        }, null, 2));
        console.log(`\nReport written to ${path.relative(ROOT, target)}`);
    }

    process.exitCode = broken.length ? 1 : 0;
}

main().catch((error) => {
    console.error(error);
    process.exit(2);
});
