const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const MODELS_JS = path.join(ROOT, 'assets', 'js', 'models.js');
const DETAILS_JSON = path.join(ROOT, 'api_all_details.json');
const STAGING_ROOT = path.join(ROOT, '.hf-upload-staging');
const DEFAULT_PREFIX = 'hispark-modelzoo-';
const DEFAULT_SKIP = new Set(['Pi0', 'MiniCPM-4v-0.5B']);

function parseArgs(argv) {
    const options = {
        namespace: null,
        repoPrefix: DEFAULT_PREFIX,
        dryRun: false,
        limit: 0,
        only: null,
        publicRepo: true,
    };

    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];
        if (arg === '--dry-run') {
            options.dryRun = true;
        } else if (arg === '--private') {
            options.publicRepo = false;
        } else if (arg === '--namespace') {
            options.namespace = argv[index + 1] || null;
            index += 1;
        } else if (arg === '--repo-prefix') {
            options.repoPrefix = argv[index + 1] || DEFAULT_PREFIX;
            index += 1;
        } else if (arg === '--limit') {
            options.limit = Number(argv[index + 1] || 0);
            index += 1;
        } else if (arg === '--only') {
            options.only = new Set(String(argv[index + 1] || '')
                .split(',')
                .map(value => value.trim())
                .filter(Boolean));
            index += 1;
        }
    }

    return options;
}

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function slugify(value) {
    return String(value || '')
        .normalize('NFKD')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase();
}

function loadModelsData() {
    const code = fs.readFileSync(MODELS_JS, 'utf8');
    const sandbox = { window: {}, module: { exports: {} }, exports: {} };
    vm.runInNewContext(code, sandbox);
    return sandbox.window.modelsData || sandbox.module.exports.modelsData || [];
}

function loadDetails() {
    return JSON.parse(fs.readFileSync(DETAILS_JSON, 'utf8'));
}

