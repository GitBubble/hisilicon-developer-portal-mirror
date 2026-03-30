const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const MODELS_JSON = path.join(ROOT, 'api_all_models.json');
const DETAILS_JSON = path.join(ROOT, 'api_all_details.json');
const IMAGES_DIR = path.join(ROOT, 'assets', 'images');
const MODELS_DIR = path.join(ROOT, 'models');
const OUTPUT = path.join(ROOT, 'assets', 'js', 'models.js');
const SITE_HTML_FILES = [
    path.join(ROOT, 'index.html'),
    path.join(ROOT, 'modelzoo.html'),
    path.join(ROOT, 'model-detail.html'),
];
const HF_NAMESPACE = process.env.HF_NAMESPACE || 'shadow-cann';
const HF_MIRROR_BASE = 'https://hf-mirror.com';
const HF_REPO_PREFIX = 'hispark-modelzoo-';
const SITE_LAST_COMMIT_TIME_TOKEN = '{{SITE_LAST_COMMIT_TIME}}';
const HF_UPLOAD_SKIPS = new Set(['Pi0', 'MiniCPM-4v-0.5B']);
const MANUAL_REPO_OVERRIDES = new Map([
    ['Pi0', {
        repoId: 'shadow-cann/pi0',
        useMirrorForRemoteDownloads: false,
        preferRepoUrlForDownloads: false,
        downloadTargetUrl: null,
    }],
    ['MiniCPM-4v-0.5B', {
        repoId: 'shadow-cann/minicpm-v-0.5B',
        useMirrorForRemoteDownloads: true,
        preferRepoUrlForDownloads: true,
        downloadTargetUrl: 'https://hf-mirror.com/shadow-cann/minicpm-v-0.5B/tree/main',
    }],
]);
const MANUAL_MODEL_DATA = new Map([
    ['Pi0', {
        downloads: [
            {
                name: 'pi0.om',
                source: 'om-FP16',
            },
            {
                name: 'pi0.onnx',
                source: 'source-model',
            },
        ],
        originModels: [
            {
                name: 'pi0.onnx',
                size: 25893080,
            },
        ],
    }],
]);

const VALUE_TRANSLATIONS = new Map([
    ['计算机视觉', 'computer vision'],
    ['自然语言处理', 'natural language processing'],
    ['多模态', 'multimodal'],
    ['音频', 'audio'],
    ['视频', 'video'],
    ['模型', 'model'],
    ['人群计数', 'crowd counting'],
    ['单目深度估计', 'monocular depth estimation'],
    ['关键点检测', 'keypoint detection'],
    ['特征点检测', 'feature point detection'],
    ['图像分类', 'image classification'],
    ['单目深度', 'monocular depth'],
    ['检测', 'detection'],
    ['分割', 'segmentation'],
    ['目标检测', 'object detection'],
    ['姿态估计', 'pose estimation'],
    ['图像增强', 'image enhancement'],
    ['文字检测', 'text detection'],
    ['双目深度', 'stereo depth'],
    ['图像分割', 'image segmentation'],
    ['文字识别', 'text recognition'],
    ['具身智能', 'embodied AI'],
    ['人脸识别', 'face recognition'],
    ['多目标跟踪', 'multi-object tracking'],
    ['多目深度估计', 'multi-view depth estimation'],
    ['图像超分', 'image super-resolution'],
    ['分类', 'classification'],
    ['OCR', 'OCR'],
    ['大型语言模型', 'large language model'],
    ['图片分类', 'image classification'],
    ['图文匹配', 'image-text matching'],
    ['文本转语音', 'text-to-speech'],
    ['编译模型', 'compiled models'],
    ['源模型', 'source models'],
    ['工具链', 'toolchain'],
    ['附加资源', 'extra resources'],
    ['OM 元数据', 'OM metadata'],
    ['源模型下载', 'source model download'],
    ['源模型元数据', 'source model metadata'],
    ['自动下载', 'automatic download'],
    ['工具链', 'toolchain'],
    ['附加资源', 'extra resources'],
]);

