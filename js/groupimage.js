
/* Pixel-hover: sample the same-size transparent PNG under the mouse.
   Works with #photoWrap and #diogoCutout from your HTML.
*/
(function(){
  const wrapper = document.getElementById('photoWrap');
  const diogoImg = document.getElementById('diogoCutout');
  const nameElem = document.getElementById('diogoName');

  if (!wrapper || !diogoImg) {
    console.warn('photoWrap or diogoCutout not found — check IDs.');
    return;
  }

  // Offscreen canvas to sample pixels
  const off = document.createElement('canvas');
  const offCtx = off.getContext('2d');

  let imgReady = false;
  let tainted = false;
  let lastInside = false;
  const ALPHA_THRESHOLD = 20; // 0-255; raise to reduce edge hits

  function prepareCanvas() {
    if (!diogoImg.naturalWidth || !diogoImg.naturalHeight) return;
    off.width = diogoImg.naturalWidth;
    off.height = diogoImg.naturalHeight;
    try {
      offCtx.clearRect(0,0,off.width, off.height);
      offCtx.drawImage(diogoImg, 0, 0, off.width, off.height);
      // attempt to read pixel to detect taint
      offCtx.getImageData(0,0,1,1);
      imgReady = true;
      tainted = false;
    } catch (err) {
      // Try to reload the image with crossOrigin and draw that one
      const alt = new Image();
      alt.crossOrigin = 'anonymous';
      alt.onload = () => {
        try {
          off.width = alt.naturalWidth || diogoImg.naturalWidth;
          off.height = alt.naturalHeight || diogoImg.naturalHeight;
          offCtx.clearRect(0,0,off.width, off.height);
          offCtx.drawImage(alt, 0, 0, off.width, off.height);
          offCtx.getImageData(0,0,1,1); // test again
          imgReady = true;
          tainted = false;
          // replace for future draws (not strictly necessary)
        } catch (e2) {
          tainted = true;
          imgReady = false;
          console.warn('diogo PNG cannot be sampled due to cross-origin restrictions. Falling back to bounding-box hover.');
        }
      };
      alt.onerror = () => {
        tainted = true;
        imgReady = false;
        console.warn('Failed loading alt diogo image; falling back to bounding-box hover.');
      };
      // set src after crossOrigin
      alt.src = diogoImg.src + (diogoImg.src.indexOf('?') === -1 ? '?cachebust=1' : '&cachebust=1');
    }
  }

  if (diogoImg.complete) prepareCanvas();
  diogoImg.addEventListener('load', prepareCanvas);
  diogoImg.addEventListener('error', ()=>console.warn('Failed loading diogo image'));

  // requestAnimationFrame throttling
  let raf = null;

  function handlePointer(clientX, clientY) {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => checkPoint(clientX, clientY));
  }

  function checkPoint(clientX, clientY) {
    const rect = wrapper.getBoundingClientRect();

    // outside wrapper -> hide
    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
      if (lastInside) { wrapper.classList.remove('pop'); lastInside = false; }
      return;
    }

    // fallback: if canvas is tainted or not ready, show when inside wrapper
    if (tainted || !imgReady) {
      if (!lastInside) { wrapper.classList.add('pop'); lastInside = true; }
      return;
    }

    // map mouse coords to image natural pixels
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const scaleX = off.width / rect.width;
    const scaleY = off.height / rect.height;

    const nx = Math.floor(x * scaleX);
    const ny = Math.floor(y * scaleY);

    if (nx < 0 || ny < 0 || nx >= off.width || ny >= off.height) {
      if (lastInside) { wrapper.classList.remove('pop'); lastInside = false; }
      return;
    }

    try {
      const p = offCtx.getImageData(nx, ny, 1, 1).data;
      const alpha = p[3];
      if (alpha > ALPHA_THRESHOLD) {
        if (!lastInside) { wrapper.classList.add('pop'); lastInside = true; }
      } else {
        if (lastInside) { wrapper.classList.remove('pop'); lastInside = false; }
      }
    } catch (err) {
      // unexpected failure -> fallback to bounding-box
      tainted = true;
      if (!lastInside) { wrapper.classList.add('pop'); lastInside = true; }
      console.warn('Pixel sampling failed mid-run; switching to bounding-box behavior.');
    }
  }

  // Mouse events
  wrapper.addEventListener('mousemove', (e) => handlePointer(e.clientX, e.clientY));
  wrapper.addEventListener('mouseleave', () => { if (raf) cancelAnimationFrame(raf); wrapper.classList.remove('pop'); lastInside = false; });

  // Touch support: use touchmove for continuous, touchend to hide
  wrapper.addEventListener('touchstart', (ev) => {
    const t = ev.touches[0];
    if (t) handlePointer(t.clientX, t.clientY);
  }, {passive: true});
  wrapper.addEventListener('touchmove', (ev) => {
    const t = ev.touches[0];
    if (t) handlePointer(t.clientX, t.clientY);
  }, {passive: true});
  wrapper.addEventListener('touchend', () => { if (raf) cancelAnimationFrame(raf); wrapper.classList.remove('pop'); lastInside = false; });

  // Keyboard accessibility: focus on the name shows the pop
  if (nameElem) {
    nameElem.addEventListener('focus', ()=> wrapper.classList.add('pop'));
    nameElem.addEventListener('blur', ()=> wrapper.classList.remove('pop'));
    if (!nameElem.hasAttribute('tabindex')) nameElem.setAttribute('tabindex','0');
  }

  // in case image was cached and natural dims not ready earlier
  setTimeout(prepareCanvas, 120);
})();
