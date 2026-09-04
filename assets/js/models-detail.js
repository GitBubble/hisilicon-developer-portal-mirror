const detailPageUrl = new URL(window.location.href);
const detailPageBaseUrl = new URL('./', detailPageUrl);

// Get model name from URL
function getModelNameFromURL() {
    const params = new URLSearchParams(detailPageUrl.search);
    return params.get('name');
}

function getModelIdFromURL() {
    const params = new URLSearchParams(detailPageUrl.search);
    return params.get('id');
}

function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

const i18n = window.siteI18n;

function initDailyQuote() {
    const dateText = document.getElementById('headerDateText');
    const quoteText = document.getElementById('dailyQuoteText');
    const quoteAuthor = document.getElementById('dailyQuoteAuthor');
    if (dateText && i18n) {
        dateText.textContent = i18n.formatCurrentDateLabel();
    }
    if (!quoteText || !quoteAuthor) return;

    const quote = i18n ? i18n.getCurrentQuote() : { text: '', author: '' };
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `- ${quote.author}`;
}

function stabilizeDocumentBase() {
    let base = document.querySelector('base');
    if (!base) {
        base = document.createElement('base');
        document.head.prepend(base);
    }
    base.href = detailPageBaseUrl.href;
}

function getPageViewCount() {
    const counterValue = document.getElementById('busuanzi_value_page_pv');
    return Number(counterValue ? counterValue.textContent || 0 : 0);
}

function buildVirtualCounterUrl(modelId) {
    const currentPath = detailPageUrl.pathname;
    const basePath = currentPath.endsWith('model-detail.html')
        ? currentPath.slice(0, -'model-detail.html'.length)
        : `${currentPath.replace(/\/?$/, '/')}`;
    return `${detailPageUrl.origin}${basePath}model-counter/${encodeURIComponent(modelId || 'unknown')}`;
}

function fetchModelPageCounter(modelId) {
    const virtualUrl = buildVirtualCounterUrl(modelId);
    const callbackName = `BusuanziModelCounter_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

    return new Promise((resolve) => {
        let settled = false;
        const scriptTag = document.createElement('script');

        const cleanup = () => {
            if (scriptTag.parentNode) {
                scriptTag.parentNode.removeChild(scriptTag);
            }
            delete window[callbackName];
            try {
                window.history.replaceState(window.history.state, '', detailPageUrl.href);
            } catch (error) {
                // Ignore restore failures.
            }
        };

        const finish = (count) => {
            if (settled) return;
            settled = true;
            cleanup();
            resolve(Number(count || 0));
        };

        window[callbackName] = (payload) => {
            finish(payload && payload.page_pv ? payload.page_pv : 0);
        };

        scriptTag.async = true;
        scriptTag.defer = true;
        scriptTag.referrerPolicy = 'no-referrer-when-downgrade';
        scriptTag.src = `https://busuanzi.ibruce.info/busuanzi?jsonpCallback=${callbackName}`;
        scriptTag.onerror = () => finish(0);

        try {
            window.history.replaceState(window.history.state, '', virtualUrl);
        } catch (error) {
            finish(0);
            return;
        }

        document.head.appendChild(scriptTag);
        window.setTimeout(() => finish(0), 5000);
    });
}

function renderList(containerId, values, className) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const uniqueValues = [...new Set((values || []).filter(Boolean))];
    container.innerHTML = uniqueValues.map(value => `<span class="${className}">${escapeHtml(i18n ? i18n.translateValue(value) : value)}</span>`).join('');
}

function formatValueList(values) {
    const uniqueValues = [...new Set((values || []).filter(Boolean))];
    if (!uniqueValues.length) return '—';
    return uniqueValues
        .map(value => i18n ? i18n.translateValue(value) : value)
        .join(' / ');
}

function setSectionVisible(sectionId, visible) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.style.display = visible ? '' : 'none';
}

function isUsableResourceUrl(value) {
    const normalized = String(value || '').trim();
    return Boolean(normalized && normalized.toLowerCase() !== 'xxx');
}

