const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const MODELS_JSON = path.join(ROOT, 'api_all_models.json');
const DETAILS_JSON = path.join(ROOT, 'api_all_details.json');
const IMAGES_DIR = path.join(ROOT, 'assets', 'images');
const MODELS_DIR = path.join(ROOT, 'models');
const MODELS_REAL_DIR = path.join(ROOT, 'models-real-20260713');
const FETCH_MANIFEST = path.join(MODELS_REAL_DIR, 'fetch-manifest.json');
// Authoritative listing of what each HF repo actually contains; refresh with refresh-hf-files.js.
// The models-real snapshots are incomplete, so they alone under-report available downloads.
const HF_REPO_FILES = path.join(ROOT, 'hf-repo-files.json');
// Upstream still advertises these dataset hosts, but their DNS records are gone.
const DEAD_EXTERNAL_HOSTS = new Set(['icvl.ee.ic.ac.uk', 'vis-www.cs.umass.edu']);
const OUTPUT = path.join(ROOT, 'assets', 'js', 'models.js');
const HF_NAMESPACE = process.env.HF_NAMESPACE || 'shadow-cann';
const HF_MIRROR_BASE = 'https://hf-mirror.com';
const HF_REPO_PREFIX = 'hispark-modelzoo-';
// Shared toolkit package (replaces hispark-obs SVP_NNN SDK).
// Prefer the dedicated HF repo when the full package is present; fall back to GitHub Releases
// which hosts the verified complete 249MB archive.
const SHARED_SDK_FILE = 'SVP_NNN_PC_V1.0.6.0.tgz';
const SHARED_SDK_HF_REPO_ID = `${HF_NAMESPACE}/svp-nnn-pc`;
const SHARED_SDK_HF_URL = `${HF_MIRROR_BASE}/${SHARED_SDK_HF_REPO_ID}/resolve/main/${SHARED_SDK_FILE}`;
const SHARED_SDK_GITHUB_URL = `https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/${SHARED_SDK_FILE}`;
// Use GitHub Releases by default: HF mirror historically contained a truncated 31MB copy.
// Set SVP_SDK_SOURCE=hf to force the dedicated Hugging Face URL after a full upload is verified.
const SHARED_SDK_URL = process.env.SVP_SDK_SOURCE === 'hf' ? SHARED_SDK_HF_URL : SHARED_SDK_GITHUB_URL;

// Only v1.0.6.0 has a GitHub release; other versions (DeepSort/YOLO26s need v1.0.6.5)
// come from the dedicated HF SDK repo, since the per-model copies there are truncated.
function sdkUrlForFile(fileName) {
    const name = String(fileName || '');
    if (!isSdkPackageName(name) || name === SHARED_SDK_FILE) return SHARED_SDK_URL;
    return `${HF_MIRROR_BASE}/${SHARED_SDK_HF_REPO_ID}/resolve/main/${encodeURIComponent(name)}`;
}

// Toolkit entries name the SDK "CANN工具" and wrap the real file in an encoded gitee redirect.
function sdkFileNameFrom(value) {
    if (!value) return null;
    let text = String(value);
    try {
        text = decodeURIComponent(text);
    } catch (_) {
        // keep the raw text when it is not valid percent-encoding
    }
    const match = text.match(/SVP_NNN_PC_V[\d.]+\.tgz/i);
    return match ? match[0] : null;
}
const HUAWEICLOUD_HOST_RE = /(?:^|\.)myhuaweicloud\.com$/i;
const HF_UPLOAD_SKIPS = new Set([]); // all models now have HF mirrors
const MANUAL_REPO_OVERRIDES = new Map([
    ['Pi0', {
        repoId: 'shadow-cann/pi0',
        useMirrorForRemoteDownloads: true,
        preferRepoUrlForDownloads: false,
        downloadTargetUrl: null,
    }],
    ['MiniCPM-4v-0.5B', {
        repoId: 'shadow-cann/minicpm-v-0.5B',
        useMirrorForRemoteDownloads: true,
        preferRepoUrlForDownloads: true,
        // Upstream publishes one 958 MB "OM 文件 2.zip"; the mirror holds its unpacked
        // contents (names, sizes and CRCs checked against the zip's central directory),
        // so the row opens the directory and says so instead of promising a zip.
        downloadTargetUrl: 'https://hf-mirror.com/shadow-cann/minicpm-v-0.5B/tree/main',
        downloadNote: '镜像为解包后的目录，内容已逐文件校验',
        // Upstream's licence field holds that same zip URL (signed, expires); the
        // licence PDF inside it is mirrored as a file, so 许可证 points at the PDF.
        licenseUrl: 'https://hf-mirror.com/shadow-cann/minicpm-v-0.5B/resolve/main/'
            + encodeRepoFile('MiniCPM-V 0.5B 模型开源发布授权协议-面壁智能&海思（HiSpark）.pdf'),
    }],
]);

// Upstream re-publishes a model under a new id (YOLO26s ku5ckc88j400 -> kuhsoe9kts00 on
// 2026-09-16) and the old id dies with it, but links people saved keep the old id.
// daily-sync records every such hand-over in id-aliases.json; the detail page resolves
// through the map emitted here. Chains (a -> b -> c) collapse to the current id.
const ID_ALIASES_PATH = path.join(ROOT, 'id-aliases.json');

function loadIdAliases(currentIds) {
    if (!fs.existsSync(ID_ALIASES_PATH)) return {};
    const raw = JSON.parse(fs.readFileSync(ID_ALIASES_PATH, 'utf8'));
    const resolved = {};
    for (const oldId of Object.keys(raw)) {
        let target = raw[oldId];
        const seen = new Set([oldId]);
        while (raw[target] && !currentIds.has(target) && !seen.has(target)) {
            seen.add(target);
            target = raw[target];
        }
        if (currentIds.has(target) && target !== oldId) resolved[oldId] = target;
    }
    return resolved;
}
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

// Gitee does not redirect between its two view modes: a file addressed with /tree/ and a
// directory addressed with /blob/ both answer 404 (GitHub and GitCode forgive this).
// Upstream publishes several such links (e.g. .../tree/master/.../README.md), so choose the
// mode from the target's last segment. Links whose mode is already right are left untouched
// (trailing slash included) so the site stays byte-identical to upstream wherever upstream works.
// Repo files that carry no extension but are files all the same (upstream's per-variant
// licence links end in /LICENSE); without this they would be sent to /tree/ and 404.
const EXTENSIONLESS_FILE_NAMES = new Set([
    'LICENSE', 'LICENCE', 'COPYING', 'NOTICE', 'README', 'CHANGELOG', 'AUTHORS',
    'CONTRIBUTING', 'Makefile', 'Dockerfile', 'VERSION',
]);

