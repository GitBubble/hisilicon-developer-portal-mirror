const fallbackCardTones = ['sun', 'cyan', 'pink', 'violet'];
const categoryCardTones = {
    '计算机视觉': 'sun',
    '自然语言处理': 'cyan',
    '多模态': 'violet',
    '音频': 'pink',
    '视频': 'orange',
};

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

const taskCategoryOrder = ['计算机视觉', '自然语言处理', '多模态', '音频', '视频', '模型'];

const filterValueGetters = {
    tasks: getTaskValues,
    framework: (model) => model.framework || [],
    supportOs: (model) => model.supportOs || [],
    computingPower: (model) => model.computingPower || [],
};

const i18n = window.siteI18n;

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

function getSortLocale() {
    return i18n && i18n.getLanguage() === 'en' ? 'en' : 'zh-CN';
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
        return left[0].localeCompare(right[0], getSortLocale());
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
        return left[0].localeCompare(right[0], getSortLocale());
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
    const translatedValue = i18n ? i18n.translateValue(value) : value;
    const isActive = Boolean(state.filters[groupKey] && state.filters[groupKey].has(value));
    return `<button type="button" class="filter-tag${isActive ? ' active' : ''}" data-filter-group="${escapeHtml(groupKey)}" data-filter-value="${escapeHtml(value)}"${taskCategoryAttr} aria-pressed="${isActive}"><span class="filter-tag-label">${escapeHtml(translatedValue)}</span><span class="filter-tag-count">${count}</span></button>`;
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
                    <span class="filter-category-label">${escapeHtml(i18n ? i18n.translateValue(group.name) : group.name)}</span>
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
        model.descriptionEn,
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

function renderHomeStats() {
    const modelCount = document.getElementById('heroModelCount');
    const engineCount = document.getElementById('heroEngineCount');
    const omCount = document.getElementById('heroOmCount');
    if (!modelCount && !engineCount && !omCount) return;

    const omBuilds = modelsData.flatMap((model) => (model.downloads || []).filter((item) => (
        item.group === '编译模型' || /\.om(?:$|[?#])/i.test(item.name || item.url || '')
    )));
    const omEngines = unique(omBuilds.map((item) => item.engine).filter(Boolean));
    const catalogEngines = unique(modelsData.flatMap((model) => model.computingPower || []));

    if (modelCount) modelCount.textContent = String(modelsData.length);
    if (engineCount) engineCount.textContent = String((omEngines.length ? omEngines : catalogEngines).length);
    if (omCount) omCount.textContent = String(omBuilds.length);
}

function getVisibleModels() {
    let filtered = modelsData.filter((model) => {
        if (!matchesFilters(model)) return false;
        return matchesSearch(model);
    });

    filtered = filtered.slice().sort((left, right) => {
        if (state.sort === 'name') {
            return left.name.localeCompare(right.name, getSortLocale());
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
                <strong>${escapeHtml(i18n ? i18n.t('home.emptyTitle') : '没有匹配的模型')}</strong>
                <p>${escapeHtml(i18n ? i18n.t('home.emptyBody') : '请调整左侧筛选条件或搜索关键词。')}</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = models.map((model, index) => {
        const catalogIndex = ((state.currentPage - 1) * state.pageSize) + index;
        const sequence = String(catalogIndex + 1).padStart(2, '0');
        const tone = categoryCardTones[model.category] || fallbackCardTones[catalogIndex % fallbackCardTones.length];
        const category = i18n ? i18n.translateValue(model.category || '模型') : (model.category || '模型');
        const framework = unique(model.framework || []).slice(0, 1).join('') || 'MODEL';
        const engine = unique(model.computingPower || [])
            .slice(0, 2)
            .map((value) => i18n ? i18n.translateValue(value) : value)
            .join(' / ') || '—';
        const description = i18n && i18n.getLanguage() === 'en'
            ? (model.descriptionEn || model.description)
            : (model.descriptionZh || model.description);
        const availableFiles = (model.downloads || []).filter((item) => item.available).length;

        return `
            <a href="model-detail.html?id=${encodeURIComponent(model.id)}" class="model-card model-card-tone-${tone}">
                <div class="model-card-kicker">
                    <span class="model-card-number">FIELD ${sequence}</span>
                    <span class="model-card-category">${escapeHtml(category)}</span>
                </div>
                <div class="model-image">
                    ${model.image
                        ? `<img src="${escapeHtml(model.image)}" alt="${escapeHtml(model.name)}">`
                        : '<span class="model-image-fallback" aria-hidden="true">MODEL</span>'}
                    <span class="model-image-chip">${escapeHtml(framework)}</span>
                </div>
                <div class="model-card-content">
                    <div class="model-title-row">
                        <div class="model-name">${escapeHtml(model.name)}</div>
                        ${model.badge ? `<span class="model-badge">${escapeHtml(model.badge)}</span>` : ''}
                    </div>
                    <div class="model-description">${escapeHtml(description)}</div>
                    <div class="model-tags">
                        ${(model.tags || []).map((tag) => `<span class="model-tag">${escapeHtml(i18n ? i18n.translateValue(tag) : tag)}</span>`).join('')}
                    </div>
                    <div class="model-engine-strip">
                        <span>ENGINE</span>
                        <strong>${escapeHtml(engine)}</strong>
                    </div>
                    <div class="model-meta">
                        <span class="model-date">${escapeHtml(model.updatedAt || model.date || '-')}</span>
                        <span class="model-action">${escapeHtml(i18n ? i18n.formatCardFileCount(availableFiles) : `${availableFiles} 文件`)}</span>
                    </div>
                </div>
            </a>
        `;
    }).join('');
}

function renderPagination() {
    const visibleModels = getVisibleModels();
    const totalPages = Math.max(1, Math.ceil(visibleModels.length / state.pageSize));
    if (state.currentPage > totalPages) state.currentPage = totalPages;

    const pageNumbers = document.querySelector('.page-numbers');
    if (!pageNumbers) return;

    const summary = document.querySelector('.pagination span');
    if (summary) {
        summary.textContent = i18n ? i18n.formatPaginationTotal(visibleModels.length) : `共${visibleModels.length}条`;
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
            tag.setAttribute('aria-pressed', String(isActive));
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
    document.querySelectorAll('.filter-tag.active').forEach((tag) => {
        tag.classList.remove('active');
        tag.setAttribute('aria-pressed', 'false');
    });
    state.currentPage = 1;
    updateClearFilterState();
    updatePage();
}

function initFilterCollapsing() {
    document.querySelectorAll('.filter-section').forEach((section) => {
        const title = section.querySelector('.filter-title');
        if (title && title.dataset.bound !== 'true') {
            title.dataset.bound = 'true';
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
        if (clearBtn.dataset.bound !== 'true') {
            clearBtn.dataset.bound = 'true';
            clearBtn.addEventListener('click', (event) => {
                event.preventDefault();
                clearAllFilters();
            });
        }
    }

    initFilterCollapsing();
    updateClearFilterState();
    updateFilterCounts();
}

function renderSortOptions() {
    const sortSelect = document.querySelector('.sort-select');
    if (!sortSelect) return;

    sortSelect.innerHTML = [
        `<option value="updated">${escapeHtml(i18n ? i18n.t('home.sortUpdated') : '最近更新')}</option>`,
        `<option value="name">${escapeHtml(i18n ? i18n.t('home.sortName') : '名称排序')}</option>`
    ].join('');
    sortSelect.value = state.sort;
}

// Cookie banner close
function initCookieBanner() {
    const closeBtn = document.querySelector('.cookie-banner .close-btn');
    if (closeBtn && closeBtn.dataset.bound !== 'true') {
        closeBtn.dataset.bound = 'true';
        closeBtn.addEventListener('click', function() {
            document.querySelector('.cookie-banner').style.display = 'none';
        });
    }
}

function initMobileFilters() {
    const openButton = document.getElementById('mobileFilterButton');
    const closeButton = document.querySelector('.filter-close');
    const overlay = document.querySelector('.filter-overlay');
    const sidebar = document.getElementById('modelFilters');
    if (!openButton || !sidebar) return;
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const setOpen = (isOpen, manageFocus = true) => {
        const isMobile = mobileQuery.matches;
        document.body.classList.toggle('filters-open', isOpen);
        openButton.setAttribute('aria-expanded', String(isOpen));
        if (isMobile) {
            sidebar.setAttribute('aria-hidden', String(!isOpen));
            sidebar.inert = !isOpen;
        } else {
            sidebar.removeAttribute('aria-hidden');
            sidebar.inert = false;
        }
        if (manageFocus && isOpen && closeButton) {
            closeButton.focus();
        } else if (manageFocus && !isOpen && isMobile) {
            openButton.focus();
        }
    };

    openButton.addEventListener('click', () => setOpen(true));
    if (closeButton) closeButton.addEventListener('click', () => setOpen(false));
    if (overlay) overlay.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && document.body.classList.contains('filters-open')) setOpen(false);
    });
    const handleLayoutChange = () => setOpen(false, false);
    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', handleLayoutChange);
    } else {
        mobileQuery.addListener(handleLayoutChange);
    }
    setOpen(false, false);
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const sortSelect = document.querySelector('.sort-select');
    
    if (searchInput && searchBtn) {
        if (searchBtn.dataset.bound !== 'true') {
            const performSearch = () => {
                state.search = searchInput.value;
                state.currentPage = 1;
                updatePage();
            };

            searchBtn.dataset.bound = 'true';
            searchInput.dataset.bound = 'true';
            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }
    }

    if (sortSelect) {
        renderSortOptions();
        if (sortSelect.dataset.bound !== 'true') {
            sortSelect.dataset.bound = 'true';
            sortSelect.addEventListener('change', () => {
                state.sort = sortSelect.value;
                state.currentPage = 1;
                updatePage();
            });
        }
    }
}

function rerenderForLanguage() {
    initDailyQuote();
    renderFilterSidebar();
    initFilters();
    renderSortOptions();
    updatePage();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initDailyQuote();
    renderHomeStats();
    renderFilterSidebar();
    updatePage();
    initFilters();
    initCookieBanner();
    initSearch();
    initMobileFilters();
});

document.addEventListener('site-language-change', () => {
    rerenderForLanguage();
});
