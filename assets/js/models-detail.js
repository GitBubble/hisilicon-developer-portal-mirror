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

const dailyQuotes = [
    {
        text: '真正的工程能力，不是避免复杂，而是把复杂拆解到可以持续交付。',
        author: 'Linus Torvalds'
    },
    {
        text: 'Stay hungry. Stay foolish.',
        author: 'Steve Jobs'
    },
    {
        text: 'Simplicity is prerequisite for reliability.',
        author: 'Edsger W. Dijkstra'
    },
    {
        text: 'Talk is cheap. Show me the code.',
        author: 'Linus Torvalds'
    },
    {
        text: '程序必须先让人读懂，顺带再让机器执行。',
        author: 'Harold Abelson'
    },
    {
        text: 'The best way to predict the future is to invent it.',
        author: 'Alan Kay'
    },
    {
        text: '细节不是细枝末节，细节决定系统是否可靠。',
        author: '工程实践箴言'
    }
];

function formatCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getRandomQuote() {
    return dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
}

function initDailyQuote() {
    const dateText = document.getElementById('headerDateText');
    const quoteText = document.getElementById('dailyQuoteText');
    const quoteAuthor = document.getElementById('dailyQuoteAuthor');
    if (dateText) {
        dateText.textContent = `日期：${formatCurrentDate()}`;
    }
    if (!quoteText || !quoteAuthor) return;

    const quote = getRandomQuote();
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `- ${quote.author}`;
}

function getPageViewCount() {
    const counterValue = document.getElementById('busuanzi_value_page_pv');
    return Number(counterValue ? counterValue.textContent || 0 : 0);
}

function buildVirtualCounterUrl(modelId) {
    const currentUrl = new URL(window.location.href);
    const currentPath = currentUrl.pathname;
    const basePath = currentPath.endsWith('model-detail.html')
        ? currentPath.slice(0, -'model-detail.html'.length)
        : `${currentPath.replace(/\/?$/, '/')}`;
    return `${currentUrl.origin}${basePath}model-counter/${encodeURIComponent(modelId || 'unknown')}`;
}

function fetchModelPageCounter(modelId) {
    const originalUrl = window.location.href;
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
                window.history.replaceState(window.history.state, '', originalUrl);
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

function syncBusuanziCounters(count) {
    const pageCounter = document.getElementById('modelPageCounter');
    if (pageCounter) {
        pageCounter.textContent = `已浏览 ${count} 次`;
    }
}

async function shareModelLink(model) {
    const shareUrl = window.location.href;
    const shareData = {
        title: `${model.name} - ModelZoo镜像站`,
        text: `查看模型 ${model.name}`,
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

    shareButton.addEventListener('click', async () => {
        const originalText = shareButton.textContent;
        try {
            const shared = await shareModelLink(model);
            shareButton.textContent = shared ? '链接已复制' : originalText;
        } catch (error) {
            shareButton.textContent = '复制失败';
        }

        window.setTimeout(() => {
            shareButton.textContent = originalText;
        }, 1800);
    });
}

async function attachBusuanziObserver(model) {
    const cachedCount = getPageViewCount();
    if (cachedCount) {
        syncBusuanziCounters(cachedCount);
    }

    const count = await fetchModelPageCounter(model.id);
    syncBusuanziCounters(count);
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
                        return `
                        <li class="download-item ${item.available ? '' : 'is-unavailable'}">
                            <div class="download-main">
                                ${item.available
                                    ? `<a href="${escapeHtml(item.href)}" class="download-link" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a>`
                                    : `<span class="download-link">${escapeHtml(item.title)}</span>`}
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
            downloadLink.href = model.primaryDownloadUrl;
            downloadLink.textContent = model.primaryDownloadLabel || '下载模型';
            downloadLink.target = '_blank';
            downloadLink.rel = 'noreferrer';
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

    initShareAction(model);

    attachBusuanziObserver(model);
    
    // Update page title
    document.title = `${model.name} - ModelZoo镜像站`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initDailyQuote();
    renderModelDetail();
});
