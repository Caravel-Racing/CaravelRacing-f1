// Duração em ms — deve corresponder a --splash-duration se alterares em CSS
const DURATION = 4500;

// elementos
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const splash = document.getElementById('splash');

// bloquear scroll enquanto splash está activo
document.body.classList.add('no-scroll');

// respeitar preferência do utilizador por pouca animação
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) {
  progressText.textContent = '100%';
  progressBar.style.width = '100%';
  endSplashSoon();
} else {
  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const pct = Math.min(1, elapsed / DURATION);
    const value = Math.round(pct * 100);
    progressText.textContent = value + '%';
    progressBar.style.width = value + '%';

    if (elapsed < DURATION) {
      window.requestAnimationFrame(step);
    } else {
      endSplashSoon();
    }
  }
  window.requestAnimationFrame(step);
}

function endSplashSoon() {
  // fade out
  splash.classList.add('splash-hidden');
  // remover overlay do fluxo e desbloquear scroll após a transição
  setTimeout(() => {
    splash.style.display = 'none';
    splash.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }, 600);
}
