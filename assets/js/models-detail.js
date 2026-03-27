// Get model name from URL
function getModelNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name');
}

function getModelIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function buildDownloadKey(modelId, item) {
    return `${modelId}::${item.title || ''}::${item.href || ''}`;
}

function getDownloadCount(downloadKey) {
    const counterValue = document.getElementById('busuanzi_value_page_pv');
    return Number(counterValue ? counterValue.textContent || 0 : 0);
}

function formatDownloadCount(count) {
    return `已下载 ${count} 次`;
}

function renderList(containerId, values, className) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = (values || []).map(value => `<span class="${className}">${escapeHtml(value)}</span>`).join('');
}

function setSectionVisible(sectionId, visible) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.style.display = visible ? '' : 'none';
}

function renderLink(linkId, url) {
    const link = document.getElementById(linkId);
    if (!link) return;
    if (url) {
        link.href = url;
        link.style.display = 'inline-flex';
    } else {
        link.removeAttribute('href');
        link.style.display = 'none';
    }
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
        <div class="detail-param-card">
            <div class="detail-param-name">${escapeHtml(item.name)}</div>
            <div class="detail-param-value">${escapeHtml(item.value)}</div>
        </div>
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

    container.innerHTML = `
        <table class="origin-table">
            <thead>
                <tr>
                    <th>模型文件</th>
                    <th>大小</th>
                    <th>链接</th>
                </tr>
            </thead>
            <tbody>
                ${items.map((item) => `
                    <tr>
                        <td>${escapeHtml(item.name)}</td>
                        <td>${escapeHtml(item.size || '-')}</td>
                        <td>
                            ${item.available
                                ? `<a href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">${escapeHtml(item.localFile ? 'HF Mirror' : '原始链接')}</a>`
                                : '<span class="muted">暂无链接</span>'}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    setSectionVisible('originModelsSection', true);
}

function renderReadmes(items, links) {
    const container = document.getElementById('readmeSections');
    const linksContainer = document.getElementById('readmeLinks');
    if (!container || !linksContainer) return;

    const availableLinks = [
        links.quickStartUrl ? `<a class="resource-link" href="${escapeHtml(links.quickStartUrl)}" target="_blank" rel="noreferrer">快速开始原始链接</a>` : '',
        links.quickStartMarkdownUrl ? `<a class="resource-link" href="${escapeHtml(links.quickStartMarkdownUrl)}" target="_blank" rel="noreferrer">Markdown 文档</a>` : '',
        links.hfReadmeUrl ? `<a class="resource-link" href="${escapeHtml(links.hfReadmeUrl)}" target="_blank" rel="noreferrer">HF README</a>` : ''
    ].filter(Boolean);

    linksContainer.innerHTML = availableLinks.join('');

    if (!(items || []).length) {
        container.innerHTML = '<div class="empty-state">暂无 README / 快速开始内容</div>';
        setSectionVisible('readmeSection', availableLinks.length > 0);
        return;
    }

    container.innerHTML = items.map((item) => `
        <div class="readme-block">
            <div class="readme-label">${escapeHtml(item.language || 'Text')}</div>
            <pre class="readme-pre">${escapeHtml(item.content || '')}</pre>
        </div>
    `).join('');
    setSectionVisible('readmeSection', true);
}

function groupDownloads(downloads) {
    const grouped = new Map();
    for (const item of downloads || []) {
        if (!grouped.has(item.group)) grouped.set(item.group, []);
        grouped.get(item.group).push(item);
    }
    return [...grouped.entries()];
}

function updateDownloadCounterElements(downloadKey, count) {
    document.querySelectorAll(`[data-counter-key="${CSS.escape(downloadKey)}"]`).forEach((element) => {
        element.textContent = formatDownloadCount(count);
    });
}

function syncBusuanziCounters(model) {
    const count = getDownloadCount();
    const primaryDownload = (model.downloads || []).find((item) => item.href === model.primaryDownloadUrl && item.title === model.primaryDownloadLabel)
        || (model.downloads || []).find((item) => item.href === model.primaryDownloadUrl)
        || null;
    const primaryCounter = document.getElementById('primaryDownloadCounter');
    if (primaryCounter) {
        if (primaryDownload && model.primaryDownloadUrl) {
            const downloadKey = buildDownloadKey(model.id, primaryDownload);
            primaryCounter.dataset.counterKey = downloadKey;
            primaryCounter.textContent = formatDownloadCount(count);
            primaryCounter.style.display = 'block';
        } else {
            primaryCounter.style.display = 'none';
        }
    }

    (model.downloads || []).forEach((item) => {
        const downloadKey = buildDownloadKey(model.id, item);
        updateDownloadCounterElements(downloadKey, count);
    });
}

function attachBusuanziObserver(model) {
    const counterValue = document.getElementById('busuanzi_value_page_pv');
    if (!counterValue) return;

    syncBusuanziCounters(model);

    const observer = new MutationObserver(() => {
        syncBusuanziCounters(model);
    });
    observer.observe(counterValue, { childList: true, characterData: true, subtree: true });
}

