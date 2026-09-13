const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelectorAll('.nav-links a');

if (menuBtn && header) {
  menuBtn.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    header.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menú');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('open')) {
      header.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Abrir menú');
      menuBtn.focus();
    }
  });
}

document.querySelectorAll('.faq').forEach((faq, index) => {
  const btn = faq.querySelector('button');
  const panel = faq.querySelector('p');
  if (!btn || !panel) return;
  const key = `faq-${index + 1}`;
  btn.type = 'button';
  btn.id ||= `${key}-button`;
  panel.id ||= `${key}-panel`;
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', panel.id);
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', btn.id);
  btn.addEventListener('click', () => {
    const open = faq.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
});

const moduleData = {
  socios: {
    label: 'SOCIOS',
    title: 'Gestioná a todos tus socios de forma simple y centralizada',
    text: 'Controlá altas, bajas, renovaciones, suspensiones y toda la información importante desde una única pantalla.',
    image: 'assets/gestion-socios.webp',
    width: 1586,
    height: 992,
    items: ['Perfiles completos y personalizables', 'Historial de pagos y asistencia', 'Membresías, planes y vencimientos']
  },
  pagos: {
    label: 'PAGOS Y COBROS',
    title: 'Cobros, cuotas y vencimientos bajo control',
    text: 'Visualizá el estado de cada cuota y registrá cobros con una operación simple y ordenada.',
    image: 'assets/pagos-cuotas.webp',
    width: 1586,
    height: 992,
    items: ['Cuotas y vencimientos', 'Múltiples medios de pago', 'Seguimiento de saldos pendientes']
  },
  clases: {
    label: 'AGENDA',
    title: 'Organizá clases y turnos sin superposiciones',
    text: 'Administrá horarios, profesores, salas, cupos y reservas desde una agenda visual.',
    image: 'assets/clases-turnos.webp',
    width: 1586,
    height: 992,
    items: ['Calendario centralizado', 'Control de cupos', 'Profesores y asistencias']
  },
  rutinas: {
    label: 'RUTINAS',
    title: 'Creá rutinas visuales y personalizadas',
    text: 'Definí ejercicios, series, repeticiones y descansos y compartí la rutina con cada socio.',
    image: 'assets/armado-rutinas.webp',
    width: 1586,
    height: 992,
    items: ['Biblioteca de ejercicios', 'Series y repeticiones', 'Compartir con el socio']
  },
  reportes: {
    label: 'REPORTES',
    title: 'Tomá decisiones con información clara',
    text: 'Consultá evolución de socios, actividad, cobranzas y métricas clave para gestionar con datos reales.',
    image: 'assets/reportes.webp',
    width: 1586,
    height: 992,
    items: ['Indicadores principales', 'Evolución y tendencias', 'Información exportable']
  },
  comunicacion: {
    label: 'COMUNICACIÓN',
    title: 'Mantené el vínculo con tus socios',
    text: 'Centralizá avisos, recordatorios y novedades para mejorar la comunicación diaria.',
    image: 'assets/comunicacion-dual.webp',
    width: 1448,
    height: 1086,
    items: ['Recordatorios automáticos', 'Mensajes personalizados', 'Comunicación rápida']
  }
};

const moduleTabs = [...document.querySelectorAll('.module-tab')];
const moduleContent = document.querySelector('.module-content');
const moduleExplorer = document.querySelector('.module-explorer');
let moduleSwitchTimer;
let moduleAutoTimer;
let moduleAutoObserver;
let moduleAutoVisible = false;
let moduleAutoPausedByUser = false;
const moduleReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const MODULE_AUTO_DELAY = 6500;

function selectModule(btn) {
  const data = moduleData[btn.dataset.module];
  if (!data) return;
  if (moduleContent) moduleContent.classList.add('is-changing');
  window.clearTimeout(moduleSwitchTimer);
  moduleSwitchTimer = window.setTimeout(() => {
    moduleTabs.forEach(tab => {
      const active = tab === btn;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });
    if (moduleContent) {
      if (btn.id) moduleContent.setAttribute('aria-labelledby', btn.id);
    }
    const title = document.querySelector('#module-title');
    const text = document.querySelector('#module-text');
    const image = document.querySelector('#module-image');
    const label = document.querySelector('#module-label');
    const list = document.querySelector('#module-list');
    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
    if (label) label.textContent = data.label;
    if (image) {
      image.width = data.width;
      image.height = data.height;
      image.src = data.image;
      image.alt = data.title;
    }
    if (list) list.innerHTML = data.items.map(item => `<li>${item}</li>`).join('');
    if (moduleContent) moduleContent.classList.remove('is-changing');
  }, 120);
}

function clearModuleAutoTimer() {
  window.clearTimeout(moduleAutoTimer);
  moduleAutoTimer = undefined;
}

function scheduleModuleAuto(delay = MODULE_AUTO_DELAY) {
  clearModuleAutoTimer();
  if (!moduleExplorer || !moduleTabs.length || !moduleAutoVisible || moduleReduceMotion || document.hidden || moduleAutoPausedByUser) return;
  moduleAutoTimer = window.setTimeout(() => {
    if (!moduleAutoVisible || document.hidden || moduleAutoPausedByUser) return;
    const activeIndex = moduleTabs.findIndex(tab => tab.classList.contains('active'));
    const nextIndex = (Math.max(activeIndex, 0) + 1) % moduleTabs.length;
    selectModule(moduleTabs[nextIndex]);
    scheduleModuleAuto();
  }, Math.max(delay, 0));
}

function pauseModuleAutoAfterInteraction() {
  moduleAutoPausedByUser = true;
  clearModuleAutoTimer();
}

if (moduleExplorer) {
  moduleExplorer.addEventListener('focusin', pauseModuleAutoAfterInteraction);
}

moduleTabs.forEach((btn, index) => {
  btn.setAttribute('role', 'tab');
  btn.setAttribute('aria-selected', String(btn.classList.contains('active')));
  btn.setAttribute('tabindex', btn.classList.contains('active') ? '0' : '-1');
  btn.addEventListener('click', () => {
    pauseModuleAutoAfterInteraction();
    selectModule(btn);
  });
  btn.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
    const next = (index + (forward ? 1 : -1) + moduleTabs.length) % moduleTabs.length;
    pauseModuleAutoAfterInteraction();
    moduleTabs[next].focus();
    selectModule(moduleTabs[next]);
  });
});

function moduleExplorerIsInView() {
  if (!moduleExplorer) return false;
  const rect = moduleExplorer.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, viewportHeight);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  return rect.height > 0 && visibleHeight / rect.height >= .15;
}

function initModuleAutoObserver({ resetUserPause = false } = {}) {
  clearModuleAutoTimer();
  if (moduleAutoObserver) {
    moduleAutoObserver.disconnect();
    moduleAutoObserver = undefined;
  }
  if (resetUserPause) moduleAutoPausedByUser = false;
  if (!moduleExplorer || !moduleTabs.length || moduleReduceMotion) return;

  moduleAutoVisible = moduleExplorerIsInView();
  if ('IntersectionObserver' in window) {
    moduleAutoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        moduleAutoVisible = entry.isIntersecting;
        if (moduleAutoVisible && !document.hidden) {
          scheduleModuleAuto();
        } else {
          clearModuleAutoTimer();
        }
      });
    }, { threshold: .15 });
    moduleAutoObserver.observe(moduleExplorer);
  }
  if (moduleAutoVisible && !document.hidden) scheduleModuleAuto();
}

const trustMarquee = document.querySelector('.page-home .client-marquee');
if (trustMarquee) {
  const pauseTrustMarquee = () => trustMarquee.classList.add('is-paused');
  trustMarquee.addEventListener('focus', pauseTrustMarquee);
  trustMarquee.addEventListener('pointerdown', pauseTrustMarquee, { passive: true });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// v5.154 — ciclo de animaciones determinista en cada entrada/reentrada de pagina.
// El reinicio se realiza con transiciones/animaciones temporalmente desactivadas,
// se confirma el estado inicial durante cuadros reales de pintura y recien despues
// se habilitan observers y disparadores. Esto evita que una transicion inversa
// durante BFCache/restore cancele visualmente la nueva entrada.
const animationRoot = document.documentElement;
let animationEpoch = 0;
let animationResetInProgress = false;
let animationLifecycleFrame1;
let animationLifecycleFrame2;
let animationLifecycleFrame3;
let initialAnimationEpoch = 0;
let initialPageShowHandled = false;

function elementMeetsViewportThreshold(element, threshold = 0, bottomInset = 0) {
  if (!element || document.hidden) return false;
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, Math.max(viewportHeight - bottomInset, 0));
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  return rect.height > 0 && visibleHeight / rect.height >= threshold;
}