function normalizeGiteeUrl(url) {
    if (!url || typeof url !== 'string') return url;
    let parsed;
    try {
        parsed = new URL(url);
    } catch (error) {
        return url;
    }
    if (parsed.hostname !== 'gitee.com') return url;
    const match = parsed.pathname.match(/^(\/[^/]+\/[^/]+\/)(tree|blob)(\/[^/]+\/)(.+?)\/?$/);
    if (!match) return url;
    const [, repoPath, mode, refPath, target] = match;
    const lastSegment = decodeURIComponent(target.split('/').pop());
    const looksLikeFile = /\.[A-Za-z0-9]{1,8}$/.test(lastSegment) || EXTENSIONLESS_FILE_NAMES.has(lastSegment);
    const wanted = looksLikeFile ? 'blob' : 'tree';
    if (wanted === mode) return url;
    parsed.pathname = `${repoPath}${wanted}${refPath}${target}`;
    return parsed.toString();
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

// Upstream toolkit rows (SDK, CANN package, 编译工具链/库) reach us either tagged
// `toolkit` by a fresh scrape or `api-all` from older hand-merged captures. The name
// set is the marker for captures without the tag: both keep toolkit rows out of the
// download table, since buildToolchains renders them as upstream's 工具链下载 section.
const TOOLKIT_ROW_NAMES = new Set(['SDK', 'CANN工具', 'CANN工具包', 'CANN配置', '编译工具链', '编译工具库']);

function isToolkitRowName(name) {
    return TOOLKIT_ROW_NAMES.has(String(name || '').trim());
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
    if (source === 'mirror-extra') return '镜像补充';
    return source;
}

function normalizeArtifactName(value) {
    const name = String(value || '').trim();
    return name ? path.basename(name).toLowerCase() : '';
}

function normalizeQuantization(value) {
    return String(value || '').trim().toUpperCase();
}

function normalizePerformance(items) {
    return (items || [])
        .filter((item) => item && item.performanceValue != null && item.unit)
        .map((item) => ({
            value: String(item.performanceValue).trim(),
            unit: String(item.unit).trim(),
            desc: item.desc == null ? '' : String(item.desc).trim(),
        }))
        .filter((item) => item.value && item.unit);
}

function isCompiledDownload(item) {
    return item.group === '编译模型'
        || /^om-/i.test(item.source || '')
        || item.source === 'omOfflineModel'
        || /\.om$/i.test(item.title || item.localFile || '');
}

function buildCompiledModelMetadata(detail) {
    const metadata = [];

    for (const adaptor of detail.modelAdaptor || []) {
        for (const variant of adaptor.supportQuantify || []) {
            const engine = String(variant.computingName || adaptor.name || '').trim();
            const quantization = normalizeQuantization(variant.name);
            const files = variant.omOfflineModel || [];
            const fileEntries = files.length
                ? files.map((file) => ({
                    names: unique([
                        file.name,
                        // Older captures sometimes omit the per-file name. Only
                        // fall back to the variant name when no file name exists;
                        // do not alias a stale generic name to a republished file.
                        !file.name && files.length === 1 ? variant.omOfflineModelName : null,
                    ]).map(normalizeArtifactName),
                    fileIds: unique([
                        file.id,
                        files.length === 1 ? variant.omOfflineModelId : null,
                    ]).map(String),
                    size: Number(file.size) || 0,
                }))
                : [{
                    names: unique([variant.omOfflineModelName]).map(normalizeArtifactName),
                    fileIds: unique([variant.omOfflineModelId]).map(String),
                    size: 0,
                }];

            for (const [index, file] of fileEntries.entries()) {
                if (engine || quantization || file.names.length || file.fileIds.length) {
                    const legacyName = files.length === 1 ? normalizeArtifactName(variant.omOfflineModelName) : '';
                    const fileName = normalizeArtifactName(file.names[0]);
                    metadata.push({
                        engine,
                        quantization,
                        // Keep the legacy variant name only when it is the same
                        // artifact. Newly republished models may use a descriptive
                        // filename while the old `omOfflineModelName` remains stale;
                        // aliasing those names would point a new row at an old mirror.
                        names: unique([
                            ...file.names,
                            legacyName && legacyName === fileName ? legacyName : null,
                        ]).filter(Boolean),
                        fileIds: file.fileIds,
                        size: file.size,
                        performance: normalizePerformance(variant.modelPerformance),
                        key: String(file.fileIds[0] || file.names[0] || `${adaptor.id || adaptor.name}:${variant.id || variant.name}:${index}`),
                    });
                }
            }
        }
    }

    return metadata;
}

function buildModelPerformance(detail) {
    return (detail.modelAdaptor || []).flatMap((adaptor) => (
        (adaptor.supportQuantify || []).map((variant) => ({
            engine: String(variant.computingName || adaptor.name || '').trim(),
            quantization: normalizeQuantization(variant.name),
            metrics: normalizePerformance(variant.modelPerformance),
        }))
    )).filter((entry) => entry.engine || entry.quantization || entry.metrics.length);
}

function downloadFileIds(item) {
    const ids = new Set((item.lookupFileIds || []).map(String));
    if (item.fileId) ids.add(String(item.fileId));
    if (!item.url) return ids;

    try {
        for (const segment of new URL(item.url).pathname.split('/')) {
            if (/^\d{10,}$/.test(segment)) ids.add(segment);
        }
    } catch (_) {
        // A malformed URL can still be matched by its filename below.
    }
    return ids;
}

function inferQuantization(item, title, metadata) {
    const direct = normalizeQuantization(item.quantization || item.quantify);
    if (direct) return direct;

    const sourceMatch = String(item.source || '').match(/^om-(?!auto$)(.+)$/i);
    if (sourceMatch) return normalizeQuantization(sourceMatch[1]);

    const upperTitle = String(title || '').toUpperCase();
    const knownVariants = unique(metadata.map((entry) => entry.quantization))
        .sort((left, right) => right.length - left.length);
    return knownVariants.find((variant) => upperTitle.includes(variant)) || '';
}

function hasMultipleCompiledVariants(title, metadata) {
    const name = normalizeArtifactName(title);
    if (!name) return false;
    const variants = metadata
        .filter((entry) => entry.names.includes(name))
        .map((entry) => `${entry.engine}|${entry.quantization}`);
    return unique(variants).length > 1;
}

function enrichDownloadMetadata(item, metadata, modelEngines) {
    const { lookupFileIds, ...cleanItem } = item;
    if (!isCompiledDownload(item)) return cleanItem;

    const title = item.title || item.localFile || '';
    const quantization = inferQuantization(item, title, metadata);
    const ids = downloadFileIds(item);
    const normalizedTitle = normalizeArtifactName(title);
    let candidates = [];

    if (ids.size) {
        candidates = metadata.filter((entry) => entry.fileIds.some((id) => ids.has(id)));
    }
    if (!candidates.length && normalizedTitle) {
        candidates = metadata.filter((entry) => entry.names.includes(normalizedTitle));
    }
    if (!candidates.length && modelEngines.length === 1) {
        // Some upstream variants expose an OM download link but no individual
        // file record. When the model has exactly one engine, its performance
        // metadata can still be safely applied to mirror-provided OM parts.
        const metadataWithoutArtifact = metadata.filter((entry) => (
            !entry.names.length && !entry.fileIds.length
        ));
        if (metadataWithoutArtifact.length === 1) candidates = metadataWithoutArtifact;
    }
    const matchedArtifact = candidates.length > 0;
    let metadataConflict = false;
    if (quantization) {
        const matchingVariant = candidates.filter((entry) => entry.quantization === quantization);
        if (matchingVariant.length) {
            candidates = matchingVariant;
        } else if (!matchedArtifact) {
            candidates = metadata.filter((entry) => entry.quantization === quantization);
        } else {
            // A filename/file-ID match that disagrees with the requested variant is
            // conflicting upstream data. Do not reassign it to an unrelated file.
            candidates = [];
            metadataConflict = true;
        }
    }

    let engine = String(item.engine || item.computing || '').trim();
    const candidateEngines = unique(candidates.map((entry) => entry.engine));
    const candidateVariants = unique(candidates.map((entry) => entry.quantization));
    if (!engine && candidateEngines.length === 1) engine = candidateEngines[0];
    if (!engine && modelEngines.length === 1) engine = modelEngines[0];

    const resolvedQuantization = quantization || (candidateVariants.length === 1 ? candidateVariants[0] : '');
    const candidatePerformance = candidates.length === 1 ? candidates[0].performance : [];
    return {
        ...cleanItem,
        engine,
        quantization: resolvedQuantization,
        note: resolvedQuantization || item.note || '',
        performance: item.performance || candidatePerformance,
        _artifactKey: matchedArtifact && candidates.length === 1 ? candidates[0].key : '',
        _metadataConflict: metadataConflict,
    };
}

function downloadIdentityTokens(item) {
    return unique([
        normalizeArtifactName(item.title),
        normalizeArtifactName(item.localFile),
        item.href || '',
    ]);
}

function finalizeDownloads(downloads, detail, modelEngines, mirror = null) {
    const metadata = buildCompiledModelMetadata(detail);
    const enriched = downloads.map((item) => {
        const row = enrichDownloadMetadata(item, metadata, modelEngines);
        // Rows captured before sizes were recorded identify their artifact only through
        // engine/variant metadata; check the linked file against that artifact's size.
        if (mirror && row._artifactKey && isCompiledDownload(row) && row.href && row.href.startsWith(mirror.repoInfo.resolveBase)) {
            const entry = metadata.find((candidate) => candidate.key === row._artifactKey);
            const servedEntry = entry && entry.fileIds.map((id) => mirror.served.get(id)).find(Boolean);
            const expectedSize = servedEntry ? servedEntry.size : ((entry && entry.size) || 0);
            if (expectedSize && mirror.repoSizes.get(row.localFile) !== expectedSize) {
                const verified = resolveVerifiedRepoFile([row.title, row.localFile], expectedSize, mirror.repoFiles, mirror.repoSizes);
                if (verified) {
                    row.localFile = verified;
                    row.href = `${mirror.repoInfo.resolveBase}/${encodeRepoFile(verified)}`;
                } else {
                    reportLinkIssue(mirror.modelName, row.title, expectedSize,
                        `linked ${row.localFile} is ${mirror.repoSizes.get(row.localFile) ?? 'unknown'} bytes`);
                    row.href = null;
                    row.available = false;
                    row.localFile = null;
                }
            }
        }
        return row;
    });
    const describedArtifacts = new Set();

    for (const item of enriched) {
        if (isCompiledDownload(item) && item.engine && !item._metadataConflict) {
            downloadIdentityTokens(item).forEach((token) => describedArtifacts.add(token));
        }
    }

    const filtered = enriched.filter((item) => {
        if (item._metadataConflict) return false;
        // A mirror-only OM without any engine mapping cannot be presented as a
        // trustworthy compiled-model download. It remains reachable via the repo.
        if (item.source === 'mirror-extra' && isCompiledDownload(item) && !item.engine) return false;
        if (!/^om-/i.test(item.source || '') || item.engine) return true;
        return !downloadIdentityTokens(item).some((token) => describedArtifacts.has(token));
    });
    const deduped = [];
    const seen = new Map();

    for (const item of filtered) {
        const compiled = isCompiledDownload(item);
        const key = compiled
            ? `${item.group}|${item._artifactKey || normalizeArtifactName(item.title)}|${item.engine || ''}|${item.quantization || ''}`
            : `${item.group}|${item.title}|${item.href || ''}`;
        const existing = seen.get(key);

        if (existing) {
            if (item.note && !String(existing.note || '').split(' / ').includes(item.note)) {
                existing.note = existing.note ? `${existing.note} / ${item.note}` : item.note;
            }
            if (!existing.available && item.available) {
                existing.href = item.href;
                existing.available = true;
                existing.localFile = item.localFile;
            }
            if (existing.source === 'om-auto' && item.source === 'omOfflineModel') {
                existing.source = item.source;
                existing.sourceLabel = item.sourceLabel;
            }
            continue;
        }

        seen.set(key, item);
        deduped.push(item);
    }

    return deduped.map(({ _artifactKey, _metadataConflict, expectedSize, ...item }) => item);
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

function isHuaweiCloudUrl(value) {
    if (!value || !/^https?:\/\//i.test(value)) return false;
    try {
        const host = new URL(value).hostname;
        return HUAWEICLOUD_HOST_RE.test(host) || host.includes('huaweicloud');
    } catch (error) {
        return /huaweicloud/i.test(String(value));
    }
}

function unwrapRedirectTarget(value) {
    if (!value) return value;
    try {
        const parsed = new URL(value);
        const target = parsed.searchParams.get('target');
        if (target) return decodeURIComponent(target);
    } catch (error) {
        // ignore
    }
    return value;
}

function isSdkPackageName(name) {
    return /^SVP_NNN_PC_V[\d.]+\.tgz$/i.test(String(name || ''));
}

function isSdkPackageUrl(value) {
    const raw = unwrapRedirectTarget(value || '');
    if (!raw) return false;
    const fileName = fileNameFromUrl(raw);
    return isSdkPackageName(fileName) || /SVP_NNN_PC_V/i.test(raw);
}

function findLocalImage(coverImageId, imageFiles) {
    if (!coverImageId) return null;
    const id = String(coverImageId);
    const prefix = `${id}_`;
    const match = imageFiles.find(file => file.startsWith(prefix) || file.startsWith(`${id}.`));
    return match ? encodeLocalFile(match, 'assets/images') : null;
}

function loadFetchManifest() {
    if (!fs.existsSync(FETCH_MANIFEST)) return new Map();
    try {
        const data = readJson(FETCH_MANIFEST);
        return new Map((data.models || []).map((item) => [item.name, item]));
    } catch (error) {
        console.warn(`Failed to load fetch manifest: ${error.message}`);
        return new Map();
    }
}

function listModelRealFiles(slug) {
    if (!slug) return [];
    const dir = path.join(MODELS_REAL_DIR, slug);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter((file) => {
        if (file.startsWith('.')) return false;
        // Scraper sidecars recording served-vs-declared sizes are not artifacts.
        if (file.endsWith('.served.json')) return false;
        const fullPath = path.join(dir, file);
        return fs.statSync(fullPath).isFile();
    });
}

// hf-repo-files.json entries are either bare names (older listings) or {name, size}
// objects; the size is what lets a row be linked only to a byte-exact mirror file.
function loadHfRepoFiles() {
    try {
        const raw = JSON.parse(fs.readFileSync(HF_REPO_FILES, 'utf8'));
        const files = new Map();
        const sizes = new Map();
        for (const [repoId, entries] of Object.entries(raw)) {
            if (!Array.isArray(entries)) continue;
            const names = [];
            const sizeMap = new Map();
            for (const entry of entries) {
                const name = typeof entry === 'string' ? entry : entry && entry.name;
                if (!name) continue;
                names.push(name);
                if (entry && typeof entry === 'object' && Number.isFinite(entry.size)) sizeMap.set(name, entry.size);
            }
            files.set(repoId, names);
            sizes.set(repoId, sizeMap);
        }
        return { files, sizes };
    } catch (_) {
        return { files: new Map(), sizes: new Map() };
    }
}

function isDeadExternalUrl(url) {
    if (!url || !/^https?:\/\//.test(url)) return false;
    try {
        return DEAD_EXTERNAL_HOSTS.has(new URL(url).hostname);
    } catch (_) {
        return false;
    }
}

// A .om request must never resolve to .onnx/.pt/.zip: the link would download a
// different artifact than its label promises, which is worse than showing nothing.
const ARTIFACT_EXTENSIONS = new Set(['.om', '.onnx', '.pt', '.pth', '.zip', '.bin', '.safetensors', '.tgz', '.7z']);

function resolveLocalModelFile(name, modelFiles) {
    if (!name) return null;
    if (modelFiles.includes(name)) return name;

    const ext = path.extname(name).toLowerCase();
    const stem = path.basename(name, ext).toLowerCase();
    let candidates = modelFiles.filter(file => {
        const fileExt = path.extname(file).toLowerCase();
        const fileStem = path.basename(file, fileExt).toLowerCase();
        return fileStem === stem ||
            fileStem.startsWith(`${stem}_`) ||
            fileStem.includes(`${stem}_om-`) ||
            fileStem.includes(`${stem}_source-model`) ||
            fileStem.includes(`${stem}-source-model`);
    });

    if (ARTIFACT_EXTENSIONS.has(ext)) {
        candidates = candidates.filter((file) => path.extname(file).toLowerCase() === ext);
    }

    if (candidates.length === 1) return candidates[0];

    // Prefer exact extension matches when multiple fuzzy candidates exist.
    if (ext) {
        const sameExt = candidates.filter((file) => path.extname(file).toLowerCase() === ext);
        if (sameExt.length === 1) return sameExt[0];
    }
    return null;
}

function resolveRepoFileName(title, url, repoFiles) {
    const candidates = unique([
        title,
        fileNameFromUrl(url),
        fileNameFromUrl(unwrapRedirectTarget(url)),
    ].filter(Boolean));

    for (const candidate of candidates) {
        if (repoFiles.includes(candidate)) return candidate;
        if (path.extname(candidate).toLowerCase() === '.om') continue;
        const resolved = resolveLocalModelFile(candidate, repoFiles);
        if (resolved) return resolved;
    }

    // Case-insensitive exact match fallback.
    for (const candidate of candidates) {
        const lower = candidate.toLowerCase();
        const hit = repoFiles.find((file) => file.toLowerCase() === lower);
        if (hit) return hit;
    }

    return null;
}

function makeRepoInfoFromId(repoId, options = {}) {
    return {
        repoId,
        repoUrl: `${HF_MIRROR_BASE}/${repoId}`,
        readmeUrl: `${HF_MIRROR_BASE}/${repoId}/blob/main/README.md`,
        resolveBase: `${HF_MIRROR_BASE}/${repoId}/resolve/main`,
        useMirrorForRemoteDownloads: Boolean(options.useMirrorForRemoteDownloads),
        preferRepoUrlForDownloads: Boolean(options.preferRepoUrlForDownloads),
        downloadTargetUrl: options.downloadTargetUrl || null,
        downloadNote: options.downloadNote || '',
        licenseUrl: options.licenseUrl || null,
        slug: options.slug || null,
        repoFiles: options.repoFiles || [],
    };
}

function buildRepoInfo(model, manifestEntry, repoFiles) {
    const manualOverride = MANUAL_REPO_OVERRIDES.get(model.name);
    if (manualOverride) {
        return makeRepoInfoFromId(manualOverride.repoId, {
            ...manualOverride,
            slug: manifestEntry?.slug || slugify(model.name),
            repoFiles,
        });
    }

    if (HF_UPLOAD_SKIPS.has(model.name)) return null;

    if (manifestEntry?.repo_id) {
        return makeRepoInfoFromId(manifestEntry.repo_id, {
            slug: manifestEntry.slug || slugify(model.name),
            repoFiles,
            useMirrorForRemoteDownloads: true,
        });
    }

    // Always expose the conventional HF mirror even without a local snapshot.
    const repoName = `${HF_REPO_PREFIX}${slugify(model.name)}`;
    const repoId = `${HF_NAMESPACE}/${repoName}`;
    return makeRepoInfoFromId(repoId, {
        slug: slugify(model.name),
        repoFiles,
        useMirrorForRemoteDownloads: true,
    });
}

function rewriteExternalUrl(url, repoInfo) {
    if (!url) return null;
    const unwrapped = unwrapRedirectTarget(url);

    if (isSdkPackageUrl(unwrapped) || isSdkPackageUrl(url)) {
        return sdkUrlForFile(sdkFileNameFrom(unwrapped) || sdkFileNameFrom(url));
    }

    if (isHuaweiCloudUrl(unwrapped) || isHuaweiCloudUrl(url)) {
        const fileName = fileNameFromUrl(unwrapped) || fileNameFromUrl(url);
        if (isSdkPackageName(fileName)) return SHARED_SDK_URL;
        if (repoInfo && fileName) {
            const resolved = resolveRepoFileName(fileName, unwrapped, repoInfo.repoFiles || []);
            if (resolved) return `${repoInfo.resolveBase}/${encodeRepoFile(resolved)}`;
            // Last resort: point at the HF tree rather than a Huawei OBS signed URL.
            return repoInfo.repoUrl;
        }
        return null;
    }

    return unwrapped;
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

function buildOriginModels(detail, repoFiles, repoInfo, repoSizes = new Map(), modelName = '', served = new Map()) {
    return (detail.originModel || []).map((item) => {
        let localFile = resolveRepoFileName(item.name, item.url, repoFiles);
        const servedEntry = item.id != null ? served.get(String(item.id)) : null;
        const expectedSize = servedEntry ? servedEntry.size : (Number(item.size) || 0);
        if (expectedSize && repoInfo) {
            const verified = resolveVerifiedRepoFile([item.name, fileNameFromUrl(item.url), localFile], expectedSize, repoFiles, repoSizes);
            if (!verified) {
                reportLinkIssue(modelName, item.name, expectedSize, localFile
                    ? `mirror has ${localFile} at ${repoSizes.get(localFile) ?? 'unknown'} bytes`
                    : 'no mirror file of that size');
            }
            localFile = verified;
        }
        let href = null;
        if (localFile && repoInfo) {
            href = `${repoInfo.resolveBase}/${encodeRepoFile(localFile)}`;
        } else if (!expectedSize && item.url && /^https?:\/\//.test(item.url)) {
            href = rewriteExternalUrl(item.url, repoInfo);
        }

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

// Byte sizes upstream declares for a model's artifacts, keyed by file id and by name.
// They are the only reliable identity: the portal reuses one filename for different
// engine binaries and replaces file content without renaming it.
function buildSizeIndex(detail) {
    const byFileId = new Map();
    const byName = new Map();
    const add = (file) => {
        if (!file) return;
        const size = Number(file.size) || 0;
        if (!size) return;
        if (file.id != null) byFileId.set(String(file.id), size);
        const name = normalizeArtifactName(file.name);
        if (name) byName.set(name, unique([...(byName.get(name) || []), size]));
    };
    (detail.originModel || []).forEach(add);
    for (const adaptor of detail.modelAdaptor || []) {
        for (const variant of adaptor.supportQuantify || []) {
            (variant.omOfflineModel || []).forEach(add);
        }
    }
    return { byFileId, byName };
}

// Served-size policy: when the portal served a completed file whose length differs from
// its own metadata, the scraper keeps it and records size (served) + declaredSize. The
// served bytes are what a portal user gets, so they are the truth for every row that
// refers to that file id; the discrepancy is reported as a note, never hidden.
const LINK_NOTES = [];

function servedSizeIndex(detailEntry) {
    const served = new Map();
    for (const row of (detailEntry && detailEntry.downloadUrls) || []) {
        const size = Number(row && row.size) || 0;
        const declared = Number(row && row.declaredSize) || 0;
        if (row && row.fileId && size && declared && size !== declared) {
            served.set(String(row.fileId), { size, declared });
        }
    }
    return served;
}

function expectedSizeFor(item, title, sizeIndex, served = new Map()) {
    for (const id of downloadFileIds(item)) {
        if (served.has(id)) return served.get(id).size;
    }
    const direct = Number(item.size) || 0;
    if (direct) return direct;
    for (const id of downloadFileIds(item)) {
        if (sizeIndex.byFileId.has(id)) return sizeIndex.byFileId.get(id);
    }
    const sizes = sizeIndex.byName.get(normalizeArtifactName(title)) || [];
    return sizes.length === 1 ? sizes[0] : 0;
}

// Every mirror file that could plausibly be the artifact `name` refers to: the same
// stem with a variant/source suffix, as the snapshots name sibling variants.
function relatedRepoFiles(name, repoFiles) {
    if (!name) return [];
    const ext = path.extname(name).toLowerCase();
    const stem = path.basename(name, ext).toLowerCase();
    return repoFiles.filter((file) => {
        const fileExt = path.extname(file).toLowerCase();
        const fileStem = path.basename(file, fileExt).toLowerCase();
        if (ARTIFACT_EXTENSIONS.has(ext) && fileExt !== ext) return false;
        return fileStem === stem
            || fileStem.startsWith(`${stem}_`)
            || fileStem.includes(`${stem}_om-`)
            || fileStem.includes(`${stem}_source-model`)
            || fileStem.includes(`${stem}-source-model`);
    });
}

// The mirror file a row may link to when upstream declares its size: a related name
// whose recorded size is byte-exact, or — for names that drifted between the API and the
// download page (depth_anything.om vs depthanything.om) — the only file of that size and
// extension in the repo. Anything else is unverifiable and must not be linked.
function resolveVerifiedRepoFile(names, expectedSize, repoFiles, repoSizes) {
    if (!expectedSize) return null;
    const wanted = unique(names.filter(Boolean));
    const related = unique(wanted.flatMap((name) => [name, ...relatedRepoFiles(name, repoFiles)]));
    const matches = related.filter((file) => repoFiles.includes(file) && repoSizes.get(file) === expectedSize);
    if (matches.length) {
        return matches.find((file) => wanted.includes(file)) || matches.sort()[0];
    }
    const ext = path.extname(wanted[0] || '').toLowerCase();
    const bySize = repoFiles.filter((file) => repoSizes.get(file) === expectedSize && path.extname(file).toLowerCase() === ext);
    return bySize.length === 1 ? bySize[0] : null;
}

// Link problems found while building, reported once at the end so a sync never
// silently ships a row that points at the wrong binary.
const LINK_ISSUES = [];

// Upstream ships a few byte-sized placeholder "files" (CodeFormer's 空文件…om is 3 bytes)
// for non-commercial models; they are not artifacts and are never mirrored, so an
// unlinked row is the correct outcome rather than a problem to report.
const PLACEHOLDER_MAX_BYTES = 1024;

function reportLinkIssue(modelName, title, expectedSize, detail) {
    if (expectedSize && expectedSize < PLACEHOLDER_MAX_BYTES) return;
    LINK_ISSUES.push({ modelName, title, expectedSize, detail });
}

function buildDownloads(detailEntry, repoFiles, repoInfo, repoSizes = new Map()) {
    if (!detailEntry) return [];

    const downloads = [];
    const compiledMetadata = buildCompiledModelMetadata(detailEntry.apiDetail || {});
    const sizeIndex = buildSizeIndex(detailEntry.apiDetail || {});
    const served = servedSizeIndex(detailEntry);
    for (const [fileId, entry] of served) {
        LINK_NOTES.push(`${detailEntry.name}: file ${fileId} is served at ${entry.size} bytes while upstream metadata declares ${entry.declared}; mirror follows the served file`);
    }
    for (const item of detailEntry.downloadUrls || []) {
        const title = item.name || (item.url ? fileNameFromUrl(unwrapRedirectTarget(item.url)) : item.fileId) || '未命名文件';
        // Upstream lists toolkit rows in a separate 工具链下载 section, not in 模型下载;
        // they are rendered from `toolchains` (buildToolchains) so they must not also
        // appear in the download table. The name set covers older hand-merged captures.
        const toolkitRow = isToolkitRowName(item.name);
        if (toolkitRow || item.source === 'toolkit') continue;
        const group = sourceGroup(item.source);
        const expectedSize = expectedSizeFor(item, title, sizeIndex, served);
        // A single unsuffixed filename can describe multiple engine-specific
        // binaries upstream. Only attach that mirror file when a captured URL
        // identifies which binary was actually downloaded, or when upstream's
        // byte size (directly, or via the row's fileId) can single it out below.
        const canResolveCompiledFile = group !== '编译模型'
            || !hasMultipleCompiledVariants(title, compiledMetadata)
            || Boolean(item.url)
            || Boolean(expectedSize);
        let localFile = canResolveCompiledFile
            ? resolveRepoFileName(title, item.url, repoFiles)
            : null;
        if (expectedSize && repoInfo) {
            const verified = resolveVerifiedRepoFile([title, fileNameFromUrl(item.url), localFile], expectedSize, repoFiles, repoSizes);
            if (!verified) {
                reportLinkIssue(detailEntry.name, title, expectedSize, localFile
                    ? `mirror has ${localFile} at ${repoSizes.get(localFile) ?? 'unknown'} bytes`
                    : 'no mirror file of that size');
            }
            localFile = verified;
        }
        let href = null;
        let rowNote = '';

        const sdkName = sdkFileNameFrom(title) || sdkFileNameFrom(item.url);
        if (sdkName || isSdkPackageUrl(item.url)) {
            href = sdkUrlForFile(sdkName);
        } else if (localFile && repoInfo) {
            href = `${repoInfo.resolveBase}/${encodeRepoFile(localFile)}`;
        } else if (expectedSize && repoInfo) {
            // Upstream told us exactly which bytes this row means and the mirror does
            // not hold them: leave it unlinked rather than fall back to a guess.
            href = null;
        } else if (repoInfo && repoInfo.preferRepoUrlForDownloads) {
            href = repoInfo.downloadTargetUrl || repoInfo.repoUrl;
            rowNote = repoInfo.downloadNote || '';
        } else if (item.url && /^https?:\/\//.test(item.url)) {
            href = rewriteExternalUrl(item.url, repoInfo);
        }
        // Do not invent Hugging Face resolve URLs for filenames that were never
        // mirrored locally. That previously advertised 404s (e.g. CrowdCount OMs).

        // Never leave Huawei Cloud signed URLs in the generated site data.
        if (isHuaweiCloudUrl(href)) {
            href = rewriteExternalUrl(href, repoInfo);
        }
        if (isHuaweiCloudUrl(href)) {
            href = repoInfo ? repoInfo.repoUrl : null;
        }
        if (isDeadExternalUrl(href)) {
            href = null;
        }

        downloads.push({
            title,
            href,
            available: Boolean(href),
            source: item.source || 'unknown',
            sourceLabel: sourceLabel(item.source),
            group,
            engine: item.computing || '',
            quantization: normalizeQuantization(item.quantify),
            note: rowNote || normalizeQuantization(item.quantify),
            localFile: localFile || sdkName || (isSdkPackageUrl(item.url) ? SHARED_SDK_FILE : null),
            lookupFileIds: [...downloadFileIds(item)],
            expectedSize,
        });
    }

    return downloads;
}

// Mirrors the toolkit branch of buildDownloads() so moving these rows out of the
// download table changes no link on the site: SDK packages go to the shared package,
// other links keep upstream's target (Huawei Cloud and dead hosts are never emitted).
function toolkitHref(name, url, repoInfo) {
    const sdkName = sdkFileNameFrom(name) || sdkFileNameFrom(url);
    let href = null;
    if (sdkName || isSdkPackageUrl(url)) {
        href = sdkUrlForFile(sdkName);
    } else if (url && /^https?:\/\//.test(url)) {
        href = rewriteExternalUrl(url, repoInfo);
    }
    if (isHuaweiCloudUrl(href)) {
        href = rewriteExternalUrl(href, repoInfo);
    }
    if (isHuaweiCloudUrl(href)) {
        href = repoInfo ? repoInfo.repoUrl : null;
    }
    if (isDeadExternalUrl(href)) {
        href = null;
    }
    return normalizeGiteeUrl(href) || null;
}

// Upstream's 工具链下载 section: one block per platform (modelAdaptor), each row an
// SDK / CANN / 编译工具链 entry. Rows without a URL are kept because their desc carries
// the SDK/CANN version the FAE hands out, which is the only thing upstream shows for
// them. API order, no dedupe across platforms: the same link legitimately repeats.
function buildToolchains(detail, repoInfo) {
    const toolchains = [];
    for (const adaptor of (detail && detail.modelAdaptor) || []) {
        const items = (adaptor.toolkit || []).map((item) => ({
            name: item.name == null ? '' : String(item.name),
            desc: item.desc == null ? '' : String(item.desc),
            icon: item.imgId == null ? '' : String(item.imgId),
            href: toolkitHref(item.name, item.url, repoInfo),
        }));
        if (!items.length) continue;
        toolchains.push({
            platform: adaptor.name,
            quantizations: adaptor.supportNames || [],
            os: adaptor.supportOs || [],
            items,
        });
    }
    return toolchains;
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

// Files published to Hugging Face that upstream's API never listed would otherwise
// be unreachable from the site even though they download fine.
const MIRROR_EXTRA_IGNORED = /^(\.gitattributes|\.DS_Store|README\.md|model-card\.json)$/i;
const MIRROR_EXTRA_IGNORED_EXT = /\.(png|jpe?g|gif|webp|svg)$/i;

// A mirror file upstream never listed can only be shown when its bytes are provably one
// of upstream's artifacts (same size as a declared/served file); older snapshots left
// mislabeled siblings and superseded builds on HF under alias names, and presenting
// those as compiled-model rows would put the wrong binary behind an engine label.
function buildMirrorExtras(repoInfo, hfFiles, existingDownloads, originModels, repoSizes = new Map(), upstreamSizes = new Set()) {
    if (!repoInfo || !hfFiles.length) return [];

    const advertised = new Set();
    const linkedSizes = new Set();
    for (const item of [...existingDownloads, ...originModels]) {
        if (item.localFile) advertised.add(item.localFile);
        if (item.title) advertised.add(item.title);
        if (item.name) advertised.add(item.name);
        if (item.localFile && repoSizes.has(item.localFile)) linkedSizes.add(repoSizes.get(item.localFile));
    }

    return hfFiles
        .filter((file) => (
            !MIRROR_EXTRA_IGNORED.test(file)
            && !MIRROR_EXTRA_IGNORED_EXT.test(file)
            && !/\.served\.json$/i.test(file)
            && !isSdkPackageName(file)
            && !advertised.has(file)
            // byte-identical to an upstream artifact, and not already linked under its real name
            && upstreamSizes.has(repoSizes.get(file))
            && !linkedSizes.has(repoSizes.get(file))
        ))
        .map((file) => ({
            title: file,
            href: `${repoInfo.resolveBase}/${encodeRepoFile(file)}`,
            available: true,
            source: 'mirror-extra',
            sourceLabel: sourceLabel('mirror-extra'),
            group: /\.om$/i.test(file) ? '编译模型' : '源模型',
            note: '',
            localFile: file,
        }));
}

function buildModelRecord(model, detailEntry, imageFiles, manifestByName, hfRepoFiles) {
    const detail = detailEntry?.apiDetail || {};
    const manualData = MANUAL_MODEL_DATA.get(model.name);
    const manifestEntry = manifestByName.get(model.name) || null;
    const slug = manifestEntry?.slug || slugify(model.name);
    // models/ is a local scratch/download area only. It must never seed repoFiles:
    // its unresolved LFS pointer stubs previously turned into advertised 404s.
    const localFiles = listModelRealFiles(slug);
    // Resolve the repo first so the published listing is looked up by real repo id,
    // which manifest entries and manual overrides can change independently of the slug.
    const repoId = buildRepoInfo(model, manifestEntry, localFiles)?.repoId;
    const publishedFiles = hfRepoFiles.files.get(repoId) || [];
    const repoFiles = unique([...publishedFiles, ...localFiles]);
    // Sizes decide which file a row may link to. The local snapshot is what the next
    // upload publishes, so it overrides a stale listing; the post-upload audit checks HF.
    const repoSizes = new Map(hfRepoFiles.sizes.get(repoId) || []);
    for (const file of localFiles) {
        try {
            repoSizes.set(file, fs.statSync(path.join(MODELS_REAL_DIR, slug, file)).size);
        } catch (_) {
            // unreadable snapshot file: keep the listing's size, if any
        }
    }
    const repoInfo = buildRepoInfo(model, manifestEntry, repoFiles);
    const baseDownloads = detailEntry
        ? buildDownloads(detailEntry, repoFiles, repoInfo, repoSizes)
        : buildManualDownloads(model.name, repoInfo);
    const originModels = detailEntry
        ? buildOriginModels(detail, repoFiles, repoInfo, repoSizes, model.name, servedSizeIndex(detailEntry))
        : buildManualOriginModels(model.name, repoInfo);
    const upstreamSizes = new Set([
        ...[...buildSizeIndex(detail).byFileId.values()],
        ...[...servedSizeIndex(detailEntry).values()].map((entry) => entry.size),
    ]);
    baseDownloads.push(...buildMirrorExtras(repoInfo, publishedFiles, baseDownloads, originModels, repoSizes, upstreamSizes));
    const downloads = finalizeDownloads(baseDownloads, detail, unique(model.computingPower),
        repoInfo ? { repoInfo, repoFiles, repoSizes, modelName: model.name, served: servedSizeIndex(detailEntry) } : null);
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

    // Prefer hosted local covers over Huawei OBS image URLs.
    const image = localImage || null;
    const licenseUrl = (repoInfo && repoInfo.licenseUrl) || rewriteExternalUrl(detail.modelLicense || null, repoInfo);

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
        image,
        coverImageUrl: localImage || null,
        framework: unique(model.framework),
        supportOs: unique(model.supportOs),
        computingPower: unique(model.computingPower),
        repositoryUrl: normalizeGiteeUrl(detail.modelRepository || null),
        licenseUrl,
        quickStartUrl: normalizeGiteeUrl(quickStart.url),
        quickStartMarkdownUrl: normalizeGiteeUrl(quickStart.markdownUrl),
        quickStartReadmes: enrichedQuickStartSections,
        detailParams: (detail.detailParams || []).filter(item => item && item.name && item.value),
        performance: buildModelPerformance(detail),
        originModels,
        hfRepoId: repoInfo ? repoInfo.repoId : null,
        hfRepoUrl: repoInfo ? repoInfo.repoUrl : null,
        hfReadmeUrl: repoInfo ? repoInfo.readmeUrl : null,
        primaryDownloadUrl: primaryDownload ? primaryDownload.href : null,
        primaryDownloadLabel: primaryDownload ? primaryDownload.title : null,
        downloads,
        toolchains: buildToolchains(detail, repoInfo),
    };
}

function ensureCoverImages(allModels, manifestByName) {
    if (!fs.existsSync(IMAGES_DIR)) {
        fs.mkdirSync(IMAGES_DIR, { recursive: true });
    }

    let copied = 0;
    let missing = 0;

    for (const model of allModels) {
        const coverImageId = model.coverImageId ? String(model.coverImageId) : '';
        if (!coverImageId) continue;

        const existing = fs.readdirSync(IMAGES_DIR).find((file) => (
            file.startsWith(`${coverImageId}_`) || file.startsWith(`${coverImageId}.`)
        ));
        if (existing) continue;

        const manifestEntry = manifestByName.get(model.name);
        const slug = manifestEntry?.slug || slugify(model.name);
        const realDir = path.join(MODELS_REAL_DIR, slug);
        let sourceFile = null;

        if (fs.existsSync(realDir)) {
            sourceFile = fs.readdirSync(realDir).find((file) => {
                if (!/\.(png|jpe?g|webp|gif)$/i.test(file)) return false;
                return file.startsWith(`${coverImageId}_`) || file.startsWith(`${coverImageId}.`);
            }) || null;
            if (sourceFile) {
                sourceFile = path.join(realDir, sourceFile);
            } else {
                // Fallback: first image in the model real dir.
                const anyImage = fs.readdirSync(realDir).find((file) => /\.(png|jpe?g|webp|gif)$/i.test(file));
                if (anyImage) sourceFile = path.join(realDir, anyImage);
            }
        }

        if (sourceFile && fs.existsSync(sourceFile)) {
            const destName = path.basename(sourceFile).startsWith(coverImageId)
                ? path.basename(sourceFile)
                : `${coverImageId}_${path.basename(sourceFile)}`;
            fs.copyFileSync(sourceFile, path.join(IMAGES_DIR, destName));
            copied += 1;
            continue;
        }

        // Last resort: download from the original cover URL once, then host locally.
        const coverUrl = model.coverImageUrl;
        if (coverUrl && /^https?:\/\//.test(coverUrl)) {
            try {
                const ext = path.extname(fileNameFromUrl(coverUrl)) || '.jpg';
                const destName = `${coverImageId}_cover${ext}`;
                const destPath = path.join(IMAGES_DIR, destName);
                execSync(`curl -fsSL --max-time 60 -o ${JSON.stringify(destPath)} ${JSON.stringify(coverUrl)}`, {
                    cwd: ROOT,
                    stdio: ['ignore', 'ignore', 'pipe'],
                });
                if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
                    copied += 1;
                    continue;
                }
            } catch (error) {
                // fall through to missing count
            }
        }

        missing += 1;
        console.warn(`Missing cover image for ${model.name} (${coverImageId})`);
    }

    return { copied, missing };
}

function main() {
    const allModels = readJson(MODELS_JSON);
    const details = readJson(DETAILS_JSON);
    const manifestByName = loadFetchManifest();
    const coverStats = ensureCoverImages(allModels, manifestByName);
    const imageFiles = fs.existsSync(IMAGES_DIR) ? fs.readdirSync(IMAGES_DIR).filter(file => !file.startsWith('.')) : [];
    const detailByName = new Map(details.map(item => [item.name, item]));
    const hfRepoFiles = loadHfRepoFiles();

    const modelsData = allModels.map(model => buildModelRecord(model, detailByName.get(model.name), imageFiles, manifestByName, hfRepoFiles));
    const modelIdAliases = loadIdAliases(new Set(modelsData.map((entry) => entry.id)));
    const content = `// Generated from api_all_models.json and api_all_details.json\nconst modelsData = ${JSON.stringify(modelsData, null, 4)};\n\n// Old portal ids (upstream re-publishes) -> current ids, from id-aliases.json\nconst modelIdAliases = ${JSON.stringify(modelIdAliases, null, 4)};\n\nif (typeof window !== 'undefined') {\n    window.modelsData = modelsData;\n    window.modelIdAliases = modelIdAliases;\n}\n\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = { modelsData, modelIdAliases };\n}\n`;
    fs.writeFileSync(OUTPUT, content);

    const huaweiCount = (content.match(/huaweicloud/gi) || []).length;
    const availableDownloads = modelsData.reduce((sum, model) => sum + (model.downloads || []).filter((item) => item.available).length, 0);
    const modelsWithHf = modelsData.filter((model) => model.hfRepoId).length;

    console.log(`Generated ${OUTPUT} with ${modelsData.length} models.`);
    console.log(`HF repos linked: ${modelsWithHf}/${modelsData.length}; available downloads: ${availableDownloads}`);
    console.log(`Cover images: copied/downloaded ${coverStats.copied}, still missing ${coverStats.missing}, total local ${imageFiles.length}`);
    console.log(`Huawei Cloud URL occurrences in models.js: ${huaweiCount}`);

    if (LINK_NOTES.length) {
        console.log(`Served-size notes (portal file differs from its metadata): ${LINK_NOTES.length}`);
        LINK_NOTES.forEach((note) => console.log(`  ${note}`));
    }
    if (LINK_ISSUES.length) {
        const byModel = new Map();
        for (const issue of LINK_ISSUES) {
            if (!byModel.has(issue.modelName)) byModel.set(issue.modelName, []);
            byModel.get(issue.modelName).push(issue);
        }
        console.warn(`Unlinked artifacts (upstream size not matched by any mirror file): ${LINK_ISSUES.length} in ${byModel.size} model(s)`);
        for (const [modelName, issues] of byModel) {
            for (const issue of issues) {
                console.warn(`  ${modelName}: ${issue.title} (${issue.expectedSize} bytes) — ${issue.detail}`);
            }
        }
    }

    if (huaweiCount > 0) {
        console.warn('WARNING: Huawei Cloud URLs still present in generated site data.');
        process.exitCode = 1;
    }
}

main();