function renderBasicInfo(model) {
    const container = document.getElementById('basicInfoTable');
    if (!container) return;

    const description = i18n && i18n.getLanguage() === 'en'
        ? (model.descriptionEn || model.description)
        : (model.descriptionZh || model.description);
    const availableFiles = (model.downloads || []).filter(item => item.available).length;
    const taskValues = [model.category, ...(model.tags || [])];
    const resourceLinks = [
        { url: model.hfRepoUrl, label: i18n ? i18n.t('detail.hfRepo') : 'HF 镜像仓库' },
        { url: model.hfReadmeUrl, label: 'HF README' },
        { url: model.quickStartUrl, label: i18n ? i18n.t('detail.quickStart') : '快速开始' },
        { url: model.repositoryUrl, label: i18n ? i18n.t('detail.repository') : '代码仓库' },
        { url: model.licenseUrl, label: i18n ? i18n.t('detail.license') : '许可证' },
    ].filter(item => isUsableResourceUrl(item.url));
    const resourceLinksMarkup = resourceLinks.length
        ? resourceLinks.map(item => `<a class="resource-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.label)}</a>`).join('')
        : '<span class="muted">—</span>';

    container.innerHTML = `
        <tr class="spec-description-row">
            <th scope="row">${escapeHtml(i18n ? i18n.t('detail.modelDescription') : '模型描述')}</th>
            <td colspan="3"><p id="modelDescription">${escapeHtml(description || '—')}</p></td>
        </tr>
        <tr>
            <th id="modelDateHeader">${escapeHtml(i18n ? i18n.t('detail.updatedDateLabel') : '发布时间')}</th>
            <td id="modelDate" headers="modelDateHeader">${escapeHtml(model.date || '—')}</td>
            <th id="modelUpdatedAtHeader">${escapeHtml(i18n ? i18n.t('detail.lastUpdatedLabel') : '最近更新')}</th>
            <td id="modelUpdatedAt" headers="modelUpdatedAtHeader">${escapeHtml(model.updatedAt || model.date || '—')}</td>
        </tr>
        <tr>
            <th id="modelCategoryHeader">${escapeHtml(i18n ? i18n.t('detail.taskTypeLabel') : '任务类型')}</th>
            <td id="modelCategory" headers="modelCategoryHeader">${escapeHtml(formatValueList(taskValues))}</td>
            <th id="modelCountHeader">${escapeHtml(i18n ? i18n.t('detail.availableFilesLabel') : '可用文件')}</th>
            <td id="modelCount" headers="modelCountHeader">${escapeHtml(i18n ? i18n.formatAvailableFilesCount(availableFiles) : `${availableFiles} 个可用文件`)}</td>
        </tr>
        <tr>
            <th id="frameworkTagsHeader">${escapeHtml(i18n ? i18n.t('detail.frameworkLabel') : '框架')}</th>
            <td id="frameworkTags" headers="frameworkTagsHeader">${escapeHtml(formatValueList(model.framework))}</td>
            <th id="osTagsHeader">${escapeHtml(i18n ? i18n.t('detail.osLabel') : '操作系统')}</th>
            <td id="osTags" headers="osTagsHeader">${escapeHtml(formatValueList(model.supportOs))}</td>
        </tr>
        <tr>
            <th scope="row">${escapeHtml(i18n ? i18n.t('detail.computeLabel') : '算力引擎')}</th>
            <td id="computeTags" colspan="3">${escapeHtml(formatValueList(model.computingPower))}</td>
        </tr>
        <tr>
            <th scope="row">${escapeHtml(i18n ? i18n.t('detail.hfRepoLabel') : 'HF Repo')}</th>
            <td colspan="3"><code id="modelRepoId" class="repo-id">${escapeHtml(model.hfRepoId || (i18n ? i18n.translateValue('未上传') : '未上传'))}</code></td>
        </tr>
        <tr>
            <th scope="row">${escapeHtml(i18n ? i18n.t('detail.resourcesLabel') : '相关资源')}</th>
            <td colspan="3">
                <div class="resource-links">
                    ${resourceLinksMarkup}
                </div>
            </td>
        </tr>
        <tr>
            <th scope="row">${escapeHtml(i18n ? i18n.t('detail.pageViewsLabel') : '页面浏览')}</th>
            <td colspan="3"><span id="modelPageCounter">${escapeHtml(i18n ? i18n.formatPageViews(0) : '已浏览 0 次')}</span></td>
        </tr>
    `;
}

