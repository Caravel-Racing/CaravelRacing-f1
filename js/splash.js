// splash
(function(){
    const splash = document.getElementById('splash');
    if (!splash) return;

    const SPLASH_KEY = 'caravel_splash_shown_v1'; 
    const urlParams = new URLSearchParams(location.search);
    const forceShow = urlParams.get('showSplash') === '1';

    function removeSplashImmediate() {
      try {
        splash.classList.add('hidden');
      } catch (e) {}
      try {
        if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
      } catch (e) {}
      try {
        document.documentElement.classList.remove('splash-active');
        document.body.classList.remove('splash-active');
      } catch (e) {}
      setTimeout(() => document.dispatchEvent(new Event('splash-complete')), 0);
    }

    window.addEventListener('pageshow', (ev) => {
      try {
        if (!forceShow && localStorage.getItem(SPLASH_KEY)) {
          removeSplashImmediate();
        }
      } catch (e) {
      }
    });

    try {
      if (!forceShow && localStorage.getItem(SPLASH_KEY)) {
        removeSplashImmediate();
        return;
      }
    } catch (e) {
    }

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
    const totalMs = 3000;      
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
        fill.style.width = progress + '%';
        num.textContent = progress;
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
      fill.style.width = '100%';
      num.textContent = '100';
      updateCar(100);
      updateLetters(100);

      try {
        localStorage.setItem(SPLASH_KEY, '1');
      } catch (e) {
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
