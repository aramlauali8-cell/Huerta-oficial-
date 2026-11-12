/* ---- Emojis al tocar botones ---- */
document.addEventListener("click",e=>{
  if(matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const b=e.target.closest("button,.btn,.nav-link"); if(!b) return;
  let x=e.clientX,y=e.clientY; if(!x&&!y){ const r=b.getBoundingClientRect(); x=r.left+r.width/2; y=r.top+r.height/2; }
  const E=["🌱","🌻","⭐","🦋","🍀","🌈","💚","🐞"];
  for(let i=0;i<4;i++){ const s=document.createElement("span"); s.className="emoji-burst"; s.textContent=E[Math.floor(Math.random()*E.length)];
    const a=Math.random()*Math.PI*2, d=40+Math.random()*50; s.style.left=x+"px"; s.style.top=y+"px";
    s.style.setProperty("--dx",Math.cos(a)*d+"px"); s.style.setProperty("--dy",Math.sin(a)*d-30+"px"); document.body.appendChild(s); setTimeout(()=>s.remove(),900); }
},true);

/* ---- Lluvia de emojis ---- */
(function(){
  if(matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const L=document.getElementById("lluvia"), E=["🌱","💧","🌻","🦋","🍀","🐞","🌷","☀️","🌈","🍃"];
  function soltar(){
    if(document.hidden||L.children.length>9) return;
    const g=document.createElement("span"); g.className="gota"; g.textContent=E[Math.floor(Math.random()*E.length)];
    g.style.left=Math.random()*96+"%"; g.style.fontSize=(.8+Math.random()*.8)+"rem";
    g.style.animationDuration=(8+Math.random()*7)+"s";
    g.style.setProperty("--sw",(Math.random()*120-60)+"px"); g.style.setProperty("--rot",(Math.random()*360-180)+"deg");
    L.appendChild(g); setTimeout(()=>g.remove(),17000);
  }
  setInterval(soltar,1500); for(let i=0;i<3;i++) setTimeout(soltar,i*500);
})();
