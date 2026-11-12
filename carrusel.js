/* ---- Carrusel ---- */
let ci=0;
function pintarCarrusel(){
  const base=[{e:"🌱",t:"Siembra",s:"Pon la semilla en la tierra",bg:"linear-gradient(135deg,#c9efb4,#8fd88a)"},{e:"🚿",t:"Riega",s:"Un poquito de agua cada día",bg:"linear-gradient(135deg,#bfe6fa,#7cc4ec)"},{e:"☀️",t:"Cuida",s:"Dale luz y mucho cariño",bg:"linear-gradient(135deg,#fff0a8,#ffd25a)"},{e:"🌻",t:"Mira crecer",s:"Observa cómo cambia tu planta",bg:"linear-gradient(135deg,#ffe0b8,#ffb27a)"},{e:"👨‍👩‍👧",t:"Aprende en familia",s:"Sin pantallas, con las manos",bg:"linear-gradient(135deg,#e6d4f7,#c3a4ec)"}];
  $("#slides").innerHTML = D.carrusel.length
    ? D.carrusel.map((f,i)=>`<div class="slide"><img src="${f}" alt="Foto ${i+1} de Huerta Mágica"></div>`).join("")
    : base.map(b=>`<div class="slide" style="background:${b.bg}"><div class="cap"><div class="big">${b.e}</div><h3>${b.t}</h3><p>${b.s}</p></div></div>`).join("");
  const n=document.querySelectorAll("#slides .slide").length;
  $("#puntos").innerHTML=Array.from({length:n},(_,i)=>`<button class="punto" onclick="ir(${i})" aria-label="Ir a la foto ${i+1}"></button>`).join("");
  ir(0);
}
function ir(n){ const s=document.querySelectorAll("#slides .slide"); if(!s.length) return; ci=(n+s.length)%s.length;
  s.forEach((e,i)=>e.classList.toggle("on",i===ci)); document.querySelectorAll("#puntos .punto").forEach((e,i)=>e.classList.toggle("on",i===ci)); }
if(!matchMedia("(prefers-reduced-motion:reduce)").matches) setInterval(()=>ir(ci+1),4500);
(function(){ const c=document.getElementById("carrusel"); let x0=null;
  c.addEventListener("touchstart",e=>{x0=e.touches[0].clientX;},{passive:true});
  c.addEventListener("touchend",e=>{ if(x0===null) return; const d=e.changedTouches[0].clientX-x0; if(Math.abs(d)>40) ir(ci+(d<0?1:-1)); x0=null; },{passive:true}); })();
