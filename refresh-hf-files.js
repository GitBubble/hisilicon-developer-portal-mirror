#!/usr/bin/env node
/**
 * Refreshes hf-repo-files.json, the authoritative listing of what each Hugging Face
 * mirror repo actually contains. build-static-site.js uses it to decide which download
 * URLs are real, so stale data here shows up as 404s (or hidden files) on the site.
 *
 * Usage: node refresh-hf-files.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

// Node's built-in fetch ignores HTTP(S)_PROXY unless NODE_USE_ENV_PROXY=1 is set before
// startup. On a proxied machine every request otherwise times out and the script keeps
// the stale listing, so re-exec once with the flag when a proxy is configured.
const proxyConfigured = ['HTTPS_PROXY', 'https_proxy', 'HTTP_PROXY', 'http_proxy'].some((key) => process.env[key]);
if (proxyConfigured && process.env.NODE_USE_ENV_PROXY !== '1') {
    const result = spawnSync(process.execPath, ['--no-warnings', __filename, ...process.argv.slice(2)], {
        stdio: 'inherit',
        env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
    });
    process.exit(result.status == null ? 1 : result.status);
}

const ROOT = __dirname;
const MODELS_JS = path.join(ROOT, 'assets', 'js', 'models.js');
const OUTPUT = path.join(ROOT, 'hf-repo-files.json');
// hf-mirror.com answers /api/models/* with a 308 to huggingface.co, so query the origin
// directly; the site keeps linking downloads through hf-mirror.com regardless.
const API_BASE = process.env.HF_ENDPOINT || 'https://huggingface.co';
const CONCURRENCY = 6;
const TIMEOUT_MS = 20000;

function loadRepoIds() {
    const sandbox = { window: {}, module: { exports: {} }, exports: {} };
    vm.runInNewContext(fs.readFileSync(MODELS_JS, 'utf8'), sandbox);
    const models = sandbox.window.modelsData || [];
    return [...new Set(models.map(model => model.hfRepoId).filter(Boolean))].sort();
}

async function fetchRepoFiles(repoId) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        // blobs=true adds each file's byte size, which build-static-site.js compares with
        // upstream's declared size before linking a row to a mirror file.
        const response = await fetch(`${API_BASE}/api/models/${repoId}?blobs=true`, { signal: controller.signal });
        if (!response.ok) return { error: `HTTP ${response.status}` };
        const payload = await response.json();
        if (!Array.isArray(payload.siblings)) return { error: payload.error || 'no siblings' };
        return payload.siblings
            .map(file => ({ name: file.rfilename, size: Number.isFinite(file.size) ? file.size : null }))
            .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        return { error: error.name === 'AbortError' ? 'timeout' : String(error.message || error) };
    } finally {
        clearTimeout(timer);
    }
}

async function main() {
    const repoIds = loadRepoIds();
    const previous = fs.existsSync(OUTPUT) ? JSON.parse(fs.readFileSync(OUTPUT, 'utf8')) : {};
    const results = {};
    const failures = [];

    let index = 0;
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, repoIds.length) }, async () => {
        while (index < repoIds.length) {
            const repoId = repoIds[index];
            index += 1;
            const files = await fetchRepoFiles(repoId);
            if (Array.isArray(files)) {
                results[repoId] = files;
            } else {
                // Keep the last good listing so a transient failure cannot hide working links.
                failures.push(`${repoId}: ${files.error}`);
                if (Array.isArray(previous[repoId])) results[repoId] = previous[repoId];
            }
        }
    }));

    const ordered = Object.fromEntries(Object.keys(results).sort().map(key => [key, results[key]]));
    fs.writeFileSync(OUTPUT, `${JSON.stringify(ordered, null, 2)}\n`);

    const fileCount = Object.values(ordered).reduce((sum, files) => sum + files.length, 0);
    console.log(`Wrote ${path.basename(OUTPUT)}: ${Object.keys(ordered).length} repos, ${fileCount} files.`);
    if (failures.length) {
        console.warn(`Failed to refresh ${failures.length} repo(s), kept previous listing:`);
        failures.forEach(entry => console.warn(`  ${entry}`));
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