function cancelAnimationLifecycleFrames() {
  if (animationLifecycleFrame1) cancelAnimationFrame(animationLifecycleFrame1);
  if (animationLifecycleFrame2) cancelAnimationFrame(animationLifecycleFrame2);
  if (animationLifecycleFrame3) cancelAnimationFrame(animationLifecycleFrame3);
  animationLifecycleFrame1 = undefined;
  animationLifecycleFrame2 = undefined;
  animationLifecycleFrame3 = undefined;
}

const memberHeroList = document.querySelector('.page-members .member-hero .member-hero-list');
let memberBenefitObserver;

function cleanupMemberBenefitSequence() {
  if (memberBenefitObserver) {
    memberBenefitObserver.disconnect();
    memberBenefitObserver = undefined;
  }
}

function showMemberBenefitSequence() {
  if (!memberHeroList || document.hidden || animationResetInProgress) return;
  if (memberHeroList.classList.contains('member-benefit-sequence-visible')) return;
  memberHeroList.classList.add('member-benefit-sequence-visible');
  if (memberBenefitObserver) memberBenefitObserver.unobserve(memberHeroList);
}

function revealMemberBenefitsIfPending() {
  if (!memberHeroList || reduceMotion || animationResetInProgress) return;
  if (!memberHeroList.classList.contains('member-benefit-sequence-visible') &&
      elementMeetsViewportThreshold(memberHeroList, .18, 18)) {
    showMemberBenefitSequence();
  }
}

function prepareMemberBenefitSequence() {
  if (!memberHeroList) return;
  cleanupMemberBenefitSequence();
  memberHeroList.classList.add('member-benefit-sequence-ready');
  if (reduceMotion) {
    memberHeroList.classList.add('member-benefit-sequence-visible');
  } else {
    memberHeroList.classList.remove('member-benefit-sequence-visible');
  }
}

function activateMemberBenefitSequence(epoch) {
  if (!memberHeroList || reduceMotion || epoch !== animationEpoch) return;
  if ('IntersectionObserver' in window) {
    memberBenefitObserver = new IntersectionObserver(entries => {
      if (epoch !== animationEpoch || animationResetInProgress) return;
      entries.forEach(entry => {
        if (entry.isIntersecting && !document.hidden) showMemberBenefitSequence();
      });
    }, { threshold: .18, rootMargin: '0px 0px -18px 0px' });
    memberBenefitObserver.observe(memberHeroList);
  }
  revealMemberBenefitsIfPending();
  if (!('IntersectionObserver' in window)) showMemberBenefitSequence();
}

// v5.155 — el listado de beneficios de Contacto replica exactamente la
// secuencia de entrada aprobada del hero de Para socios.
const contactHeroList = document.querySelector('.page-contact .contact-intro > .check-list');
let contactBenefitObserver;

function cleanupContactBenefitSequence() {
  if (contactBenefitObserver) {
    contactBenefitObserver.disconnect();
    contactBenefitObserver = undefined;
  }
}

function showContactBenefitSequence() {
  if (!contactHeroList || document.hidden || animationResetInProgress) return;
  if (contactHeroList.classList.contains('contact-benefit-sequence-visible')) return;
  contactHeroList.classList.add('contact-benefit-sequence-visible');
  if (contactBenefitObserver) contactBenefitObserver.unobserve(contactHeroList);
}

function revealContactBenefitsIfPending() {
  if (!contactHeroList || reduceMotion || animationResetInProgress) return;
  if (!contactHeroList.classList.contains('contact-benefit-sequence-visible') &&
      elementMeetsViewportThreshold(contactHeroList, .18, 18)) {
    showContactBenefitSequence();
  }
}

function prepareContactBenefitSequence() {
  if (!contactHeroList) return;
  cleanupContactBenefitSequence();
  contactHeroList.classList.add('contact-benefit-sequence-ready');
  if (reduceMotion) {
    contactHeroList.classList.add('contact-benefit-sequence-visible');
  } else {
    contactHeroList.classList.remove('contact-benefit-sequence-visible');
  }
}

function activateContactBenefitSequence(epoch) {
  if (!contactHeroList || reduceMotion || epoch !== animationEpoch) return;
  if ('IntersectionObserver' in window) {
    contactBenefitObserver = new IntersectionObserver(entries => {
      if (epoch !== animationEpoch || animationResetInProgress) return;
      entries.forEach(entry => {
        if (entry.isIntersecting && !document.hidden) showContactBenefitSequence();
      });
    }, { threshold: .18, rootMargin: '0px 0px -18px 0px' });
    contactBenefitObserver.observe(contactHeroList);
  }
  revealContactBenefitsIfPending();
  if (!('IntersectionObserver' in window)) showContactBenefitSequence();
}

const revealItems = [...document.querySelectorAll('main section .card, main section .feature-row, main section .module-explorer, main section .price-card, main section .feature-panel, main section .account-card')];
let revealObserver;

function cleanupRevealAnimations() {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = undefined;
  }
}

function showRevealItem(element) {
  if (!element || document.hidden || animationResetInProgress || element.classList.contains('visible')) return;
  element.classList.add('visible');
  if (revealObserver) revealObserver.unobserve(element);
}

function revealVisiblePendingItems() {
  if (reduceMotion || animationResetInProgress) return;
  revealItems.forEach(element => {
    if (!element.classList.contains('visible') && elementMeetsViewportThreshold(element, .07, 20)) {
      showRevealItem(element);
    }
  });
}

function prepareRevealAnimations() {
  cleanupRevealAnimations();
  revealItems.forEach((element, index) => {
    element.classList.add('reveal', 'reveal-ready');
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
    if (reduceMotion) {
      element.classList.add('visible');
    } else {
      element.classList.remove('visible');
    }
  });
}

function activateRevealAnimations(epoch) {
  if (!revealItems.length || reduceMotion || epoch !== animationEpoch) return;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      if (epoch !== animationEpoch || animationResetInProgress) return;
      entries.forEach(entry => {
        if (entry.isIntersecting && !document.hidden) showRevealItem(entry.target);
      });
    }, { threshold: .07, rootMargin: '0px 0px -20px 0px' });
    revealItems.forEach(element => revealObserver.observe(element));
  }
  revealVisiblePendingItems();
  if (!('IntersectionObserver' in window)) revealItems.forEach(showRevealItem);
}

// Entrada escalonada y conteo animado de KPIs en Para gimnasios.
const gymKpiGrid = document.querySelector('.page-gyms .kpis');
const gymKpis = gymKpiGrid ? [...gymKpiGrid.querySelectorAll('.kpi')] : [];
const numberFormatter = new Intl.NumberFormat('es-AR');
let gymKpiObserver;
const gymKpiTimeouts = new Set();
const gymKpiFrames = new Set();

function formatKpiValue(original, value) {
  const rounded = Math.round(value);
  if (original.includes('$')) return `$ ${numberFormatter.format(rounded)}`;
  if (original.includes('%')) return `${rounded}%`;
  if (/\d\.\d/.test(original)) return numberFormatter.format(rounded);
  return String(rounded);
}

function scheduleGymKpiFrame(callback) {
  const frameId = requestAnimationFrame(now => {
    gymKpiFrames.delete(frameId);
    callback(now);
  });
  gymKpiFrames.add(frameId);
  return frameId;
}

