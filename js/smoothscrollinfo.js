// members/info.html: smooth-scroll to hash on load (account for fixed header)
(function () {
  function scrollToHash(hash) {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 0;
    const y = el.getBoundingClientRect().top + window.pageYOffset - Math.max(12, headerHeight);
    window.scrollTo({ top: y, behavior: 'smooth' });
    el.focus({ preventScroll: true });
  }

  // On first paint (works for direct loads with hash)
  document.addEventListener('DOMContentLoaded', function () {
    if (location.hash) {
      // small timeout helps if layout/images still settling
      setTimeout(() => scrollToHash(location.hash), 80);
    }
  });

  // Also support immediate clicks that add hash to URL (e.g., user navigates within page)
  window.addEventListener('hashchange', function () {
    scrollToHash(location.hash);
  }, false);
})();
