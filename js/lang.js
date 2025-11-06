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
        members: "Members: ",
        membersans: "6",
        view_members: "View Members: ",
        view_membersans: "Here",
        nation: "Nationality: ",
        nationans: "Portuguese",
        school: "School: ",
        goal:"Goals: ",
        goalans:"Participate in the 2025/26 season — learn regulations and compete at a regional/national level. (Technical goal: minimize drag and friction as much as possible.)",
        skills:"Key team skills: ",
        skillsans: "CAD (Fusion 360), CFD, CNC/laser fabric, marketing/branding e project managment.",
        events:"Planned events: ",
        eventsans:"Regional competitions (dates to be confirmed), local tests and demonstrations at the school.",
        meetings:"Team Meetings: ",
        meetingsans:"Weekly meeting (every Friday at 8:00 PM).",
        social:"Team Social Media: ",
        sponsors:"Sponsors Wanted: ",
        sponsorsans:"Domínio/DNS, materiais, roupa/fatos, apoio financeiro ou técnico (lista de benefícios dos patrocinadores disponível).",
        notes:"Additional Notes: ",
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
      },
      benefits: {
        title: "Sponsor Benefits",
        visibility: "Brand Visibility: ",
        visibilityans: "Sponsor logo and name displayed on the official website, car logo, flyer, and pit lane mention at events.",
        marketing: "Digital Marketing: ",
        marketingans: "Team social media promotion, including regular mentions and acknowledgements.",
        event: "Event Acess: ",
        eventans:"Invitations to team events, such as tryouts and competitions.",
        progress: "Progress Reports: ",
        progressans:"Updates on project development and team performance.",
        promotional: "Custom Promotional Material: ",
        promotionalans:"Possibility to create promotional material jointly with the team."
      },
      members: {
        name: "Mariana Santos",
        mariana_role: "Team Manager & Aerodynamicist",
        mariana_bio: "Oversees the entire team, distributes tasks and responsibilities, and assists in all aspects of car development and business. Helps with car planning, contributing ideas to improve aerodynamics, and conducts CFD testing",
        mariana_skills: "Key skills: Fast learner, Eloquent, Tenacious",
        name: "Diogo Lopes",
        diogo_role: "Finance & Business Development Manager",
        diogo_bio: "Responsible for the team's accounting and for seeking sponsors that benefit the team. Ensures long-term connections with other companies and good management of monetary transactions",
        diogo_skills: "Key skills: Responsible, Organized, Interactive",
        name: "Martim Triufante",
        martim_role: "All-Round Engineer",
        martim_bio: "Contributes to all engineering areas. Responsible for providing ideas for the car's format, researching the best materials to use and their machining (CAM)",
        martim_skills: "Key skills: Ingenuity, Adaptable, Creative",
        name: "Martim Ferreira",
        ferreira_role: "Graphic Designer & CAD Engineer",
        ferreira_bio: "Responsible for creating the team's website, the car's style and color scheme, and developing the team's visual identity, ensuring the team presents a professional image. Creates CAD drawings of the car and renderings",
        ferreira_skills: "Key skills: Ambitious, Dynamic, Resilient",
        name: "Pedro Guedes",
        pedro_role: "Marketing Director",
        pedro_bio: "Responsible for providing visibility to the team through activities/events, social media, and other types of advertising. Digitally creates the logo, images, and videos and represents the team in the media",
        pedro_skills: "Key skills: Creative, Communicative, Productive",
        name: "Francisco Silva",
        francisco_role: "Resource & Logistics Manager", 
        francisco_bio: "Seeks to find the best companies that supply materials and services. Responsible for ensuring that all necessary materials arrive in a timely manner, guaranteeing their availability for other team members",
        francisco_skills: "Key skills: Analytical, Flexible, Committed"
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
        view_members: "Ver Membros: ",
        view_membersans: "Aqui",
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
        title: "Benefícios dos Patrocinadores",
        visibility: "Visibilidade da Marca: ",
        visibilityans: "Logótipo e nome do patrocinador exibidos no site oficial, logótipo do automóvel, folheto e menção no pit em eventos.",
        marketing: "Marketing Digital: ",
        marketingans: "Promoção da equipa nas redes sociais, incluindo menções e agradecimentos regulares.",
        event: "Acesso a Eventos: ",
        eventans:"Convites para eventos de equipa, como testes e competições.",
        progress: "Relatórios de progresso: ",
        progressans:"Atualizações sobre o desenvolvimento do projeto e o desempenho da equipa.",
        promotional: "Material Promocional Personalizado: ",
        promotionalans:"Possibilidade de criar material promocional em conjunto com a equipa."
      },
      members: {
        mariana_name: "Mariana Santos",
        mariana_role: "Gestora de Equipa & Aerodinamicista",
        mariana_bio: "Supervisiona toda a equipa, distribui tarefas e responsabilidades e auxilia em todos os aspetos do desenvolvimento do carro e do negócio. Ajuda no planeamento do carro, contribuindo com ideias para melhorar a aerodinâmica e realiza testes CFD",
        mariana_skills: "Competências: Rápida aprendizagem, Eloquente, Tenaz",
        name: "Diogo Lopes",
        diogo_role: "Gestor Financeiro & Desenvolvimento de Negócio",
        diogo_bio: "Responsável pela contabilidade da equipa e por procurar patrocinadores que beneficiem a equipa. Garante ligações duradouras com outras empresas e boa gestão das transações monetárias",
        diogo_skills: "Competências: Responsável, Organizado, Interativo",
        name: "Martim Triufante",
        martim_role: "Engenheiro Geral",
        martim_bio: "Contribui para todas as áreas de engenharia. Responsável por dar ideias para o formato do automóvel, pesquisando sobre os melhores materiais a utilizar e respetiva maquinação (CAM)",
        martim_skills: "Competências: Engenhoso, Adaptável, Criativo",
        name: "Martim Ferreira",
        ferreira_role: "Designer Gráfico & Engenheiro CAD",
        ferreira_bio: "Responsável pela criação do site da equipa, pelo estilo e esquema de cores do carro e pelo desenvolvimento da identidade visual da equipa, garantindo que a equipa apresenta uma imagem profissional. Cria desenhos CAD do carro e renderizações",
        ferreira_skills: "Competências: Ambicioso, Dinâmico, Resiliente",
        name: "Pedro Guedes",
        pedro_role: "Diretor de Marketing",
        pedro_bio: "Responsável por dar visibilidade à equipa através de atividades/eventos, redes sociais e outros tipos de publicidade. Cria digitalmente o logótipo, imagens e vídeos e representa a equipa nos média",
        pedro_skills: "Competências: Criativo, Comunicativo, Produtivo",
        name: "Francisco Silva",
        francisco_role: "Gestor de Recursos & Logística",
        francisco_bio: "Procura encontrar as melhores empresas fornecedoras de materiais e serviços. Responsável por garantir que todos os materiais necessários chegam atempadamente, garantindo a sua disponibilidade para os outros membros da equipa",
        francisco_skills: "Competências: Analítico, Flexível, Empenhado"
    }
    },
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
  window.showLangModal = showLangModal;
  window.setLanguage = setLanguage;

})();