const PHRASE_TRANSLATIONS = [
    ['是一种', 'is a'],
    ['是对', 'is an improved version of'],
    ['的改进', 'improved variant'],
    ['轻量级的神经网络', 'lightweight neural network'],
    ['轻量级神经网络', 'lightweight neural network'],
    ['多目标跟踪方法', 'multi-object tracking method'],
    ['多目标跟踪', 'multi-object tracking'],
    ['简单有效', 'simple and effective'],
    ['提高了', 'improves'],
    ['性能', 'performance'],
    ['能够在', 'can'],
    ['仍能进行有效的跟踪', 'still maintain effective tracking'],
    ['保留了', 'retains'],
    ['增加了', 'adds'],
    ['线性瓶颈', 'linear bottlenecks'],
    ['倒残差', 'inverted residual blocks'],
    ['该方法', 'This method'],
    ['该框架', 'This framework'],
    ['该模型', 'This model'],
    ['本模型', 'This model'],
    ['能够', 'can'],
    ['实现', 'deliver'],
    ['较快帧率', 'high frame rates'],
    ['较高精度的识别', 'high recognition accuracy'],
    ['提高了分拣性能', 'improves association performance'],
    ['外观信息', 'appearance information'],
    ['离线预训练阶段', 'offline pretraining stage'],
    ['在线应用阶段', 'online deployment stage'],
    ['最近邻查询', 'nearest-neighbor queries'],
    ['视觉外观空间', 'visual appearance space'],
    ['进行有效的跟踪', 'perform effective tracking'],
    ['模型可以通过以下代码完成快速推理', 'The following code demonstrates quick inference for the model'],
    ['可以通过以下代码完成快速推理', 'The following code demonstrates quick inference'],
    ['该代码仅展示主要流程，完整实现参考', 'The snippet shows the main flow only. For the full implementation, refer to'],
    ['备注：', 'Notes: '],
    ['头文件和动态库位于', 'Headers and shared libraries are available in'],
    ['目录下', 'directory'],
    ['编译配置参考文件', 'Build configuration is documented in'],
    ['模型文件路径', 'model file path'],
    ['输入图片路径', 'input image path'],
    ['快速推理', 'quick inference'],
    ['推理', 'inference'],
    ['模型描述', 'model description'],
];

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

