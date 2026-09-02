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

const sections=[...document.querySelectorAll('main section[id]')];
const observerNav=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
  });
},{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(s=>observerNav.observe(s));

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems=document.querySelectorAll('.card,.price-card,.app-card,.feature-row,.about-grid,.contact-panel,.form-card');
if(!reduceMotion&&'IntersectionObserver' in window){
  const ro=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('reveal','visible');ro.unobserve(e.target);}
    });
  },{threshold:.06,rootMargin:'0px 0px -24px 0px'});
  revealItems.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%5,4)*45}ms`;ro.observe(el);});
}else revealItems.forEach(el=>el.classList.add('visible'));

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
