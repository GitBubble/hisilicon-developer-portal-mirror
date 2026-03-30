(function () {
    const STORAGE_KEY = 'site-language';
    const SUPPORTED_LANGUAGES = new Set(['zh', 'en']);

    const QUOTES = [
        {
            zh: {
                text: '真正的工程能力，不是避免复杂，而是把复杂拆解到可以持续交付。',
                author: 'Linus Torvalds'
            },
            en: {
                text: 'Real engineering is not avoiding complexity, but breaking it into shippable parts.',
                author: 'Linus Torvalds'
            }
        },
        {
            zh: {
                text: 'Stay hungry. Stay foolish.',
                author: 'Steve Jobs'
            },
            en: {
                text: 'Stay hungry. Stay foolish.',
                author: 'Steve Jobs'
            }
        },
        {
            zh: {
                text: 'Simplicity is prerequisite for reliability.',
                author: 'Edsger W. Dijkstra'
            },
            en: {
                text: 'Simplicity is prerequisite for reliability.',
                author: 'Edsger W. Dijkstra'
            }
        },
        {
            zh: {
                text: 'Talk is cheap. Show me the code.',
                author: 'Linus Torvalds'
            },
            en: {
                text: 'Talk is cheap. Show me the code.',
                author: 'Linus Torvalds'
            }
        },
        {
            zh: {
                text: '程序必须先让人读懂，顺带再让机器执行。',
                author: 'Harold Abelson'
            },
            en: {
                text: 'Programs must be written for people to read, and only incidentally for machines to execute.',
                author: 'Harold Abelson'
            }
        },
        {
            zh: {
                text: 'The best way to predict the future is to invent it.',
                author: 'Alan Kay'
            },
            en: {
                text: 'The best way to predict the future is to invent it.',
                author: 'Alan Kay'
            }
        },
        {
            zh: {
                text: '细节不是细枝末节，细节决定系统是否可靠。',
                author: '工程实践箴言'
            },
            en: {
                text: 'Details are not trivia. They decide whether a system is reliable.',
                author: 'Engineering Practice'
            }
        }
    ];

    const VALUE_TRANSLATIONS = {
        '计算机视觉': 'Computer Vision',
        '自然语言处理': 'Natural Language Processing',
        '多模态': 'Multimodal',
        '音频': 'Audio',
        '视频': 'Video',
        '模型': 'Models',
        '人群计数': 'Crowd Counting',
        '单目深度估计': 'Monocular Depth Estimation',
        '关键点检测': 'Keypoint Detection',
        '特征点检测': 'Feature Point Detection',
        '图像分类': 'Image Classification',
        '单目深度': 'Monocular Depth',
        '检测': 'Detection',
        '分割': 'Segmentation',
        '目标检测': 'Object Detection',
        '姿态估计': 'Pose Estimation',
        '图像增强': 'Image Enhancement',
        '文字检测': 'Text Detection',
        '双目深度': 'Stereo Depth',
        '图像分割': 'Image Segmentation',
        '文字识别': 'Text Recognition',
        '具身智能': 'Embodied AI',
        '人脸识别': 'Face Recognition',
        '多目标跟踪': 'Multi-Object Tracking',
        '多目深度估计': 'Multi-view Depth Estimation',
        '图像超分': 'Image Super Resolution',
        '分类': 'Classification',
        '大型语言模型': 'Large Language Model',
        '文本转语音': 'Text-to-Speech',
        '图片分类': 'Image Classification',
        '图文匹配': 'Image-Text Matching',
        '任务': 'Task',
        '框架': 'Framework',
        '操作系统': 'Operating System',
        '算力引擎': 'Compute Engine',
        '友情链接': 'Links',
        '编译模型': 'Compiled Models',
        '源模型': 'Source Models',
        '工具链': 'Toolchain',
        '源模型下载': 'Source Download',
        '源模型元数据': 'Source Metadata',
        'OM 元数据': 'OM Metadata',
        '计算量': 'FLOPs',
        '输入': 'Input',
        '参数量': 'Parameters',
        '模型文件': 'Model File',
        '大小': 'Size',
        '链接': 'Link',
        '快速开始原始链接': 'Quick Start Source',
        'Markdown 文档': 'Markdown Doc',
        'HF README': 'HF README',
        '未上传': 'Not published',
        '暂无链接': 'Unavailable',
        'HF Mirror': 'HF Mirror',
        '原始链接': 'Original Link'
    };

    const DICTIONARY = {
        zh: {
            'page.homeTitle': 'ModelZoo镜像站',
            'page.detailTitle': '模型详情 - ModelZoo镜像站',
            'page.modelNotFoundTitle': '未找到模型 - ModelZoo镜像站',
            'header.brandAria': 'ModelZoo镜像站',
            'header.brandTitle': 'ModelZoo镜像站',
            'header.navModelZoo': 'ModelZoo',
            'header.dateLabel': '日期：{{date}}',
            'header.languageSwitcher': '语言切换',
            'language.zh': '中文',
            'language.en': 'EN',
            'home.filterTitle': '筛选条件',
            'home.clearAll': '清除全部',
            'home.sectionTask': '任务',
            'home.sectionFramework': '框架',
            'home.sectionOs': '操作系统',
            'home.sectionCompute': '算力引擎',
            'home.sectionLinks': '友情链接',
            'home.hisparkForum': 'Hispark论坛',
            'home.hisiliconAiot': '海思AIoT',
            'home.searchPlaceholder': '搜索模型名称',
            'home.searchAria': '搜索模型',
            'home.sortUpdated': '最近更新',
            'home.sortName': '名称排序',
            'home.emptyTitle': '没有匹配的模型',
            'home.emptyBody': '请调整左侧筛选条件或搜索关键词。',
            'home.paginationTotal': '共{{count}}条',
            'home.paginationPerPage': '每页',
            'home.paginationItems': '条',
            'home.paginationGoTo': '前往',
            'home.paginationPage': '页',
            'home.cardFiles': '{{count}} 个文件',
            'footer.siteStatus': '由开发者自行维护，更新时间：{{timestamp}}',
            'cookie.message': '我们使用cookie来确保您的高速浏览体验。继续浏览本站，即表示您同意我们使用cookie。',
            'cookie.details': '详情',
            'detail.backToMarket': '← 返回模型市场',
            'detail.hfRepo': 'HF 镜像仓库',
            'detail.hfReadme': 'HF README',
            'detail.quickStart': '快速开始',
            'detail.repository': '代码仓库',
            'detail.license': '许可证',
            'detail.modelDescription': '模型描述',
            'detail.basicInfo': '基本信息',
            'detail.updatedDateLabel': '发布时间',
            'detail.lastUpdatedLabel': '最近更新',
            'detail.taskTypeLabel': '任务类型',
            'detail.availableFilesLabel': '可用文件',
            'detail.hfRepoLabel': 'HF Repo',
            'detail.pageViewsLabel': '页面浏览',
            'detail.downloadModel': '下载模型',
            'detail.downloadUnavailable': '暂无可用下载',
            'detail.openRepo': '打开 HF 镜像仓库',
            'detail.shareLink': '分享链接',
            'detail.linkCopied': '链接已复制',
            'detail.copyFailed': '复制失败',
            'detail.modelParams': '模型参数',
            'detail.downloadList': '下载清单',
            'detail.originModelLinks': '原始模型链接',
            'detail.readmeQuickStart': 'README / 快速开始',
            'detail.availableFilesCount': '{{count}} 个可用文件',
            'detail.pageViewsCount': '已浏览 {{count}} 次',
            'detail.noReadme': '暂无 README / 快速开始内容',
            'detail.modelFile': '模型文件',
            'detail.size': '大小',
            'detail.link': '链接',
            'detail.notFound': '未找到模型',
            'detail.defaultModelType': '模型',
            'detail.textLabel': '文本',
            'common.available': '可用',
            'common.unavailable': '暂无链接'
        },
        en: {
            'page.homeTitle': 'ModelZoo Mirror',
            'page.detailTitle': 'Model Detail - ModelZoo Mirror',
            'page.modelNotFoundTitle': 'Model Not Found - ModelZoo Mirror',
            'header.brandAria': 'ModelZoo Mirror',
            'header.brandTitle': 'ModelZoo Mirror',
            'header.navModelZoo': 'ModelZoo',
            'header.dateLabel': 'Date: {{date}}',
            'header.languageSwitcher': 'Language switcher',
            'language.zh': '中文',
            'language.en': 'EN',
            'home.filterTitle': 'Filters',
            'home.clearAll': 'Clear all',
            'home.sectionTask': 'Task',
            'home.sectionFramework': 'Framework',
            'home.sectionOs': 'Operating System',
            'home.sectionCompute': 'Compute Engine',
            'home.sectionLinks': 'Links',
            'home.hisparkForum': 'Hispark Forum',
            'home.hisiliconAiot': 'HiSilicon AIoT',
            'home.searchPlaceholder': 'Search model names',
            'home.searchAria': 'Search models',
            'home.sortUpdated': 'Recently updated',
            'home.sortName': 'Name',
            'home.emptyTitle': 'No matching models',
            'home.emptyBody': 'Adjust the filters or try a different search keyword.',
            'home.paginationTotal': '{{count}} total',
            'home.paginationPerPage': 'Per page',
            'home.paginationItems': 'items',
            'home.paginationGoTo': 'Go to',
            'home.paginationPage': 'page',
            'home.cardFiles': '{{count}} files',
            'footer.siteStatus': 'Maintained by developers. Updated at: {{timestamp}}',
            'cookie.message': 'We use cookies to keep this mirror fast and reliable. By continuing to browse, you agree to our use of cookies.',
            'cookie.details': 'Details',
            'detail.backToMarket': '← Back to model marketplace',
            'detail.hfRepo': 'HF Mirror Repo',
            'detail.hfReadme': 'HF README',
            'detail.quickStart': 'Quick Start',
            'detail.repository': 'Source Repository',
            'detail.license': 'License',
            'detail.modelDescription': 'Description',
            'detail.basicInfo': 'Basic Information',
            'detail.updatedDateLabel': 'Published',
            'detail.lastUpdatedLabel': 'Last Updated',
            'detail.taskTypeLabel': 'Task',
            'detail.availableFilesLabel': 'Available Files',
            'detail.hfRepoLabel': 'HF Repo',
            'detail.pageViewsLabel': 'Page Views',
            'detail.downloadModel': 'Download Model',
            'detail.downloadUnavailable': 'No download available',
            'detail.openRepo': 'Open HF Mirror Repo',
            'detail.shareLink': 'Share Link',
            'detail.linkCopied': 'Link copied',
            'detail.copyFailed': 'Copy failed',
            'detail.modelParams': 'Model Parameters',
            'detail.downloadList': 'Downloads',
            'detail.originModelLinks': 'Original Model Links',
            'detail.readmeQuickStart': 'README / Quick Start',
            'detail.availableFilesCount': '{{count}} available files',
            'detail.pageViewsCount': '{{count}} views',
            'detail.noReadme': 'No README or quick-start content available.',
            'detail.modelFile': 'Model File',
            'detail.size': 'Size',
            'detail.link': 'Link',
            'detail.notFound': 'Model not found',
            'detail.defaultModelType': 'Model',
            'detail.textLabel': 'Text',
            'common.available': 'Available',
            'common.unavailable': 'Unavailable'
        }
    };

    function normalizeLanguage(language) {
        const shortLanguage = String(language || '').toLowerCase().slice(0, 2);
        return SUPPORTED_LANGUAGES.has(shortLanguage) ? shortLanguage : 'zh';
    }

    function getStoredLanguage() {
        try {
            return normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
        } catch (error) {
            return 'zh';
        }
    }

    function getLanguage() {
        return normalizeLanguage(document.documentElement.lang || getStoredLanguage());
    }

    function getDictionary() {
        return DICTIONARY[getLanguage()] || DICTIONARY.zh;
    }

    function interpolate(template, values) {
        return String(template).replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (match, key) => {
            return Object.prototype.hasOwnProperty.call(values || {}, key) ? String(values[key]) : '';
        });
    }

    function t(key, values) {
        const dictionary = getDictionary();
        const fallbackDictionary = DICTIONARY.zh;
        const template = dictionary[key] || fallbackDictionary[key] || key;
        return interpolate(template, values || {});
    }

    function translateValue(value) {
        if (value == null || getLanguage() === 'zh') return value;
        return VALUE_TRANSLATIONS[value] || value;
    }

    function formatDateValue(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function formatCurrentDateLabel() {
        return t('header.dateLabel', { date: formatDateValue(new Date()) });
    }

    function getQuoteIndex() {
        try {
            const stored = Number(window.sessionStorage.getItem('daily-quote-index'));
            if (Number.isInteger(stored) && stored >= 0 && stored < QUOTES.length) {
                return stored;
            }
            const nextIndex = Math.floor(Math.random() * QUOTES.length);
            window.sessionStorage.setItem('daily-quote-index', String(nextIndex));
            return nextIndex;
        } catch (error) {
            return 0;
        }
    }

    function getCurrentQuote() {
        const quote = QUOTES[getQuoteIndex()] || QUOTES[0];
        return quote[getLanguage()] || quote.zh;
    }

    function formatCardFileCount(count) {
        return t('home.cardFiles', { count });
    }

    function formatPaginationTotal(count) {
        return t('home.paginationTotal', { count });
    }

    function formatAvailableFilesCount(count) {
        return t('detail.availableFilesCount', { count });
    }

    function formatPageViews(count) {
        return t('detail.pageViewsCount', { count });
    }

    function applyStaticTranslations(root) {
        const scope = root || document;

        scope.querySelectorAll('[data-i18n]').forEach((element) => {
            element.textContent = t(element.dataset.i18n);
        });

        scope.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
            element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder));
        });

        scope.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
            element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
        });

        scope.querySelectorAll('[data-i18n-title]').forEach((element) => {
            element.setAttribute('title', t(element.dataset.i18nTitle));
        });

        scope.querySelectorAll('[data-updated-at]').forEach((element) => {
            element.textContent = t('footer.siteStatus', { timestamp: element.dataset.updatedAt });
        });

        if (document.body && document.body.dataset.titleKey) {
            document.title = t(document.body.dataset.titleKey);
        }
    }

    function syncLanguageSwitcher() {
        document.querySelectorAll('.language-switcher [data-lang-option]').forEach((button) => {
            const isActive = button.dataset.langOption === getLanguage();
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function setLanguage(language, options) {
        const nextLanguage = normalizeLanguage(language);
        document.documentElement.lang = nextLanguage === 'en' ? 'en' : 'zh-CN';

        try {
            window.localStorage.setItem(STORAGE_KEY, nextLanguage);
        } catch (error) {
            // Ignore storage failures.
        }

        applyStaticTranslations(document);
        syncLanguageSwitcher();

        if (!(options && options.silent)) {
            document.dispatchEvent(new CustomEvent('site-language-change', {
                detail: { language: nextLanguage }
            }));
        }
    }

    function initLanguageSwitcher() {
        document.querySelectorAll('.language-switcher [data-lang-option]').forEach((button) => {
            if (button.dataset.languageBound === 'true') return;
            button.dataset.languageBound = 'true';
            button.addEventListener('click', () => {
                setLanguage(button.dataset.langOption);
            });
        });
        syncLanguageSwitcher();
    }

    window.siteI18n = {
        getLanguage,
        setLanguage,
        t,
        translateValue,
        formatCurrentDateLabel,
        getCurrentQuote,
        formatCardFileCount,
        formatPaginationTotal,
        formatAvailableFilesCount,
        formatPageViews,
        applyStaticTranslations
    };

    document.addEventListener('DOMContentLoaded', () => {
        setLanguage(getStoredLanguage(), { silent: true });
        initLanguageSwitcher();
    });
})();