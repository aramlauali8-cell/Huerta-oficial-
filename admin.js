/* ---- Modo admin ---- */
function modoAdmin(on){ document.body.classList.toggle("admin",on); $("#barraAdmin").hidden=!on; try{ sessionStorage.setItem("hm_admin",on?"1":""); }catch(e){} }
const modal=id=>bootstrap.Modal.getOrCreateInstance($(id));
$("#btnAdmin").onclick=()=>{ if(document.body.classList.contains("admin")) return abrirPanel(); $("#codAdmin").value=""; $("#errCod").textContent=""; modal("#modalLogin").show(); };
$("#btnEntrar").onclick=()=>{ if($("#codAdmin").value===CONFIG.codigoAdmin){ modal("#modalLogin").hide(); modoAdmin(true); aviso("Modo admin activado 🛠️"); } else $("#errCod").textContent="Código incorrecto. Inténtalo otra vez."; };
$("#codAdmin").addEventListener("keydown",e=>{ if(e.key==="Enter") $("#btnEntrar").click(); });
$("#btnSalir").onclick=()=>modoAdmin(false);
$("#btnPanel").onclick=abrirPanel;
function abrirPanel(){ for(const k of ["whatsapp","tiktok","facebook","instagram"]) $("#c_"+k).value=D.contactos[k]||""; pintarMiniaturas(); modal("#modalAdmin").show(); }
$("#btnGuardarContactos").onclick=()=>{ for(const k of ["whatsapp","tiktok","facebook","instagram"]) D.contactos[k]=$("#c_"+k).value.trim(); delete D.contactos.direccion; if(!D.contactos.whatsapp) D.contactos.whatsapp=DEF.contactos.whatsapp; guardarDatos(); pintarContactos(); aviso("Contactos guardados ✅"); };

const leerFoto=(file,max=900,fmt="image/jpeg")=>new Promise((ok,no)=>{ const r=new FileReader(); r.onerror=no; r.onload=()=>{ const im=new Image(); im.onerror=no; im.onload=()=>{
  const k=Math.min(1,max/Math.max(im.width,im.height)), c=document.createElement("canvas"); c.width=im.width*k; c.height=im.height*k;
  c.getContext("2d").drawImage(im,0,0,c.width,c.height); ok(c.toDataURL(fmt,.85)); }; im.src=r.result; }; r.readAsDataURL(file); });
function pintarMiniaturas(){ $("#miniaturas").innerHTML=D.carrusel.map((f,i)=>`<div class="mini"><img src="${f}" alt="Foto ${i+1}"><button onclick="quitarFotoCarrusel(${i})" aria-label="Quitar foto">×</button></div>`).join("")||`<small class="text-muted">Aún no hay fotos. Mientras tanto se muestran imágenes de ejemplo.</small>`; }
$("#fotosCarrusel").onchange=async e=>{ for(const f of e.target.files){ try{ D.carrusel.push(await leerFoto(f)); }catch(x){ aviso("No pude leer esa foto"); } }
  e.target.value=""; guardarDatos(); pintarMiniaturas(); pintarCarrusel(); };
function quitarFotoCarrusel(i){ D.carrusel.splice(i,1); guardarDatos(); pintarMiniaturas(); pintarCarrusel(); }

$("#logoFile").onchange=async e=>{ const f=e.target.files[0]; e.target.value=""; if(!f) return;
  try{ D.logo=await leerFoto(f,256,"image/png"); guardarDatos(); pintarLogo(); aviso("Logo cambiado ✅"); }catch(x){ aviso("No pude leer esa imagen"); } };
$("#btnQuitarLogo").onclick=()=>{ D.logo=""; guardarDatos(); pintarLogo(); };
let editId=null;
function editarProducto(id){ const p=D.productos.find(x=>x.id==id); editId=id;
  $("#e_nombre").value=p.nombre; $("#e_precio").value=p.precio; $("#e_stock").value=(p.stock===null||p.stock===undefined)?"":p.stock;
  $("#e_desc").value=p.desc||""; $("#e_items").value=(p.items||[]).join(", "); $("#e_etiqueta").value=p.etiqueta||""; $("#e_emoji").value=p.emoji||""; $("#e_foto").value="";
  modal("#modalProd").show(); }
$("#btnGuardarProd").onclick=async()=>{ const p=D.productos.find(x=>x.id==editId); if(!p) return;
  const nombre=$("#e_nombre").value.trim(), precio=Number($("#e_precio").value);
  if(!nombre||!(precio>0)){ aviso("Escribe nombre y precio"); return; }
  const st=$("#e_stock").value.trim();
  p.nombre=nombre; p.precio=precio; p.stock=st===""?null:Math.max(0,Math.floor(Number(st))||0);
  p.desc=$("#e_desc").value.trim(); p.items=$("#e_items").value.split(",").map(x=>x.trim()).filter(Boolean);
  p.etiqueta=$("#e_etiqueta").value.trim()||"Nuevo"; p.emoji=$("#e_emoji").value.trim()||"🌱";
  const f=$("#e_foto").files[0]; if(f){ try{ p.img=await leerFoto(f); }catch(e){ aviso("No pude leer la foto"); } }
  if(carrito[p.id]>stockDe(p)){ if(stockDe(p)<=0) delete carrito[p.id]; else carrito[p.id]=stockDe(p); }
  guardarDatos(); pintarProductos(); guardar(); modal("#modalProd").hide(); aviso("Producto actualizado ✅"); };
$("#btnAddProd").onclick=async()=>{
  const nombre=$("#p_nombre").value.trim(), precio=Number($("#p_precio").value);
  if(!nombre||!(precio>0)){ aviso("Escribe nombre y precio"); return; }
  let img=""; const f=$("#p_foto").files[0]; if(f){ try{ img=await leerFoto(f); }catch(e){} }
  D.productos.push({ id:Date.now(), nombre, precio, emoji:$("#p_emoji").value.trim()||"🌱", img, etiqueta:"Nuevo",
    desc:$("#p_desc").value.trim(), stock:$("#p_stock").value.trim()===""?null:Math.max(0,Math.floor(Number($("#p_stock").value))||0),
    items:$("#p_items").value.split(",").map(x=>x.trim()).filter(Boolean) });
  guardarDatos(); pintarProductos(); ["p_nombre","p_precio","p_desc","p_stock","p_items","p_emoji","p_foto"].forEach(i=>$("#"+i).value=""); aviso("Producto agregado ✅");
};
function editarPrecio(id){ const p=D.productos.find(x=>x.id==id), v=Number(prompt("Nuevo precio en Bs para "+p.nombre,p.precio)); if(v>0){ p.precio=v; guardarDatos(); pintarProductos(); pintarCarrito(); } }
function quitarProducto(id){ if(!confirm("¿Quitar este producto?")) return; D.productos=D.productos.filter(x=>x.id!=id); delete carrito[id]; guardarDatos(); guardar(); pintarProductos(); }
let pendProd=null;
function fotoProducto(id){ pendProd=id; $("#fotoProd").click(); }
$("#fotoProd").onchange=async e=>{ const f=e.target.files[0]; e.target.value=""; if(!f) return;
  try{ D.productos.find(x=>x.id==pendProd).img=await leerFoto(f); guardarDatos(); pintarProductos(); }catch(x){ aviso("No pude leer esa foto"); } };
function quitarFotoProd(id){ D.productos.find(x=>x.id==id).img=""; guardarDatos(); pintarProductos(); }
