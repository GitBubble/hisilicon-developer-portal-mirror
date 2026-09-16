const detailPageUrl = new URL(window.location.href);
const detailPageBaseUrl = new URL('./', detailPageUrl);

// Several upstream records were republished with new IDs. Keep bookmarked
// detail URLs working without duplicating the old records in the catalog.
// Old portal ids (upstream re-publishes a model under a new id) resolve through the
// map build-static-site.js emits from id-aliases.json alongside modelsData.
function resolveModelId(modelId) {
    const aliases = (typeof window !== 'undefined' && window.modelIdAliases) || {};
    return (modelId && aliases[modelId]) || modelId;
}

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

function formatPerformance(metrics) {
    const entries = (metrics || []).filter((metric) => metric && metric.value != null && metric.unit);
    if (!entries.length) return '—';

    const labels = [
        {
            match: /ttft/i,
            key: 'detail.performanceTtft',
            fallback: 'TTFT',
            unit: 'ms',
        },
        {
            match: /tps|token/i,
            key: 'detail.performanceTps',
            fallback: 'TPS',
            unit: 'TPS',
        },
        {
            match: /耗时|latency|time/i,
            key: 'detail.performanceLatency',
            fallback: '耗时',
            unit: 'ms',
        },
        {
            match: /性能|fps/i,
            key: 'detail.performanceFps',
            fallback: 'FPS',
            unit: 'FPS',
        },
        {
            match: /带宽|bandwidth/i,
            key: 'detail.performanceBandwidth',
            fallback: '带宽',
            unit: 'MB',
        },
        {
            match: /内存|memory/i,
            key: 'detail.performanceMemory',
            fallback: '内存',
            unit: 'MB',
        },
    ];

    return entries.map((metric) => {
        const match = labels.find((item) => item.match.test(String(metric.unit)));
        if (!match) return `${metric.value} ${metric.unit}`;
        const label = i18n ? i18n.t(match.key) : match.fallback;
        return `${label} ${metric.value} ${match.unit}`;
    }).join(' / ');
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

function renderPerformance(items) {
    const container = document.getElementById('performanceTable');
    if (!container) return;

    const rows = (items || []).filter((item) => item && (item.engine || item.quantization || (item.metrics || []).length));
    if (!rows.length) {
        container.innerHTML = '';
        setSectionVisible('performanceSection', false);
        return;
    }

    const labels = {
        engine: i18n ? i18n.t('detail.computeLabel') : '算力引擎',
        variant: i18n ? i18n.t('detail.fileNote') : '规格',
        metrics: i18n ? i18n.t('detail.performanceLabel') : '性能',
    };

    container.innerHTML = `
        <div class="table-frame table-scroll">
            <table class="data-table performance-table" aria-labelledby="performanceHeading">
                <thead>
                    <tr>
                        <th scope="col">${escapeHtml(labels.engine)}</th>
                        <th scope="col">${escapeHtml(labels.variant)}</th>
                        <th scope="col">${escapeHtml(labels.metrics)}</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map((item) => `
                        <tr>
                            <td><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(labels.engine)}</span>${escapeHtml(item.engine || '—')}</td>
                            <td><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(labels.variant)}</span>${escapeHtml(item.quantization || '—')}</td>
                            <td><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(labels.metrics)}</span>${escapeHtml(formatPerformance(item.metrics))}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    setSectionVisible('performanceSection', true);
}

// Inline glyphs for the upstream toolkit imgId values. Upstream images are never
// hotlinked; anything unknown falls back to a lettered badge built from the name.
const TOOLCHAIN_ICONS = {
    cann: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="0.5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>',
    tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14.7 6.3a4.5 4.5 0 0 0 5.7 5.7l-1.2 1.2-3.4-.6-.6-3.4z"/><path d="M20.4 12a4.5 4.5 0 0 1-6.1 1.3L6.7 20.9a2 2 0 0 1-2.8-2.8l7.6-7.6A4.5 4.5 0 0 1 14.7 6.3"/></svg>',
    sdk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z"/><path d="M3.5 7 12 11.5 20.5 7M12 11.5v10"/></svg>',
};

