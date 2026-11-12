/* ---- Carrito ---- */
function guardar(){ try{ localStorage.setItem("hm_carrito",JSON.stringify(carrito)); }catch(e){} pintarCarrito(); }
function agregar(id){ const p=D.productos.find(x=>x.id==id); if(!p) return;
  if((carrito[id]||0)+1>stockDe(p)){ aviso("Solo quedan "+stockDe(p)+" de este producto"); return; }
  carrito[id]=(carrito[id]||0)+1; guardar(); aviso("Agregado al carrito 🛒");
  const b=$("#burbuja"); b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
function cambiar(id,d){ const p=D.productos.find(x=>x.id==id); carrito[id]=Math.min((carrito[id]||0)+d,p?stockDe(p):Infinity); if(carrito[id]<=0) delete carrito[id]; guardar(); }
function lineas(){ return Object.entries(carrito).map(([id,c])=>{ const p=D.productos.find(x=>x.id==id); return p?{...p,cant:c,sub:p.precio*c}:null; }).filter(Boolean); }
const totalCarrito=()=>lineas().reduce((s,l)=>s+l.sub,0);
function pintarCarrito(){
  const ls=lineas();
  $("#contador").textContent=ls.reduce((s,l)=>s+l.cant,0);
  $("#total").textContent=fmt(totalCarrito()); const nn=ls.reduce((t,l)=>t+l.cant,0); $("#nItems").textContent=nn+(nn==1?" producto":" productos");
  $("#pieCarrito").style.display=ls.length?"block":"none";
  $("#itemsCarrito").innerHTML=ls.length?ls.map(l=>`
    <div class="item-carrito">
      <div class="d-flex justify-content-between align-items-center gap-2">
        <div><strong>${esc(l.nombre)}</strong><br><small>${fmt(l.precio)} c/u</small></div>
        <div class="qty d-flex align-items-center gap-2">
          <button class="btn btn-outline-secondary" onclick="cambiar(${l.id},-1)" aria-label="Quitar uno">−</button><span class="cant">${l.cant}</span>
          <button class="btn btn-outline-secondary" onclick="cambiar(${l.id},1)" aria-label="Agregar uno">+</button>
        </div></div>
      <div class="sub-l">Subtotal: <b>${fmt(l.sub)}</b></div></div>`).join(""):`<p class="text-center text-muted mt-5">Tu carrito está vacío.<br>Agrega un kit para empezar.</p>`;
}
function armarMensaje(pago){
  const ls=lineas(), n=ls.reduce((t,l)=>t+l.cant,0), L="━━━━━━━━━━━━━━━";
  const det=ls.map(l=>`▪ ${l.cant} × ${l.nombre}\n    ${fmt(l.precio)} c/u → *${fmt(l.sub)}*`).join("\n");
  return `*🌱 NUEVO PEDIDO · HUERTA MÁGICA*\n${L}\n\n*Cliente:* ${$("#nombre").value.trim()}\n\n*Productos (${n})*\n${det}\n\n${L}\n*TOTAL A PAGAR: ${fmt(totalCarrito())}*\n*Pago:* ${pago==="QR"?"QR (Yape / Yasta)":"Efectivo"}\n${L}\n\n¡Gracias! Quedo atento(a) a la confirmación del pedido.`;
}
async function guardarXampp(pago){
  if(!CONFIG.xamppUrl) return;
  try{ await fetch(CONFIG.xamppUrl,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({cliente:$("#nombre").value.trim(),detalle:lineas().map(l=>({producto:l.nombre,cantidad:l.cant,subtotal:l.sub})),total:totalCarrito(),metodo_pago:pago})});
  }catch(e){ console.warn("No se guardó en XAMPP",e); }
}
async function guardarSupabase(pago){
  await guardarXampp(pago);
  if(!CONFIG.supabaseUrl||!CONFIG.supabaseKey) return;
  try{ await fetch(`${CONFIG.supabaseUrl}/rest/v1/pedidos`,{ method:"POST",
    headers:{"Content-Type":"application/json",apikey:CONFIG.supabaseKey,Authorization:`Bearer ${CONFIG.supabaseKey}`,Prefer:"return=minimal"},
    body:JSON.stringify({cliente:$("#nombre").value.trim(),detalle:lineas().map(l=>({producto:l.nombre,cantidad:l.cant,subtotal:l.sub})),total:totalCarrito(),metodo_pago:pago}) });
  }catch(e){ console.warn("No se guardó en Supabase",e); }
}
async function enviarPedido(pago){ await guardarSupabase(pago); window.open(waLink(armarMensaje(pago)),"_blank"); carrito={}; guardar(); }
$("#btnPedir").onclick=()=>{
  if(!lineas().length) return;
  if(!$("#nombre").value.trim()){ $("#nombre").classList.add("is-invalid"); $("#nombre").focus(); return; }
  $("#nombre").classList.remove("is-invalid");
  const pago=document.querySelector("input[name=pago]:checked").value;
  if(pago==="QR"){ $("#montoQr").textContent=fmt(totalCarrito()); bootstrap.Modal.getOrCreateInstance($("#modalQr")).show(); } else enviarPedido("Efectivo");
};
$("#btnYaPague").onclick=()=>{ bootstrap.Modal.getOrCreateInstance($("#modalQr")).hide(); enviarPedido("QR"); };
$("#btnVaciar").onclick=()=>{ carrito={}; guardar(); };

/* ---- Botón del carrito: fijo abajo a la derecha ---- */
$("#burbuja").addEventListener("click",()=>bootstrap.Offcanvas.getOrCreateInstance($("#panelCarrito")).show());
