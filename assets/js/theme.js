/**
 * Site themes.
 *
 * A theme is one entry in THEMES plus one stylesheet whose rules are scoped under
 * `html[data-theme="<id>"]` (see assets/css/theme-official.css). The foundation
 * stylesheet (style.css) is the 小黄鸭 look and needs no scoping. To add a theme:
 * append a registry entry, add its scoped stylesheet to the three pages, and add
 * `theme.<id>` labels (plus optional THEME_COPY overrides) to i18n.js.
 *
 * The default is set statically as `<html data-theme="official">`; the inline
 * pre-paint snippet in each page's <head> only overrides it from localStorage,
 * so the choice holds without JavaScript and never flashes.
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'modelzoo.theme';
    const DEFAULT_THEME = 'official';
    const THEMES = [
        {
            id: 'official',
            labelKey: 'theme.official',
            fallback: '官方',
            icon: '◐',
            themeColor: '#c7000b',
            favicon: 'data:image/svg+xml,' + encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
                '<rect width="64" height="64" rx="14" fill="#c7000b"/>' +
                '<text x="32" y="41" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="26" font-weight="700" fill="#fff">MZ</text>' +
                '</svg>'
            ),
        },
        {
            id: 'duck',
            labelKey: 'theme.duck',
            fallback: '小黄鸭',
            icon: '🦆',
            themeColor: '#ffd438',
            favicon: 'assets/images/modelzoo-duck-keeper.png',
        },
    ];
    const SWITCH_CLASS = 'theme-switching';
    const SWITCH_MS = 380;

    let switchTimer = null;

    function themeById(id) {
        return THEMES.find((theme) => theme.id === id) || null;
    }

    function normalizeTheme(id) {
        return themeById(id) ? id : DEFAULT_THEME;
    }

    function getStoredTheme() {
        try {
            return normalizeTheme(window.localStorage.getItem(STORAGE_KEY));
        } catch (error) {
            return DEFAULT_THEME;
        }
    }

    function getTheme() {
        return normalizeTheme(document.documentElement.getAttribute('data-theme'));
    }

    function prefersReducedMotion() {
        return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }

    function applyThemeAttributes(id) {
        const theme = themeById(id);
        document.documentElement.setAttribute('data-theme', id);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme.themeColor);
        const icon = document.getElementById('siteFavicon');
        if (icon && theme.favicon) {
            icon.setAttribute('type', theme.favicon.startsWith('data:image/svg') ? 'image/svg+xml' : 'image/png');
            icon.setAttribute('href', theme.favicon);
        }
    }

    function themeLabel(theme) {
        return window.siteI18n ? window.siteI18n.t(theme.labelKey) : theme.fallback;
    }

    // Re-run translations so theme-specific copy (THEME_COPY in i18n.js) is applied and
    // the pages re-render their dynamic content via the existing language-change event.
    function refreshCopy() {
        if (window.siteI18n) {
            window.siteI18n.setLanguage(window.siteI18n.getLanguage());
        }
    }

    function nextTheme(id) {
        const index = THEMES.findIndex((theme) => theme.id === id);
        return THEMES[(index + 1) % THEMES.length];
    }

    function syncSwitchers() {
        const active = getTheme();
        const activeTheme = themeById(active);
        const following = nextTheme(active);
        // Compact single button (shown on narrow screens by CSS): current icon, tap cycles.
        document.querySelectorAll('.theme-cycle').forEach((button) => {
            const icon = button.querySelector('.theme-btn-icon');
            if (icon) icon.textContent = activeTheme.icon;
            const label = window.siteI18n
                ? window.siteI18n.t('header.themeCycle', { current: themeLabel(activeTheme), next: themeLabel(following) })
                : `${themeLabel(activeTheme)} → ${themeLabel(following)}`;
            button.setAttribute('aria-label', label);
            button.setAttribute('title', label);
        });
        document.querySelectorAll('[data-theme-option]').forEach((button) => {
            const theme = themeById(button.dataset.themeOption);
            const isActive = theme && theme.id === active;
            button.classList.toggle('active', Boolean(isActive));
            button.setAttribute('aria-pressed', String(Boolean(isActive)));
            if (theme) {
                const label = themeLabel(theme);
                button.setAttribute('aria-label', label);
                button.setAttribute('title', label);
                const text = button.querySelector('.theme-btn-label');
                if (text) text.textContent = label;
            }
        });
    }

    function setTheme(id, options) {
        const next = normalizeTheme(id);
        const previous = getTheme();
        const silent = Boolean(options && options.silent);

        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch (error) {
            // Ignore storage failures; the choice still applies for this page.
        }

        if (next === previous) {
            syncSwitchers();
            return;
        }

        const commit = () => {
            applyThemeAttributes(next);
            refreshCopy();
            syncSwitchers();
            // Dispatched from inside commit so listeners always observe the new theme,
            // also when startViewTransition runs commit asynchronously.
            document.dispatchEvent(new CustomEvent('site-theme-change', {
                detail: { theme: next, previous },
            }));
        };

        if (silent || prefersReducedMotion()) {
            commit();
        } else if (typeof document.startViewTransition === 'function') {
            // Cross-fades the whole page, which also covers structural differences
            // (ticker, hero visual) that plain property transitions cannot animate.
            // A hidden document (background tab) aborts the transition but still runs
            // commit; swallow that rejection so it does not surface as an uncaught error.
            const transition = document.startViewTransition(commit);
            for (const key of ['ready', 'updateCallbackDone', 'finished']) {
                const promise = transition && transition[key];
                if (promise && typeof promise.catch === 'function') promise.catch(() => {});
            }
        } else {
            const root = document.documentElement;
            root.classList.add(SWITCH_CLASS);
            window.clearTimeout(switchTimer);
            switchTimer = window.setTimeout(() => root.classList.remove(SWITCH_CLASS), SWITCH_MS + 60);
            commit();
        }
    }

    function buildSwitcher(container) {
        if (container.dataset.themeBound === 'true') return;
        container.dataset.themeBound = 'true';
        container.setAttribute('role', 'group');
        container.innerHTML = THEMES.map((theme) => (
            `<button type="button" class="theme-btn" data-theme-option="${theme.id}" aria-pressed="false">` +
                `<span class="theme-btn-icon" aria-hidden="true">${theme.icon}</span>` +
                `<span class="theme-btn-label">${theme.fallback}</span>` +
            '</button>'
        )).join('') +
            '<button type="button" class="theme-cycle" data-theme-cycle>' +
                '<span class="theme-btn-icon" aria-hidden="true"></span>' +
            '</button>';
        container.addEventListener('click', (event) => {
            const cycle = event.target.closest('[data-theme-cycle]');
            if (cycle) {
                setTheme(nextTheme(getTheme()).id);
                return;
            }
            const button = event.target.closest('[data-theme-option]');
            if (button) setTheme(button.dataset.themeOption);
        });
    }

    function init() {
        // Keep the attribute and stored value consistent (e.g. storage cleared elsewhere).
        applyThemeAttributes(getStoredTheme());
        document.querySelectorAll('[data-theme-switcher]').forEach(buildSwitcher);
        syncSwitchers();
    }

    window.siteTheme = {
        THEMES,
        DEFAULT_THEME,
        STORAGE_KEY,
        getTheme,
        setTheme,
    };

    document.addEventListener('DOMContentLoaded', init);
    document.addEventListener('site-language-change', syncSwitchers);
})();