function renderDetailParams(items) {
    const container = document.getElementById('detailParamsList');
    if (!container) return;

    if (!(items || []).length) {
        container.innerHTML = '';
        setSectionVisible('detailParamsSection', false);
        return;
    }

    container.innerHTML = items.map((item) => `
        <tr>
            <th scope="row">${escapeHtml(i18n ? i18n.translateValue(item.name) : item.name)}</th>
            <td>${escapeHtml(item.value || '—')}</td>
        </tr>
    `).join('');
    setSectionVisible('detailParamsSection', true);
}

function renderOriginModels(items) {
    const container = document.getElementById('originModelsTable');
    if (!container) return;

    if (!(items || []).length) {
        container.innerHTML = '';
        setSectionVisible('originModelsSection', false);
        return;
    }

    const fileLabel = i18n ? i18n.t('detail.modelFile') : '模型文件';
    const sizeLabel = i18n ? i18n.t('detail.size') : '大小';
    const linkLabel = i18n ? i18n.t('detail.link') : '链接';

    container.innerHTML = `
        <div class="table-frame table-scroll">
        <table class="data-table origin-table" aria-labelledby="originModelsHeading">
            <thead>
                <tr>
                    <th scope="col">${escapeHtml(fileLabel)}</th>
                    <th scope="col">${escapeHtml(sizeLabel)}</th>
                    <th scope="col">${escapeHtml(linkLabel)}</th>
                </tr>
            </thead>
            <tbody>
                ${items.map((item) => `
                    <tr>
                        <td class="origin-file"><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(fileLabel)}</span>${escapeHtml(item.name || '—')}</td>
                        <td class="origin-size"><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(sizeLabel)}</span>${escapeHtml(item.size || '—')}</td>
                        <td class="origin-action"><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(linkLabel)}</span>
                            ${item.available
                                ? `<a href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">${escapeHtml(i18n ? i18n.translateValue(item.localFile ? 'HF Mirror' : '原始链接') : (item.localFile ? 'HF Mirror' : '原始链接'))}</a>`
                                : `<span class="muted">${escapeHtml(i18n ? i18n.t('common.unavailable') : '暂无链接')}</span>`}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        </div>
    `;

    setSectionVisible('originModelsSection', true);
}

function renderReadmes(items, links) {
    const container = document.getElementById('readmeSections');
    const linksContainer = document.getElementById('readmeLinks');
    if (!container || !linksContainer) {
        return {
            originalQuickStartUrl: '',
            hfReadmeUrl: '',
        };
    }

    const readmeItems = (items || []).filter(item => String(item && item.content || '').trim());
    const quickStartUrl = isUsableResourceUrl(links.quickStartUrl) ? links.quickStartUrl : '';
    const quickStartMarkdownUrl = isUsableResourceUrl(links.quickStartMarkdownUrl) ? links.quickStartMarkdownUrl : '';
    const hfReadmeUrl = isUsableResourceUrl(links.hfReadmeUrl) ? links.hfReadmeUrl : '';

    const availableLinks = [
        quickStartUrl ? `<a class="resource-link" href="${escapeHtml(quickStartUrl)}" target="_blank" rel="noreferrer">${escapeHtml(i18n ? i18n.translateValue('快速开始原始链接') : '快速开始原始链接')}</a>` : '',
        quickStartMarkdownUrl ? `<a class="resource-link" href="${escapeHtml(quickStartMarkdownUrl)}" target="_blank" rel="noreferrer">${escapeHtml(i18n ? i18n.translateValue('Markdown 文档') : 'Markdown 文档')}</a>` : '',
        hfReadmeUrl ? `<a class="resource-link" href="${escapeHtml(hfReadmeUrl)}" target="_blank" rel="noreferrer">HF README</a>` : ''
    ].filter(Boolean);

    linksContainer.innerHTML = availableLinks.join('');

    if (!readmeItems.length) {
        container.innerHTML = `<div class="table-empty">${escapeHtml(i18n ? i18n.t('detail.noReadme') : '暂无 README / 快速开始内容')}</div>`;
        setSectionVisible('readmeSection', availableLinks.length > 0);
        return {
            originalQuickStartUrl: quickStartUrl || quickStartMarkdownUrl,
            hfReadmeUrl,
        };
    }

    container.innerHTML = readmeItems.map((item) => `
        <div class="readme-block">
            <div class="readme-label">${escapeHtml(item.language || (i18n ? i18n.t('detail.textLabel') : 'Text'))}</div>
            ${item.summaryEn && i18n && i18n.getLanguage() === 'en'
                ? `<p class="readme-summary">${escapeHtml(item.summaryEn)}</p>`
                : ''}
            <pre class="readme-pre">${escapeHtml(item.content || '')}</pre>
        </div>
    `).join('');
    setSectionVisible('readmeSection', true);
    return {
        originalQuickStartUrl: quickStartUrl || quickStartMarkdownUrl,
        hfReadmeUrl,
    };
}

function setQuickStartLabel(link, translationKey, fallbackText) {
    link.dataset.i18n = translationKey;
    link.textContent = i18n ? i18n.t(translationKey) : fallbackText;
}

function configureQuickStartAction(readmeState) {
    const quickStartLink = document.getElementById('quickStartLink');
    if (!quickStartLink) return;

    quickStartLink.hidden = false;
    quickStartLink.removeAttribute('target');
    quickStartLink.removeAttribute('rel');

    const externalUrl = readmeState.originalQuickStartUrl || readmeState.hfReadmeUrl;
    if (!externalUrl) {
        quickStartLink.hidden = true;
        quickStartLink.removeAttribute('href');
        return;
    }

    quickStartLink.href = externalUrl;
    quickStartLink.target = '_blank';
    quickStartLink.rel = 'noreferrer';
    if (readmeState.originalQuickStartUrl) {
        setQuickStartLabel(quickStartLink, 'detail.quickStart', '快速开始');
    } else {
        setQuickStartLabel(quickStartLink, 'detail.viewHfReadme', '查看 HF README');
    }
}

function syncReadmeHashTarget(targetHash = window.location.hash) {
    if (targetHash !== '#readmeQuickStartHeading') return;

    const section = document.getElementById('readmeSection');
    const heading = document.getElementById('readmeQuickStartHeading');
    if (!section || !heading || section.style.display === 'none') return;

    window.requestAnimationFrame(() => {
        heading.scrollIntoView({ block: 'start' });
        heading.focus({ preventScroll: true });
    });
}

function groupDownloads(downloads) {
    const grouped = new Map();
    for (const item of downloads || []) {
        const group = item.group || (i18n ? i18n.t('detail.otherFiles') : '其他文件');
        if (!grouped.has(group)) grouped.set(group, []);
        grouped.get(group).push(item);
    }
    return [...grouped.entries()];
}

function renderDownloads(downloads) {
    const container = document.getElementById('downloadSections');
    if (!container) return;

    const groups = groupDownloads(downloads);
    if (!groups.length) {
        container.innerHTML = `<div class="table-empty">${escapeHtml(i18n ? i18n.t('detail.noDownloads') : '暂无下载文件')}</div>`;
        return;
    }

    const labels = {
        file: i18n ? i18n.t('detail.modelFile') : '模型文件',
        engine: i18n ? i18n.t('detail.computeLabel') : '算力引擎',
        note: i18n ? i18n.t('detail.fileNote') : '规格',
        source: i18n ? i18n.t('detail.fileSource') : '来源',
        action: i18n ? i18n.t('detail.action') : '操作'
    };

    const bodies = groups.map(([group, items]) => `
        <tbody>
            ${items.map((item, index) => {
                const engine = item.engine || (item.group === '编译模型'
                    ? (i18n ? i18n.t('detail.engineUnknown') : '未标注')
                    : '—');
                return `
                    <tr class="${item.available ? '' : 'is-unavailable'}">
                        ${index === 0 ? `<th class="download-group-cell" scope="rowgroup" rowspan="${items.length}">${escapeHtml(i18n ? i18n.translateValue(group) : group)}</th>` : ''}
                        <td class="download-file"><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(labels.file)}</span>${escapeHtml(item.title || '—')}</td>
                        <td class="download-engine" data-empty="${engine === '—'}"><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(labels.engine)}</span>${escapeHtml(engine)}</td>
                        <td class="download-spec"><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(labels.note)}</span>${escapeHtml(item.quantization || item.note || '—')}</td>
                        <td class="download-source"><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(labels.source)}</span>${escapeHtml(i18n ? i18n.translateValue(item.sourceLabel || '—') : (item.sourceLabel || '—'))}</td>
                        <td class="download-action-cell"><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(labels.action)}</span>
                            ${item.available
                                ? `<a class="table-action" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">${escapeHtml(i18n ? i18n.t('detail.downloadAction') : '下载')}</a>`
                                : `<span class="muted">${escapeHtml(i18n ? i18n.t('common.unavailable') : '暂无链接')}</span>`}
                        </td>
                    </tr>
                `;
            }).join('')}
        </tbody>
    `).join('');

    container.innerHTML = `
        <div class="table-frame table-scroll">
            <table class="data-table download-table" aria-labelledby="downloadListHeading">
                <thead>
                    <tr>
                        <th scope="col">${escapeHtml(i18n ? i18n.t('detail.fileGroup') : '类别')}</th>
                        <th scope="col">${escapeHtml(labels.file)}</th>
                        <th scope="col">${escapeHtml(labels.engine)}</th>
                        <th scope="col">${escapeHtml(labels.note)}</th>
                        <th scope="col">${escapeHtml(labels.source)}</th>
                        <th scope="col">${escapeHtml(labels.action)}</th>
                    </tr>
                </thead>
                ${bodies}
            </table>
        </div>
    `;
}

