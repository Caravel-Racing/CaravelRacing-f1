document.addEventListener('DOMContentLoaded', function () {
  const desktop = document.getElementById('lang-toggle');
  const mobile  = document.getElementById('lang-toggle-mobile');

  function openLang(e) {
    if (e) e.preventDefault();            // needed for anchors
    if (typeof window.showLangModal === 'function') {
      window.showLangModal();
      // update aria-expanded on the trigger (optional)
      [desktop, mobile].forEach(el => {
        if (el) el.setAttribute('aria-expanded', 'true');
      });
    } else {
      const modal = document.getElementById('lang-modal');
      if (modal) modal.setAttribute('aria-hidden', 'false');
    }
  }

  if (desktop) desktop.addEventListener('click', openLang);
  if (mobile) mobile.addEventListener('click', openLang);
});

