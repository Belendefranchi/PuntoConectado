const header=document.querySelector('.site-header');
const menuBtn=document.querySelector('.menu-btn');
const navLinks=document.querySelectorAll('.nav-links a');

if(menuBtn&&header){
  menuBtn.addEventListener('click',()=>{
    const open=header.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',String(open));
    menuBtn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  });
  navLinks.forEach(link=>link.addEventListener('click',()=>{
    header.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.setAttribute('aria-label','Abrir menú');
  }));
}


const brandsMarquee=document.querySelector('.brands-marquee');
if(brandsMarquee){
  const pauseBrands=()=>brandsMarquee.classList.add('is-paused');
  brandsMarquee.addEventListener('focus',pauseBrands);
  brandsMarquee.addEventListener('pointerdown',pauseBrands,{passive:true});
}

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animationRoot=document.documentElement;
const revealItems=[...document.querySelectorAll('main section .card,main section .work-card,main section .attention-card,main section .app-card,main section .price-card,main section .about-value,main section .about-specialty,main section .contact-panel,main section .form-card')];
const revealItemSet=new Set(revealItems);
const sectionHeadingGroups=[...document.querySelectorAll('#servicios > .container > .section-title,#marcas > .section-title,.services-intro-copy,.work-block-head,.apps-block > .section-title,.plans-intro-copy,.plan-visits-head > div:first-child,.about-copy,.about-specialties-head,.contact-intro-main')];
const contactChannels=document.querySelector('.contact-channels');
const aboutOrbit=document.querySelector('.about-network');
let revealObserver;
let sectionHeadingObserver;
let contactChannelsObserver;
let aboutOrbitObserver;
let animationEpoch=0;
let animationResetInProgress=false;
let animationLifecycleFrame1;
let animationLifecycleFrame2;
let animationLifecycleFrame3;
let initialAnimationEpoch=0;
let initialPageShowHandled=false;

function elementMeetsViewportThreshold(element,threshold=0,bottomInset=0){
  if(!element||document.hidden)return false;
  const rect=element.getBoundingClientRect();
  const viewportHeight=window.innerHeight||document.documentElement.clientHeight;
  const visibleTop=Math.max(rect.top,0);
  const visibleBottom=Math.min(rect.bottom,Math.max(viewportHeight-bottomInset,0));
  const visibleHeight=Math.max(0,visibleBottom-visibleTop);
  return rect.height>0&&visibleHeight/rect.height>=threshold;
}

function cancelAnimationLifecycleFrames(){
  if(animationLifecycleFrame1)cancelAnimationFrame(animationLifecycleFrame1);
  if(animationLifecycleFrame2)cancelAnimationFrame(animationLifecycleFrame2);
  if(animationLifecycleFrame3)cancelAnimationFrame(animationLifecycleFrame3);
  animationLifecycleFrame1=undefined;
  animationLifecycleFrame2=undefined;
  animationLifecycleFrame3=undefined;
}

function getRevealGroupIndex(element){
  const parent=element?.parentElement;
  if(!parent)return 0;
  const siblings=[...parent.children].filter(child=>revealItemSet.has(child));
  const index=siblings.indexOf(element);
  return index<0?0:index;
}

function getRevealBaseDelay(element){
  if(element?.classList.contains('services-intro-card'))return 190;
  if(element?.closest('.services-grid,.work-grid,.attention-grid,.apps-grid,.pricing-grid,.about-specialties-grid,.contact-shell'))return 190;
  return 0;
}

function getDirectParagraphs(element){
  return [...(element?.children||[])].filter(child=>child.matches?.('p,.lead'));
}

function prepareSectionHeadingMetadata(){
  sectionHeadingGroups.forEach(group=>{
    const title=group.querySelector('h1,h2');
    if(title)title.classList.add('section-heading-title');

    let descriptions=[];
    if(group.classList.contains('about-specialties-head')){
      const copy=group.querySelector('.about-specialties-copy');
      if(copy)descriptions=[copy];
    }else{
      descriptions=getDirectParagraphs(group);
    }
    descriptions.forEach(description=>description.classList.add('section-heading-description'));
  });
}

