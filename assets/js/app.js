// Gradient backgrounds for model cards
const gradients = [
    'linear-gradient(135deg, #d80f19 0%, #a10015 100%)',
    'linear-gradient(135deg, #c7000b 0%, #8f0010 100%)',
    'linear-gradient(135deg, #e5444d 0%, #a60a18 100%)',
    'linear-gradient(135deg, #b2081d 0%, #6f0010 100%)',
    'linear-gradient(135deg, #f26b73 0%, #b2081d 100%)',
    'linear-gradient(135deg, #d92c36 0%, #7c0010 100%)',
    'linear-gradient(135deg, #ef8b91 0%, #bc1d28 100%)',
    'linear-gradient(135deg, #b81521 0%, #54000b 100%)',
    'linear-gradient(135deg, #e45b63 0%, #930010 100%)',
    'linear-gradient(135deg, #ffb0b5 0%, #cf1620 100%)',
    'linear-gradient(135deg, #cd2f39 0%, #87000f 100%)',
    'linear-gradient(135deg, #f2c2c6 0%, #b2081d 100%)'
];

const state = {
    currentPage: 1,
    pageSize: 12,
    search: '',
    sort: 'updated',
    filters: {
        tasks: new Set(),
        framework: new Set(),
        supportOs: new Set(),
        computingPower: new Set(),
    },
};

const filterGroupMap = {
    '任务': 'tasks',
    '框架': 'framework',
    '操作系统': 'supportOs',
    '算力引擎': 'computingPower',
};

const taskCategoryOrder = ['计算机视觉', '自然语言处理', '多模态', '音频', '视频', '模型'];

const filterValueGetters = {
    tasks: getTaskValues,
    framework: (model) => model.framework || [],
    supportOs: (model) => model.supportOs || [],
    computingPower: (model) => model.computingPower || [],
};

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

function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function unique(values) {
    return [...new Set((values || []).filter(Boolean))];
}

function formatCount(count, noun) {
    return `${count} ${noun}`;
}

function formatCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getTaskValues(model) {
    return unique([
        model.category,
        ...(model.tags || []),
    ]);
}

function incrementCount(counter, key) {
    if (!key) return;
    counter.set(key, (counter.get(key) || 0) + 1);
}

function sortFilterEntries(entries) {
    return entries.slice().sort((left, right) => {
        if (right[1] !== left[1]) return right[1] - left[1];
        return left[0].localeCompare(right[0], 'zh-CN');
    });
}

function sortTaskGroups(entries) {
    return entries.slice().sort((left, right) => {
        const leftIndex = taskCategoryOrder.indexOf(left[0]);
        const rightIndex = taskCategoryOrder.indexOf(right[0]);
        const leftRank = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;
        const rightRank = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;

        if (leftRank !== rightRank) return leftRank - rightRank;
        if (right[1].count !== left[1].count) return right[1].count - left[1].count;
        return left[0].localeCompare(right[0], 'zh-CN');
    });
}

function buildFilterCatalog() {
    const taskGroups = new Map();
    const frameworkCounts = new Map();
    const supportOsCounts = new Map();
    const computingPowerCounts = new Map();

    modelsData.forEach((model) => {
        const category = model.category || '模型';
        if (!taskGroups.has(category)) {
            taskGroups.set(category, {
                count: 0,
                tags: new Map(),
            });
        }

        const categoryEntry = taskGroups.get(category);
        categoryEntry.count += 1;
        unique(model.tags || []).forEach((tag) => incrementCount(categoryEntry.tags, tag));

        unique(model.framework || []).forEach((value) => incrementCount(frameworkCounts, value));
        unique(model.supportOs || []).forEach((value) => incrementCount(supportOsCounts, value));
        unique(model.computingPower || []).forEach((value) => incrementCount(computingPowerCounts, value));
    });

    return {
        tasks: sortTaskGroups([...taskGroups.entries()]).map(([name, entry]) => ({
            name,
            count: entry.count,
            tags: sortFilterEntries([...entry.tags.entries()]).map(([value, count]) => ({ value, count })),
        })),
        framework: sortFilterEntries([...frameworkCounts.entries()]).map(([value, count]) => ({ value, count })),
        supportOs: sortFilterEntries([...supportOsCounts.entries()]).map(([value, count]) => ({ value, count })),
        computingPower: sortFilterEntries([...computingPowerCounts.entries()]).map(([value, count]) => ({ value, count })),
    };
}

