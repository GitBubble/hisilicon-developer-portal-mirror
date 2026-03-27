// Gradient backgrounds for model cards
const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    'linear-gradient(135deg, #9890e3 0%, #b1f4cb 100%)',
    'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)'
];

const state = {
    currentPage: 1,
    pageSize: 12,
    search: '',
    sort: 'updated',
};

function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function formatCount(count, noun) {
    return `${count} ${noun}`;
}

function getVisibleModels() {
    const query = state.search.trim().toLowerCase();
    let filtered = modelsData.filter((model) => {
        if (!query) return true;
        const haystack = [
            model.name,
            model.description,
            ...(model.tags || []),
            ...(model.framework || []),
            ...(model.supportOs || []),
            ...(model.computingPower || []),
        ].join(' ').toLowerCase();
        return haystack.includes(query);
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
}

// Filter tag click handler
function initFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
            // TODO: Implement filtering logic
        });
    });
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
    updatePage();
    initFilters();
    initCookieBanner();
    initSearch();
});