prepareSectionHeadingMetadata();

function cleanupRevealAnimations(){
  if(revealObserver){
    revealObserver.disconnect();
    revealObserver=undefined;
  }
}

function showRevealItem(element){
  if(!element||document.hidden||animationResetInProgress||element.classList.contains('visible'))return;
  element.classList.add('visible');
  if(revealObserver)revealObserver.unobserve(element);
}

function revealVisiblePendingItems(){
  if(reduceMotion||animationResetInProgress)return;
  revealItems.forEach(element=>{
    if(!element.classList.contains('visible')&&elementMeetsViewportThreshold(element,.07,20))showRevealItem(element);
  });
}

function prepareRevealAnimations(){
  cleanupRevealAnimations();
  revealItems.forEach(element=>{
    const groupIndex=getRevealGroupIndex(element);
    element.classList.add('reveal','reveal-ready');
    const baseDelay=getRevealBaseDelay(element);
    element.style.transitionDelay=`${baseDelay+Math.min(groupIndex%4,3)*55}ms`;
    if(reduceMotion)element.classList.add('visible');
    else element.classList.remove('visible');
  });
}

function activateRevealAnimations(epoch){
  if(!revealItems.length||reduceMotion||epoch!==animationEpoch)return;
  if('IntersectionObserver' in window){
    revealObserver=new IntersectionObserver(entries=>{
      if(epoch!==animationEpoch||animationResetInProgress)return;
      entries.forEach(entry=>{
        if(entry.isIntersecting&&!document.hidden)showRevealItem(entry.target);
      });
    },{threshold:.07,rootMargin:'0px 0px -20px 0px'});
    revealItems.forEach(element=>revealObserver.observe(element));
  }
  revealVisiblePendingItems();
  if(!('IntersectionObserver' in window))revealItems.forEach(showRevealItem);
}

function cleanupSectionHeadingSequences(){
  if(sectionHeadingObserver){
    sectionHeadingObserver.disconnect();
    sectionHeadingObserver=undefined;
  }
}

function showSectionHeadingSequence(group){
  if(!group||document.hidden||animationResetInProgress||group.classList.contains('section-heading-sequence-visible'))return;
  group.classList.add('section-heading-sequence-visible');
  if(sectionHeadingObserver)sectionHeadingObserver.unobserve(group);
}

function revealSectionHeadingsIfPending(){
  if(reduceMotion||animationResetInProgress)return;
  sectionHeadingGroups.forEach(group=>{
    if(!group.classList.contains('section-heading-sequence-visible')&&elementMeetsViewportThreshold(group,.12,20))showSectionHeadingSequence(group);
  });
}

function prepareSectionHeadingSequences(){
  cleanupSectionHeadingSequences();
  sectionHeadingGroups.forEach(group=>{
    group.classList.add('section-heading-sequence-ready');
    if(reduceMotion)group.classList.add('section-heading-sequence-visible');
    else group.classList.remove('section-heading-sequence-visible');
  });
}

function activateSectionHeadingSequences(epoch){
  if(!sectionHeadingGroups.length||reduceMotion||epoch!==animationEpoch)return;
  if('IntersectionObserver' in window){
    sectionHeadingObserver=new IntersectionObserver(entries=>{
      if(epoch!==animationEpoch||animationResetInProgress)return;
      entries.forEach(entry=>{
        if(entry.isIntersecting&&!document.hidden)showSectionHeadingSequence(entry.target);
      });
    },{threshold:.12,rootMargin:'0px 0px -20px 0px'});
    sectionHeadingGroups.forEach(group=>sectionHeadingObserver.observe(group));
  }
  revealSectionHeadingsIfPending();
  if(!('IntersectionObserver' in window))sectionHeadingGroups.forEach(showSectionHeadingSequence);
}

function cleanupAboutOrbitSequence(){
  if(aboutOrbitObserver){
    aboutOrbitObserver.disconnect();
    aboutOrbitObserver=undefined;
  }
}

function showAboutOrbitSequence(){
  if(!aboutOrbit||document.hidden||animationResetInProgress)return;
  if(aboutOrbit.classList.contains('about-orbit-sequence-visible'))return;
  aboutOrbit.classList.add('about-orbit-sequence-visible');
  if(aboutOrbitObserver)aboutOrbitObserver.unobserve(aboutOrbit);
}

