/* ---- Productos ---- */
const stockDe=p=>(p.stock===null||p.stock===undefined||p.stock==="")?Infinity:Number(p.stock);
function pintarProductos(){
  $("#listaProductos").innerHTML = D.productos.map(p=>{
    const st=stockDe(p), agot=st<=0;
    const tx = st===Infinity?"": agot?"Agotado": st<=5?`¡Quedan ${st}!`:"Disponible";
    return `
    <div class="card prod ${agot?"agotado":""}">
      <div class="thumb">${esc(p.emoji||"🌱")}${p.img?`<img src="${p.img}" alt="${esc(p.nombre)}" loading="lazy" onerror="this.remove()">`:""}</div>
      <div class="prod-body">
        <span class="badge badge-edu align-self-start">${esc(p.etiqueta||"Nuevo")}</span>
        <h4>${esc(p.nombre)}</h4>
        ${p.desc?`<p class="desc">${esc(p.desc)}</p>`:""}
        <details><summary>Qué incluye</summary><ul>${(p.items||[]).map(i=>`<li>${esc(i)}</li>`).join("")}</ul></details>
        ${tx?`<div class="stock ${agot?"agot":st<=5?"poco":""}">${tx}</div>`:""}
        <div class="solo-admin">
          <small>📦 Stock: ${st===Infinity?"sin límite":st}</small>
          <button class="btn btn-sm btn-outline-secondary" onclick="editarProducto(${p.id})">✏️ Editar</button>
          <button class="btn btn-sm btn-outline-secondary" onclick="fotoProducto(${p.id})">📷 Foto</button>
          <button class="btn btn-sm btn-outline-secondary" onclick="quitarFotoProd(${p.id})">🚫 Foto</button>
          <button class="btn btn-sm btn-outline-secondary text-danger" onclick="quitarProducto(${p.id})">🗑️</button>
        </div>
        <div class="mt-auto">
          <span class="precio">${fmt(p.precio)}</span>
          <button class="btn btn-huerta" ${agot?"disabled":""} onclick="agregar(${p.id})">${agot?"Agotado":"🛒 Agregar"}</button>
        </div>
      </div></div>`;}).join("") || `<p class="text-center">Pronto tendremos productos 🌱</p>`;
}
