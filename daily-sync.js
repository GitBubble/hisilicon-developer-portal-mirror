const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const ROOT = __dirname;
const LOG_DIR = path.join(ROOT, 'sync-logs');
const MODELS_JSON = path.join(ROOT, 'api_all_models.json');
const DETAILS_JSON = path.join(ROOT, 'api_all_details.json');
const SYNC_STAGE_TARGETS = [
    'api_all_models.json',
    'api_all_details.json',
    // build-static-site.js resolves every download href against this listing.
    'hf-repo-files.json',
    'assets/js/models.js',
    'assets/js/i18n.js',
    'assets/css/style.css',
    'assets/js/app.js',
    'assets/js/models-detail.js',
    'assets/images',
    'index.html',
    'modelzoo.html',
    'model-detail.html',
];
// Fields that churn upstream without any user-visible change (counters, reviewer
// handles). Everything else in the detail payload — toolkit links, OM file ids,
// quick-start URLs, adaptor republishes — counts as a change worth re-scraping.
const VOLATILE_DETAIL_KEYS = new Set([
    'downloadNum', 'collectNum', 'collectCount', 'isCollect', 'rowIdx',
    'owner', 'ownerBy', 'createdBy', 'lastUpdatedBy', 'creationUserCN', 'lastUpdateUserCN',
    'currentHandler', 'currentHandlerName',
]);

function parseArgs(argv) {
    const options = {
        skipScrape: false,
        skipBuild: false,
        skipHf: false,
        skipCommit: false,
        skipPush: false,
        namespace: process.env.HF_NAMESPACE || null,
        hfLimit: 0,
        hfOnly: null,
        fullScrape: false,
        commitMessage: '',
        logDir: LOG_DIR,
        headed: false,
        help: false,
    };

    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];
        if (arg === '--headed') {
            options.headed = true;
        } else if (arg === '--skip-scrape') {
            options.skipScrape = true;
        } else if (arg === '--skip-build') {
            options.skipBuild = true;
        } else if (arg === '--skip-hf') {
            options.skipHf = true;
        } else if (arg === '--skip-commit') {
            options.skipCommit = true;
        } else if (arg === '--skip-push') {
            options.skipPush = true;
        } else if (arg === '--namespace') {
            options.namespace = argv[index + 1] || null;
            index += 1;
        } else if (arg === '--hf-limit') {
            options.hfLimit = Number(argv[index + 1] || 0);
            index += 1;
        } else if (arg === '--hf-only') {
            options.hfOnly = argv[index + 1] || '';
            index += 1;
        } else if (arg === '--full-scrape') {
            options.fullScrape = true;
        } else if (arg === '--commit-message') {
            options.commitMessage = argv[index + 1] || '';
            index += 1;
        } else if (arg === '--log-dir') {
            options.logDir = path.resolve(ROOT, argv[index + 1] || 'sync-logs');
            index += 1;
        } else if (arg === '--help' || arg === '-h') {
            options.help = true;
        }
    }

    return options;
}

function printHelp() {
    console.log([
        'Usage: node daily-sync.js [options]',
        '',
        'Runs the daily mirror workflow against the original HiSilicon ModelZoo.',
        '',
        'Flow: scrape list + detail payloads -> diff against local data -> re-scrape changed',
        'models (downloads to models/<slug>/) -> canonicalize names + verify byte sizes ->',
        'stage into models-real-20260713/ -> build -> upload to Hugging Face -> refresh',
        'hf-repo-files.json (with sizes) -> rebuild -> audit every link against the live',
        'mirror (aborts on any wrong/missing file) -> commit -> push.',
        '',
        'Login: scrape.js reuses cookies.json; when the Uniportal form appears it prompts for',
        'a username/password on the terminal (TTY) or, with a headed browser, waits for you',
        'to log in. Run it from a real terminal or with HISILICON_USERNAME/HISILICON_PASSWORD',
        'exported; a non-interactive shell without those aborts before any data is fetched.',
        '',
        'Options:',
        '  --headed              Open a visible Chrome window so you can log in when SSO expired',
        '  --skip-scrape         Skip running scrape.js',
        '  --skip-build          Skip running build-static-site.js',
        '  --skip-hf             Skip uploading local files to Hugging Face',
        '  --skip-commit         Skip git add/commit',
        '  --skip-push           Skip git push',
        '  --namespace <name>    Hugging Face namespace override',
        '  --hf-limit <count>    Limit the number of models uploaded to HF',
        '  --hf-only <names>     Comma-separated model names to upload to HF',
        '  --full-scrape         Force a full scrape instead of incremental sync',
        '  --commit-message <m>  Custom git commit message',
        '  --log-dir <path>      Directory for sync logs',
        '  --help, -h            Show this help text',
    ].join('\n'));
}

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath, fallbackValue) {
    if (!fs.existsSync(filePath)) {
        return fallbackValue;
    }

    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        return fallbackValue;
    }
}