function fileNameFromUrl(fileUrl) {
    if (!fileUrl) return '';

    try {
        const parsed = new URL(fileUrl);
        return decodeURIComponent(path.basename(parsed.pathname));
    } catch (error) {
        return decodeURIComponent(path.basename(String(fileUrl)));
    }
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

function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function translateValue(value) {
    return VALUE_TRANSLATIONS.get(value) || value;
}

function formatEnglishList(values) {
    const items = unique(values).filter(Boolean);
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function humanizeText(rawText) {
    return normalizeText(rawText)
        .replace(/\s+/g, ' ')
        .replace(/\s+([,.;:])/g, '$1')
        .replace(/([,.;:])(\S)/g, '$1 $2')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

function textLooksEnglish(text) {
    const normalized = String(text || '').trim();
    if (!normalized) return false;
    const latinChars = (normalized.match(/[A-Za-z]/g) || []).length;
    const cjkChars = (normalized.match(/[\u4e00-\u9fff]/g) || []).length;
    if (cjkChars === 0) return latinChars > 0;
    return latinChars > 0 && latinChars >= cjkChars * 3;
}

function translateChineseText(text) {
    let translated = normalizeText(text || '');
    for (const [source, target] of PHRASE_TRANSLATIONS) {
        translated = translated.replace(new RegExp(escapeRegExp(source), 'g'), target);
    }

    for (const [source, target] of VALUE_TRANSLATIONS.entries()) {
        translated = translated.replace(new RegExp(escapeRegExp(source), 'g'), target);
    }

    return humanizeText(translated);
}

function buildEnglishDescription(model, detail, downloads) {
    const originalDescription = detail.description || model.description || '';
    const taskTags = unique([
        ...(model.computerVersion || []),
        ...(model.naturalLanguageProcess || []),
        ...(model.multimodal || []),
        ...(model.video || []),
    ]).map(translateValue);
    const category = translateValue(deriveCategory(model));
    const frameworks = unique(model.framework || []);
    const operatingSystems = unique(model.supportOs || []);
    const computeTargets = unique(model.computingPower || []);
    const availableDownloads = (downloads || []).filter((item) => item.available).length;
    const sentences = [];

    if (textLooksEnglish(originalDescription)) {
        const cleanedLead = humanizeText(originalDescription);
        if (cleanedLead) {
            sentences.push(cleanedLead.replace(/([^.])$/, '$1.'));
        }
    } else {
        const taskText = taskTags.length ? ` for ${formatEnglishList(taskTags)}` : '';
        sentences.push(`${model.name} is a ${category} model${taskText}.`);
        if (originalDescription) {
            sentences.push('The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing.');
        }
    }

    const capabilityParts = [];
    if (frameworks.length) capabilityParts.push(`Framework: ${formatEnglishList(frameworks)}`);
    if (operatingSystems.length) capabilityParts.push(`OS: ${formatEnglishList(operatingSystems)}`);
    if (computeTargets.length) capabilityParts.push(`Compute targets: ${formatEnglishList(computeTargets)}`);
    if (capabilityParts.length) {
        sentences.push(`${capabilityParts.join('. ')}.`);
    }

    if (availableDownloads > 0) {
        sentences.push(`The mirror currently exposes ${availableDownloads} downloadable artifact${availableDownloads === 1 ? '' : 's'}, along with quick-start resources when available.`);
    }

    return humanizeText(sentences.join(' '));
}

function extractQuickStartSignals(content) {
    const normalized = normalizeText(content || '');
    return {
        hasInit: /(DevInit|EnvInit|初始化|device init|初始化 NPU)/i.test(normalized),
        hasLoad: /(Load\(|load model|加载模型)/i.test(normalized),
        hasInfer: /(Infer\(|推理|inference)/i.test(normalized),
        hasConfig: /(config|json|配置)/i.test(normalized),
        hasBuild: /(CMakeLists|编译|build|make|cmake)/i.test(normalized),
        hasCommonLibs: /(samples\/common|动态库|头文件|shared librar|headers?)/i.test(normalized),
    };
}

function buildReadmeSummary(entry, modelName) {
    const content = entry.content || '';
    const signals = extractQuickStartSignals(content);
    const capabilities = [];

    if (signals.hasInit) capabilities.push('runtime initialization');
    if (signals.hasLoad) capabilities.push('model loading');
    if (signals.hasInfer) capabilities.push('inference execution');
    if (signals.hasConfig) capabilities.push('configuration handling');
    if (signals.hasBuild) capabilities.push('build instructions');
    if (signals.hasCommonLibs) capabilities.push('references to shared runtime libraries');

    const baseSummary = `${entry.language || 'Text'} quick-start notes for ${modelName}.`;

    if (capabilities.length === 0) return baseSummary;
    return `${baseSummary} Covers ${formatEnglishList(capabilities)}.`;
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
    const manualOverride = MANUAL_REPO_OVERRIDES.get(model.name);
    if (manualOverride) {
        return {
            repoId: manualOverride.repoId,
            repoUrl: `${HF_MIRROR_BASE}/${manualOverride.repoId}`,
            readmeUrl: `${HF_MIRROR_BASE}/${manualOverride.repoId}/blob/main/README.md`,
            resolveBase: `${HF_MIRROR_BASE}/${manualOverride.repoId}/resolve/main`,
            useMirrorForRemoteDownloads: Boolean(manualOverride.useMirrorForRemoteDownloads),
            preferRepoUrlForDownloads: Boolean(manualOverride.preferRepoUrlForDownloads),
            downloadTargetUrl: manualOverride.downloadTargetUrl || null,
        };
    }

    if (!hasLocalFiles || HF_UPLOAD_SKIPS.has(model.name)) return null;
    const repoName = `${HF_REPO_PREFIX}${slugify(model.name)}`;
    const repoId = `${HF_NAMESPACE}/${repoName}`;
    return {
        repoId,
        repoUrl: `${HF_MIRROR_BASE}/${repoId}`,
        readmeUrl: `${HF_MIRROR_BASE}/${repoId}/blob/main/README.md`,
        resolveBase: `${HF_MIRROR_BASE}/${repoId}/resolve/main`,
        useMirrorForRemoteDownloads: false,
        preferRepoUrlForDownloads: false,
        downloadTargetUrl: null,
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

function buildManualOriginModels(modelName, repoInfo) {
    const manualData = MANUAL_MODEL_DATA.get(modelName);
    if (!manualData || !repoInfo) return [];

    return (manualData.originModels || []).map((item) => ({
        name: item.name,
        size: formatBytes(item.size),
        href: `${repoInfo.resolveBase}/${encodeRepoFile(item.name)}`,
        available: true,
        localFile: item.name,
    }));
}

function buildDownloads(detailEntry, modelFiles, repoInfo) {
    const manualData = detailEntry ? null : null;
    if (!detailEntry) return [];

    const downloads = [];
    for (const item of detailEntry.downloadUrls || []) {
        const title = item.name || (item.url ? fileNameFromUrl(item.url) : item.fileId) || '未命名文件';
        const localFile = resolveLocalModelFile(title, modelFiles);
        let href = null;
        if (localFile) {
            href = repoInfo ? `${repoInfo.resolveBase}/${encodeRepoFile(localFile)}` : null;
        } else if (repoInfo && repoInfo.useMirrorForRemoteDownloads && title && title !== '未命名文件') {
            href = repoInfo.preferRepoUrlForDownloads
                ? (repoInfo.downloadTargetUrl || repoInfo.repoUrl)
                : `${repoInfo.resolveBase}/${encodeRepoFile(title)}`;
        } else if (item.url && /^https?:\/\//.test(item.url)) {
            href = item.url;
        }

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

function buildManualDownloads(modelName, repoInfo) {
    const manualData = MANUAL_MODEL_DATA.get(modelName);
    if (!manualData || !repoInfo) return [];

    return (manualData.downloads || []).map((item) => ({
        title: item.name,
        href: `${repoInfo.resolveBase}/${encodeRepoFile(item.name)}`,
        available: true,
        source: item.source || 'unknown',
        sourceLabel: sourceLabel(item.source),
        group: sourceGroup(item.source),
        note: item.note || '',
        localFile: item.name,
    }));
}

function buildModelRecord(model, detailEntry, imageFiles, modelFiles) {
    const detail = detailEntry?.apiDetail || {};
    const manualData = MANUAL_MODEL_DATA.get(model.name);
    const hasLocalFiles = (detailEntry?.downloadUrls || []).some((item) => resolveLocalModelFile(item.name, modelFiles))
        || Boolean(manualData);
    const repoInfo = buildRepoInfo(model, hasLocalFiles);
    const downloads = detailEntry
        ? buildDownloads(detailEntry, modelFiles, repoInfo)
        : buildManualDownloads(model.name, repoInfo);
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
    const description = detail.description || model.description || '';
    const enrichedQuickStartSections = quickStart.sections.map((entry) => ({
        ...entry,
        summary: entry.content.split(/\n+/).map((line) => line.trim()).find(Boolean) || '',
        summaryEn: buildReadmeSummary(entry, model.name),
    }));

    return {
        id: model.id,
        name: model.name,
        description,
        descriptionZh: description,
        descriptionEn: buildEnglishDescription(model, detail, downloads),
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
        quickStartReadmes: enrichedQuickStartSections,
        detailParams: (detail.detailParams || []).filter(item => item && item.name && item.value),
        originModels: detailEntry
            ? buildOriginModels(detail, modelFiles, repoInfo)
            : buildManualOriginModels(model.name, repoInfo),
        hfRepoId: repoInfo ? repoInfo.repoId : null,
        hfRepoUrl: repoInfo ? repoInfo.repoUrl : null,
        hfReadmeUrl: repoInfo ? repoInfo.readmeUrl : null,
        primaryDownloadUrl: primaryDownload ? primaryDownload.href : null,
        primaryDownloadLabel: primaryDownload ? primaryDownload.title : null,
        downloads,
    };
}

function getLatestCommitTime() {
    if (process.env.SITE_LAST_COMMIT_TIME) {
        return process.env.SITE_LAST_COMMIT_TIME.trim();
    }

    try {
        return execSync("git log -1 --date=format:'%Y-%m-%d %H:%M:%S' --format=%cd", {
            cwd: ROOT,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'ignore'],
        }).trim();
    } catch (error) {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}

function injectSiteMetadata(latestCommitTime) {
    let updatedFiles = 0;

    for (const htmlFile of SITE_HTML_FILES) {
        if (!fs.existsSync(htmlFile)) continue;

        const template = fs.readFileSync(htmlFile, 'utf8');
        const updated = template.replaceAll(SITE_LAST_COMMIT_TIME_TOKEN, latestCommitTime);

        if (updated !== template) {
            fs.writeFileSync(htmlFile, updated);
            updatedFiles += 1;
            continue;
        }

        const normalized = template.replace(/自动同步时间：[\s\S]*?<\/span>/, `自动同步时间：${latestCommitTime}</span>`)
            .replace(/由开发者自行维护，更新时间：[\s\S]*?<\/span>/, `由开发者自行维护，更新时间：${latestCommitTime}</span>`);

        if (normalized !== template) {
            fs.writeFileSync(htmlFile, normalized);
            updatedFiles += 1;
        }
    }

    return updatedFiles;
}

function main() {
    const allModels = readJson(MODELS_JSON);
    const details = readJson(DETAILS_JSON);
    const imageFiles = fs.existsSync(IMAGES_DIR) ? fs.readdirSync(IMAGES_DIR).filter(file => !file.startsWith('.')) : [];
    const modelFiles = fs.existsSync(MODELS_DIR) ? fs.readdirSync(MODELS_DIR).filter(file => !file.startsWith('.')) : [];
    const detailByName = new Map(details.map(item => [item.name, item]));
    const latestCommitTime = getLatestCommitTime();

    const modelsData = allModels.map(model => buildModelRecord(model, detailByName.get(model.name), imageFiles, modelFiles));
    const content = `// Generated from api_all_models.json and api_all_details.json\nconst modelsData = ${JSON.stringify(modelsData, null, 4)};\n\nif (typeof window !== 'undefined') {\n    window.modelsData = modelsData;\n}\n\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = { modelsData };\n}\n`;
    fs.writeFileSync(OUTPUT, content);
    const updatedFiles = injectSiteMetadata(latestCommitTime);
    console.log(`Generated ${OUTPUT} with ${modelsData.length} models.`);
    console.log(`Injected latest commit time into ${updatedFiles} site files: ${latestCommitTime}`);
}

main();