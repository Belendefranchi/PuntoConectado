const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-btn');
if(menu&&header){menu.addEventListener('click',()=>{const open=header.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')});}
