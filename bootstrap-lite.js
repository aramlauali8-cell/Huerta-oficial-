(function(){
  const bd=document.createElement('div');bd.className='backdrop';document.body.appendChild(bd);let cur=null;
  function open(el){close();cur=el;el.classList.add('show');bd.classList.add('show');document.body.style.overflow='hidden';}
  function close(){if(cur){cur.classList.remove('show');cur=null;}bd.classList.remove('show');document.body.style.overflow='';}
  bd.onclick=close;document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  window.bootstrap={Offcanvas:{getOrCreateInstance:el=>({show:()=>open(el),hide:close})},
    Modal:{getOrCreateInstance:el=>({show:()=>open(el),hide:close}),getInstance:el=>({hide:close})}};
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-bs-toggle],[data-bs-dismiss]');if(!t)return;
    if(t.dataset.bsDismiss){close();return;}
    const tg=document.querySelector(t.dataset.bsTarget);if(!tg)return;
    if(t.dataset.bsToggle==='offcanvas'){open(tg);return;}
    const par=tg.dataset.bsParent&&document.querySelector(tg.dataset.bsParent),show=!tg.classList.contains('show');
    if(par)par.querySelectorAll('.accordion-collapse').forEach(c=>{c.classList.remove('show');const b=par.querySelector('[data-bs-target="#'+c.id+'"]');if(b)b.classList.add('collapsed');});
    tg.classList.toggle('show',show);t.classList.toggle('collapsed',!show);
  });
})();
