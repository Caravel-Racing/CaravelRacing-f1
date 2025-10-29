// mobile-menu.js
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn = document.querySelector('.nav-close');

  if (!toggle || !mobileNav) return;

  function openMenu(){
    document.documentElement.classList.add('mobile-menu-open');
    toggle.setAttribute('aria-expanded','true');
    mobileNav.setAttribute('aria-hidden','false');
    const firstLink = mobileNav.querySelector('.mobile-links a');
    if (firstLink) firstLink.focus();
  }
  function closeMenu(){
    document.documentElement.classList.remove('mobile-menu-open');
    toggle.setAttribute('aria-expanded','false');
    mobileNav.setAttribute('aria-hidden','true');
    toggle.focus();
  }

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMenu(); else openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileNav.addEventListener('click', (ev) => {
    const panel = mobileNav.querySelector('.mobile-nav-panel');
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    if (ev.clientX < rect.left || ev.clientX > rect.right) closeMenu();
  });

  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && document.documentElement.classList.contains('mobile-menu-open')) {
      closeMenu();
    }
  });

  mobileNav.querySelectorAll('.mobile-links a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

    // lang close

  const langDesktop = document.getElementById('lang-toggle');
  const langMobile  = document.getElementById('lang-toggle-mobile');
  const TRANSITION_DELAY = 220; // ms — adjust to match your CSS animation length

  function revealLangModal() {
    if (typeof window.showLangModal === 'function') {
      window.showLangModal();
    } else {
      const modal = document.getElementById('lang-modal');
      if (modal) modal.setAttribute('aria-hidden', 'false');
    }

    // move focus to modal close button for a11y (after a short delay)
    const close = document.getElementById('lang-close');
    if (close) setTimeout(() => close.focus(), TRANSITION_DELAY + 30);
  }

  function openLangFromTrigger(ev) {
    if (ev && typeof ev.preventDefault === 'function') ev.preventDefault(); // anchors fallback

    // if mobile menu open, close it first then open modal after transition
    if (document.documentElement.classList.contains('mobile-menu-open')) {
      closeMenu();
      setTimeout(revealLangModal, TRANSITION_DELAY);
    } else {
      revealLangModal();
    }
  }

  if (langDesktop) langDesktop.addEventListener('click', openLangFromTrigger);
  if (langMobile)  langMobile.addEventListener('click', openLangFromTrigger);
})();
