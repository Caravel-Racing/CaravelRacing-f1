// splash (robust, localStorage + cookie fallback, debug via ?debug=1)
(function(){
  const splash = document.getElementById('splash');
  if (!splash) return;

  const SPLASH_KEY_BASE = 'caravel_splash_shown';
  const SPLASH_VERSION = 'v1'; // bump to v2 when you want everyone to see it again
  const SPLASH_KEY = `${SPLASH_KEY_BASE}_${SPLASH_VERSION}`;
  const urlParams = new URLSearchParams(location.search);
  const forceShow = urlParams.get('showSplash') === '1';
  const debug = urlParams.get('debug') === '1';

  function log(...args) { if (debug) console.log('[splash]', ...args); }

  // cookie helpers (fallback when localStorage unavailable)
  function setCookie(name, value, days=365) {
    try {
      const expires = new Date(Date.now() + days*864e5).toUTCString();
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
    } catch (e) { /* no-op */ }
  }
  function getCookie(name) {
    try {
      return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts.slice(1).join('=')) : r;
      }, null);
    } catch (e) { return null; }
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(key, value);
      log('storageSet -> localStorage', key);
      return true;
    } catch (e) {
      // fallback to cookie
      setCookie(key, value);
      log('storageSet -> cookie fallback', key);
      return false;
    }
  }

  function storageGet(key) {
    try {
      const v = localStorage.getItem(key);
      log('storageGet localStorage', key, v);
      return v;
    } catch (e) {
      const c = getCookie(key);
      log('storageGet cookie fallback', key, c);
      return c;
    }
  }

  function removeSplashImmediate() {
    log('removeSplashImmediate');
    try { splash.classList.add('hidden'); } catch (e) {}
    try { if (splash && splash.parentNode) splash.parentNode.removeChild(splash); } catch (e) {}
    try {
      document.documentElement.classList.remove('splash-active');
      document.body.classList.remove('splash-active');
    } catch (e) {}
    setTimeout(() => document.dispatchEvent(new Event('splash-complete')), 0);
  }

  // pageshow handler (bfcache/back-forward)
  window.addEventListener('pageshow', (ev) => {
    try {
      if (!forceShow && storageGet(SPLASH_KEY)) {
        log('pageshow: key present -> skip splash');
        removeSplashImmediate();
      } else {
        log('pageshow: no key -> normal splash');
      }
    } catch (e) {
      log('pageshow error', e);
    }
  });

  // If already shown (and not forced), skip immediately
  try {
    if (!forceShow && storageGet(SPLASH_KEY)) {
      log('startup: key present -> skipping splash');
      removeSplashImmediate();
      return;
    }
  } catch (e) {
    log('startup storage check failed', e);
  }

  // ---------- original splash logic (kept intact, with storage persist at end) ----------
  const splashInner = splash.querySelector('.splash-inner');
  const splashBar   = splash.querySelector('.splash-bar');
  const fill        = splash.querySelector('.splash-fill');
  const num         = document.getElementById('splash-num');
  const car         = splash.querySelector('.splash-car'); 
  const lettersWrap = document.getElementById('splash-letters');

  (function groupLettersIntoWords(){
    if (!lettersWrap) return;
    const letterNodes = Array.from(lettersWrap.querySelectorAll('.splash-letter'));
    if (!letterNodes.length) return;

    const frag = document.createDocumentFragment();
    let word = document.createElement('span');
    word.className = 'splash-word';

    letterNodes.forEach((ln) => {
      const text = (ln.textContent || '').replace(/\u00A0/g, ' ').trim();
      if (text === '') {
        if (word.childNodes.length) {
          frag.appendChild(word);
          word = document.createElement('span');
          word.className = 'splash-word';
        }

        const spacer = document.createElement('span');
        spacer.className = 'splash-letter splash-space';
        spacer.innerHTML = '&nbsp;';
        frag.appendChild(spacer);
      } else {
        word.appendChild(ln);
      }
    });

    if (word.childNodes.length) frag.appendChild(word);
    lettersWrap.innerHTML = '';
    lettersWrap.appendChild(frag);
  })();

  const letters = lettersWrap ? Array.from(lettersWrap.querySelectorAll('.splash-letter')) : [];
  const splashGifWrap = splash.querySelector('.splash-gif-wrap');
  const splashGif = splash.querySelector('.splash-gif');

  // CONFIG
  const totalMs = 3500;      
  const safetyExtra = 2000; 

  let progress = 0;
  let running = true;
  let minTimeReached = false;
  let pageLoaded = false;

  document.documentElement.classList.add('splash-active');
  document.body.classList.add('splash-active');

  const stepDelay = Math.max(20, Math.round(totalMs / 99));

  function updateCar(pct) {
    if (!car || !splashBar || !splashInner) return;
    const innerRect = splashInner.getBoundingClientRect();
    const barRect   = splashBar.getBoundingClientRect();
    const carRect   = car.getBoundingClientRect();
    const barOffset = barRect.left - innerRect.left;
    const xCenter = barOffset + (pct / 100) * barRect.width;
    const leftPx = xCenter - (carRect.width / 2);
    const clamped = Math.max(0, Math.min(leftPx, innerRect.width - carRect.width));
    car.style.left = clamped + 'px';
  }

  function updateLetters(pct){
    if (!letters || !letters.length) return;
    const total = letters.length;
    const pos = (pct / 100) * total;
    for(let i=0;i<total;i++){
      const el = letters[i];
      const idx = i + 1;
      if (idx <= Math.floor(pos)){
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
      } else if (idx === Math.floor(pos) + 1){
        const partial = Math.max(0, Math.min(1, pos - Math.floor(pos)));
        el.style.opacity = String(partial);
        const y = (1 - partial) * 8; 
        const s = 0.98 + (partial * 0.02);
        el.style.transform = `translateY(${y}px) scale(${s})`;
      } else {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px) scale(0.98)';
      }
    }
  }

  function ensureCarReadyAndUpdate() {
    if (!car) return updateCar(progress);
    if (car.tagName === 'IMG') {
      if (!car.complete) {
        car.addEventListener('load', () => updateCar(progress), { once: true });
        car.addEventListener('error', () => updateCar(progress), { once: true });
      } else {
        updateCar(progress);
      }
    } else {
      updateCar(progress);
    }
  }

  let interval = setInterval(() => {
    if (!running) { clearInterval(interval); return; }
    if (progress < 99) {
      progress += 1;
      if (fill) fill.style.width = progress + '%';
      if (num) num.textContent = progress;
      updateCar(progress);
      updateLetters(progress);
    } else {
      clearInterval(interval);
    }
  }, stepDelay);

  function finishNow() {
    if (!running) return;
    running = false;
    clearInterval(interval);
    progress = 100;
    if (fill) fill.style.width = '100%';
    if (num) num.textContent = '100';
    updateCar(100);
    updateLetters(100);

    // Persist that we've shown the splash (so future visits skip it)
    try {
      storageSet(SPLASH_KEY, '1');
      log('finishNow: persisted key', SPLASH_KEY);
    } catch (e) {
      log('finishNow: persist failed', e);
    }

    setTimeout(() => {
      splash.classList.add('hidden');
      splash.addEventListener('transitionend', () => {
        if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
      }, { once: true });
      document.documentElement.classList.remove('splash-active');
      document.body.classList.remove('splash-active');
      document.dispatchEvent(new Event('splash-complete'));
    }, 300);
  }

  setTimeout(() => {
    minTimeReached = true;
    if (pageLoaded) finishNow();
  }, totalMs);

  window.addEventListener('load', () => {
    pageLoaded = true;
    if (minTimeReached) finishNow();
  });

  setTimeout(() => {
    if (running) finishNow();
  }, totalMs + safetyExtra);

  window.addEventListener('resize', () => {
    setTimeout(() => ensureCarReadyAndUpdate(), 60);
  });

  setTimeout(() => ensureCarReadyAndUpdate(), 20);

  function restartGif() {
    if (!splashGif || !splashGif.parentNode) return;
    const src = (splashGif.getAttribute('src') || '').split('?')[0];
    const newGif = document.createElement('img');

    newGif.className = splashGif.className;
    newGif.alt = splashGif.alt || '';
    newGif.setAttribute('aria-hidden', 'true');
    newGif.style.pointerEvents = 'none';

    newGif.src = src + '?_=' + Date.now();

    newGif.addEventListener('load', () => {
      if (splashGif.parentNode) splashGif.parentNode.replaceChild(newGif, splashGif);
    }, { once: true });
    setTimeout(() => {
      if (splashGif.parentNode) splashGif.parentNode.replaceChild(newGif, splashGif);
    }, 250);
  }

  restartGif();

  window.addEventListener('pageshow', (ev) => {
    restartGif();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') restartGif();
  });

})();
