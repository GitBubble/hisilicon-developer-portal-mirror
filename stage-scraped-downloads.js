#!/usr/bin/env node
/**
 * Stages files that scrape.js downloaded into models/ under models-real-20260713/<slug>/,
 * the per-model snapshot area build-static-site.js and upload-models-to-hf.js read.
 *
 * models/ is a flat scratch directory shared by every model and still holds LFS pointer
 * stubs from early runs, so the build deliberately never links from it. Only files a
 * scrape captured for a specific model (its downloadUrls) are hard-linked, and only when
 * they are real artifacts (>= 1 KiB, not the shared SDK package).
 *
 * Usage:
 *   node stage-scraped-downloads.js --details sync-logs/<run>_changed_details.json
 *   node stage-scraped-downloads.js --details api_all_details.json --only YOLO26s,XFeat
 *   node stage-scraped-downloads.js --details <file> --dry-run
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MODELS_DIR = path.join(ROOT, 'models');
const MODELS_REAL_DIR = path.join(ROOT, 'models-real-20260713');
const MIN_ARTIFACT_BYTES = 1024;
// Sources that name a file the scraper actually pulled through the portal UI.
const UI_CAPTURE_SOURCES = /^(om-|source-model$|source-all$|source-alt$|auto-download$)/;

function parseArgs(argv) {
    const options = { details: path.join(ROOT, 'api_all_details.json'), only: null, dryRun: false };
    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];
        if (arg === '--details') {
            options.details = path.resolve(ROOT, argv[index + 1] || 'api_all_details.json');
            index += 1;
        } else if (arg === '--only') {
            options.only = new Set(String(argv[index + 1] || '').split(',').map((v) => v.trim()).filter(Boolean));
            index += 1;
        } else if (arg === '--dry-run') {
            options.dryRun = true;
        }
    }
    return options;
}

// Must match slugify() in build-static-site.js / upload-models-to-hf.js.
function slugify(value) {
    return String(value || '')
        .normalize('NFKD')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase();
}

function isSdkPackageName(name) {
    return /^SVP_NNN_PC_V[\d.]+\.tgz$/i.test(String(name || ''));
}

function artifactSize(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return stats.isFile() ? stats.size : 0;
    } catch (_) {
        return 0;
    }
}

// Rows from the size-aware scraper carry upstream's byte size; it is authoritative, since
// models/ is flat and a later model in the same run can overwrite a same-named file
// (DeepSort and YOLOv5s both publish yolov5s.om).
function capturedFiles(detail) {
    const files = new Map();
    for (const item of detail.downloadUrls || []) {
        if (!item || !item.name || !UI_CAPTURE_SOURCES.test(String(item.source || ''))) continue;
        const name = path.basename(String(item.name));
        if (!name || isSdkPackageName(name)) continue;
        const size = Number(item.size) || 0;
        if (!files.has(name) || (size && !files.get(name))) files.set(name, size);
    }
    return [...files.entries()].map(([name, size]) => ({ name, size }));
}

function capturedFileNames(detail) {
    return capturedFiles(detail).map((file) => file.name);
}

function stageDetail(detail, options) {
    const slug = slugify(detail.name);
    const targetDir = path.join(MODELS_REAL_DIR, slug);
    const result = { name: detail.name, slug, staged: [], present: [], skipped: [] };

    for (const { name: fileName, size: expectedSize } of capturedFiles(detail)) {
        // The scraper saves under models/<slug>/ (per model, so shared filenames cannot
        // collide); older runs wrote to the flat models/ directory. Prefer the copy whose
        // length matches upstream.
        const sourceCandidates = [path.join(MODELS_DIR, slug, fileName), path.join(MODELS_DIR, fileName)]
            .filter((candidate) => artifactSize(candidate) > 0);
        const sourcePath = sourceCandidates.find((candidate) => !expectedSize || artifactSize(candidate) === expectedSize)
            || sourceCandidates[0]
            || path.join(MODELS_DIR, fileName);
        const targetPath = path.join(targetDir, fileName);
        const sourceSize = artifactSize(sourcePath);
        const targetSize = artifactSize(targetPath);

        // The snapshot is current only when its length equals upstream's declared size
        // (or, for rows without one, the verified models/ copy); anything else is replaced.
        const wantedSize = expectedSize || sourceSize;
        if (targetSize >= MIN_ARTIFACT_BYTES && targetSize === wantedSize) {
            result.present.push(fileName);
            continue;
        }
        if (sourceSize < MIN_ARTIFACT_BYTES) {
            result.skipped.push(`${fileName} (${sourceSize ? `${sourceSize} bytes, placeholder` : `not in models/${slug}/ or models/`})`);
            continue;
        }
        if (expectedSize && sourceSize !== expectedSize) {
            result.skipped.push(`${fileName} (models/ copy is ${sourceSize} bytes, upstream declares ${expectedSize} — overwritten by another model?)`);
            continue;
        }
        if (!options.dryRun) {
            fs.mkdirSync(targetDir, { recursive: true });
            if (targetSize > 0) {
                console.log(`  replacing ${fileName} in snapshot (${targetSize} -> ${sourceSize} bytes)`);
                fs.unlinkSync(targetPath);
            }
            try {
                fs.linkSync(sourcePath, targetPath);
            } catch (error) {
                fs.copyFileSync(sourcePath, targetPath);
            }
        }
        // A kept served-size file carries a <file>.served.json sidecar (served vs declared
        // bytes) so the next scrape recognises it; keep it next to the snapshot copy too.
        const sidecar = `${sourcePath}.served.json`;
        if (!options.dryRun && fs.existsSync(sidecar)) {
            fs.copyFileSync(sidecar, `${targetPath}.served.json`);
        }
        result.staged.push(`${fileName} (${sourceSize} bytes)`);
    }
    return result;
}

function main() {
    const options = parseArgs(process.argv.slice(2));
    if (!fs.existsSync(options.details)) {
        throw new Error(`Details file not found: ${options.details}`);
    }
    const details = JSON.parse(fs.readFileSync(options.details, 'utf8'));
    const selected = details.filter((detail) => detail && detail.name && (!options.only || options.only.has(detail.name)));

    let stagedCount = 0;
    for (const detail of selected) {
        const result = stageDetail(detail, options);
        if (!result.staged.length && !result.present.length && !result.skipped.length) continue;
        console.log(`[${result.name}] -> models-real-20260713/${result.slug}/`);
        result.staged.forEach((entry) => console.log(`  ${options.dryRun ? 'would stage' : 'staged'}: ${entry}`));
        result.present.forEach((entry) => console.log(`  present: ${entry}`));
        result.skipped.forEach((entry) => console.log(`  skipped: ${entry}`));
        stagedCount += result.staged.length;
    }
    console.log(`${options.dryRun ? 'Would stage' : 'Staged'} ${stagedCount} file(s) for ${selected.length} model(s).`);
}

if (require.main === module) {
    try {
        main();
    } catch (error) {
        console.error(`stage-scraped-downloads failed: ${error.message}`);
        process.exitCode = 1;
    }
}

module.exports = { capturedFileNames, slugify };