function cancelGymKpiRuntime() {
  if (gymKpiObserver) {
    gymKpiObserver.disconnect();
    gymKpiObserver = undefined;
  }
  gymKpiTimeouts.forEach(id => clearTimeout(id));
  gymKpiTimeouts.clear();
  gymKpiFrames.forEach(id => cancelAnimationFrame(id));
  gymKpiFrames.clear();
  gymKpis.forEach(kpi => {
    const strong = kpi.querySelector('strong');
    if (strong?.dataset.finalValue) strong.textContent = strong.dataset.finalValue;
  });
}

function animateKpiValue(strong, delay = 0, epoch = animationEpoch) {
  const original = strong.dataset.finalValue || strong.textContent.trim();
  const target = Number(original.replace(/[^0-9]/g, ''));
  if (!target) return;
  strong.dataset.finalValue = original;

  const timeoutId = window.setTimeout(() => {
    gymKpiTimeouts.delete(timeoutId);
    if (document.hidden || epoch !== animationEpoch || animationResetInProgress) {
      strong.textContent = original;
      return;
    }
    const duration = 900;
    const start = performance.now();
    const tick = now => {
      if (epoch !== animationEpoch || animationResetInProgress) {
        strong.textContent = original;
        return;
      }
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      strong.textContent = formatKpiValue(original, target * eased);
      if (progress < 1 && !document.hidden) {
        scheduleGymKpiFrame(tick);
      } else {
        strong.textContent = original;
      }
    };
    scheduleGymKpiFrame(tick);
  }, delay);
  gymKpiTimeouts.add(timeoutId);
}

function showGymKpis() {
  if (!gymKpiGrid || document.hidden || animationResetInProgress || gymKpiGrid.classList.contains('is-visible')) return;
  gymKpiGrid.classList.add('is-visible');
  const epoch = animationEpoch;
  gymKpis.forEach((kpi, index) => {
    const strong = kpi.querySelector('strong');
    if (strong) animateKpiValue(strong, 220 + index * 80, epoch);
  });
  if (gymKpiObserver) gymKpiObserver.unobserve(gymKpiGrid);
}

function revealGymKpisIfPending() {
  if (!gymKpiGrid || reduceMotion || animationResetInProgress) return;
  if (!gymKpiGrid.classList.contains('is-visible') && elementMeetsViewportThreshold(gymKpiGrid, .22, 20)) {
    showGymKpis();
  }
}

function prepareGymKpiAnimations() {
  if (!gymKpiGrid) return;
  cancelGymKpiRuntime();
  gymKpis.forEach(kpi => {
    const strong = kpi.querySelector('strong');
    if (strong) {
      strong.dataset.finalValue ||= strong.textContent.trim();
      strong.textContent = strong.dataset.finalValue;
    }
  });
  gymKpiGrid.classList.add('kpi-motion-ready');
  if (reduceMotion) {
    gymKpiGrid.classList.add('is-visible');
  } else {
    gymKpiGrid.classList.remove('is-visible');
  }
}

function activateGymKpiAnimations(epoch) {
  if (!gymKpiGrid || reduceMotion || epoch !== animationEpoch) return;
  if ('IntersectionObserver' in window) {
    gymKpiObserver = new IntersectionObserver(entries => {
      if (epoch !== animationEpoch || animationResetInProgress) return;
      entries.forEach(entry => {
        if (entry.isIntersecting && !document.hidden) showGymKpis();
      });
    }, { threshold: .22, rootMargin: '0px 0px -20px 0px' });
    gymKpiObserver.observe(gymKpiGrid);
  }
  revealGymKpisIfPending();
  if (!('IntersectionObserver' in window)) showGymKpis();
}