function renderFilterTag(groupKey, value, count, taskCategory = '') {
    const taskCategoryAttr = taskCategory ? ` data-task-category="${escapeHtml(taskCategory)}"` : '';
    return `<span class="filter-tag" data-filter-group="${escapeHtml(groupKey)}" data-filter-value="${escapeHtml(value)}"${taskCategoryAttr}><span class="filter-tag-label">${escapeHtml(value)}</span><span class="filter-tag-count">${count}</span></span>`;
}

function renderFilterSidebar() {
    const catalog = buildFilterCatalog();
    const taskContainer = document.getElementById('taskFilterGroups');
    const frameworkContainer = document.getElementById('frameworkFilters');
    const supportOsContainer = document.getElementById('supportOsFilters');
    const computingPowerContainer = document.getElementById('computingPowerFilters');

    if (taskContainer) {
        taskContainer.innerHTML = catalog.tasks.map((group) => `
            <div class="filter-content" data-task-category="${escapeHtml(group.name)}">
                <div class="filter-category">
                    <span class="category-icon">▾</span>
                    <span class="filter-category-label">${escapeHtml(group.name)}</span>
                    <span class="filter-category-count">${group.count}</span>
                </div>
                <div class="filter-tags">
                    ${group.tags.map((tag) => renderFilterTag('tasks', tag.value, tag.count, group.name)).join('')}
                </div>
            </div>
        `).join('');
    }

    if (frameworkContainer) {
        frameworkContainer.innerHTML = catalog.framework.map((item) => renderFilterTag('framework', item.value, item.count)).join('');
    }

    if (supportOsContainer) {
        supportOsContainer.innerHTML = catalog.supportOs.map((item) => renderFilterTag('supportOs', item.value, item.count)).join('');
    }

    if (computingPowerContainer) {
        computingPowerContainer.innerHTML = catalog.computingPower.map((item) => renderFilterTag('computingPower', item.value, item.count)).join('');
    }
}

function matchesSelectedValues(selectedValues, modelValues) {
    if (!selectedValues || selectedValues.size === 0) return true;
    return (modelValues || []).some((value) => selectedValues.has(value));
}

function matchesSearch(model, query = state.search) {
    const normalizedQuery = String(query || '').trim().toLowerCase();
    if (!normalizedQuery) return true;

    const haystack = [
        model.name,
        model.description,
        model.category,
        ...(model.tags || []),
        ...(model.framework || []),
        ...(model.supportOs || []),
        ...(model.computingPower || []),
    ].join(' ').toLowerCase();

    return haystack.includes(normalizedQuery);
}