// Render model detail
function renderModelDetail() {
    const modelId = getModelIdFromURL();
    const modelName = getModelNameFromURL();
    if (!modelId && !modelName) {
        document.getElementById('modelName').textContent = '未找到模型';
        return;
    }
    
    const model = modelsData.find(m => m.id === modelId) || modelsData.find(m => m.name === modelName);
    if (!model) {
        document.getElementById('modelName').textContent = '未找到模型';
        return;
    }
    
    document.getElementById('modelName').textContent = model.name;
    document.getElementById('modelDescription').textContent = model.description;
    document.getElementById('modelDate').textContent = model.date;
    document.getElementById('modelUpdatedAt').textContent = model.updatedAt || model.date || '-';
    document.getElementById('modelCategory').textContent = model.category || (model.tags || [])[0] || '模型';
    document.getElementById('modelCount').textContent = `${(model.downloads || []).filter(item => item.available).length} 个可用文件`;
    document.getElementById('modelRepoId').textContent = model.hfRepoId || '未上传';

    const betaNote = document.getElementById('betaNote');
    if (betaNote) {
        if (model.betaVersionDesc) {
            betaNote.textContent = model.betaVersionDesc;
            betaNote.style.display = 'block';
        } else {
            betaNote.style.display = 'none';
        }
    }
    
    if (model.badge) {
        const badge = document.getElementById('modelBadge');
        badge.textContent = model.badge;
        badge.style.display = 'inline-block';
    }
    
    renderList('modelTags', model.tags || [], 'detail-tag');
    renderList('frameworkTags', model.framework || [], 'detail-pill');
    renderList('osTags', model.supportOs || [], 'detail-pill');
    renderList('computeTags', model.computingPower || [], 'detail-pill');

    const image = document.getElementById('modelImage');
    if (image) {
        if (model.image) {
            image.innerHTML = `<img src="${escapeHtml(model.image)}" alt="${escapeHtml(model.name)}" referrerpolicy="no-referrer">`;
        } else {
            image.innerHTML = '<span class="detail-placeholder">🧠</span>';
        }
    }

    renderLink('repositoryLink', model.repositoryUrl);
    renderLink('licenseLink', model.licenseUrl);
    renderLink('hfRepoLink', model.hfRepoUrl);
    renderLink('hfReadmeLink', model.hfReadmeUrl);
    renderLink('quickStartLink', model.quickStartUrl);

    const downloadsContainer = document.getElementById('downloadSections');
    if (downloadsContainer) {
        const groups = groupDownloads(model.downloads || []);
        downloadsContainer.innerHTML = groups.map(([group, items]) => `
            <div class="download-group">
                <h3>${escapeHtml(group)}</h3>
                <ul class="download-list">
                    ${items.map(item => {
                        const downloadKey = buildDownloadKey(model.id, item);
                        const countLabel = formatDownloadCount(getDownloadCount(downloadKey));
                        return `
                        <li class="download-item ${item.available ? '' : 'is-unavailable'}">
                            <div class="download-main">
                                ${item.available
                                    ? `<a href="${escapeHtml(item.href)}" class="download-link" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a>`
                                    : `<span class="download-link">${escapeHtml(item.title)}</span>`}
                                <span class="download-counter" data-counter-key="${escapeHtml(downloadKey)}">${escapeHtml(countLabel)}</span>
                            </div>
                            <span class="download-source">${escapeHtml(item.sourceLabel)}</span>
                        </li>
                    `;
                    }).join('')}
                </ul>
            </div>
        `).join('');
    }

    renderDetailParams(model.detailParams || []);
    renderOriginModels(model.originModels || []);
    renderReadmes(model.quickStartReadmes || [], {
        quickStartUrl: model.quickStartUrl,
        quickStartMarkdownUrl: model.quickStartMarkdownUrl,
        hfReadmeUrl: model.hfReadmeUrl,
    });
    
    // Setup download link
    const downloadLink = document.getElementById('downloadLink');
    if (downloadLink) {
        if (model.primaryDownloadUrl) {
            const primaryDownload = (model.downloads || []).find((item) => item.href === model.primaryDownloadUrl && item.title === model.primaryDownloadLabel)
                || (model.downloads || []).find((item) => item.href === model.primaryDownloadUrl)
                || { title: model.primaryDownloadLabel || '下载模型', href: model.primaryDownloadUrl };
            const downloadKey = buildDownloadKey(model.id, primaryDownload);
            downloadLink.href = model.primaryDownloadUrl;
            downloadLink.textContent = model.primaryDownloadLabel || '下载模型';
            downloadLink.target = '_blank';
            downloadLink.rel = 'noreferrer';
            downloadLink.dataset.counterKey = downloadKey;
        } else {
            downloadLink.removeAttribute('href');
            downloadLink.textContent = '暂无可用下载';
            downloadLink.classList.add('is-disabled');
        }
    }

    const repoActionLink = document.getElementById('repoActionLink');
    if (repoActionLink) {
        if (model.hfRepoUrl) {
            repoActionLink.href = model.hfRepoUrl;
            repoActionLink.style.display = 'inline-flex';
        } else {
            repoActionLink.style.display = 'none';
        }
    }

    attachBusuanziObserver(model);
    
    // Update page title
    document.title = `${model.name} - 华为海思开发者门户`;
}

// Initialize
document.addEventListener('DOMContentLoaded', renderModelDetail);