function writeJson(filePath, value) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function formatDate(value) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateTime(value) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    const hour = String(value.getHours()).padStart(2, '0');
    const minute = String(value.getMinutes()).padStart(2, '0');
    const second = String(value.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function timestampForFile(value) {
    return formatDateTime(value).replace(/[: ]/g, '-');
}

function quoteArg(value) {
    return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function modelIdOf(model) {
    return String(model && model.id ? model.id : '');
}

function modelFingerprint(model) {
    return [
        modelIdOf(model),
        model && model.name ? model.name : '',
        model && model.lastUpdateDate ? model.lastUpdateDate : '',
        model && model.creationDate ? model.creationDate : '',
    ].join('::');
}

function stripVolatile(value) {
    if (Array.isArray(value)) return value.map(stripVolatile);
    if (value && typeof value === 'object') {
        const out = {};
        for (const key of Object.keys(value).sort()) {
            if (VOLATILE_DETAIL_KEYS.has(key)) continue;
            out[key] = stripVolatile(value[key]);
        }
        return out;
    }
    return value;
}

// Stable identity of a findByIdAll payload. The list fingerprint already covers the
// top-level lastUpdateDate, so it is dropped here; nested dates (per-adaptor
// republishes) stay because those are exactly what the list never reflects.
function stableDetailFingerprint(apiDetail) {
    if (!apiDetail || typeof apiDetail !== 'object') return '';
    const stable = stripVolatile(apiDetail);
    delete stable.lastUpdateDate;
    return JSON.stringify(stable);
}

function compareModelCatalogs(localModels, upstreamModels, payloads = {}) {
    const localMap = new Map(localModels.map((model) => [modelIdOf(model), model]));
    const upstreamMap = new Map(upstreamModels.map((model) => [modelIdOf(model), model]));
    const localDetailMap = new Map((payloads.localDetails || []).map((detail) => [modelIdOf(detail), detail]));
    const upstreamDetailMap = new Map((payloads.upstreamApiDetails || []).map((detail) => [modelIdOf(detail), detail]));
    const changedModels = [];
    const removedModels = [];
    const reasons = new Map();

    for (const upstreamModel of upstreamModels) {
        const id = modelIdOf(upstreamModel);
        const localModel = localMap.get(id);
        let reason = '';
        if (!localModel) {
            reason = 'new id';
        } else if (modelFingerprint(localModel) !== modelFingerprint(upstreamModel)) {
            reason = 'list fingerprint';
        } else {
            const localDetail = localDetailMap.get(id);
            const upstreamDetail = upstreamDetailMap.get(id);
            if (!localDetail || !localDetail.apiDetail) {
                reason = 'local detail missing';
            } else if (upstreamDetail && upstreamDetail.apiDetail
                && stableDetailFingerprint(localDetail.apiDetail) !== stableDetailFingerprint(upstreamDetail.apiDetail)) {
                reason = 'detail payload';
            }
            // No upstream payload (endpoint unavailable): fall back to the list fingerprint
            // alone rather than re-scraping the whole catalog.
        }
        if (reason) {
            changedModels.push(upstreamModel);
            reasons.set(id, reason);
        }
    }

    for (const localModel of localModels) {
        const id = modelIdOf(localModel);
        if (!upstreamMap.has(id)) {
            removedModels.push(localModel);
        }
    }

    return {
        changedModels,
        removedModels,
        reasons,
        hasChanges: changedModels.length > 0 || removedModels.length > 0,
    };
}

function mergeDetails(localDetails, changedDetails, upstreamModels) {
    const localMap = new Map(localDetails.map((detail) => [modelIdOf(detail), detail]));
    const changedMap = new Map(changedDetails.map((detail) => [modelIdOf(detail), detail]));
    const mergedDetails = [];
    const missingIds = [];

    for (const model of upstreamModels) {
        const id = modelIdOf(model);
        const detail = changedMap.get(id) || localMap.get(id);
        if (detail) {
            mergedDetails.push(detail);
        } else {
            missingIds.push(id);
        }
    }

    return { mergedDetails, missingIds };
}

// Same-model filename clashes are resolved deterministically and every scraped file is
// checked against upstream's byte size (or the served size) before it can be staged.
async function verifyScrapedFiles(detailsPath, options, runToken) {
    await runCommand('node', ['canonicalize-rows.js', detailsPath], {
        label: 'canonicalize-rows.js',
        logFile: path.join(options.logDir, `${runToken}_canonicalize.log`),
    });
    await runCommand('python3', ['verify-downloads.py', detailsPath], {
        label: 'verify-downloads.py',
        logFile: path.join(options.logDir, `${runToken}_verify.log`),
    });
}

// The Uniportal SSO session behind cookies.json expires within the hour, so an unattended
// run dies at the login form. --headed opens a visible Chrome window for every scrape.js
// step so the operator can log in there instead of exporting credentials.
function scrapeModeArgs(options) {
    return options.headed ? ['--headed'] : [];
}

function scrapeDirectEnv() {
    const env = { ...process.env };
    for (const key of Object.keys(env)) {
        if (/^(https?|all|socks|socks5)_proxy$/i.test(key)) {
            delete env[key];
        }
    }
    env.NO_PROXY = '*';
    env.no_proxy = '*';
    return env;
}

function runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const label = options.label || `${command} ${args.join(' ')}`;
        const logFile = options.logFile;
        const env = { ...process.env, ...(options.env || {}) };

        let stream = null;
        if (logFile) {
            ensureDir(path.dirname(logFile));
            stream = fs.createWriteStream(logFile, { flags: 'a' });
            stream.write(`# ${label}\n`);
            stream.write(`# Started at ${formatDateTime(new Date())}\n\n`);
        }

        const child = spawn(command, args, {
            cwd: ROOT,
            env,
            stdio: ['inherit', 'pipe', 'pipe'],
        });

        const writeChunk = (chunk) => {
            const text = chunk.toString();
            process.stdout.write(text);
            if (stream) stream.write(text);
        };

        child.stdout.on('data', writeChunk);
        child.stderr.on('data', writeChunk);
        child.on('error', (error) => {
            if (stream) {
                stream.write(`\n# Failed: ${error.message}\n`);
                stream.end();
            }
            reject(error);
        });
        child.on('close', (code) => {
            if (stream) {
                stream.write(`\n# Finished with exit code ${code} at ${formatDateTime(new Date())}\n`);
                stream.end();
            }
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`${label} failed with exit code ${code}`));
            }
        });
    });
}

