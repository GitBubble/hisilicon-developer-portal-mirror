/**
 * HiSilicon Developer Portal Scraper
 * Logs in via Uniportal → scrapes xinhuo.developers.hisilicon.com
 * Downloads all model data, images, and model files
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = 'https://xinhuo.developers.hisilicon.com';
const LOGIN_URL = 'https://uniportal.hisilicon.com/uniportal1/login-pc.html?redirect=' +
    encodeURIComponent('https://xinhuo.developers.hisilicon.com/#/');
const USERNAME = process.env.HISILICON_USERNAME || '';
const PASSWORD = process.env.HISILICON_PASSWORD || '';

const ROOT = path.resolve(__dirname);
const IMAGES_DIR = path.join(ROOT, 'assets', 'images');
const MODELS_DIR = path.join(ROOT, 'models');
const DETAIL_DIR = path.join(ROOT, 'detail');

function parseArgs(argv) {
    const options = {
        listOnly: false,
        onlyIds: new Set(),
        modelsOutput: path.join(ROOT, 'api_all_models.json'),
        detailsOutput: path.join(ROOT, 'api_all_details.json'),
        filterFieldsOutput: path.join(ROOT, 'api_filter_fields.json'),
        fullScrapeOutput: path.join(ROOT, 'full_scrape_data.json'),
    };

    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];
        if (arg === '--list-only') {
            options.listOnly = true;
        } else if (arg === '--only-ids') {
            const rawValue = argv[index + 1] || '';
            rawValue
                .split(',')
                .map((value) => value.trim())
                .filter(Boolean)
                .forEach((value) => options.onlyIds.add(value));
            index += 1;
        } else if (arg === '--models-output') {
            options.modelsOutput = path.resolve(ROOT, argv[index + 1] || 'api_all_models.json');
            index += 1;
        } else if (arg === '--details-output') {
            options.detailsOutput = path.resolve(ROOT, argv[index + 1] || 'api_all_details.json');
            index += 1;
        } else if (arg === '--filter-fields-output') {
            options.filterFieldsOutput = path.resolve(ROOT, argv[index + 1] || 'api_filter_fields.json');
            index += 1;
        } else if (arg === '--full-scrape-output') {
            options.fullScrapeOutput = path.resolve(ROOT, argv[index + 1] || 'full_scrape_data.json');
            index += 1;
        }
    }

    return options;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function ensureDir(d) {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function screenshotPath(name) { return path.join(ROOT, `debug_${name}.png`); }

function assertCredentialsAvailable() {
    if (!USERNAME || !PASSWORD) {
        throw new Error(
            'Manual login requires HISILICON_USERNAME and HISILICON_PASSWORD environment variables. ' +
            'Set them before running scrape.js, or reuse a valid cookies.json session.'
        );
    }
}

/** Download a URL to a local file, following redirects, with cookie jar */
function downloadFile(fileUrl, destPath, cookies) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(destPath)) {
            console.log(`  [skip] ${path.basename(destPath)}`);
            return resolve(destPath);
        }
        ensureDir(path.dirname(destPath));
        const proto = fileUrl.startsWith('https') ? https : http;
        const cookieStr = cookies ? cookies.map(c => `${c.name}=${c.value}`).join('; ') : '';
        const opts = {
            rejectUnauthorized: false,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Cookie': cookieStr,
                'Referer': BASE_URL
            }
        };
        const file = fs.createWriteStream(destPath);
        const req = proto.get(fileUrl, opts, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                file.close();
                fs.unlink(destPath, () => {});
                return downloadFile(res.headers.location, destPath, cookies).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                file.close();
                fs.unlink(destPath, () => {});
                return reject(new Error(`HTTP ${res.statusCode} for ${fileUrl}`));
            }
            res.pipe(file);
            file.on('finish', () => file.close(() => resolve(destPath)));
        });
        req.on('error', err => { fs.unlink(destPath, () => {}); reject(err); });
        file.on('error', err => { fs.unlink(destPath, () => {}); reject(err); });
    });
}

// ─── API endpoints ────────────────────────────────────────────────────────────
const API_BASE = '/openxinhuoGateway/com.huawei.ipd.openxinhuo:modelzoo/modelzoo/services/modelzoo';
const API = {
    listModels: `${API_BASE}/modelNew/findAllReleasedModelByPage`,
    filterFields: `${API_BASE}/resourceConfig/getReleasedFilterFields`,
    modelImages: `${API_BASE}/model/getModelImgByImgIdList`,
    modelDetail: `${API_BASE}/modelNew/getReleasedModelById`,
    modelVersions: `${API_BASE}/modelNew/findAllVersionByModelId`,
};

/** Call an API endpoint from inside the browser context */
async function callApi(page, endpoint, params = {}, method = 'POST') {
    return page.evaluate(async ({ base, ep, params, method }) => {
        try {
            const url = base + ep;
            const opts = { method, credentials: 'include', headers: { 'Content-Type': 'application/json' } };
            if (method === 'POST') opts.body = JSON.stringify(params);
            else if (Object.keys(params).length) {
                const qs = new URLSearchParams(params).toString();
                return await (await fetch(url + '?' + qs, opts)).json();
            }
            const res = await fetch(url, opts);
            if (!res.ok) return { _error: res.status, _url: url };
            return await res.json();
        } catch (e) { return { _error: e.message }; }
    }, { base: BASE_URL, ep: endpoint, params, method });
}

