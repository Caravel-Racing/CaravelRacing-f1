
(function () {
  function scrollToHash(hash) {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 0;
    const y = el.getBoundingClientRect().top + window.pageYOffset - Math.max(12, headerHeight);
    window.scrollTo({ top: y, behavior: 'smooth' });
    try {
      el.focus({ preventScroll: true });
    } catch (e) {
      // some browsers may not support options
      el.focus();
    }
  }

  // Prevent browser auto-restoration/jump and do our own smooth scroll.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // On initial paint — try after DOMContentLoaded and again on load (images/layout settled)
  document.addEventListener('DOMContentLoaded', function () {
    if (location.hash) {
      // cancel any automatic jump that might have occurred
      window.scrollTo(0, 0);
      // give layout a moment, then smooth scroll
      setTimeout(() => scrollToHash(location.hash), 150);
    }
  });

  // In case images/styles change layout after DOMContentLoaded, retry on load
  window.addEventListener('load', function () {
    if (location.hash) {
      // small additional delay to ensure final layout
      setTimeout(() => scrollToHash(location.hash), 80);
    }
  }, false);

  // Support in-page hash changes (clicks/navigation)
  window.addEventListener('hashchange', function () {
    // short delay to allow any potential layout change
    setTimeout(() => scrollToHash(location.hash), 40);
  }, false);
})();