function runGit(args, options = {}) {
    const result = spawnSync('git', args, {
        cwd: ROOT,
        encoding: 'utf8',
        ...options,
    });

    if (result.status !== 0) {
        const stderr = (result.stderr || '').trim();
        throw new Error(stderr || `git ${args.join(' ')} failed`);
    }

    return (result.stdout || '').trim();
}

function stageSyncTargets() {
    runGit(['add', '--', ...SYNC_STAGE_TARGETS]);
}

function hasStagedChanges() {
    const result = spawnSync('git', ['diff', '--cached', '--quiet', '--', ...SYNC_STAGE_TARGETS], {
        cwd: ROOT,
        encoding: 'utf8',
    });
    return result.status === 1;
}

async function main() {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) {
        printHelp();
        return;
    }

    ensureDir(options.logDir);

    const startedAt = new Date();
    const syncDate = formatDate(startedAt);
    const syncDateTime = formatDateTime(startedAt);
    const runToken = timestampForFile(startedAt);
    const tempModelsPath = path.join(options.logDir, `${runToken}_upstream_models.json`);
    const tempDetailsPath = path.join(options.logDir, `${runToken}_changed_details.json`);
    const tempApiDetailsPath = path.join(options.logDir, `${runToken}_upstream_details.json`);
    const tempFullScrapePath = path.join(options.logDir, `${runToken}_partial_scrape.json`);

    console.log(`=== Daily Sync ${syncDateTime} ===`);

    let upstreamModels = readJson(MODELS_JSON, []);
    let changedModels = [];
    let removedModels = [];
    let shouldRunBuild = !options.skipBuild;
    let shouldRunHf = !options.skipHf;

    if (!options.skipScrape) {
        if (options.fullScrape) {
            await runCommand('node', ['scrape.js', ...scrapeModeArgs(options)], {
                label: 'scrape.js --full',
                logFile: path.join(options.logDir, `${runToken}_scrape.log`),
                env: scrapeDirectEnv(),
            });
            upstreamModels = readJson(MODELS_JSON, []);
            changedModels = upstreamModels;
            await verifyScrapedFiles(DETAILS_JSON, options, runToken);
            await runCommand('node', ['stage-scraped-downloads.js', '--details', DETAILS_JSON], {
                label: 'stage-scraped-downloads.js',
                logFile: path.join(options.logDir, `${runToken}_stage.log`),
            });
        } else {
            const localModels = readJson(MODELS_JSON, []);
            const localDetails = readJson(DETAILS_JSON, []);

            await runCommand('node', [
                'scrape.js',
                '--list-only',
                '--models-output', tempModelsPath,
                '--api-details-output', tempApiDetailsPath,
                ...scrapeModeArgs(options),
            ], {
                label: 'scrape.js --list-only',
                logFile: path.join(options.logDir, `${runToken}_list-only.log`),
                env: scrapeDirectEnv(),
            });

            upstreamModels = readJson(tempModelsPath, []);
            const upstreamApiDetails = readJson(tempApiDetailsPath, []);
            if (!upstreamApiDetails.length) {
                console.log('Warning: no upstream detail payloads captured; comparing list fingerprints only.');
            }
            const catalogDiff = compareModelCatalogs(localModels, upstreamModels, { localDetails, upstreamApiDetails });
            changedModels = catalogDiff.changedModels;
            removedModels = catalogDiff.removedModels;

            if (!catalogDiff.hasChanges) {
                console.log('No upstream model additions, removals, update-date or detail payload changes detected.');
                shouldRunBuild = false;
                shouldRunHf = false;
            } else {
                const changedIds = changedModels.map((model) => modelIdOf(model)).filter(Boolean);
                console.log(`Upstream changes detected: ${changedModels.length} changed/new, ${removedModels.length} removed.`);
                for (const model of changedModels) {
                    console.log(`  ${model.name} (${modelIdOf(model)}): ${catalogDiff.reasons.get(modelIdOf(model))}`);
                }
                for (const model of removedModels) {
                    console.log(`  ${model.name} (${modelIdOf(model)}): removed upstream`);
                }
                writeJson(MODELS_JSON, upstreamModels);

                let changedDetails = [];

                if (changedIds.length > 0) {
                    await runCommand('node', [
                        'scrape.js',
                        '--only-ids', changedIds.join(','),
                        '--models-output', MODELS_JSON,
                        '--details-output', tempDetailsPath,
                        '--full-scrape-output', tempFullScrapePath,
                        ...scrapeModeArgs(options),
                    ], {
                        label: 'scrape.js --only-ids',
                        logFile: path.join(options.logDir, `${runToken}_scrape.log`),
                        env: scrapeDirectEnv(),
                    });
                    await verifyScrapedFiles(tempDetailsPath, options, runToken);
                    changedDetails = readJson(tempDetailsPath, []);
                    await runCommand('node', ['stage-scraped-downloads.js', '--details', tempDetailsPath], {
                        label: 'stage-scraped-downloads.js',
                        logFile: path.join(options.logDir, `${runToken}_stage.log`),
                    });
                }

                const { mergedDetails, missingIds } = mergeDetails(localDetails, changedDetails, upstreamModels);
                writeJson(DETAILS_JSON, mergedDetails);

                if (missingIds.length > 0) {
                    console.log(`Warning: missing detail payload for model ids: ${missingIds.join(', ')}`);
                }

                if (changedIds.length === 0) {
                    shouldRunHf = false;
                }
            }
        }
    }

    if (shouldRunBuild) {
        await runCommand('node', ['build-static-site.js'], {
            label: 'build-static-site.js',
            logFile: path.join(options.logDir, `${runToken}_build.log`),
        });
    }

    if (shouldRunHf) {
        const hfArgs = ['upload-models-to-hf.js'];
        const incrementalHfOnly = changedModels.map((model) => model.name).filter(Boolean).join(',');
        if (!options.hfOnly && !incrementalHfOnly) {
            console.log('Skipping Hugging Face upload because the incremental change set has no uploadable model names.');
            shouldRunHf = false;
        }
    }

    if (shouldRunHf) {
        const hfArgs = ['upload-models-to-hf.js'];
        const incrementalHfOnly = changedModels.map((model) => model.name).filter(Boolean).join(',');
        if (options.namespace) {
            hfArgs.push('--namespace', options.namespace);
        }
        if (options.hfLimit > 0) {
            hfArgs.push('--limit', String(options.hfLimit));
        }
        if (options.hfOnly) {
            hfArgs.push('--only', options.hfOnly);
        } else if (incrementalHfOnly) {
            hfArgs.push('--only', incrementalHfOnly);
        }

        await runCommand('node', hfArgs, {
            label: 'upload-models-to-hf.js',
            logFile: path.join(options.logDir, `${runToken}_hf-upload.log`),
        });

        // The first build ran before the upload, so its hrefs only know files that were
        // already published. Refresh the listing and rebuild so new uploads get linked.
        await runCommand('node', ['refresh-hf-files.js'], {
            label: 'refresh-hf-files.js',
            logFile: path.join(options.logDir, `${runToken}_refresh-hf-files.log`),
        });
        await runCommand('node', ['build-static-site.js'], {
            label: 'build-static-site.js (after upload)',
            logFile: path.join(options.logDir, `${runToken}_build.log`),
        });
    } else if (!options.skipHf) {
        console.log('Skipping Hugging Face upload because no model payload changes were detected.');
    }

    if (shouldRunBuild) {
        // Gate on whatever build ran last: every linked row must be byte-exact against
        // upstream on the live mirror. A non-zero exit aborts before anything is committed,
        // including syncs that rebuilt without uploading (removals, --skip-hf).
        await runCommand('node', ['audit-links.js', '--json', path.join(options.logDir, `${runToken}_audit.json`)], {
            label: 'audit-links.js',
            logFile: path.join(options.logDir, `${runToken}_audit.log`),
        });
    }

    if (options.skipCommit) {
        console.log('Skipping git commit by request.');
        return;
    }

    stageSyncTargets();
    if (!hasStagedChanges()) {
        console.log('No staged site changes detected after sync.');
        return;
    }

    const commitMessage = options.commitMessage || `Daily sync ${syncDate}`;
    await runCommand('git', ['commit', '-m', commitMessage], {
        label: `git commit -m ${quoteArg(commitMessage)}`,
        logFile: path.join(options.logDir, `${runToken}_git-commit.log`),
    });

    if (options.skipPush) {
        console.log('Skipping git push by request.');
        return;
    }

    await runCommand('git', ['push', 'origin', 'main'], {
        label: 'git push origin main',
        logFile: path.join(options.logDir, `${runToken}_git-push.log`),
    });

    const head = runGit(['rev-parse', '--short', 'HEAD']);
    console.log(`Daily sync published at commit ${head}.`);
}

if (require.main === module) {
    main().catch((error) => {
        console.error(`\nDaily sync failed: ${error.message}`);
        process.exitCode = 1;
    });
}

module.exports = { compareModelCatalogs, mergeDetails, modelFingerprint, stableDetailFingerprint };