/**
 * Download all files from an open download page by clicking each icon-xiazai.
 * Returns array of {name, url} for files downloaded.
 */
async function downloadFilesFromPage(dlPage, label) {
    const downloaded = [];
    // Wait for the table to render
    await sleep(2000);

    const fileIcons = dlPage.locator('span.icon-xiazai[title="下载"]');
    const iconCount = await fileIcons.count().catch(() => 0);
    console.log(`    [${label}] ${iconCount} file(s)`);

    for (let fi = 0; fi < iconCount; fi++) {
        const icon = fileIcons.nth(fi);
        const row = icon.locator('xpath=ancestor::tr[1]');
        const fileName = (await row.locator('td').first().textContent().catch(() => `file_${fi}`)).trim();
        try {
            const [download] = await Promise.all([
                dlPage.waitForEvent('download', { timeout: 60000 }),
                icon.click(),
            ]);
            let fname = download.suggestedFilename();
            // If file already exists AND this is a different variant, append label suffix
            let savePath = path.join(MODELS_DIR, fname);
            if (fs.existsSync(savePath)) {
                const ext = path.extname(fname);
                const base = path.basename(fname, ext);
                const altName = `${base}_${label}${ext}`;
                const altPath = path.join(MODELS_DIR, altName);
                if (!fs.existsSync(altPath)) {
                    fname = altName;
                    savePath = altPath;
                } else {
                    console.log(`    [skip] ${fname} exists`);
                    downloaded.push({ name: fname, source: label });
                    continue;
                }
            }
            console.log(`    ↓ ${fname}`);
            await download.saveAs(savePath);
            console.log(`    ✓ Saved: ${fname}`);
            downloaded.push({ name: fname, url: download.url(), source: label });
        } catch (dlErr) {
            console.log(`    ✗ ${fileName}: ${dlErr.message.slice(0, 80)}`);
        }
    }
    return downloaded;
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
    const options = parseArgs(process.argv.slice(2));
    ensureDir(IMAGES_DIR);
    ensureDir(MODELS_DIR);
    ensureDir(DETAIL_DIR);
    ensureDir(path.dirname(options.modelsOutput));
    ensureDir(path.dirname(options.detailsOutput));
    ensureDir(path.dirname(options.filterFieldsOutput));
    ensureDir(path.dirname(options.fullScrapeOutput));

    console.log('=== HiSilicon Developer Portal Scraper (API mode) ===\n');
    console.log('Launching browser...');
    const browser = await chromium.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors', '--disable-popup-blocking'],
        ignoreHTTPSErrors: true,
    });

    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
    });
    let page = await context.newPage();

    // ── Load saved cookies if available ─────────────────────────────────────
    const cookieFile = path.join(ROOT, 'cookies.json');
    if (fs.existsSync(cookieFile)) {
        console.log('[0] Loading saved cookies...');
        const savedCookies = JSON.parse(fs.readFileSync(cookieFile, 'utf8'));
        await context.addCookies(savedCookies);
    }

    // ── Step 1: Navigate to login → handles SSO auto-login or manual ─────
    console.log('[1] Navigating to login page...');
    let loginSuccess = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
            loginSuccess = true;
            break;
        } catch (e) {
            console.log(`  Attempt ${attempt}/3 failed: ${e.message}`);
            if (attempt < 3) await sleep(5000);
        }
    }
    // If login URL fails, try going directly to xinhuo with saved cookies
    if (!loginSuccess) {
        console.log('  Login URL failed, trying direct access with saved cookies...');
        try {
            await page.goto(`${BASE_URL}/#/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
        } catch (e) {
            throw new Error(`Cannot reach either login or target site: ${e.message}`);
        }
    }
    await sleep(5000);
    await page.screenshot({ path: screenshotPath('01_login') });
    let curUrl = page.url();
    console.log(`  Page URL: ${curUrl}`);
    const isOnXinhuo = () => {
        try { return new URL(page.url()).hostname === 'xinhuo.developers.hisilicon.com'; } catch { return false; }
    };

    // Case 1: SSO auto-redirected us back to xinhuo (cookies valid)
    if (isOnXinhuo()) {
        console.log('  Already logged in via SSO cookies.');
    }
    // Case 2: "Signing in" intermediate page or commonRedirectionPage — wait for SSO
    else if (curUrl.includes('commonRedirection') || curUrl.includes('uniportal')) {
        console.log('  SSO redirect in progress, waiting...');
        try {
            await page.waitForFunction(() => window.location.hostname === 'xinhuo.developers.hisilicon.com', { timeout: 30000 });
        } catch (_) {
            // May have redirected to login form instead
            console.log(`  Post-wait URL: ${page.url()}`);
        }
        await sleep(3000);

        if (!isOnXinhuo()) {
            // Check if login form appeared
            const hasLoginForm = await page.locator('.el-input__inner').count().catch(() => 0);
            if (hasLoginForm > 0) {
                console.log('  Login form appeared, filling credentials...');
                assertCredentialsAvailable();
                const inputs = page.locator('.el-input__inner');
                await inputs.first().click({ clickCount: 3 });
                await inputs.first().fill(USERNAME);
                await page.locator('input[type="password"]').fill(PASSWORD);
                await page.click('.el-button.percent-width-100');
                try {
                    await page.waitForFunction(() => window.location.hostname === 'xinhuo.developers.hisilicon.com', { timeout: 30000 });
                } catch (_) {}
                await sleep(3000);
            }
        }
        console.log(`  SSO completed. URL: ${page.url()}`);
    }
    // Case 3: Login form visible — fill credentials
    else {
        console.log('  Manual login required.');
        assertCredentialsAvailable();
        await page.waitForSelector('.el-input__inner', { timeout: 20000 });
        const inputs = page.locator('.el-input__inner');
        await inputs.first().click({ clickCount: 3 });
        await inputs.first().fill(USERNAME);
        await page.waitForSelector('input[type="password"]', { timeout: 10000 });
        await page.locator('input[type="password"]').fill(PASSWORD);
        await page.waitForSelector('.el-button.percent-width-100', { timeout: 10000 });
        await page.click('.el-button.percent-width-100');
        console.log('  Clicked login button, waiting for redirect...');
        try {
            await page.waitForURL('**/xinhuo.developers.hisilicon.com/**', { timeout: 30000 });
        } catch (_) {
            console.log('  Redirect timeout — current URL:', page.url());
        }
        await sleep(3000);
    }
    console.log(`  Logged in. Current URL: ${page.url()}`);

    // ── Step 2: Navigate to ModelZoo via sidebar click ────────────────────────
    console.log('\n[2] Navigating to ModelZoo...');

    // Intercept API requests to capture headers and full responses
    const capturedApiCalls = [];
    page.on('request', req => {
        const u = req.url();
        if (u.includes('openxinhuoGateway')) {
            capturedApiCalls.push({
                url: u,
                method: req.method(),
                headers: req.headers(),
                postData: req.postData(),
            });
        }
    });

    const capturedApiResponses = [];
    page.on('response', async (res) => {
        const u = res.url();
        if (!u.includes('openxinhuoGateway')) return;
        const ct = res.headers()['content-type'] || '';
        if (!ct.includes('json')) return;
        try {
            const json = await res.json().catch(() => null);
            if (json) {
                capturedApiResponses.push({ url: u, status: res.status(), data: json });
                // Show the endpoint name after /services/
                const epName = u.split('/services/').pop()?.split('?')[0] || u;
                console.log(`  [api-capture] ${res.status()} ${epName.slice(0, 100)}`);
            }
        } catch (_) {}
    });

    // Make sure we're on the xinhuo page first
    if (!page.url().includes('xinhuo.developers.hisilicon.com')) {
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await sleep(5000);
    }

    // Click the ModelZoo sidebar item to navigate via Vue router
    try {
        const modelZooNav = page.locator('text=ModelZoo').first();
        await modelZooNav.waitFor({ timeout: 10000 });
        await modelZooNav.click();
        await sleep(5000);
        console.log(`  Clicked ModelZoo nav. URL: ${page.url()}`);
    } catch (e) {
        console.log(`  Sidebar click failed (${e.message.split('\n')[0]}), trying direct navigation...`);
        await page.goto(`${BASE_URL}/#/ModelZoo`, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await sleep(5000);
    }

    // Wait for model cards to appear (confirms the ModelZoo page loaded with data)
    try {
        await page.waitForSelector('.model-card', { timeout: 15000 });
        console.log('  Model cards visible!');
    } catch (_) {
        console.log('  No model cards found, trying to reload...');
        await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
        await sleep(5000);
    }

    await page.screenshot({ path: screenshotPath('02_modelzoo') });

    // Dismiss cookie consent banner if present
    try {
        const cookieClose = page.locator('.cookie-details-icon, .icon-guanbi').first();
        if (await cookieClose.isVisible({ timeout: 3000 }).catch(() => false)) {
            await cookieClose.click();
            console.log('  Dismissed cookie banner');
            await sleep(1000);
        }
    } catch (_) {}

    const cookies = await context.cookies();
    fs.writeFileSync(path.join(ROOT, 'cookies.json'), JSON.stringify(cookies, null, 2));
    console.log(`  Saved ${cookies.length} cookies`);

    // Save intercepted API request details 
    fs.writeFileSync(path.join(ROOT, 'api_request_headers.json'), JSON.stringify(capturedApiCalls, null, 2));
    fs.writeFileSync(path.join(ROOT, 'api_captured_responses.json'), JSON.stringify(
        capturedApiResponses.map(r => ({ url: r.url, status: r.status, data: r.data })), null, 2));
    console.log(`  Captured ${capturedApiCalls.length} API requests, ${capturedApiResponses.length} responses`);

    // ── Step 3: Fetch ALL models via API ────────────────────────────────────
    console.log('\n[3] Fetching all models via API...');

    // If the Vue app made successful API calls, use those responses directly
    // (they already have auth headers handled by the browser)
    let allModels = [];
    let csrfToken = '';
    const modelListResponse = capturedApiResponses.find(r => r.url.includes('findAllReleasedModelByPage') && r.status === 200);
    if (modelListResponse) {
        console.log('  Using captured model list from page load');
        const result = modelListResponse.data.result || [];
        allModels.push(...result);
        const totalPages = modelListResponse.data.pageVO?.totalPages || 1;
        console.log(`  Page 1: ${result.length} models (total pages: ${totalPages})`);

        // Fetch remaining pages by evaluating fetch inside the page context
        // Use the exact same headers the Vue app used — importantly the x-csrf-token
        const sampleReq = capturedApiCalls.find(r => r.url.includes('findAllReleasedModelByPage'));
        csrfToken = sampleReq?.headers?.['x-csrf-token'] || '';
        console.log(`  CSRF token: ${csrfToken ? csrfToken.slice(0, 20) + '...' : 'NOT FOUND'}`);

        for (let pg = 2; pg <= totalPages; pg++) {
            console.log(`  Fetching page ${pg}/${totalPages}...`);
            
            const pageResult = await page.evaluate(async ({ url, csrfToken, pg }) => {
                try {
                    const body = JSON.stringify({
                        sortType: 'DESC', sortField: 'creationDate', myCollect: null,
                        pageSize: 12, curPage: pg
                    });
                    const res = await fetch(url, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'content-type': 'application/json;charset=UTF-8',
                            'accept': 'application/json, text/plain, */*',
                            'x-csrf-token': csrfToken,
                        },
                        body
                    });
                    if (!res.ok) return { _error: res.status };
                    return await res.json();
                } catch (e) { return { _error: e.message }; }
            }, { url: sampleReq?.url || `${BASE_URL}${API.listModels}`, csrfToken, pg });

            if (pageResult._error) {
                console.log(`  Page ${pg} error: ${JSON.stringify(pageResult)}`);
            } else {
                const models = pageResult.result || [];
                console.log(`  Page ${pg}: ${models.length} models`);
                allModels.push(...models);
            }
        }
    } else {
        console.log('  No captured model list, trying direct API calls...');
        // Fallback: try calling API directly (may get 412)
    let curPage = 1;
    let totalPages = 1;
    while (curPage <= totalPages) {
        console.log(`  Fetching page ${curPage}/${totalPages}...`);
        const listResult = await callApi(page, API.listModels, {
            pageNum: curPage, pageSize: 12,
            computerVersion: '', naturalLanguageProcess: '', multimodal: '', video: '',
            framework: '', computingPower: '', os: '', searchName: ''
        });

        if (listResult._error) {
            console.log(`  API error: ${JSON.stringify(listResult)}`);
            break;
        }

        const pageVO = listResult.pageVO || {};
        totalPages = pageVO.totalPages || 1;
        const models = listResult.result || [];
        console.log(`  Got ${models.length} models (total: ${pageVO.totalRows})`);
        allModels.push(...models);
        curPage++;
    }
    } // end else (fallback)

    // Also capture filter fields from intercepted responses
    const filterFieldsResponse = capturedApiResponses.find(r => r.url.includes('getReleasedFilterFields') && r.status === 200);
    const filterFields = filterFieldsResponse ? filterFieldsResponse.data : {};
    fs.writeFileSync(options.filterFieldsOutput, JSON.stringify(filterFields, null, 2));

    fs.writeFileSync(options.modelsOutput, JSON.stringify(allModels, null, 2));
    console.log(`  Total models fetched: ${allModels.length}`);

    const selectedModels = options.onlyIds.size > 0
        ? allModels.filter((model) => options.onlyIds.has(String(model.id)))
        : allModels;

    if (options.onlyIds.size > 0) {
        const matchedIds = new Set(selectedModels.map((model) => String(model.id)));
        const missingIds = [...options.onlyIds].filter((id) => !matchedIds.has(id));
        console.log(`  Incremental detail scope: ${selectedModels.length} model(s)`);
        if (missingIds.length > 0) {
            console.log(`  Unmatched model ids: ${missingIds.join(', ')}`);
        }
    }

    if (options.listOnly) {
        const summary = {
            timestamp: new Date().toISOString(),
            totalModels: allModels.length,
            selectedModels: selectedModels.length,
            detailsFetched: 0,
            downloadUrlsFound: 0,
            imagesDownloaded: 0,
            modelsDownloaded: 0,
        };
        fs.writeFileSync(options.fullScrapeOutput, JSON.stringify({
            summary,
            models: allModels,
            details: [],
            filterFields,
            downloadUrls: [],
            imageUrls: [],
        }, null, 2));

        await browser.close();
        console.log('\n=== Scraping Complete ===');
        console.log(JSON.stringify(summary, null, 2));
        return;
    }

    // ── Step 4: Visit each model detail page to capture detail + downloads ───
    console.log('\n[4] Visiting each model detail page for detail + downloads...');
    const allDetails = [];
    const sdkDownloaded = new Set(); // Track SDK downloads (shared across all models)

    // Helper: dismiss cookie banner if visible
    async function dismissCookie() {
        try {
            const closeBtn = page.locator('.cookie-details-icon, .icon-guanbi').first();
            if (await closeBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
                await closeBtn.click({ force: true });
                await sleep(500);
            }
        } catch (_) {}
    }

        const CARDS_PER_PAGE = 12;
        const totalPages = Math.max(1, Math.ceil(selectedModels.length / CARDS_PER_PAGE));
    let fatalError = false;

        for (let index = 0; index < selectedModels.length && !fatalError; index++) {
            const matchModel = selectedModels[index];
            const pg = Math.floor(index / CARDS_PER_PAGE) + 1;
            const positionOnPage = (index % CARDS_PER_PAGE) + 1;
            const pageCardCount = Math.min(CARDS_PER_PAGE, selectedModels.length - ((pg - 1) * CARDS_PER_PAGE));
            const respCountBefore = capturedApiResponses.length;

            if (positionOnPage === 1) {
                console.log(`\n  ═══ Page ${pg}/${totalPages} ═══`);
            }

            const modelName = matchModel?.name || `model_${pg}_${positionOnPage}`;
            console.log(`\n  [${pg}-${positionOnPage}/${pageCardCount}] ${modelName}`);

            const detailUrl = `${BASE_URL}/#/ModelDetail?id=${matchModel.id}`;
            try {
                await page.goto(detailUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
                await sleep(5000);
                await dismissCookie();
            } catch (e) {
                console.log(`    ⚠ Detail navigation error: ${e.message.slice(0, 80)}`);
                try {
                    page = await context.newPage();
                    await page.goto(detailUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
                    await sleep(5000);
                    await dismissCookie();
                } catch (navErr) {
                    console.log(`    ✗ Failed to open detail page: ${navErr.message.slice(0, 80)}`);
                    fatalError = true;
                    break;
                }
            }

            const curUrl = page.url();
            console.log(`    URL: ${curUrl}`);

            const modelId = matchModel.id;
            const safeName = modelName.replace(/[^a-zA-Z0-9\-_.]/g, '_').slice(0, 60);

            // Collect API responses from detail page load
            const newResponses = capturedApiResponses.slice(respCountBefore);
            const newEndpoints = newResponses.map(r => {
                const ep = r.url.split('/services/').pop()?.split('?')[0] || r.url;
                return ep;
            });
            console.log(`    Captured ${newResponses.length} API responses: ${[...new Set(newEndpoints)].join(', ')}`);

            // Extract detail data from findByIdAll endpoint
            let detailData = null;
            for (const resp of newResponses) {
                const ep = resp.url.split('/services/').pop()?.split('?')[0] || '';
                if (ep.includes('findByIdAll') && resp.status === 200) {
                    detailData = resp.data;
                }
            }
            if (!detailData) {
                detailData = await page.evaluate(async ({ base, id, csrfToken }) => {
                    try {
                        const res = await fetch(`${base}/openxinhuoGateway/com.huawei.ipd.openxinhuo:modelzoo/modelzoo/services/modelzoo/modelNew/findByIdAll/${id}`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                'accept': 'application/json, text/plain, */*',
                                'x-csrf-token': csrfToken,
                            }
                        });
                        if (!res.ok) return null;
                        return await res.json();
                    } catch (_) {
                        return null;
                    }
                }, { base: BASE_URL, id: modelId, csrfToken });
            }
            if (detailData) console.log('    ✓ Got detail data (findByIdAll)');

            // Extract full page text content from the rendered detail page
            const pageText = await page.evaluate(() => {
                const el = document.querySelector('.model-detail, .detail-container, [class*="detail"]') || document.body;
                return el.innerText.trim().slice(0, 10000);
            });

            // Save detail page screenshot and HTML
            await page.screenshot({ path: path.join(DETAIL_DIR, `${safeName}.png`), fullPage: true });
            fs.writeFileSync(path.join(DETAIL_DIR, `${safeName}.html`), await page.content());

            // ── Click "下载模型" → single model auto-downloads, multi shows list ──
            const modelDownloads = [];
            let downloadPageVisited = false;
            let usedDirectDownloadPages = false;

            if (detailData) {
                const mid = modelId || matchModel?.id;
                const dlPage = await context.newPage();
                usedDirectDownloadPages = true;

                const visitDownloadPage = async (url, label, suffix) => {
                    try {
                        await dlPage.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
                    } catch (_) {
                        await dlPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
                    }
                    await sleep(2000);
                    const pageKind = label === 'source-model' ? 'Source model page' : 'Download page';
                    console.log(`    ${pageKind}: ${dlPage.url()}`);
                    downloadPageVisited = true;
                    const suffixSafe = suffix.replace(/[^a-zA-Z0-9_-]/g, '_');
                    await dlPage.screenshot({ path: path.join(DETAIL_DIR, `${safeName}_${suffixSafe}.png`), fullPage: true }).catch(() => {});
                    const files = await downloadFilesFromPage(dlPage, label);
                    files.forEach(f => modelDownloads.push(f));
                };

                try {
                    const adaptors = detailData.modelAdaptor || [];
                    for (const adaptor of adaptors) {
                        const computingName = encodeURIComponent(adaptor.name || '');
                        const quantifies = adaptor.supportQuantify || [];
                        for (const q of quantifies) {
                            const platform = encodeURIComponent(q.name || '');
                            const label = `om-${q.name || 'auto'}`;
                            const omUrl = `${BASE_URL}/#/ModelDownload?id=${mid}&type=om&platform=${platform}&computingName=${computingName}&auto=${Date.now()}`;
                            await visitDownloadPage(omUrl, label, `download_${label}`);
                        }
                    }

                    const originUrl = `${BASE_URL}/#/ModelDownload?id=${mid}&type=origin&auto=${Date.now()}`;
                    await visitDownloadPage(originUrl, 'source-model', 'source');
                } catch (directErr) {
                    usedDirectDownloadPages = false;
                    console.log(`    Direct download page flow error: ${directErr.message.slice(0, 100)}`);
                } finally {
                    await dlPage.close().catch(() => {});
                }
            }

            if (!usedDirectDownloadPages) try {
                await dismissCookie();
                const dlModelBtn = page.locator('button:has-text("下载模型")').first();
                if (await dlModelBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
                    console.log('    Clicking "下载模型"...');

                    // Set up new-tab listener BEFORE clicking
                    const newPagePromise = context.waitForEvent('page', { timeout: 20000 });
                    await dlModelBtn.click();

                    let dlPage = null;
                    try {
                        dlPage = await newPagePromise;
                    } catch (e) {
                        console.log('    No new tab opened within timeout');
                    }

                    if (dlPage) {
                        // Attach download listener immediately
                        const collectedDownloads = [];
                        dlPage.on('download', dl => collectedDownloads.push(dl));

                        try {
                            await dlPage.waitForLoadState('networkidle', { timeout: 15000 });
                        } catch (_) {
                            await sleep(3000);
                        }

                        const dlPageUrl = dlPage.url();
                        console.log(`    Download page: ${dlPageUrl}`);
                        downloadPageVisited = true;

                        // Screenshot the initial download page
                        await dlPage.screenshot({ path: path.join(DETAIL_DIR, `${safeName}_download.png`), fullPage: true });

                        // Download files from the initial page (auto-opened type)
                        const initialFiles = await downloadFilesFromPage(dlPage, 'om-auto');
                        initialFiles.forEach(f => modelDownloads.push(f));

                        // Save any auto-collected downloads
                        for (const dl of collectedDownloads) {
                            try {
                                const fname = dl.suggestedFilename();
                                const savePath = path.join(MODELS_DIR, fname);
                                if (!fs.existsSync(savePath)) {
                                    await dl.saveAs(savePath);
                                    console.log(`    ✓ Auto-saved: ${fname}`);
                                }
                                modelDownloads.push({ name: fname, url: dl.url(), source: 'auto-download' });
                            } catch (_) {}
                        }

                        // Build URLs for other quantization types and origin models using findByIdAll data
                        if (detailData) {
                            const mid = modelId || matchModel?.id;
                            const adaptors = detailData.modelAdaptor || [];
                            const dlUrls = [];

                            for (const adaptor of adaptors) {
                                const cName = encodeURIComponent(adaptor.name || '');
                                const quantifies = adaptor.supportQuantify || [];

                                // For each quantify type, build a download URL for .om files
                                for (const q of quantifies) {
                                    const pf = encodeURIComponent(q.name || '');
                                    const omUrl = `${BASE_URL}/#/ModelDownload?id=${mid}&type=om&platform=${pf}&computingName=${cName}`;
                                    // Skip if this matches the already-opened page
                                    if (!dlPageUrl.includes(`platform=${pf}`)) {
                                        dlUrls.push({ url: omUrl, label: `om-${q.name}` });
                                    }
                                }
                            }

                            // Visit each additional download URL for other quantization types
                            for (const { url: dlUrl, label } of dlUrls) {
                                try {
                                    console.log(`    Navigating: ${label}...`);
                                    await dlPage.goto(dlUrl, { waitUntil: 'networkidle', timeout: 20000 });
                                    await sleep(2000);
                                    const files = await downloadFilesFromPage(dlPage, label);
                                    files.forEach(f => modelDownloads.push(f));
                                } catch (navErr) {
                                    console.log(`    ✗ ${label}: ${navErr.message.slice(0, 80)}`);
                                }
                            }
                        }

                        await dlPage.close().catch(() => {});
                    }
                } else {
                    console.log('    No "下载模型" button found');
                }
            } catch (e) {
                console.log(`    Download flow error: ${e.message.slice(0, 100)}`);
            }

            // ── Click "源模型下载" (Source Model Download) for .pth/.onnx files ──
            if (!usedDirectDownloadPages) try {
                const srcDlBtn = page.locator('button:has-text("源模型下载")').first();
                if (await srcDlBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
                    console.log('    Clicking "源模型下载"...');
                    const srcPagePromise = context.waitForEvent('page', { timeout: 20000 });
                    await srcDlBtn.click();

                    let srcPage = null;
                    try {
                        srcPage = await srcPagePromise;
                    } catch (_) {
                        console.log('    No new tab for source model');
                    }

                    if (srcPage) {
                        srcPage.on('download', () => {}); // prevent unhandled
                        try {
                            await srcPage.waitForLoadState('networkidle', { timeout: 15000 });
                        } catch (_) {
                            await sleep(3000);
                        }
                        console.log(`    Source model page: ${srcPage.url()}`);
                        await srcPage.screenshot({ path: path.join(DETAIL_DIR, `${safeName}_source.png`), fullPage: true }).catch(() => {});
                        const srcFiles = await downloadFilesFromPage(srcPage, 'source-model');
                        srcFiles.forEach(f => modelDownloads.push(f));

                        // If no icon-xiazai found, try broader selectors
                        if (srcFiles.length === 0) {
                            // Try clicking any "全部下载" button
                            const dlAllBtn = srcPage.locator('button:has-text("全部下载")').first();
                            if (await dlAllBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
                                console.log('    Clicking "全部下载" on source page...');
                                try {
                                    const [download] = await Promise.all([
                                        srcPage.waitForEvent('download', { timeout: 30000 }),
                                        dlAllBtn.click(),
                                    ]);
                                    const fname = download.suggestedFilename();
                                    console.log(`    ↓ ${fname}`);
                                    const savePath = path.join(MODELS_DIR, fname);
                                    if (!fs.existsSync(savePath)) {
                                        await download.saveAs(savePath);
                                        console.log(`    ✓ Saved: ${fname}`);
                                    }
                                    modelDownloads.push({ name: fname, url: download.url(), source: 'source-all' });
                                } catch (dlErr) {
                                    console.log(`    ✗ Source全部下载: ${dlErr.message.slice(0, 80)}`);
                                }
                            }
                            // Also try any clickable download icons/spans
                            const altIcons = srcPage.locator('.icon-xiazai, [class*="download"]');
                            const altCount = await altIcons.count().catch(() => 0);
                            if (altCount > 0) {
                                console.log(`    Found ${altCount} alternative download elements`);
                                for (let ai = 0; ai < altCount; ai++) {
                                    try {
                                        const [download] = await Promise.all([
                                            srcPage.waitForEvent('download', { timeout: 15000 }),
                                            altIcons.nth(ai).click(),
                                        ]);
                                        const fname = download.suggestedFilename();
                                        const savePath = path.join(MODELS_DIR, fname);
                                        if (!fs.existsSync(savePath)) {
                                            await download.saveAs(savePath);
                                            console.log(`    ✓ Saved: ${fname}`);
                                        }
                                        modelDownloads.push({ name: fname, url: download.url(), source: 'source-alt' });
                                    } catch (_) {}
                                }
                            }
                        }

                        await srcPage.close().catch(() => {});
                    }
                }
            } catch (e) {
                console.log(`    Source model download error: ${e.message.slice(0, 100)}`);
            }

            // Extract file info from the API detail data (findByIdAll)
            if (detailData) {
                // Source models (.pth, .onnx)
                const originModels = detailData.originModel || [];
                for (const om of originModels) {
                    modelDownloads.push({ name: om.name, fileId: om.id, size: om.size, source: 'originModel' });
                }

                // Compiled models (.om) from modelAdaptor → supportQuantify → omOfflineModel
                const adaptors = detailData.modelAdaptor || [];
                for (const adaptor of adaptors) {
                    const quantifies = adaptor.supportQuantify || [];
                    for (const q of quantifies) {
                        const omModels = q.omOfflineModel || [];
                        for (const om of omModels) {
                            modelDownloads.push({
                                name: om.name, fileId: om.id, size: om.size,
                                quantify: q.name, computing: adaptor.name,
                                source: 'omOfflineModel'
                            });
                        }
                    }
                    // Toolkit URLs (SDK — only need once)
                    const toolkit = adaptor.toolkit || [];
                    for (const t of toolkit) {
                        if (t.url && t.url.startsWith('http')) {
                            const isSDK = t.name.includes('SDK') || t.name.includes('CANN') || t.name.includes('工具');
                            if (isSDK && sdkDownloaded.has(t.name)) continue;
                            modelDownloads.push({ name: t.name, url: t.url, source: 'toolkit' });
                            if (isSDK) sdkDownloaded.add(t.name);
                        }
                    }
                }
            }

            // Also extract any download URLs from all captured API responses
            const allNewResponses = capturedApiResponses.slice(respCountBefore);
            for (const resp of allNewResponses) {
                const text = JSON.stringify(resp.data || '');
                const urls = text.match(/https?:\/\/[^\s"\\]+\.(om|pth|onnx|zip|pt|bin|tar\.gz|tgz)/gi) || [];
                urls.forEach(u => modelDownloads.push({ url: u, source: 'api-all' }));
            }

            // Deduplicate downloads
            const uniqueDownloads = [];
            const seenKeys = new Set();
            for (const dl of modelDownloads) {
                const key = dl.url || dl.fileId || dl.name || '';
                if (key && !seenKeys.has(key)) {
                    seenKeys.add(key);
                    uniqueDownloads.push(dl);
                }
            }

            console.log(`    Total downloads found: ${uniqueDownloads.length}`);
            uniqueDownloads.forEach(d => {
                try {
                    const label = d.name || (d.url ? path.basename(new URL(d.url).pathname).slice(0, 60) : d.fileId);
                    console.log(`      → ${label} [${d.source}]`);
                } catch (_) { console.log(`      → ${(d.url || d.fileId || '?').slice(0, 80)}`); }
            });

            const detail = {
                id: modelId || matchModel?.id,
                name: modelName,
                listData: matchModel || {},
                apiDetail: detailData,
                downloadUrls: uniqueDownloads,
                downloadPageVisited,
                pageText,
            };
            allDetails.push(detail);

            // Save intermediate progress (in case of crash)
            fs.writeFileSync(options.detailsOutput, JSON.stringify(allDetails, null, 2));

            if (page.isClosed()) {
                console.log('    ⚠ Main page closed, recreating...');
                page = await context.newPage();
            }
    }

    console.log(`\n  Total details captured: ${allDetails.length}`);

    // Save all captured API responses (including detail page responses)
    fs.writeFileSync(path.join(ROOT, 'api_captured_responses.json'), JSON.stringify(
        capturedApiResponses.map(r => ({ url: r.url, status: r.status, data: r.data })), null, 2));

    // ── Step 5: Download remaining model files via URL ──────────────────────
    console.log('\n[5] Downloading model files from URLs...');
    const finalCookies = await context.cookies();
    fs.writeFileSync(path.join(ROOT, 'cookies.json'), JSON.stringify(finalCookies, null, 2));

    const allDownloadUrls = new Set();
    allDetails.forEach(d => {
        (d.downloadUrls || []).forEach(dl => { if (dl.url) allDownloadUrls.add(dl.url); });
    });

    console.log(`  Total unique download URLs: ${allDownloadUrls.size}`);
    let dlOk = 0, dlFail = 0;
    for (const fileUrl of allDownloadUrls) {
        try {
            const urlObj = new URL(fileUrl);
            let fn = decodeURIComponent(path.basename(urlObj.pathname));
            fn = fn.replace(/[^a-zA-Z0-9\-_.]/g, '_');
            if (fn.length < 3) fn = `model_${Date.now()}.om`;
            const destPath = path.join(MODELS_DIR, fn);
            if (fs.existsSync(destPath)) {
                console.log(`  [skip] ${fn}`);
                dlOk++;
                continue;
            }
            console.log(`  Downloading: ${fn}...`);
            await downloadFile(fileUrl, destPath, finalCookies);
            dlOk++;
        } catch (e) {
            console.log(`  [err] ${path.basename(fileUrl || '')}: ${e.message.slice(0, 80)}`);
            dlFail++;
        }
    }
    console.log(`  Models: ${dlOk} downloaded, ${dlFail} failed`);

    // ── Step 6: Download all images ──────────────────────────────────────────
    console.log('\n[6] Downloading images...');
    const allImageUrls = new Set();
    const imageSourceModels = options.onlyIds.size > 0 ? selectedModels : allModels;
    imageSourceModels.forEach(m => { if (m.coverImageUrl) allImageUrls.add(m.coverImageUrl); });
    allDetails.forEach(d => {
        (d.domImages || []).forEach(u => { if (!u.startsWith('data:')) allImageUrls.add(u); });
    });

    console.log(`  Found ${allImageUrls.size} unique image URLs`);
    let imgOk = 0, imgFail = 0;
    for (const imgUrl of allImageUrls) {
        try {
            const urlObj = new URL(imgUrl);
            let fn = decodeURIComponent(path.basename(urlObj.pathname));
            if (fn.length < 3 || fn === '/') fn = `img_${Date.now()}.jpg`;
            fn = fn.replace(/[^a-zA-Z0-9\-_.]/g, '_');
            await downloadFile(imgUrl, path.join(IMAGES_DIR, fn), finalCookies);
            imgOk++;
        } catch (e) {
            imgFail++;
        }
    }
    console.log(`  Images: ${imgOk} downloaded, ${imgFail} failed`);

    // ── Step 7: Final captures ──────────────────────────────────────────────
    console.log('\n[7] Final captures...');
    for (const { url: u, name } of [
        { url: `${BASE_URL}/#/ModelZoo`, name: 'modelzoo_final' },
        { url: `${BASE_URL}/#/`, name: 'homepage' },
    ]) {
        try {
            await page.goto(u, { waitUntil: 'networkidle', timeout: 30000 });
            await sleep(3000);
            await page.screenshot({ path: screenshotPath(name), fullPage: true });
            fs.writeFileSync(path.join(ROOT, `captured_${name}.html`), await page.content());
            console.log(`  Captured: ${name}`);
        } catch (e) { console.log(`  [err] ${name}: ${e.message}`); }
    }

    // ── Consolidate ──────────────────────────────────────────────────────────
    const summary = {
        timestamp: new Date().toISOString(),
        totalModels: allModels.length,
        detailsFetched: allDetails.filter(d => d.apiDetail).length,
        downloadUrlsFound: allDownloadUrls.size,
        imagesDownloaded: imgOk,
        modelsDownloaded: dlOk,
    };
    fs.writeFileSync(options.fullScrapeOutput, JSON.stringify({
        summary,
        models: allModels,
        details: allDetails,
        filterFields,
        downloadUrls: Array.from(allDownloadUrls),
        imageUrls: Array.from(allImageUrls),
    }, null, 2));

    await browser.close();
    console.log('\n=== Scraping Complete ===');
    console.log(JSON.stringify(summary, null, 2));
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });

