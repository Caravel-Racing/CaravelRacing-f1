/* js/lang.js */
(function () {
  const STORAGE_KEY = 'caravel_lang';
  const i18n = {
    en: {
      meta: {
        title: "Caravel Racing",
        description: "Caravel Racing — STEM Racing team 2025/26. Projects, members and results."
      },
      nav: {
        home: "Home",
        projects: "Projects",
        about: "About the Team",
        sponsors: "Sponsors",
        contact: "Contact Us",
        openMenu: "Open menu"
      },
      logo: {
        alt: "Caravel Racing logo"
      },
      hero: {
        title: "Official homepage of Caravel Racing Team",
        viewProjects: "View Projects",
        about: "About the Team",
        breadcrumb: "Home • Projects • About the Team • Sponsors • Contact Us"
      },
      kpis: {
        season_label: "Season",
        season: "2025/26",
        avg_label: "Avg. run",
        avg: "-",
        members_label: "Members",
        members: "6"
      },
      lang: {
        title: "Choose language",
        subtitle: "Which language do you want to use?",
        remember: "Remember my choice"
      },
      footer: {
        copy: "© Caravel Racing — Portugal",
        contact: "Contact: <a href=\"mailto:caravelracing@gmail.com\">caravelracing@gmail.com</a>"
      },
      social: {
        instagram: "Caravel Racing on Instagram"
      },
      projects: {
        one: "Project 1 - Caravel V1 &rarr; Sketch",
        oneinfo: "First car sketch made by our Graphic Engineer and our Aerodynamicist"
      }
    },
    pt: {
      meta: {
        title: "Caravel Racing",
        description: "Caravel Racing — Equipa inscrita na competição STEM Racing 2025/26. Projetos, membros e resultados."
      },
      nav: {
        home: "Início",
        projects: "Projetos",
        about: "Conhecer a equipa",
        sponsors: "Patrocinadores",
        contact: "Contactos",
        openMenu: "Abrir menu"
      },
      logo: {
        alt: "Logótipo Caravel Racing"
      },
      hero: {
        title: "Página oficial do Caravel Racing Team",
        viewProjects: "Ver Projetos",
        about: "Conhecer a equipa",
        breadcrumb: "Início • Projetos • Conhecer a equipa • Patrocinadores • Contactos"
      },
      kpis: {
        season_label: "Temporada",
        season: "2025/26",
        avg_label: "Média de Tempo",
        avg: "-",
        members_label: "Membros",
        members: "6"
      },
      lang: {
        title: "Escolha o idioma",
        subtitle: "Que idioma pretende usar?",
        remember: "Lembrar esta escolha"
      },
      footer: {
        copy: "© Caravel Racing — Portugal",
        contact: "Contactos: <a href=\"mailto:caravelracing@gmail.com\">caravelracing@gmail.com</a>"
      },
      social: {
        instagram: "Caravel Racing no Instagram"
      },
      projects: {
        one: "Projeto 1 - Caravel V1 &rarr; Esboço",
        oneinfo: "Primeiro esboço de um carro feito pelo nosso Engenheiro Gráfico e pela nossa Engenheira da aerodinâmica"
      }
    }
  };

  // utility to get nested key
  function getKey(obj, keyPath) {
    return keyPath.split('.').reduce((o,k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
  }

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = getKey(i18n[lang], key);
      if (val === undefined) return;
      const attrList = (el.dataset.i18nAttr || '').split(',').map(s => s.trim()).filter(Boolean);
      if (attrList.length) {
        attrList.forEach(attr => el.setAttribute(attr, val));
      } else {
        // If original element contains HTML and translation includes HTML (like footer.contact), use innerHTML,
        // otherwise use textContent.
        if (el.matches('p') || el.matches('div') || /<\/?[a-z][\s\S]*>/i.test(String(val))) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // update document.title and meta description and og/twitter
    if (i18n[lang].meta) {
      if (i18n[lang].meta.title) document.title = i18n[lang].meta.title;
      if (i18n[lang].meta.description) {
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', i18n[lang].meta.description);
      }
      const og = document.querySelector('meta[property="og:title"]');
      if (og && i18n[lang].meta.title) og.setAttribute('content', i18n[lang].meta.title);
      const tw = document.querySelector('meta[name="twitter:title"]');
      if (tw && i18n[lang].meta.title) tw.setAttribute('content', i18n[lang].meta.title);
    }
  }

  function showLangModal() {
    const modal = document.getElementById('lang-modal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');

    // close button
    modal.querySelector('#lang-close').addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'true');
      // if no selection made, pick fallback (browser or 'en')
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const nav = navigator.language && navigator.language.startsWith('pt') ? 'pt' : 'en';
        setLanguage(nav, false);
      }
    });

    // language buttons
    modal.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = btn.dataset.lang;
        const remember = !!document.getElementById('remember-lang').checked;
        setLanguage(lang, remember);
        modal.setAttribute('aria-hidden', 'true');
      });
    });
  }

  function setLanguage(lang, remember) {
    applyTranslations(lang);
    if (remember) localStorage.setItem(STORAGE_KEY, lang);
    else localStorage.removeItem(STORAGE_KEY);
    // For accessibility, update html lang attribute
    document.documentElement.lang = (lang === 'pt' ? 'pt-PT' : 'en-US');
  }

  function init() {
    // apply existing stored preference immediately if present
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && i18n[stored]) {
      setLanguage(stored, true);
      return; // don't show modal
    }

    // If no stored preference, wait for splash to complete; listen for custom event
    let handled = false;
    function whenSplashDoneShow() {
      if (handled) return;
      handled = true;
      // small delay to ensure splash UI removed
      setTimeout(showLangModal, 220);
    }

    // listen for custom event dispatched by splash.js at the end
    document.addEventListener('splash-complete', whenSplashDoneShow);

    // fallback: watch the #splash element; if it becomes aria-hidden or display none, show modal
    const splash = document.getElementById('splash');
    if (splash) {
      const observer = new MutationObserver(() => {
        const hidden = splash.getAttribute('aria-hidden') === 'true' ||
                       getComputedStyle(splash).display === 'none' ||
                       splash.classList.contains('hidden');
        if (hidden) {
          whenSplashDoneShow();
          observer.disconnect();
        }
      });
      observer.observe(splash, { attributes: true, attributeFilter: ['style','class','aria-hidden'] });

      // also check once DOM is ready
      window.addEventListener('load', () => {
        const hidden = splash.getAttribute('aria-hidden') === 'true' ||
                       getComputedStyle(splash).display === 'none' ||
                       splash.classList.contains('hidden');
        if (hidden) whenSplashDoneShow();
      });
    } else {
      // no splash element: show immediately
      document.addEventListener('DOMContentLoaded', whenSplashDoneShow);
    }
  }

  // run
  document.addEventListener('DOMContentLoaded', init);

})();