function cleanupAnimationSystems() {
  animationEpoch += 1;
  animationResetInProgress = false;
  cancelAnimationLifecycleFrames();
  cleanupMemberBenefitSequence();
  cleanupContactBenefitSequence();
  cleanupRevealAnimations();
  cancelGymKpiRuntime();
  clearModuleAutoTimer();
  window.clearTimeout(moduleSwitchTimer);
  moduleSwitchTimer = undefined;
  if (moduleAutoObserver) {
    moduleAutoObserver.disconnect();
    moduleAutoObserver = undefined;
  }
  if (moduleContent) moduleContent.classList.remove('is-changing');
}

function prepareAnimationSystems({ resetUserPause = false } = {}) {
  cancelAnimationLifecycleFrames();
  cleanupMemberBenefitSequence();
  cleanupContactBenefitSequence();
  cleanupRevealAnimations();
  cancelGymKpiRuntime();
  clearModuleAutoTimer();
  if (moduleAutoObserver) {
    moduleAutoObserver.disconnect();
    moduleAutoObserver = undefined;
  }
  if (resetUserPause) moduleAutoPausedByUser = false;
  if (moduleContent) moduleContent.classList.remove('is-changing');

  animationEpoch += 1;
  const epoch = animationEpoch;
  animationResetInProgress = true;
  animationRoot.classList.add('motion-reset');

  prepareMemberBenefitSequence();
  prepareContactBenefitSequence();
  prepareRevealAnimations();
  prepareGymKpiAnimations();
  if (trustMarquee) trustMarquee.classList.remove('is-paused');

  // Fuerza la aplicacion del estado inicial mientras transition/animation estan anuladas.
  void animationRoot.offsetHeight;
  return epoch;
}

function activateAnimationSystems(epoch) {
  if (epoch !== animationEpoch) return;

  // Cuadro 1: conservar el estado inicial sin transiciones.
  animationLifecycleFrame1 = requestAnimationFrame(() => {
    if (epoch !== animationEpoch) return;
    animationLifecycleFrame1 = undefined;
    void animationRoot.offsetHeight;

    // Cuadro 2: habilitar nuevamente CSS, pero mantener aun las clases iniciales.
    animationLifecycleFrame2 = requestAnimationFrame(() => {
      if (epoch !== animationEpoch) return;
      animationLifecycleFrame2 = undefined;
      animationRoot.classList.remove('motion-reset');
      void animationRoot.offsetHeight;

      // Cuadro 3: recien ahora registrar observers y disparar elementos ya visibles.
      animationLifecycleFrame3 = requestAnimationFrame(() => {
        if (epoch !== animationEpoch) return;
        animationLifecycleFrame3 = undefined;
        animationResetInProgress = false;
        activateMemberBenefitSequence(epoch);
        activateContactBenefitSequence(epoch);
        activateRevealAnimations(epoch);
        activateGymKpiAnimations(epoch);
        initModuleAutoObserver({ resetUserPause: true });
      });
    });
  });
}

function restartAnimationSystems({ restored = false } = {}) {
  const epoch = prepareAnimationSystems({ resetUserPause: restored || initialPageShowHandled });
  activateAnimationSystems(epoch);
  return epoch;
}

// Preparar antes del primer pageshow evita que las animaciones CSS comiencen antes de que
// el documento sea realmente presentado. pageshow se usa tanto para carga normal como BFCache.
initialAnimationEpoch = prepareAnimationSystems();

window.addEventListener('pageshow', event => {
  if (!initialPageShowHandled && !event.persisted) {
    initialPageShowHandled = true;
    activateAnimationSystems(initialAnimationEpoch);
    return;
  }
  initialPageShowHandled = true;
  restartAnimationSystems({ restored: true });
});

window.addEventListener('pagehide', () => {
  cleanupAnimationSystems();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearModuleAutoTimer();
    return;
  }
  if (animationResetInProgress) return;
  revealMemberBenefitsIfPending();
  revealContactBenefitsIfPending();
  revealVisiblePendingItems();
  revealGymKpisIfPending();
  if (moduleExplorer && moduleTabs.length && !moduleReduceMotion) {
    moduleAutoVisible = moduleExplorerIsInView();
    if (moduleAutoVisible) scheduleModuleAuto();
  }
});
