/*
  translator.js
  Frontend-only auto-translation for static SPA paths:
  - /en -> English
  - /de -> German
  - default Spanish untouched
*/
(function () {
  'use strict';

  const PATH_LANG_MAP = {
    en: 'en',
    de: 'de'
  };

  const SOURCE_LANG = 'es';
  const TARGET_TAGS = 'h1,h2,h3,h4,p,span,li,button,a';
  const CACHE_PREFIX = 'translator_cache_v2_';
  const SAVE_DEBOUNCE_MS = 250;
  const OBSERVER_DEBOUNCE_MS = 90;
  const MAX_TRANSLATION_CONCURRENCY = 6;

  const targetLang = detectTargetLanguage();
  if (!targetLang) return;

  document.documentElement.setAttribute('lang', targetLang);

  const cacheStorageKey = `${CACHE_PREFIX}${targetLang}`;
  const translationCache = Object.create(null);
  const inFlightTranslations = new Map();
  const textNodeMeta = new WeakMap();

  let cacheDirty = false;
  let cacheSaveTimer = null;
  let observerTimer = null;
  const pendingRoots = new Set();
  let staticTranslationsLoaded = false;

  function detectTargetLanguage() {
    const path = (window.location.pathname || '/').toLowerCase();
    const match = path.match(/^\/(en|de)(\/|$)/);
    if (!match) return null;
    return PATH_LANG_MAP[match[1]] || null;
  }

  function loadCache(storageKey) {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return Object.create(null);
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : Object.create(null);
    } catch (_err) {
      return Object.create(null);
    }
  }

  async function loadStaticTranslations() {
    if (staticTranslationsLoaded) return;

    try {
      const response = await fetch(`/translations/${targetLang}.json`, {
        method: 'GET',
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        const staticCache = await response.json();
        if (staticCache && typeof staticCache === 'object') {
          Object.assign(translationCache, staticCache);
          console.log(`📦 Loaded ${Object.keys(staticCache).length} static translations for ${targetLang}`);
        }
      }
    } catch (_err) {
      // Static file not available, will use localStorage + API
    }

    // Merge with localStorage
    const localCache = loadCache(cacheStorageKey);
    Object.assign(translationCache, localCache);

    staticTranslationsLoaded = true;
  }

  function scheduleSaveCache() {
    cacheDirty = true;
    if (cacheSaveTimer) return;

    cacheSaveTimer = window.setTimeout(() => {
      cacheSaveTimer = null;
      if (!cacheDirty) return;

      try {
        window.localStorage.setItem(cacheStorageKey, JSON.stringify(translationCache));
      } catch (_err) {
        // localStorage blocked/quota exceeded
      }

      cacheDirty = false;
    }, SAVE_DEBOUNCE_MS);
  }

  function shouldSkipText(text) {
    if (!text) return true;
    const trimmed = text.trim();
    if (!trimmed) return true;

    // Ignore numbers / numeric-like values
    if (/^[\d\s.,:%+\-\/()]+$/.test(trimmed)) return true;

    return false;
  }

  function isElementVisible(el) {
    if (!el || !el.isConnected) return false;
    if (el.closest('[hidden], [aria-hidden="true"], .notranslate, [data-no-translate]')) return false;

    const style = window.getComputedStyle(el);
    if (!style) return false;
    if (style.display === 'none' || style.visibility === 'hidden') return false;

    return true;
  }

  function normalizeNodeText(nodeValue) {
    if (typeof nodeValue !== 'string') return '';
    return nodeValue.trim();
  }

  function rebuildNodeText(rawText, translatedCore) {
    const leading = rawText.match(/^\s*/)?.[0] || '';
    const trailing = rawText.match(/\s*$/)?.[0] || '';
    return `${leading}${translatedCore}${trailing}`;
  }

  function getCachedTranslation(sourceText) {
    if (!Object.prototype.hasOwnProperty.call(translationCache, sourceText)) return null;
    return translationCache[sourceText];
  }

  function setCachedTranslation(sourceText, translatedText) {
    translationCache[sourceText] = translatedText;
    scheduleSaveCache();
  }

  async function translateText(sourceText) {
    const cached = getCachedTranslation(sourceText);
    if (cached !== null) return cached;

    if (inFlightTranslations.has(sourceText)) {
      return inFlightTranslations.get(sourceText);
    }

    const translationPromise = (async () => {
      try {
        const url = new URL('https://api.mymemory.translated.net/get');
        url.searchParams.set('q', sourceText);
        url.searchParams.set('langpair', `${SOURCE_LANG}|${targetLang}`);

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Translation HTTP ${response.status}`);
        }

        const data = await response.json();
        const translated = data?.responseData?.translatedText;
        const safeText = typeof translated === 'string' && translated.trim() ? translated : sourceText;

        setCachedTranslation(sourceText, safeText);
        return safeText;
      } catch (_err) {
        // fallback: store source to avoid repeated failing calls
        setCachedTranslation(sourceText, sourceText);
        return sourceText;
      } finally {
        inFlightTranslations.delete(sourceText);
      }
    })();

    inFlightTranslations.set(sourceText, translationPromise);
    return translationPromise;
  }

  function collectTextNodes(root) {
    const nodes = [];
    const walkRoot = root && root.nodeType ? root : document.body;
    if (!walkRoot) return nodes;

    const walker = document.createTreeWalker(
      walkRoot,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node || !node.parentElement) return NodeFilter.FILTER_REJECT;

          const host = node.parentElement.closest(TARGET_TAGS);
          if (!host) return NodeFilter.FILTER_REJECT;
          if (!isElementVisible(host)) return NodeFilter.FILTER_REJECT;

          const text = normalizeNodeText(node.nodeValue);
          if (shouldSkipText(text)) return NodeFilter.FILTER_REJECT;

          const meta = textNodeMeta.get(node);
          if (meta && meta.lang === targetLang && text === meta.translated) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let current;
    while ((current = walker.nextNode())) {
      nodes.push(current);
    }

    return nodes;
  }

  function applyNodeTranslation(node, sourceText, translatedText) {
    if (!node || !node.parentElement || !node.isConnected) return;

    const rawText = node.nodeValue || '';
    const currentText = normalizeNodeText(rawText);

    // Avoid overriding if content changed while request was in-flight
    if (currentText !== sourceText && currentText !== translatedText) return;

    if (translatedText && translatedText !== sourceText) {
      node.nodeValue = rebuildNodeText(rawText, translatedText);
    }

    textNodeMeta.set(node, {
      lang: targetLang,
      source: sourceText,
      translated: translatedText || sourceText
    });
  }

  async function runWithConcurrency(items, worker, limit) {
    if (!items.length) return;

    const queue = items.slice();
    const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
      while (queue.length) {
        const item = queue.shift();
        if (item === undefined) break;
        await worker(item);
      }
    });

    await Promise.all(workers);
  }

  async function processRoot(root) {
    const nodes = collectTextNodes(root);
    if (!nodes.length) return;

    const grouped = new Map();

    for (const node of nodes) {
      const rawText = node.nodeValue || '';
      const sourceText = normalizeNodeText(rawText);
      if (shouldSkipText(sourceText)) continue;

      if (!grouped.has(sourceText)) {
        grouped.set(sourceText, []);
      }

      grouped.get(sourceText).push(node);
    }

    if (!grouped.size) return;

    // First pass: instant paint from cache
    for (const [sourceText, list] of grouped.entries()) {
      const cached = getCachedTranslation(sourceText);
      if (cached === null) continue;

      for (const node of list) {
        applyNodeTranslation(node, sourceText, cached);
      }
    }

    // Second pass: request only missing unique strings (parallel with limit)
    const missingSourceTexts = [];
    for (const sourceText of grouped.keys()) {
      if (getCachedTranslation(sourceText) === null) {
        missingSourceTexts.push(sourceText);
      }
    }

    await runWithConcurrency(
      missingSourceTexts,
      async (sourceText) => {
        const translated = await translateText(sourceText);
        const list = grouped.get(sourceText) || [];

        for (const node of list) {
          applyNodeTranslation(node, sourceText, translated);
        }
      },
      MAX_TRANSLATION_CONCURRENCY
    );
  }

  function scheduleProcess(root) {
    pendingRoots.add(root || document.body);

    if (observerTimer) return;
    observerTimer = window.setTimeout(async () => {
      observerTimer = null;

      const roots = Array.from(pendingRoots);
      pendingRoots.clear();

      for (const r of roots) {
        await processRoot(r);
      }
    }, OBSERVER_DEBOUNCE_MS);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
            scheduleProcess(node);
          }
        });
      }
exposeExportHelper() {
    window.__exportTranslations = function() {
      const data = {
        language: targetLang,
        count: Object.keys(translationCache).length,
        translations: translationCache
      };

      const blob = new Blob([JSON.stringify(data.translations, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `translations-${targetLang}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log(`✅ Downloaded ${data.count} translations for ${targetLang}`);
      console.log('💡 Place this file at /public/translations/' + targetLang + '.json');
    };

    console.log(`🌐 Translation helper loaded for ${targetLang}`);
    console.log('📥 Run __exportTranslations() to download current translations');
  }

  async function start() {
    await loadStaticTranslations();
    
    scheduleProcess(document.body);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    installSpaNavigationHooks();
    exposeExportHelpere = history.replaceState;

    history.pushState = function pushStatePatched() {
      const result = originalPushState.apply(this, arguments);
      scheduleProcess(document.body);
      return result;
    };

    history.replaceState = function replaceStatePatched() {
      const result = originalReplaceState.apply(this, arguments);
      scheduleProcess(document.body);
      return result;
    };

    window.addEventListener('popstate', () => scheduleProcess(document.body));
    window.addEventListener('hashchange', () => scheduleProcess(document.body));
  }

  function start() {
    scheduleProcess(document.body);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    installSpaNavigationHooks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
