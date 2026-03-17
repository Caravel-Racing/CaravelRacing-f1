/**
 * scrollscene.js
 * Three.js 3D car scene with GSAP ScrollTrigger camera movements
 * and scroll-linked HTML text animations.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/* ─── Wait for GSAP + ScrollTrigger (loaded via CDN <script>) ─── */
function waitForGSAP() {
  return new Promise((resolve) => {
    function check() {
      if (window.gsap && window.ScrollTrigger) {
        resolve({ gsap: window.gsap, ScrollTrigger: window.ScrollTrigger });
      } else {
        setTimeout(check, 50);
      }
    }
    check();
  });
}

/* ─── Wait for splash screen to finish ─── */
function waitForSplash() {
  return new Promise((resolve) => {
    const splash = document.getElementById('splash');
    if (!splash) { resolve(); return; }

    // Already hidden?
    if (splash.classList.contains('hidden') ||
      splash.getAttribute('aria-hidden') === 'true') {
      resolve(); return;
    }

    // Listen for the custom event
    document.addEventListener('splash-complete', () => resolve(), { once: true });

    // Fallback: observe changes
    const observer = new MutationObserver(() => {
      if (splash.classList.contains('hidden') ||
        splash.getAttribute('aria-hidden') === 'true') {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(splash, { attributes: true, attributeFilter: ['class', 'aria-hidden'] });

    // Safety fallback: max 8 seconds
    setTimeout(() => resolve(), 8000);
  });
}

/* ─── Main init ─── */
async function init() {
  const { gsap, ScrollTrigger } = await waitForGSAP();
  gsap.registerPlugin(ScrollTrigger);

  // ─── THREE.JS SCENE SETUP ───
  const canvas = document.getElementById('car-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);

  // Add subtle fog for depth
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.04);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    2000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Color space (compat)
  if (renderer.outputColorSpace !== undefined && THREE.SRGBColorSpace !== undefined) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  // Shadows
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // ─── LIGHTING ───
  scene.add(new THREE.AmbientLight(0xffffff, 3.0));

  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 2.0);
  scene.add(hemi);

  const dir = new THREE.DirectionalLight(0xffffff, 3.0);
  dir.position.set(5, 10, 7);
  dir.castShadow = true;
  dir.shadow.mapSize.set(1024, 1024);
  scene.add(dir);

  // ─── GROUND PLANE (subtle reflective surface) ───
  const groundGeo = new THREE.PlaneGeometry(100, 100);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    roughness: 0.7,
    metalness: 0.3
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.5;
  ground.receiveShadow = true;
  scene.add(ground);

  // ─── LOAD CAR MODEL ───
  const loader = new GLTFLoader();
  let carModel = null;
  let modelCenter = new THREE.Vector3();
  let modelSize = 1;

  try {
    const gltf = await new Promise((resolve, reject) => {
      loader.load(
        'model/modelo.glb',
        resolve,
        undefined,
        reject
      );
    });

    carModel = gltf.scene;

    // Center and measure the model
    const box = new THREE.Box3().setFromObject(carModel);
    const size = box.getSize(new THREE.Vector3());
    modelSize = Math.max(size.x, size.y, size.z);
    modelCenter = box.getCenter(new THREE.Vector3());

    carModel.position.sub(modelCenter);
    
    // Position ground dynamically to avoid cutting the wheels
    ground.position.y = -size.y / 2;

    // Enable shadows on all meshes
    carModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(carModel);
  } catch (err) {
    console.error('Failed to load 3D model:', err);
    // Fallback: just show the dark scene without the car
  }

  // ─── CAMERA KEYFRAMES ───
  // Each keyframe = { pos: [x,y,z], lookAt: [x,y,z] }
  const scale = modelSize || 3; // Fallback scale if model didn't load

  const keyframes = [
    // Hero: slightly elevated, clear beauty shot of the car initially visible
    {
      pos: new THREE.Vector3(scale * 1.5, scale * 0.4, scale * 1.8),
      lookAt: new THREE.Vector3(0, scale * 0.1, 0)
    },
    // Team: closer side profile view
    {
      pos: new THREE.Vector3(scale * 1.2, scale * 0.3, scale * 1.0),
      lookAt: new THREE.Vector3(0, scale * 0.05, 0)
    },
    // Objectives: front-wing dramatic angle (orbited ~90 degrees)
    {
      pos: new THREE.Vector3(-scale * 0.8, scale * 0.25, scale * 1.4),
      lookAt: new THREE.Vector3(0, 0, 0)
    },
    // News: top-down dramatic shot
    {
      pos: new THREE.Vector3(scale * 0.2, scale * 1.2, scale * 0.8),
      lookAt: new THREE.Vector3(0, 0, 0)
    },
    // KPIs: slight orbit back to beauty shot
    {
      pos: new THREE.Vector3(scale * 1.5, scale * 0.5, -scale * 0.8),
      lookAt: new THREE.Vector3(0, 0, 0)
    }
  ];

  // Set initial camera position
  camera.position.copy(keyframes[0].pos);
  camera.lookAt(keyframes[0].lookAt);

  // Track current lookAt for smooth interpolation
  const currentLookAt = keyframes[0].lookAt.clone();

  // ─── RENDER LOOP ───
  function render() {
    camera.lookAt(currentLookAt);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

  // ─── RESIZE HANDLER ───
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ─── Wait for splash, then setup GSAP ScrollTrigger animations ───
  await waitForSplash();

  // Small delay to ensure DOM is settled
  await new Promise(r => setTimeout(r, 300));

  // ─── GSAP SCROLL ANIMATIONS ───
  const sections = [
    '#section-hero',
    '#section-team',
    '#section-objectives',
    '#section-news',
    '#section-kpis'
  ];

  // Camera movement for each section transition
  sections.forEach((selector, i) => {
    if (i >= keyframes.length) return;

    const kf = keyframes[i];

    gsap.to(camera.position, {
      x: kf.pos.x,
      y: kf.pos.y,
      z: kf.pos.z,
      ease: 'none',
      scrollTrigger: {
        trigger: selector,
        start: 'top bottom',
        end: 'top top',
        scrub: 1.5
      }
    });

    gsap.to(currentLookAt, {
      x: kf.lookAt.x,
      y: kf.lookAt.y,
      z: kf.lookAt.z,
      ease: 'none',
      scrollTrigger: {
        trigger: selector,
        start: 'top bottom',
        end: 'top top',
        scrub: 1.5
      }
    });
  });

  // ─── SECTION TEXT ANIMATIONS ───

  // Team section — title from left, text from right
  const teamTitle = document.querySelector('#section-team .section-title');
  const teamText = document.querySelector('#section-team .section-text');

  if (teamTitle) {
    gsap.to(teamTitle, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#section-team',
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1
      }
    });
  }

  if (teamText) {
    gsap.to(teamText, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#section-team',
        start: 'top 70%',
        end: 'top 25%',
        scrub: 1
      }
    });
  }

  // Objectives section — title from right, text from left
  const objTitle = document.querySelector('#section-objectives .section-title');
  const objText = document.querySelector('#section-objectives .section-text');

  if (objTitle) {
    gsap.to(objTitle, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#section-objectives',
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1
      }
    });
  }

  if (objText) {
    gsap.to(objText, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#section-objectives',
        start: 'top 70%',
        end: 'top 25%',
        scrub: 1
      }
    });
  }

  // News card — fade in + scale up from center
  const newsCard = document.querySelector('.news-card');
  if (newsCard) {
    gsap.to(newsCard, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#section-news',
        start: 'top 75%',
        end: 'top 30%',
        scrub: 1
      }
    });
  }

  // KPIs — fade in + slide up
  const kpis = document.querySelector('.kpis');
  if (kpis) {
    gsap.to(kpis, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#section-kpis',
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1
      }
    });
  }

  // Refresh ScrollTrigger after everything is set up
  ScrollTrigger.refresh();
}

// Run!
init();