function syncBusuanziCounters(count) {
    const pageCounter = document.getElementById('modelPageCounter');
    if (pageCounter) {
        pageCounter.textContent = i18n ? i18n.formatPageViews(count) : `已浏览 ${count} 次`;
    }
}

async function shareModelLink(model) {
    const shareUrl = detailPageUrl.href;
    const shareData = {
        title: `${model.name} - ${i18n ? i18n.t('header.brandTitle') : 'ModelZoo镜像站'}`,
        text: i18n && i18n.getLanguage() === 'en' ? `View model ${model.name}` : `查看模型 ${model.name}`,
        url: shareUrl,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            return true;
        } catch (error) {
            if (error && error.name === 'AbortError') {
                return false;
            }
        }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        return true;
    }

    const tempInput = document.createElement('input');
    tempInput.value = shareUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    return true;
}

function initShareAction(model) {
    const shareButton = document.getElementById('shareLinkButton');
    if (!shareButton) return;
    if (shareButton.dataset.shareBound === 'true') return;
    shareButton.dataset.shareBound = 'true';

    shareButton.addEventListener('click', async () => {
        const originalText = i18n ? i18n.t('detail.shareLink') : shareButton.textContent;
        try {
            const shared = await shareModelLink(model);
            shareButton.textContent = shared ? (i18n ? i18n.t('detail.linkCopied') : '链接已复制') : originalText;
        } catch (error) {
            shareButton.textContent = i18n ? i18n.t('detail.copyFailed') : '复制失败';
        }

        window.setTimeout(() => {
            shareButton.textContent = originalText;
        }, 1800);
    });
}

