/* js/lang.js */
(function () {
  const STORAGE_KEY = 'caravel_lang';
  const i18n = {
    en: {
      meta: {
        title: "Caravel Racing",
        description: "Caravel Racing — STEM Racing team 2025/26. Projects, members and results.",
        title: "Official homepage of Caravel Racing Team",
        button1: "View Projects",
        button2: "About the Team"
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
        title:"Projects",
        one: "Project 1 - Caravel V1 -> Sketch",
        oneinfo: "First car sketch made by our Graphic Engineer and our Aerodynamicist",
        view: "View Project"
      },
      about: {
        members: "Members:",
        membersans: "6",
        nation: "Nationality:",
        nationans: "Portuguese",
        school: "School:",
        goal:"Goals:",
        goalans:"Participate in the 2025/26 season — learn regulations and compete at a regional/national level. (Technical goal: minimize drag and friction as much as possible.)",
        skills:"Key team skills:",
        skillsans: "CAD (Fusion 360), CFD, CNC/laser fabric, marketing/branding e project managment.",
        events:"Planned events:",
        eventsans:"Regional competitions (dates to be confirmed), local tests and demonstrations at the school.",
        meetings:"Team Meetings:",
        meetingsans:"Weekly meeting (every Friday at 8:00 PM).",
        social:"Team Social Media:",
        sponsors:"Sponsors Wanted:",
        sponsorsans:"Domínio/DNS, materiais, roupa/fatos, apoio financeiro ou técnico (lista de benefícios dos patrocinadores disponível).",
        notes:"Additional Notes:",
        notesans: "We will keep this site updated with all projects (CAD, simulations, and test results) — available to sponsors and judges.",
        roles: "Main Roles: "
      },
      sponsors: {
        title:"Sponsors",
        title2:"Sponsors Benefits",
        button: "View Sponsor Benefits"
      },
      contact: {
        title: "Contacts",
      },
      projectv1: {
        title:"Caravel V1 - Sketch",
        goal: "Goal: ",
        goalans: "Focus on the regulations and learn them.",
        process: "Process",
        p1: "Read regulations",
        p2: "Research and requirements",
        p3: "Talk and plan",
        p4: "Design",
        result:"Result",
        images:"Sketch Images"
      }
    },
    pt: {
      meta: {
        title: "Caravel Racing",
        description: "Caravel Racing — Equipa inscrita na competição STEM Racing 2025/26. Projetos, membros e resultados.",
        title: "Página oficial da Equipa Caravel Racing",
        button1: "Ver Projetos",
        button2: "Sobre a Equipa"
      },
      nav: {
        home: "Início",
        projects: "Projetos",
        about: "Sobre a Equipa",
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
        about: "Sobre a Equipa",
        breadcrumb: "Início • Projetos • Sobre a Equipa • Patrocinadores • Contactos"
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
        title:"Projetos",
        one: "Projeto 1 - Caravel V1 -> Esboço",
        oneinfo: "Primeiro esboço de um carro feito pelo nosso Engenheiro Gráfico e pela nossa Engenheira da Aerodinâmica",
        view: "Ver Projeto"
      },
      about: {
        members: "Membros: ",
        membersans: "6",
        nation: "Nacionalidade: ",
        nationans: "Portuguesa",
        school: "Escola: ",
        goal:"Objetivos: ",
        goalans:"Participar na época 2025/26 — aprender os regulamentos e competir a nível regional/nacional. (Objetivo técnico: minimizar ao máximo o arrasto e o atrito.)",
        skills:"Competências-chave da equipa: ",
        skillsans: "CAD (Fusion 360), CFD, fabrico CNC/laser, marketing/branding e gestão de projetos.",
        events:"Eventos planeados: ",
        eventsans:"Competições regionais (datas a confirmar), provas locais e demonstrações na escola.",
        meetings:"Reuniões da Equipa: ",
        meetingsans:"Reunião semanal (todas as sextas-feiras às 20h).",
        social:"Redes Sociais da Equipa: ",
        sponsors:"Patrocinadores procurados: ",
        sponsorsans:"Domínio/DNS, materiais, roupa/fatos, apoio financeiro ou técnico (lista de benefícios dos patrocinadores disponível).",
        notes:"Notas adicionais: ",
        notesans: "Manteremos este site atualizado com todos os projetos (CAD, simulações e resultados de testes) — disponíveis para os patrocinadores e jurí.",
        roles: "Funções principais: "
      },
      sponsors: {
        title:"Patrocinadores",
        title2:"Benefícios dos Patrocinadores",
        button: "Ver benefícios"
      },
      contact: {
        title: "Contactos",
      },
        projectv1: {
        title:"Caravel V1 - Esboço",
        goal: "Objetivo: ",
        goalans: "Compreender os regulamentos.",
        process: "Processo",
        p1: "Ler os regulamentos",
        p2: "Investigação e requisitos",
        p3: "Falar e planear",
        p4: "Desenhar",
        result:"Resultado",
        images:"Imagens do Esboço"
      },
      benefits: {
        title: "Benefícios dos Patrocinadores"
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
