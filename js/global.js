/* ============================================================
   global.js — Custom cursor · Page transitions · Lazy images
   Arthur Tillier — arthurtillier.com
   ============================================================ */

(function () {
  'use strict';

  /* ── PAGE TRANSITIONS ───────────────────────────────────── */
  const overlay = document.createElement('div');
  overlay.className = 'pt-overlay';
  document.body.appendChild(overlay);

  // Enter: overlay slides out when page loads (initial + bfcache restore)
  const resetOverlay = () => {
    requestAnimationFrame(() => {
      overlay.classList.remove('slide-in');
      overlay.classList.add('slide-out');
      document.body.classList.remove('is-navigating');
    });
  };

  window.addEventListener('DOMContentLoaded', resetOverlay);
  // Fix bfcache : quand on revient via history.back(), DOMContentLoaded
  // ne se déclenche pas — pageshow prend le relais
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) resetOverlay();
  });

  // Exit: overlay slides up from bottom when navigating away
  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || href.startsWith('javascript:') ||
        link.target === '_blank' ||
        link.hasAttribute('data-no-transition')) return;

    // External links — no transition
    try {
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
    } catch (e) { return; }

    e.preventDefault();
    overlay.classList.remove('slide-out');
    overlay.classList.add('slide-in');
    document.body.classList.add('is-navigating');

    setTimeout(() => { window.location.href = href; }, 560);
  });

  /* ── LAZY IMAGE FADE-IN ─────────────────────────────────── */
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });

})();