function revealAboutOrbitIfPending(){
  if(!aboutOrbit||reduceMotion||animationResetInProgress)return;
  if(!aboutOrbit.classList.contains('about-orbit-sequence-visible')&&elementMeetsViewportThreshold(aboutOrbit,.18,18))showAboutOrbitSequence();
}

function prepareAboutOrbitSequence(){
  if(!aboutOrbit)return;
  cleanupAboutOrbitSequence();
  aboutOrbit.classList.add('about-orbit-sequence-ready');
  if(reduceMotion)aboutOrbit.classList.add('about-orbit-sequence-visible');
  else aboutOrbit.classList.remove('about-orbit-sequence-visible');
}

function activateAboutOrbitSequence(epoch){
  if(!aboutOrbit||reduceMotion||epoch!==animationEpoch)return;
  if('IntersectionObserver' in window){
    aboutOrbitObserver=new IntersectionObserver(entries=>{
      if(epoch!==animationEpoch||animationResetInProgress)return;
      entries.forEach(entry=>{
        if(entry.isIntersecting&&!document.hidden)showAboutOrbitSequence();
      });
    },{threshold:.18,rootMargin:'0px 0px -18px 0px'});
    aboutOrbitObserver.observe(aboutOrbit);
  }
  revealAboutOrbitIfPending();
  if(!('IntersectionObserver' in window))showAboutOrbitSequence();
}

function cleanupContactChannelSequence(){
  if(contactChannelsObserver){
    contactChannelsObserver.disconnect();
    contactChannelsObserver=undefined;
  }
}

function showContactChannelSequence(){
  if(!contactChannels||document.hidden||animationResetInProgress)return;
  if(contactChannels.classList.contains('contact-sequence-visible'))return;
  contactChannels.classList.add('contact-sequence-visible');
  if(contactChannelsObserver)contactChannelsObserver.unobserve(contactChannels);
}

function revealContactChannelsIfPending(){
  if(!contactChannels||reduceMotion||animationResetInProgress)return;
  if(!contactChannels.classList.contains('contact-sequence-visible')&&elementMeetsViewportThreshold(contactChannels,.18,18))showContactChannelSequence();
}

function prepareContactChannelSequence(){
  if(!contactChannels)return;
  cleanupContactChannelSequence();
  contactChannels.classList.add('contact-sequence-ready');
  if(reduceMotion)contactChannels.classList.add('contact-sequence-visible');
  else contactChannels.classList.remove('contact-sequence-visible');
}

function activateContactChannelSequence(epoch){
  if(!contactChannels||reduceMotion||epoch!==animationEpoch)return;
  if('IntersectionObserver' in window){
    contactChannelsObserver=new IntersectionObserver(entries=>{
      if(epoch!==animationEpoch||animationResetInProgress)return;
      entries.forEach(entry=>{
        if(entry.isIntersecting&&!document.hidden)showContactChannelSequence();
      });
    },{threshold:.18,rootMargin:'0px 0px -18px 0px'});
    contactChannelsObserver.observe(contactChannels);
  }
  revealContactChannelsIfPending();
  if(!('IntersectionObserver' in window))showContactChannelSequence();
}

function cleanupAnimationSystems(){
  cancelAnimationLifecycleFrames();
  cleanupRevealAnimations();
  cleanupSectionHeadingSequences();
  cleanupContactChannelSequence();
  cleanupAboutOrbitSequence();
  animationResetInProgress=false;
  animationRoot.classList.remove('motion-reset');
}

function prepareAnimationSystems(){
  cancelAnimationLifecycleFrames();
  cleanupRevealAnimations();
  cleanupSectionHeadingSequences();
  cleanupContactChannelSequence();
  cleanupAboutOrbitSequence();
  animationEpoch+=1;
  const epoch=animationEpoch;
  animationResetInProgress=true;
  animationRoot.classList.add('motion-reset');
  prepareRevealAnimations();
  prepareSectionHeadingSequences();
  prepareContactChannelSequence();
  prepareAboutOrbitSequence();
  if(brandsMarquee)brandsMarquee.classList.remove('is-paused');
  void animationRoot.offsetHeight;
  return epoch;
}

