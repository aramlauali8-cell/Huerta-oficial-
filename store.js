const $ = s => document.querySelector(s);
const fmt = n => `${CONFIG.moneda} ${n}`;
const esc = t => String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function cargar(){
  try{ const x = JSON.parse(localStorage.getItem("hm_datos")||"null");
    if(x) return { ...DEF, ...x, contactos:{ ...DEF.contactos, ...x.contactos } }; }catch(e){}
  return JSON.parse(JSON.stringify(DEF));
}
let D = cargar();
let carrito = {}; try{ carrito = JSON.parse(localStorage.getItem("hm_carrito")||"{}"); }catch(e){}
function guardarDatos(){ try{ localStorage.setItem("hm_datos", JSON.stringify(D)); }catch(e){ aviso("No cabe más: usa fotos más pequeñas"); } }
function aviso(t){ const d=document.createElement("div"); d.className="toast-hm"; d.textContent=t; document.body.appendChild(d); setTimeout(()=>d.remove(),2500); }
