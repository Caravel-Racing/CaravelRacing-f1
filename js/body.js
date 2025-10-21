// Mobile side-nav toggle for small screens
(function(){
	const hamburger = document.querySelector('.mobile-hamburger');
	const mobileNav = document.getElementById('mobile-nav');
	const mobileClose = document.querySelector('.mobile-close');

	if (!hamburger || !mobileNav) return;

	function openNav(){
		mobileNav.setAttribute('aria-hidden','false');
		hamburger.setAttribute('aria-expanded','true');
		document.documentElement.classList.add('mobile-nav-open');
		// prevent background scroll on small devices
		document.body.style.overflow = 'hidden';
	}

	function closeNav(){
		mobileNav.setAttribute('aria-hidden','true');
		hamburger.setAttribute('aria-expanded','false');
		document.documentElement.classList.remove('mobile-nav-open');
		document.body.style.overflow = '';
	}

	hamburger.addEventListener('click', (e)=>{
		const open = mobileNav.getAttribute('aria-hidden') === 'false';
		if (open) closeNav(); else openNav();
	});

	mobileClose && mobileClose.addEventListener('click', closeNav);

	// close when clicking outside the inner nav
	mobileNav.addEventListener('click', (ev)=>{
		if (ev.target === mobileNav) closeNav();
	});

	// close on link click
	mobileNav.querySelectorAll('a').forEach(a=> a.addEventListener('click', closeNav));

	// close on Escape
	window.addEventListener('keydown', (ev)=>{
		if (ev.key === 'Escape') closeNav();
	});

})();