function renderToolchainIcon(item, displayName) {
    const icon = String(item.icon || '').trim().toLowerCase();
    if (Object.prototype.hasOwnProperty.call(TOOLCHAIN_ICONS, icon)) {
        return `<span class="toolchain-icon" data-icon="${escapeHtml(icon)}" aria-hidden="true">${TOOLCHAIN_ICONS[icon]}</span>`;
    }
    const letter = String(displayName || item.name || '').trim().charAt(0).toUpperCase() || '?';
    return `<span class="toolchain-icon toolchain-icon-letter" aria-hidden="true">${escapeHtml(letter)}</span>`;
}

function renderToolchains(groups) {
    const container = document.getElementById('toolchainGroups');
    if (!container) return;

    const platforms = (groups || []).filter((group) => group && (group.items || []).length);
    if (!platforms.length) {
        container.innerHTML = '';
        setSectionVisible('toolchainSection', false);
        return;
    }

    const openLabel = i18n ? i18n.t('detail.toolchainOpen') : '打开链接';

    container.innerHTML = platforms.map((group, groupIndex) => {
        const platformName = String(group.platform || '');
        const headingId = `toolchainPlatform${groupIndex}`;
        const chips = [
            ...(group.quantizations || []).filter(Boolean).map((value) => ({ value, kind: 'quant' })),
            ...(group.os || []).filter(Boolean).map((value) => ({ value, kind: 'os' })),
        ].map((chip) => `<span class="toolchain-chip toolchain-chip-${chip.kind}">${escapeHtml(i18n ? i18n.translateValue(chip.value) : chip.value)}</span>`).join('');

        const cards = group.items.map((item, itemIndex) => {
            const nameId = `toolchainItem${groupIndex}-${itemIndex}`;
            const desc = String(item.desc == null ? '' : item.desc);
            // Upstream's own labels (CANN工具, 编译工具链, SDK …) are shown verbatim in
            // both languages, like the file names in the download table.
            const displayName = item.name;
            return `
                <article class="toolchain-card">
                    <div class="toolchain-card-head">
                        ${renderToolchainIcon(item, displayName)}
                        <span id="${nameId}" class="toolchain-name">${escapeHtml(displayName || '—')}</span>
                    </div>
                    ${desc.trim() ? `<p class="toolchain-desc">${escapeHtml(desc)}</p>` : ''}
                    ${isUsableResourceUrl(item.href)
                        ? `<a class="toolchain-link" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer" aria-describedby="${nameId}">${escapeHtml(openLabel)}</a>`
                        : ''}
                </article>
            `;
        }).join('');

        return `
            <section class="toolchain-platform"${platformName ? ` aria-labelledby="${headingId}"` : ''}>
                <div class="toolchain-platform-head">
                    ${platformName ? `<h3 id="${headingId}" class="toolchain-platform-name">${escapeHtml(platformName)}</h3>` : ''}
                    ${chips ? `<div class="toolchain-chips">${chips}</div>` : ''}
                </div>
                <div class="toolchain-grid">${cards}</div>
            </section>
        `;
    }).join('');

    setSectionVisible('toolchainSection', true);
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
        performance: i18n ? i18n.t('detail.performanceLabel') : '性能',
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
                        <td class="download-performance"><span class="mobile-cell-label" aria-hidden="true">${escapeHtml(labels.performance)}</span>${escapeHtml(formatPerformance(item.performance))}</td>
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
                        <th scope="col">${escapeHtml(labels.performance)}</th>
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
    
    const resolvedModelId = resolveModelId(modelId);
    const model = modelsData.find(m => m.id === resolvedModelId) || modelsData.find(m => m.name === modelName);
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
    renderPerformance(model.performance || []);
    renderToolchains(model.toolchains || []);
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
