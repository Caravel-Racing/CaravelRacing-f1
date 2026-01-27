// header-dropdown.js
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.querySelector('.nav .dropdown');
  if (!dropdown) return;

  const btn = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');
  let closeTimer = null;

  function openDropdown() {
    dropdown.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
  }
  function closeDropdown() {
    dropdown.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  // Keep open while pointer is inside container (optional redundancy for older browsers)
  dropdown.addEventListener('mouseenter', function () {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    openDropdown();
  });
  dropdown.addEventListener('mouseleave', function () {
    // small delay prevents flicker when moving quickly between button/menu
    closeTimer = setTimeout(() => { closeDropdown(); closeTimer = null; }, 150);
  });

  // Click toggles (useful for touch / click users)
  btn.addEventListener('click', function (e) {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) closeDropdown(); else openDropdown();
    e.stopPropagation();
  });

  // Keyboard accessibility
  btn.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeDropdown(); btn.focus(); }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) closeDropdown(); else openDropdown();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      openDropdown();
      const first = menu.querySelector('[role="menuitem"]');
      if (first) first.focus();
    }
  });

  // Close on outside click or Escape anywhere
  document.addEventListener('click', function (ev) {
    if (!dropdown.contains(ev.target)) closeDropdown();
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') closeDropdown();
  });

  // Ensure menu items are focusable for keyboard nav
  const items = menu.querySelectorAll('a[role="menuitem"]');
  items.forEach(it => it.setAttribute('tabindex', '0'));


  // Mobile submenu toggle
  const mobileToggle = document.querySelector('.mobile-submenu-toggle');
  if (mobileToggle) {
    const panel = document.getElementById(mobileToggle.getAttribute('aria-controls'));
    mobileToggle.addEventListener('click', function () {
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!expanded));
      if (panel) {
        if (expanded) {
          panel.hidden = true;
        } else {
          panel.hidden = false;
        }
      }
    });
  }
});
