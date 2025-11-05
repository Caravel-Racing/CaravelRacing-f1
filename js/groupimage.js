// ...existing code...
(function(){
  const wrapper = document.getElementById('photoWrap');

  // list all members and their DOM IDs
  const MEMBERS = [
    { imgId: 'diogoCutout', nameId: 'diogoName' },
    { imgId: 'martimCutout', nameId: 'martimName' },
    { imgId: 'marianaCutout', nameId: 'marianaName' },
    { imgId: 'ferreiraCutout', nameId: 'ferreiraName' },
    { imgId: 'pedroCutout', nameId: 'pedroName' },
    { imgId: 'franciscoCutout', nameId: 'franciscoName' }
  ];

  if (!wrapper) {
    console.warn('photoWrap not found — check ID.');
    return;
  }

  // resolve DOM elements and create per-member canvas state
  const members = MEMBERS.map(m => ({
    img: document.getElementById(m.imgId) || null,
    nameElem: document.getElementById(m.nameId) || null,
    canvas: document.createElement('canvas'),
    ctx: null,
    ready: false,
    tainted: false
  }));

  // ensure at least one cutout exists
  if (members.every(m => !m.img)) {
    console.warn('No cutout images found — add images with IDs:', MEMBERS.map(m=>m.imgId).join(', '));
    return;
  }

  members.forEach(m => {
    m.ctx = m.canvas.getContext && m.canvas.getContext('2d');
  });

  const ALPHA_THRESHOLD = 20; // 0-255
  let lastInside = false;
  let raf = null;

  function prepareMemberCanvas(idx) {
    const m = members[idx];
    if (!m || !m.img || !m.ctx) return;

    if (!m.img.naturalWidth || !m.img.naturalHeight) return;
    m.canvas.width = m.img.naturalWidth;
    m.canvas.height = m.img.naturalHeight;

    try {
      m.ctx.clearRect(0,0,m.canvas.width,m.canvas.height);
      m.ctx.drawImage(m.img, 0, 0, m.canvas.width, m.canvas.height);
      // test read
      m.ctx.getImageData(0,0,1,1);
      m.ready = true;
      m.tainted = false;
    } catch (err) {
      // attempt reload with crossOrigin
      const alt = new Image();
      alt.crossOrigin = 'anonymous';
      alt.onload = () => {
        try {
          m.canvas.width = alt.naturalWidth || m.canvas.width;
          m.canvas.height = alt.naturalHeight || m.canvas.height;
          m.ctx.clearRect(0,0,m.canvas.width,m.canvas.height);
          m.ctx.drawImage(alt, 0, 0, m.canvas.width, m.canvas.height);
          m.ctx.getImageData(0,0,1,1);
          m.ready = true;
          m.tainted = false;
        } catch (e2) {
          m.tainted = true;
          m.ready = false;
          console.warn(`${m.img.id} cannot be sampled due to cross-origin restrictions.`);
        }
      };
      alt.onerror = () => {
        m.tainted = true;
        m.ready = false;
        console.warn(`Failed loading alt image for ${m.img.id}; will fallback to bounding-box hover.`);
      };
      alt.src = m.img.src + (m.img.src.indexOf('?') === -1 ? '?cachebust=1' : '&cachebust=1');
    }
  }

  // prepare all canvases
  members.forEach((m, i) => {
    if (m.img) {
      if (m.img.complete) prepareMemberCanvas(i);
      m.img.addEventListener('load', () => prepareMemberCanvas(i));
      m.img.addEventListener('error', () => console.warn(`Failed loading ${m.img.id}`));
      // ensure cutouts start hidden (CSS may do this already)
      m.img.style.opacity = '0';
      m.img.style.transition = 'opacity .15s linear';
      m.img.style.pointerEvents = 'none'; // let wrapper receive events
      m.img.setAttribute('aria-hidden', 'true');
    }
  });

  function anyCanvasReady() {
    return members.some(m => m.ready && !m.tainted);
  }

  function showNoCutout() {
    // hide all cutouts and remove pop
    members.forEach(m => { if (m.img) m.img.style.opacity = '0'; });
    wrapper.classList.remove('pop');
    lastInside = false;
  }

  function showMember(idx) {
    members.forEach((m, i) => { if (m.img) m.img.style.opacity = (i === idx ? '1' : '0'); });
    if (!lastInside) { wrapper.classList.add('pop'); lastInside = true; }
  }

  function handlePointer(clientX, clientY) {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => checkPoint(clientX, clientY));
  }

  function checkPoint(clientX, clientY) {
    const rect = wrapper.getBoundingClientRect();

    // outside wrapper -> hide
    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      showNoCutout();
      return;
    }

    // if no canvases are readable -> fallback to bounding-box (show pop for any hover)
    if (!anyCanvasReady()) {
      if (!lastInside) { wrapper.classList.add('pop'); lastInside = true; }
      return;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // check members in DOM order reversed (last drawn on top)
    for (let i = members.length - 1; i >= 0; i--) {
      const m = members[i];
      if (!m || !m.img || !m.ctx || m.tainted || !m.ready) continue;

      const scaleX = m.canvas.width / rect.width;
      const scaleY = m.canvas.height / rect.height;
      const nx = Math.floor(x * scaleX);
      const ny = Math.floor(y * scaleY);

      if (nx < 0 || ny < 0 || nx >= m.canvas.width || ny >= m.canvas.height) continue;

      try {
        const p = m.ctx.getImageData(nx, ny, 1, 1).data;
        if (p[3] > ALPHA_THRESHOLD) {
          showMember(i);
          return;
        }
      } catch (err) {
        // mark tainted and continue; fallback will apply if none left readable
        m.tainted = true;
        console.warn(`Pixel sampling failed for ${m.img.id}; marking tainted.`);
      }
    }

    // no member hit -> hide
    if (lastInside) {
      showNoCutout();
    }
  }

  // mouse & leave
  wrapper.addEventListener('mousemove', (e) => handlePointer(e.clientX, e.clientY));
  wrapper.addEventListener('mouseleave', () => { if (raf) cancelAnimationFrame(raf); showNoCutout(); });

  // touch support
  wrapper.addEventListener('touchstart', (ev) => {
    const t = ev.touches[0];
    if (t) handlePointer(t.clientX, t.clientY);
  }, {passive:true});
  wrapper.addEventListener('touchmove', (ev) => {
    const t = ev.touches[0];
    if (t) handlePointer(t.clientX, t.clientY);
  }, {passive:true});
  wrapper.addEventListener('touchend', () => { if (raf) cancelAnimationFrame(raf); showNoCutout(); });

  // keyboard accessibility: focus on name elements
  members.forEach((m, i) => {
    if (!m.nameElem) return;
    if (!m.nameElem.hasAttribute('tabindex')) m.nameElem.setAttribute('tabindex','0');
    m.nameElem.addEventListener('focus', () => { showMember(i); });
    m.nameElem.addEventListener('blur', () => { showNoCutout(); });
  });

  // try again in case images were cached
  setTimeout(() => members.forEach((_, i) => prepareMemberCanvas(i)), 120);


  
  // --- NAVIGATE TO members/info.html#anchor on click/tap ---
  function pageForMember(m) {
    if (!m || !m.img) return null;
    // prefer explicit data-page
    if (m.img.dataset && m.img.dataset.page) return m.img.dataset.page;
    // fallback to page derived from id -> members/info.html#diogo
    if (m.img.id) return 'members/info.html#' + m.img.id.replace(/Cutout$/i, '');
    return null;
  }

  function navigateToPage(target, openInNewTab) {
    if (!target) return;
    // if it's a local hash only (e.g. "#diogo"), make it a members page anchor
    if (target.startsWith('#')) {
      // navigate to members page with hash
      const url = 'members/info.html' + target;
      if (openInNewTab) window.open(url, '_blank');
      else window.location.href = url;
      return;
    }
    // otherwise target is a path like "members/info.html#diogo" or full URL
    if (openInNewTab) window.open(target, '_blank');
    else window.location.href = target;
  }

  // wrapper click: use sampling first, fallback to visible image
  wrapper.addEventListener('click', function (e) {
    const hit = typeof hitMemberAt === 'function' ? hitMemberAt(e.clientX, e.clientY) : -1;
    const idx = hit !== -1 ? hit : (typeof visibleMemberIndex === 'function' ? visibleMemberIndex() : -1);
    if (idx === -1) return;
    const target = pageForMember(members[idx]);
    if (!target) return;
    const openNew = e.ctrlKey || e.metaKey || e.shiftKey;
    navigateToPage(target, openNew);
  });

  // touchend handling
  wrapper.addEventListener('touchend', function (ev) {
    const t = ev.changedTouches && ev.changedTouches[0];
    if (!t) return;
    const hit = typeof hitMemberAt === 'function' ? hitMemberAt(t.clientX, t.clientY) : -1;
    const idx = hit !== -1 ? hit : (typeof visibleMemberIndex === 'function' ? visibleMemberIndex() : -1);
    if (idx === -1) return;
    const target = pageForMember(members[idx]);
    if (!target) return;
    // open in same tab on touch
    navigateToPage(target, false);
  }, {passive:true});


})();


