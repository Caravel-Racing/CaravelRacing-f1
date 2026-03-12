const langModalHtml = `
  <!-- Language picker modal -->
  <div id="lang-modal" class="lang-modal" aria-hidden="true" role="dialog" aria-label="Language selector">
    <div class="lang-panel" role="document">
      <h3 data-i18n="lang.title">Choose language</h3>
      <p data-i18n="lang.subtitle">Which language do you want to use?</p>

      <div class="lang-buttons">
        <button class="lang-btn" data-lang="en" aria-label="English">English</button>
        <button class="lang-btn" data-lang="pt" aria-label="Português">Português</button>
      </div>

      <p class="lang-remember">
        <label>
          <input type="checkbox" id="remember-lang" />
          <span data-i18n="lang.remember">Remember my choice</span>
        </label>
      </p>

      <button id="lang-close" class="lang-close" aria-label="Close">×</button>
    </div>
  </div>
`;

const headerHtml = `
  <header class="site-header">
    <div class="container header-inner">
      <img class="site-logo" src="../images/logonobg.png" alt="Caravel Racing logo">
      <div class="brand-stack" aria-hidden="false">
        <span class="brand-top">Caravel</span>
        <span class="brand-bottom">Racing</span>
      </div>

      <!-- Mobile hamburger (hidden on desktop) -->
      <button class="nav-toggle" aria-controls="mobile-nav" aria-expanded="false" aria-label="Menu">
        <span class="hamburger" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <!-- Desktop nav (kept for larger screens) -->
      <nav class="nav">
        <a href="../index.html" data-i18n="nav.home">Home</a>
        <a href="../projects.html" data-i18n="nav.projects">Projects</a>
        <a href="../jogos.html" data-i18n="nav.games">Games</a>
        <div class="nav-item dropdown" id="aboutDropdownWrap">
          <button class="dropdown-toggle" id="aboutDropdown" aria-haspopup="true" aria-expanded="false"
            data-i18n="nav.about">
            About the Team
          </button>

          <ul class="dropdown-menu" role="menu" aria-labelledby="aboutDropdown">
            <li role="none"><a role="menuitem" href="../members/info.html" data-i18n="nav.about2">Meet the Crew</a>
            </li>
            <li role="none"><a role="menuitem" href="../sobre-equipa.html" data-i18n="nav.about3">Information</a></li>
          </ul>
        </div>
        <a href="../patrocinadores.html" data-i18n="nav.sponsors">Sponsors</a>
        <a href="../chat.html">NavAI</a>
        <a href="../contact.html" data-i18n="nav.contact">Contact Us</a>
      </nav>

      <a class="header-social desktop-only" href="https://instagram.com/caravelracing" target="_blank"
        rel="noopener noreferrer" aria-label="Caravel Racing on Instagram" title="Instagram — Caravel Racing">
        <img src="../images/instagram.png" alt="Instagram icon">
      </a>

      <a class="header-social desktop-only" href="https://www.linkedin.com/in/caravel-racing-387b613a8" target="_blank"
        rel="noopener noreferrer" aria-label="Caravel Racing LinkedIn" title="LinkedIn — Caravel Racing">
        <img src="../images/linkedin.png" alt="LinkedIn icon">
      </a>

      <!-- Language selector (desktop) -->
      <a class="header-social desktop-only" href="#" id="lang-toggle" aria-label="Change language"
        title="Change language">
        <img src="../images/language.png" alt="Select language" />
      </a>

      <h1 class="brand"><span class="brand-red">CAR</span><span class="brand-avel">AVEL Racing</span></h1>
    </div>

    <!-- Mobile panel (hidden by default, slides in) -->
    <div id="mobile-nav" class="mobile-nav" aria-hidden="true">
      <div class="mobile-nav-panel">
        <button class="nav-close" aria-label="Close menu">&times;</button>

        <nav class="mobile-links" role="navigation" aria-label="Menu principal">
          <a href="../index.html" data-i18n="nav.home">Home</a>
          <a href="../projects.html" data-i18n="nav.projects">Projects</a>
          <a href="../jogos.html" data-i18n="nav.games">Games</a>

          <!-- Mobile About accordion: collapsed by default -->
          <div class="mobile-submenu">
            <button class="mobile-submenu-toggle" aria-expanded="false" aria-controls="mobile-about-list"
              id="mobileAboutToggle">
              About the Team
            </button>

            <div id="mobile-about-list" class="mobile-about-list" hidden>
              <a href="../members/info.html" data-i18n="nav.about2">Meet the Crew</a>
              <a href="../sobre-equipa.html" data-i18n="nav.about3">Information</a>
            </div>
          </div>

          <a href="../patrocinadores.html" data-i18n="nav.sponsors">Sponsors</a>
          <a href="../chat.html">NavAI</a>
          <a href="../contact.html" data-i18n="nav.contact">Contact Us</a>
        </nav>


        <!-- Socials placed below the links (mobile) -->
        <div class="mobile-socials" aria-label="Social links">
          <a href="https://instagram.com/caravelracing" target="_blank" rel="noopener noreferrer"
            class="mobile-social-link" aria-label="Caravel Racing on Instagram">
            <img src="../images/instagram.png" alt="" aria-hidden="true" />
          </a>

          <button id="lang-toggle-mobile" class="mobile-lang mobile-only lang-trigger" aria-label="Change language"
            title="Change language" aria-haspopup="dialog" aria-expanded="false">
            <img src="../images/language.png" alt="Select language" />
          </button>
        </div>

      </div>
    </div>
  </header>
`;

document.write(langModalHtml + headerHtml);

// Highlight the nav link that matches the current page
(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  if (page === 'jogoreacao.html') {
    page = 'jogos.html';
  }
  var segments = location.pathname.replace(/^\//, '').split('/');
  var dir = segments.length > 1 ? segments[segments.length - 2] + '/' : '';

  var dirMap = {
    'projects/': 'projects.html',
    'members/': 'info.html',
    'beneficios/': 'patrocinadores.html'
  };

  var links = document.querySelectorAll('.nav a, .mobile-links a, .mobile-about-list a');
  var matched = false;

  links.forEach(function (link) {
    var linkFile = link.getAttribute('href').split('/').pop();
    if (linkFile === page) {
      link.classList.add('nav-active');
      matched = true;
    }
  });

  if (!matched && dir) {
    var parentFile = dirMap[dir];
    if (parentFile) {
      links.forEach(function (link) {
        var linkFile = link.getAttribute('href').split('/').pop();
        if (linkFile === parentFile) {
          link.classList.add('nav-active');
        }
      });
    }
  }
})();