function matchesFilters(model, filters = state.filters, excludedGroup = null) {
    return Object.entries(filterValueGetters).every(([groupKey, getter]) => {
        if (groupKey === excludedGroup) return true;
        return matchesSelectedValues(filters[groupKey], getter(model));
    });
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

function getVisibleModels() {
    let filtered = modelsData.filter((model) => {
        if (!matchesFilters(model)) return false;
        return matchesSearch(model);
    });

    filtered = filtered.slice().sort((left, right) => {
        if (state.sort === 'name') {
            return left.name.localeCompare(right.name, 'zh-CN');
        }
        const leftDate = new Date(left.updatedAt || left.date || 0).getTime();
        const rightDate = new Date(right.updatedAt || right.date || 0).getTime();
        return rightDate - leftDate;
    });

    return filtered;
}

function renderModels(models) {
    const grid = document.getElementById('modelGrid');
    if (!grid) return;

    if (models.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <strong>没有匹配的模型</strong>
                <p>请调整左侧筛选条件或搜索关键词。</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = models.map((model, index) => `
        <a href="model-detail.html?id=${encodeURIComponent(model.id)}" class="model-card">
            <div class="model-image" style="background: ${gradients[index % gradients.length]}">
                ${model.image
                    ? `<img src="${escapeHtml(model.image)}" alt="${escapeHtml(model.name)}">`
                    : `<span style="font-size: 48px; color: white;">🧠</span>`}
            </div>
            <div class="model-name">${model.name}</div>
            ${model.badge ? `<span class="model-badge">${model.badge}</span>` : ''}
            <div class="model-description">${model.description}</div>
            <div class="model-tags">
                ${model.tags.map(tag => `<span class="model-tag">${tag}</span>`).join('')}
            </div>
            <div class="model-meta">
                <span class="model-date">📅 ${model.date}</span>
                <span class="model-action">${formatCount((model.downloads || []).filter(item => item.available).length, '文件')}</span>
            </div>
        </a>
    `).join('');
}

function renderPagination() {
    const visibleModels = getVisibleModels();
    const totalPages = Math.max(1, Math.ceil(visibleModels.length / state.pageSize));
    if (state.currentPage > totalPages) state.currentPage = totalPages;

    const pageNumbers = document.querySelector('.page-numbers');
    if (!pageNumbers) return;

    const summary = document.querySelector('.pagination span');
    if (summary) {
        summary.textContent = `共${visibleModels.length}条`;
    }
    
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<li class="${i === state.currentPage ? 'active' : ''}">${i}</li>`;
    }
    pageNumbers.innerHTML = html;

    const prevBtn = document.querySelector('.pagination .page-btn:first-of-type');
    const nextBtn = document.querySelector('.pagination .page-btn:last-of-type');
    if (prevBtn) prevBtn.disabled = state.currentPage === 1;
    if (nextBtn) nextBtn.disabled = state.currentPage === totalPages;
    
    // Re-attach click handlers
    document.querySelectorAll('.page-numbers li').forEach(li => {
        li.addEventListener('click', function() {
            state.currentPage = parseInt(this.textContent, 10);
            updatePage();
        });
    });

    if (prevBtn) {
        prevBtn.onclick = () => {
            if (state.currentPage > 1) {
                state.currentPage -= 1;
                updatePage();
            }
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            if (state.currentPage < totalPages) {
                state.currentPage += 1;
                updatePage();
            }
        };
    }
}

function updatePage() {
    const visibleModels = getVisibleModels();
    const start = (state.currentPage - 1) * state.pageSize;
    const end = start + state.pageSize;
    const pageModels = visibleModels.slice(start, end);
    renderModels(pageModels);
    renderPagination();
    updateFilterCounts();
}

function getFilterCount(groupKey, value, taskCategory = '') {
    const valueGetter = filterValueGetters[groupKey];
    if (!valueGetter) return 0;

    return modelsData.filter((model) => {
        if (!matchesSearch(model)) return false;
        if (!matchesFilters(model, state.filters, groupKey)) return false;
        if (groupKey === 'tasks' && taskCategory && model.category !== taskCategory) return false;
        return valueGetter(model).includes(value);
    }).length;
}

function getTaskCategoryCount(category) {
    return modelsData.filter((model) => {
        if (!matchesSearch(model)) return false;
        if (!matchesFilters(model, state.filters, 'tasks')) return false;
        return model.category === category;
    }).length;
}

function updateFilterCounts() {
    document.querySelectorAll('.filter-tag').forEach((tag) => {
        const groupKey = tag.dataset.filterGroup;
        const value = tag.dataset.filterValue;
        const taskCategory = tag.dataset.taskCategory || '';
        const countElement = tag.querySelector('.filter-tag-count');
        if (!groupKey || !value || !countElement) return;

        const count = getFilterCount(groupKey, value, taskCategory);
        countElement.textContent = String(count);
        const isActive = tag.classList.contains('active');
        tag.classList.toggle('is-disabled', count === 0 && !isActive);
        tag.setAttribute('aria-disabled', String(count === 0 && !isActive));
    });

    document.querySelectorAll('.filter-content[data-task-category]').forEach((content) => {
        const category = content.dataset.taskCategory;
        const countElement = content.querySelector('.filter-category-count');
        if (!category || !countElement) return;
        countElement.textContent = String(getTaskCategoryCount(category));
    });
}

function syncFilterTagState(groupKey, value, isActive) {
    document.querySelectorAll('.filter-tag').forEach((tag) => {
        if (tag.dataset.filterGroup === groupKey && tag.dataset.filterValue === value) {
            tag.classList.toggle('active', isActive);
        }
    });
}

function updateClearFilterState() {
    const clearBtn = document.querySelector('.clear-filter');
    if (!clearBtn) return;

    const hasActiveFilters = Object.values(state.filters).some((filterSet) => filterSet.size > 0);
    clearBtn.classList.toggle('disabled', !hasActiveFilters);
    clearBtn.setAttribute('aria-disabled', String(!hasActiveFilters));
}

function toggleFilterValue(groupKey, value) {
    const filterSet = state.filters[groupKey];
    if (!filterSet) return;

    const count = getFilterCount(groupKey, value);
    if (count === 0 && !filterSet.has(value)) return;

    if (filterSet.has(value)) {
        filterSet.delete(value);
        syncFilterTagState(groupKey, value, false);
    } else {
        filterSet.add(value);
        syncFilterTagState(groupKey, value, true);
    }

    state.currentPage = 1;
    updateClearFilterState();
    updatePage();
}

function clearAllFilters() {
    Object.values(state.filters).forEach((filterSet) => filterSet.clear());
    document.querySelectorAll('.filter-tag.active').forEach((tag) => tag.classList.remove('active'));
    state.currentPage = 1;
    updateClearFilterState();
    updatePage();
}

function getSectionGroupKey(section) {
    const title = section.querySelector('.filter-title span');
    return filterGroupMap[title ? title.textContent.trim() : ''] || null;
}

function initFilterCollapsing() {
    document.querySelectorAll('.filter-section').forEach((section) => {
        const title = section.querySelector('.filter-title');
        if (title) {
            title.addEventListener('click', () => {
                section.classList.toggle('collapsed');
            });
        }

        section.querySelectorAll('.filter-category').forEach((category) => {
            category.addEventListener('click', () => {
                const content = category.parentElement;
                if (content) {
                    content.classList.toggle('collapsed');
                }
            });
        });
    });
}

function initFilters() {
    document.querySelectorAll('.filter-tag').forEach((tag) => {
        const groupKey = tag.dataset.filterGroup;
        const value = tag.dataset.filterValue;
        if (!groupKey || !value) return;

        tag.addEventListener('click', () => {
            toggleFilterValue(groupKey, value);
        });
    });

    const clearBtn = document.querySelector('.clear-filter');
    if (clearBtn) {
        clearBtn.addEventListener('click', (event) => {
            event.preventDefault();
            clearAllFilters();
        });
    }

    initFilterCollapsing();
    updateClearFilterState();
    updateFilterCounts();
}

// Cookie banner close
function initCookieBanner() {
    const closeBtn = document.querySelector('.cookie-banner .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.querySelector('.cookie-banner').style.display = 'none';
        });
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const sortSelect = document.querySelector('.sort-select');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            state.search = searchInput.value;
            state.currentPage = 1;
            updatePage();
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    if (sortSelect) {
        sortSelect.innerHTML = [
            '<option value="updated">最近更新</option>',
            '<option value="name">名称排序</option>'
        ].join('');
        sortSelect.addEventListener('change', () => {
            state.sort = sortSelect.value;
            state.currentPage = 1;
            updatePage();
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initDailyQuote();
    renderFilterSidebar();
    updatePage();
    initFilters();
    initCookieBanner();
    initSearch();
});