let modelPageViewCount = null;
let modelPageViewPromise = null;

async function attachBusuanziObserver(model) {
    if (modelPageViewCount !== null) {
        syncBusuanziCounters(modelPageViewCount);
        return;
    }

    const cachedCount = getPageViewCount();
    if (cachedCount) {
        modelPageViewCount = cachedCount;
        syncBusuanziCounters(cachedCount);
    }

    if (!modelPageViewPromise) {
        modelPageViewPromise = fetchModelPageCounter(model.id);
    }

    const count = await modelPageViewPromise;
    modelPageViewCount = count;
    syncBusuanziCounters(count);
}

// Render model detail
function renderModelDetail() {
    const modelId = getModelIdFromURL();
    const modelName = getModelNameFromURL();
    if (!modelId && !modelName) {
        document.getElementById('modelName').textContent = i18n ? i18n.t('detail.notFound') : '未找到模型';
        document.title = i18n ? i18n.t('page.modelNotFoundTitle') : '未找到模型 - ModelZoo镜像站';
        return;
    }
    
    const model = modelsData.find(m => m.id === modelId) || modelsData.find(m => m.name === modelName);
    if (!model) {
        document.getElementById('modelName').textContent = i18n ? i18n.t('detail.notFound') : '未找到模型';
        document.title = i18n ? i18n.t('page.modelNotFoundTitle') : '未找到模型 - ModelZoo镜像站';
        return;
    }

    const actionButtons = document.querySelector('.action-buttons');
    if (actionButtons) actionButtons.hidden = false;
    
    document.getElementById('modelName').textContent = model.name;
    renderBasicInfo(model);

    const betaNote = document.getElementById('betaNote');
    if (betaNote) {
        if (model.betaVersionDesc) {
            betaNote.textContent = model.betaVersionDesc;
            betaNote.style.display = 'block';
        } else {
            betaNote.style.display = 'none';
        }
    }
    
    const badge = document.getElementById('modelBadge');
    if (badge) {
        if (model.badge) {
            badge.textContent = model.badge;
            badge.style.display = 'inline-flex';
        } else {
            badge.textContent = '';
            badge.style.display = 'none';
        }
    }
    
    renderList('modelTags', model.tags || [], 'detail-tag');

    const image = document.getElementById('modelImage');
    if (image) {
        if (model.image) {
            const imageUrl = new URL(model.image, detailPageBaseUrl).href;
            image.innerHTML = `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(model.name)}" referrerpolicy="no-referrer">`;
            image.removeAttribute('aria-hidden');
        } else {
            image.innerHTML = `<span class="detail-placeholder">${escapeHtml(i18n ? i18n.t('detail.noPreview') : '暂无预览')}</span>`;
            image.setAttribute('aria-hidden', 'true');
        }
    }

    renderDownloads(model.downloads || []);
    renderDetailParams(model.detailParams || []);
    renderOriginModels(model.originModels || []);
    const readmeState = renderReadmes(model.quickStartReadmes || [], {
        quickStartUrl: model.quickStartUrl,
        quickStartMarkdownUrl: model.quickStartMarkdownUrl,
        hfReadmeUrl: model.hfReadmeUrl,
    });
    configureQuickStartAction(readmeState);

    const repoActionLink = document.getElementById('repoActionLink');
    if (repoActionLink) {
        if (model.hfRepoUrl) {
            repoActionLink.href = model.hfRepoUrl;
            repoActionLink.style.display = 'inline-flex';
        } else {
            repoActionLink.style.display = 'none';
        }
    }

    initShareAction(model);

    attachBusuanziObserver(model);
    
    // Update page title
    document.title = `${model.name} - ${i18n ? i18n.t('header.brandTitle') : 'ModelZoo镜像站'}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    stabilizeDocumentBase();
    initDailyQuote();
    renderModelDetail();
    syncReadmeHashTarget(detailPageUrl.hash);
});

window.addEventListener('load', () => {
    if (window.scrollY <= 1) {
        syncReadmeHashTarget(detailPageUrl.hash);
    }
});

document.addEventListener('site-language-change', () => {
    initDailyQuote();
    renderModelDetail();
});

window.addEventListener('hashchange', () => syncReadmeHashTarget());
