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
})();