function activateAnimationSystems(epoch){
  if(epoch!==animationEpoch)return;
  animationLifecycleFrame1=requestAnimationFrame(()=>{
    if(epoch!==animationEpoch)return;
    animationLifecycleFrame1=undefined;
    void animationRoot.offsetHeight;
    animationLifecycleFrame2=requestAnimationFrame(()=>{
      if(epoch!==animationEpoch)return;
      animationLifecycleFrame2=undefined;
      animationRoot.classList.remove('motion-reset');
      void animationRoot.offsetHeight;
      animationLifecycleFrame3=requestAnimationFrame(()=>{
        if(epoch!==animationEpoch)return;
        animationLifecycleFrame3=undefined;
        animationResetInProgress=false;
        activateRevealAnimations(epoch);
        activateSectionHeadingSequences(epoch);
        activateContactChannelSequence(epoch);
        activateAboutOrbitSequence(epoch);
      });
    });
  });
}

function restartAnimationSystems(){
  const epoch=prepareAnimationSystems();
  activateAnimationSystems(epoch);
  return epoch;
}

initialAnimationEpoch=prepareAnimationSystems();

window.addEventListener('pageshow',event=>{
  if(!initialPageShowHandled&&!event.persisted){
    initialPageShowHandled=true;
    activateAnimationSystems(initialAnimationEpoch);
    return;
  }
  initialPageShowHandled=true;
  restartAnimationSystems();
});

window.addEventListener('pagehide',()=>{
  cleanupAnimationSystems();
});

document.addEventListener('visibilitychange',()=>{
  if(document.hidden)return;
  if(animationResetInProgress)return;
  revealVisiblePendingItems();
  revealSectionHeadingsIfPending();
  revealContactChannelsIfPending();
  revealAboutOrbitIfPending();
});

const toast=document.querySelector('#toast');
let toastTimer;
function showToast(message){
  if(!toast)return;
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),3300);
}

document.querySelectorAll('.plan-btn').forEach(button=>{
  button.addEventListener('click',()=>{
    const card=button.closest('.price-card');
    const equipment=card?.querySelector('[data-equipment]')?.value||'0';
    const servers=card?.querySelector('[data-server]')?.value||'0';
    const plan=button.dataset.plan||'Plan';
    const note=`${plan}: ${equipment} puesto(s) de trabajo y ${servers} servidor(es).`;
    const subject=encodeURIComponent(`Consulta ${plan} - Punto Conectado`);
    const body=encodeURIComponent(`Hola, quisiera consultar por el plan ${plan}.\n\nPuestos de trabajo: ${equipment}\nServidores: ${servers}\n\nQuisiera recibir información sobre alcance y propuesta.`);
    showToast(note);
    setTimeout(()=>{window.location.href=`mailto:info@puntoconectado.com.ar?subject=${subject}&body=${body}`;},250);
  });
});

const form=document.querySelector('#contact-form');
if(form){
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(form);
    const body=[
      `Nombre: ${data.get('nombre')||''}`,
      `Empresa: ${data.get('empresa')||''}`,
      `Email: ${data.get('email')||''}`,
      `Teléfono: ${data.get('telefono')||''}`,
      `Tema: ${data.get('tema')||''}`,
      '',
      `Mensaje: ${data.get('mensaje')||''}`
    ].join('\n');
    const subject=encodeURIComponent(`Consulta web - ${data.get('tema')||'Punto Conectado'}`);
    const mail=encodeURIComponent(body).replace(/%0A/g,'%0D%0A');
    const note=document.querySelector('#form-note');
    if(note) note.textContent='Se abrirá tu aplicación de correo con el mensaje preparado.';
    window.location.href=`mailto:info@puntoconectado.com.ar?subject=${subject}&body=${mail}`;
  });
}

document.querySelectorAll('[data-placeholder]').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    showToast(`${link.dataset.placeholder}: página pendiente de contenido legal definitivo.`);
  });
});