function resolveNamespace(explicitNamespace) {
    if (explicitNamespace) return explicitNamespace;
    const output = execFileSync('hf', ['auth', 'whoami'], { cwd: ROOT, encoding: 'utf8' });
    const cleanOutput = output.replace(/\u001b\[[0-9;]*m/g, '');
    const match = cleanOutput.match(/user:\s+([^\s]+)/m);
    if (!match) {
        throw new Error('Unable to determine Hugging Face namespace from `hf auth whoami`.');
    }
    return match[1].trim();
}

function formatList(values) {
    return (values || []).filter(Boolean).map(value => `- ${value}`).join('\n') || '- None';
}

function yamlList(values) {
    return (values || []).filter(Boolean).map(value => `- ${value}`).join('\n');
}

function summarizeLocalDownloads(downloads) {
    const grouped = new Map();

    for (const item of downloads || []) {
        if (!item.localFile) continue;
        if (!grouped.has(item.localFile)) {
            grouped.set(item.localFile, {
                fileName: item.localFile,
                variants: new Set(),
            });
        }

        const variant = [item.group, item.sourceLabel, item.note].filter(Boolean).join(' / ');
        grouped.get(item.localFile).variants.add(variant);
    }

    return [...grouped.values()].map(entry => ({
        fileName: entry.fileName,
        variants: [...entry.variants],
    }));
}

function buildReadme(model, detail, repoId, localFiles, imageTarget) {
    const tags = [
        'hisilicon',
        'hispark',
        'npu',
        'openharmony',
        'modelzoo',
        ...((model.framework || []).map(value => value.toLowerCase())),
        ...((model.tags || []).map(value => slugify(value)).filter(Boolean)),
    ];
    const uniqueTags = [...new Set(tags.filter(Boolean))];

    const detailParams = (((detail || {}).apiDetail || {}).detailParams || [])
        .filter(item => item && item.name && item.value)
        .map(item => `- ${item.name}: ${item.value}`)
        .join('\n') || '- None';

    const localDownloads = summarizeLocalDownloads(model.downloads)
        .map(item => `- ${item.fileName} (${item.variants.join('; ')})`)
        .join('\n');

    const lines = [
        '---',
        'language:',
        '- zh',
        'tags:',
        yamlList(uniqueTags),
        '---',
        '',
        `# ${model.name}`,
        '',
        model.description || 'Mirror of the HiSilicon Developer Portal model card and associated local artifacts.',
        '',
        '## Mirror Metadata',
        '',
        `- Hugging Face repo: ${repoId}`,
        `- Portal model id: ${model.id || 'Unknown'}`,
        `- Created at: ${model.date || 'Unknown'}`,
        `- Updated at: ${model.updatedAt || 'Unknown'}`,
        `- Category: ${model.category || 'Unknown'}`,
        '',
        '## Framework',
        '',
        formatList(model.framework),
        '',
        '## Supported OS',
        '',
        formatList(model.supportOs),
        '',
        '## Computing Power',
        '',
        formatList(model.computingPower),
        '',
        '## Tags',
        '',
        formatList(model.tags),
        '',
        '## Detail Parameters',
        '',
        detailParams,
        '',
        '## Files In This Repo',
        '',
        localDownloads || '- No local files available',
        '',
        '## Upstream Links',
        '',
        `- Portal card: https://gitbubble.github.io/hisilicon-developer-portal-mirror/model-detail.html?id=${encodeURIComponent(model.id || '')}`,
        `- Upstream repository: ${model.repositoryUrl || 'Unavailable'}`,
        `- License reference: ${model.licenseUrl || 'Unavailable'}`,
        '',
        '## Notes',
        '',
        '- This repository was mirrored from the HiSilicon Developer Portal model card and local downloads captured on 2026-03-27.',
        '- File ownership follows the portal card mapping, not just filename similarity.',
    ];

    if (imageTarget) {
        lines.push(`- Cover image: ${imageTarget}`);
    }

    if (localFiles.length === 0) {
        lines.push('- No local artifacts were present for this card, so upload was skipped.');
    }

    return `${lines.join('\n')}\n`;
}

function hardLinkOrCopy(sourcePath, targetPath) {
    try {
        fs.linkSync(sourcePath, targetPath);
    } catch (error) {
        if (error.code === 'EEXIST') return;
        fs.copyFileSync(sourcePath, targetPath);
    }
}

function stageModel(model, detail, repoId) {
    const repoDir = path.join(STAGING_ROOT, repoId.replace('/', '__'));
    fs.rmSync(repoDir, { recursive: true, force: true });
    ensureDir(repoDir);

    const localFiles = [...new Set(model.downloads
        .filter(item => item.localFile)
        .map(item => item.localFile))]
        .map(fileName => ({
            fileName,
            sourcePath: path.join(ROOT, 'models', fileName),
        }))
        .filter(item => fs.existsSync(item.sourcePath));

    for (const item of localFiles) {
        hardLinkOrCopy(item.sourcePath, path.join(repoDir, item.fileName));
    }

    let imageTarget = null;
    if (model.image) {
        const imageName = path.basename(model.image);
        const imageSourcePath = path.join(ROOT, model.image);
        if (fs.existsSync(imageSourcePath)) {
            imageTarget = imageName;
            hardLinkOrCopy(imageSourcePath, path.join(repoDir, imageName));
        }
    }

    const metadata = {
        name: model.name,
        id: model.id,
        description: model.description,
        category: model.category,
        framework: model.framework,
        supportOs: model.supportOs,
        computingPower: model.computingPower,
        tags: model.tags,
        repositoryUrl: model.repositoryUrl,
        licenseUrl: model.licenseUrl,
        downloads: summarizeLocalDownloads(model.downloads),
        apiDetail: detail ? detail.apiDetail : null,
    };

    fs.writeFileSync(path.join(repoDir, 'model-card.json'), `${JSON.stringify(metadata, null, 2)}\n`);
    fs.writeFileSync(path.join(repoDir, 'README.md'), buildReadme(model, detail, repoId, localFiles, imageTarget));

    return {
        repoDir,
        fileCount: localFiles.length,
        files: localFiles.map(item => item.fileName),
    };
}

function runCommand(command, args, options = {}) {
    execFileSync(command, args, {
        cwd: ROOT,
        stdio: 'inherit',
        ...options,
    });
}

function main() {
    const options = parseArgs(process.argv.slice(2));
    const namespace = resolveNamespace(options.namespace);
    const models = loadModelsData();
    const details = loadDetails();
    const detailByName = new Map(details.map(item => [item.name, item]));

    let selected = models.filter(model => {
        if (DEFAULT_SKIP.has(model.name)) return false;
        if (options.only && !options.only.has(model.name)) return false;
        return model.downloads.some(item => item.localFile);
    });

    if (options.limit > 0) {
        selected = selected.slice(0, options.limit);
    }

    if (selected.length === 0) {
        console.log('No models selected for upload.');
        return;
    }

    ensureDir(STAGING_ROOT);
    console.log(`Preparing ${selected.length} model repos for namespace ${namespace}.`);

    for (const model of selected) {
        const repoName = `${options.repoPrefix}${slugify(model.name)}`;
        const repoId = `${namespace}/${repoName}`;
        const detail = detailByName.get(model.name);
        const staged = stageModel(model, detail, repoId);

        console.log(`\n[${model.name}] ${repoId}`);
        console.log(`Files: ${staged.fileCount}`);
        if (options.dryRun) {
            console.log(`Dry run staging dir: ${staged.repoDir}`);
            continue;
        }

        const repoArgs = ['repo', 'create', repoId, '--type', 'model', '--exist-ok'];
        repoArgs.push(options.publicRepo ? '--no-private' : '--private');
        runCommand('hf', repoArgs);
        runCommand('hf', [
            'upload-large-folder',
            repoId,
            staged.repoDir,
            '--repo-type',
            'model',
            '--num-workers',
            '4',
            '--no-bars',
        ]);
    }

    console.log('\nUpload workflow completed.');
}

main();