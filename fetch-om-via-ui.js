// Downloads OM files by driving the portal's real UI: the ModelDownload page only
// serves files after "下载模型" on the detail page registers the download intent.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'https://xinhuo.developers.hisilicon.com';
const ROOT = __dirname;
const MODELS_DIR = path.join(ROOT, 'models');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
    const modelId = process.argv[2];
    if (!modelId) {
        console.log('usage: node fetch-om-via-ui.js <modelId>');
        process.exit(1);
    }

    for (const key of Object.keys(process.env)) {
        if (/^(https?|all|socks|socks5)_proxy$/i.test(key)) delete process.env[key];
    }
    process.env.NO_PROXY = '*';

    const browser = await chromium.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        proxy: { server: 'direct://' },
        args: ['--no-sandbox', '--ignore-certificate-errors', '--proxy-server=direct://'],
    });
    const context = await browser.newContext({ ignoreHTTPSErrors: true, acceptDownloads: true });
    await context.addCookies(JSON.parse(fs.readFileSync(path.join(ROOT, 'cookies.json'), 'utf8')));
    const page = await context.newPage();

    try {
        await page.goto(`${BASE}/#/ModelDetail?id=${modelId}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    } catch (_) { /* SPA */ }
    await sleep(8000);

    // Accept the model licence dialog if it is blocking the download button.
    for (const label of ['同意', '接受']) {
        const btn = page.locator(`button:has-text("${label}")`).first();
        if (await btn.isVisible({ timeout: 1500 }).catch(() => false)) {
            await btn.click().catch(() => {});
            console.log(`clicked ${label}`);
            await sleep(2000);
        }
    }

    const saved = [];

    // The detail page exposes one compute engine at a time; the download button only ever
    // serves the selected engine, so each must be picked before clicking.
    const engineOptions = async () => {
        const labels = await page.locator('.aui-select-dropdown__item-label').allTextContents().catch(() => []);
        return [...new Set(labels.map(t => t.trim()).filter(Boolean))];
    };

    const selectEngine = async (name) => {
        const trigger = page.locator('.aui-select, .aui-select__inner, .modelzoo-middle-title').first();
        await trigger.click({ timeout: 5000 }).catch(() => {});
        await sleep(1200);
        const opt = page.locator('.aui-select-dropdown__item-label', { hasText: name }).first();
        if (await opt.isVisible({ timeout: 3000 }).catch(() => false)) {
            await opt.click().catch(() => {});
            await sleep(3000);
            return true;
        }
        return false;
    };

    const grabFrom = async (dlPage, label) => {
        const icons = dlPage.locator('span.icon-xiazai[title="下载"]');
        const n = await icons.count().catch(() => 0);
        console.log(`  [${label}] ${n} file(s)  ${dlPage.url().slice(-70)}`);
        for (let i = 0; i < n; i++) {
            const row = icons.nth(i).locator('xpath=ancestor::tr[1]');
            const name = (await row.locator('td').first().textContent().catch(() => `file_${i}`)).trim();
            try {
                const [download] = await Promise.all([
                    dlPage.waitForEvent('download', { timeout: 300000 }),
                    icons.nth(i).click(),
                ]);
                const fname = download.suggestedFilename();
                const dest = path.join(MODELS_DIR, fname);
                if (fs.existsSync(dest) && fs.statSync(dest).size > 1024) {
                    console.log(`  [skip] ${fname} exists`);
                    await download.cancel().catch(() => {});
                    continue;
                }
                await download.saveAs(dest);
                console.log(`  [ok] saved ${fname} (${(fs.statSync(dest).size / 1048576).toFixed(2)} MB)`);
                saved.push(fname);
            } catch (e) {
                console.log(`  [error] ${name}: ${String(e.message).split('\n')[0].slice(0, 90)}`);
            }
        }
    };

    const engines = await engineOptions();
    console.log('compute engines: ' + JSON.stringify(engines));

    for (const engine of (engines.length ? engines : [null])) {
        if (engine) {
            const picked = await selectEngine(engine);
            if (!picked) { console.log(`  (could not select ${engine})`); continue; }
        }
        const dlBtn = page.locator('button:has-text("下载模型")').first();
        if (!(await dlBtn.isVisible({ timeout: 5000 }).catch(() => false))) {
            console.log('no 下载模型 button');
            continue;
        }
        const pagePromise = context.waitForEvent('page', { timeout: 25000 }).catch(() => null);
        await dlBtn.click();
        const dlPage = await pagePromise;
        if (!dlPage) { console.log('  no download tab opened'); continue; }
        await sleep(7000);
        await grabFrom(dlPage, engine || 'default');
        await dlPage.close().catch(() => {});
        await sleep(1500);
    }

    console.log('\nsaved: ' + (saved.length ? saved.join(', ') : '(none)'));
    await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
