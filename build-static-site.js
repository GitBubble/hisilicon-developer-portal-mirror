const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MODELS_JSON = path.join(ROOT, 'api_all_models.json');
const DETAILS_JSON = path.join(ROOT, 'api_all_details.json');
const IMAGES_DIR = path.join(ROOT, 'assets', 'images');
const MODELS_DIR = path.join(ROOT, 'models');
const OUTPUT = path.join(ROOT, 'assets', 'js', 'models.js');
const HF_NAMESPACE = process.env.HF_NAMESPACE || 'shadow-cann';
const HF_MIRROR_BASE = 'https://hf-mirror.com';
const HF_REPO_PREFIX = 'hispark-modelzoo-';
const HF_UPLOAD_SKIPS = new Set(['Pi0', 'MiniCPM-4v-0.5B']);

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function unique(values) {
    return [...new Set((values || []).filter(Boolean))];
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

function encodeLocalFile(fileName, prefix) {
    return `${prefix}/${encodeURIComponent(fileName)}`;
}

function encodeRepoFile(fileName) {
    return encodeURIComponent(fileName).replace(/%2F/g, '/');
}

function formatBytes(value) {
    const size = Number(value || 0);
    if (!Number.isFinite(size) || size <= 0) return '';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let amount = size;
    let unitIndex = 0;
    while (amount >= 1024 && unitIndex < units.length - 1) {
        amount /= 1024;
        unitIndex += 1;
    }
    const digits = amount >= 100 || unitIndex === 0 ? 0 : 1;
    return `${amount.toFixed(digits)} ${units[unitIndex]}`;
}

function normalizeText(value) {
    return String(value || '')
        .replace(/\u00a0/g, ' ')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');
}

function deltaToText(serializedDelta) {
    if (!serializedDelta) return '';

    try {
        const parsed = JSON.parse(serializedDelta);
        const ops = Array.isArray(parsed) ? parsed : parsed.ops;
        if (!Array.isArray(ops)) return normalizeText(serializedDelta);

        return normalizeText(ops.map((op) => {
            const insert = typeof op.insert === 'string' ? op.insert : '';
            const link = op.attributes && op.attributes.link;
            if (!link) return insert;

            const text = insert.trim();
            return text ? `${text} (${link})` : insert;
        }).join(''))
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    } catch (error) {
        return normalizeText(serializedDelta).trim();
    }
}

function sourceGroup(source) {
    if (!source) return '其它';
    if (source.startsWith('om-') || source === 'omOfflineModel' || source === 'auto-download') return '编译模型';
    if (source === 'source-model' || source === 'originModel' || source === 'source-all' || source === 'source-alt') return '源模型';
    if (source === 'toolkit') return '工具链';
    if (source === 'api-all') return '附加资源';
    return '其它';
}

function sourceLabel(source) {
    if (!source) return '未知来源';
    if (source.startsWith('om-')) return source.slice(3).toUpperCase();
    if (source === 'omOfflineModel') return 'OM 元数据';
    if (source === 'auto-download') return '自动下载';
    if (source === 'source-model') return '源模型下载';
    if (source === 'originModel') return '源模型元数据';
    if (source === 'toolkit') return '工具链';
    if (source === 'api-all') return '附加资源';
    return source;
}

function deriveCategory(model) {
    const tags = unique([
        ...(model.computerVersion || []),
        ...(model.naturalLanguageProcess || []),
        ...(model.multimodal || []),
        ...(model.video || []),
    ]);

    if (tags.includes('文本转语音')) return '音频';
    if ((model.multimodal || []).length > 0) return '多模态';
    if ((model.naturalLanguageProcess || []).length > 0) return '自然语言处理';
    if ((model.video || []).length > 0) return '视频';
    if ((model.computerVersion || []).length > 0) return '计算机视觉';
    return '模型';
}

function findLocalImage(coverImageId, imageFiles) {
    if (!coverImageId) return null;
    const prefix = `${coverImageId}_`;
    const match = imageFiles.find(file => file.startsWith(prefix));
    return match ? encodeLocalFile(match, 'assets/images') : null;
}

function resolveLocalModelFile(name, modelFiles) {
    if (!name) return null;
    if (modelFiles.includes(name)) return name;

    const ext = path.extname(name).toLowerCase();
    const stem = path.basename(name, ext).toLowerCase();
    const candidates = modelFiles.filter(file => {
        const fileExt = path.extname(file).toLowerCase();
        const fileStem = path.basename(file, fileExt).toLowerCase();
        return fileStem === stem ||
            fileStem.startsWith(`${stem}_`) ||
            fileStem.includes(`${stem}_om-`) ||
            fileStem.includes(`${stem}_source-model`) ||
            fileStem.includes(`${stem}-source-model`);
    });

    if (candidates.length === 1) return candidates[0];
    return null;
}

function buildRepoInfo(model, hasLocalFiles) {
    if (!hasLocalFiles || HF_UPLOAD_SKIPS.has(model.name)) return null;
    const repoName = `${HF_REPO_PREFIX}${slugify(model.name)}`;
    const repoId = `${HF_NAMESPACE}/${repoName}`;
    return {
        repoId,
        repoUrl: `${HF_MIRROR_BASE}/${repoId}`,
        readmeUrl: `${HF_MIRROR_BASE}/${repoId}/blob/main/README.md`,
        resolveBase: `${HF_MIRROR_BASE}/${repoId}/resolve/main`,
    };
}

function buildQuickStart(detail) {
    const quickStart = detail.quickStart || {};
    return {
        url: quickStart.url || null,
        markdownUrl: quickStart.markDownUrl || null,
        sections: (quickStart.developLanguage || [])
            .map((entry) => ({
                language: entry.language || 'Text',
                content: deltaToText(entry.context),
            }))
            .filter((entry) => entry.content),
    };
}

function buildOriginModels(detail, modelFiles, repoInfo) {
    return (detail.originModel || []).map((item) => {
        const localFile = resolveLocalModelFile(item.name, modelFiles);
        const href = localFile && repoInfo
            ? `${repoInfo.resolveBase}/${encodeRepoFile(localFile)}`
            : (item.url && /^https?:\/\//.test(item.url) ? item.url : null);

        return {
            name: item.name,
            size: formatBytes(item.size),
            href,
            available: Boolean(href),
            localFile: localFile || null,
        };
    });
}

function buildDownloads(detailEntry, modelFiles, repoInfo) {
    if (!detailEntry) return [];

    const downloads = [];
    for (const item of detailEntry.downloadUrls || []) {
        const title = item.name || (item.url ? path.basename(item.url) : item.fileId) || '未命名文件';
        const localFile = resolveLocalModelFile(title, modelFiles);
        const href = localFile
            ? (repoInfo ? `${repoInfo.resolveBase}/${encodeRepoFile(localFile)}` : null)
            : (item.url && /^https?:\/\//.test(item.url) ? item.url : null);

        downloads.push({
            title,
            href,
            available: Boolean(href),
            source: item.source || 'unknown',
            sourceLabel: sourceLabel(item.source),
            group: sourceGroup(item.source),
            note: item.quantify || item.computing || '',
            localFile: localFile || null,
        });
    }

    const deduped = [];
    const seen = new Set();
    for (const item of downloads) {
        const key = `${item.group}|${item.source}|${item.title}|${item.href || ''}`;
        if (seen.has(key)) continue;
        seen.add(key);
        deduped.push(item);
    }

    return deduped;
}

function buildModelRecord(model, detailEntry, imageFiles, modelFiles) {
    const detail = detailEntry?.apiDetail || {};
    const hasLocalFiles = (detailEntry?.downloadUrls || []).some((item) => resolveLocalModelFile(item.name, modelFiles));
    const repoInfo = buildRepoInfo(model, hasLocalFiles);
    const downloads = buildDownloads(detailEntry, modelFiles, repoInfo);
    const tags = unique([
        ...(model.computerVersion || []),
        ...(model.naturalLanguageProcess || []),
        ...(model.multimodal || []),
        ...(model.video || []),
    ]);

    const primaryDownload = downloads.find(item => item.available && item.group === '编译模型')
        || downloads.find(item => item.available && item.group === '源模型')
        || downloads.find(item => item.available);

    const quickStart = buildQuickStart(detail);
    const localImage = findLocalImage(model.coverImageId, imageFiles);

    return {
        id: model.id,
        name: model.name,
        description: detail.description || model.description || '',
        date: model.creationDate,
        updatedAt: model.lastUpdateDate,
        badge: model.isBeta ? 'Beta' : null,
        betaVersionDesc: model.betaVersionDesc || '',
        category: deriveCategory(model),
        tags,
        image: model.coverImageUrl || localImage,
        coverImageUrl: model.coverImageUrl || null,
        framework: unique(model.framework),
        supportOs: unique(model.supportOs),
        computingPower: unique(model.computingPower),
        repositoryUrl: detail.modelRepository || null,
        licenseUrl: detail.modelLicense || null,
        quickStartUrl: quickStart.url,
        quickStartMarkdownUrl: quickStart.markdownUrl,
        quickStartReadmes: quickStart.sections,
        detailParams: (detail.detailParams || []).filter(item => item && item.name && item.value),
        originModels: buildOriginModels(detail, modelFiles, repoInfo),
        hfRepoId: repoInfo ? repoInfo.repoId : null,
        hfRepoUrl: repoInfo ? repoInfo.repoUrl : null,
        hfReadmeUrl: repoInfo ? repoInfo.readmeUrl : null,
        primaryDownloadUrl: primaryDownload ? primaryDownload.href : null,
        primaryDownloadLabel: primaryDownload ? primaryDownload.title : null,
        downloads,
    };
}

function main() {
    const allModels = readJson(MODELS_JSON);
    const details = readJson(DETAILS_JSON);
    const imageFiles = fs.existsSync(IMAGES_DIR) ? fs.readdirSync(IMAGES_DIR).filter(file => !file.startsWith('.')) : [];
    const modelFiles = fs.existsSync(MODELS_DIR) ? fs.readdirSync(MODELS_DIR).filter(file => !file.startsWith('.')) : [];
    const detailByName = new Map(details.map(item => [item.name, item]));

    const modelsData = allModels.map(model => buildModelRecord(model, detailByName.get(model.name), imageFiles, modelFiles));
    const content = `// Generated from api_all_models.json and api_all_details.json\nconst modelsData = ${JSON.stringify(modelsData, null, 4)};\n\nif (typeof window !== 'undefined') {\n    window.modelsData = modelsData;\n}\n\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = { modelsData };\n}\n`;
    fs.writeFileSync(OUTPUT, content);
    console.log(`Generated ${OUTPUT} with ${modelsData.length} models.`);
}

main();