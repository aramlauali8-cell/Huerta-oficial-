/* ---- WhatsApp y redes ---- */
function numWa(){ const n=D.contactos.whatsapp.replace(/\D/g,""); return n.startsWith("591")?n:"591"+n; }
const waLink = (txt="") => `https://wa.me/${numWa()}${txt?"?text="+encodeURIComponent(txt):""}`;
const REDES = { tiktok:["TikTok","🎵",h=>`https://www.tiktok.com/@${h}`], facebook:["Facebook","📘",h=>`https://www.facebook.com/${h}`], instagram:["Instagram","📸",h=>`https://www.instagram.com/${h}`] };
function pintarLogo(){ $("#logoBox").innerHTML=`<img src="${D.logo||"images/logo.png"}" alt="Logo Huerta Mágica" onerror="this.replaceWith(document.createTextNode('🌱'))">`; }
function pintarContactos(){
  const c=D.contactos;
  let h=`<a class="btn btn-sm btn-sol" target="_blank" rel="noopener" href="${waLink("Hola Huerta Mágica 🌱, quiero información sobre los kits.")}">💬 WhatsApp ${esc(c.whatsapp)}</a>`;
  for(const k in REDES){ const [n,e,f]=REDES[k], v=(c[k]||"").trim();
    h += v ? `<a class="btn btn-sm btn-red" target="_blank" rel="noopener" href="${esc(/^https?:/.test(v)?v:f(v.replace(/^@/,"")))}">${e} ${n}</a>`
           : `<span class="btn btn-sm btn-red apagado">${e} ${n} (pronto)</span>`; }
  $("#redes").innerHTML=h;
}
