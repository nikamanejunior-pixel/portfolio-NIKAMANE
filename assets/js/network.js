/* =================================================================
   ANIMATION RÉSEAU DU HERO
   -----------------------------------------------------------------
   Particules reliées entre elles, dessinées sur un <canvas>.
   Les couleurs sont lues depuis le thème actif et se mettent à jour
   automatiquement lors du basculement clair / sombre.
   L'animation se fige si le visiteur a demandé moins d'animations.
   ================================================================= */
(function(){
  const c = document.getElementById('net'); if(!c) return;
  const ctx = c.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W,H,nodes=[]; const N=46, LINK=140;
  /* Couleurs lues depuis le thème actif (se met à jour au basculement) */
  const C={line:'224,160,18',dot:'255,211,78',palette:['255,211,78']};
  function readColors(){
    const cs=getComputedStyle(document.documentElement);
    C.line=(cs.getPropertyValue('--net-line')||'224,160,18').trim();
    C.dot =(cs.getPropertyValue('--net-dot') ||'255,211,78').trim();
    /* palette multicolore : chaque particule prend une des 4 teintes */
    C.palette=['--net-c1','--net-c2','--net-c3','--net-c4']
      .map(v=>(cs.getPropertyValue(v)||'').trim())
      .filter(Boolean);
    if(!C.palette.length) C.palette=[C.dot];
  }
  readColors();
  window.refreshNetColors=readColors;
  function resize(){ W=c.width=c.offsetWidth; H=c.height=c.offsetHeight; }
  function init(){
    nodes=Array.from({length:N},(_,i)=>({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35,
      r:Math.random()*1.9+1.1,
      ci:i%4,                          /* indice dans la palette */
      ph:Math.random()*Math.PI*2       /* phase de scintillement */
    }));
  }
  function col(n){ return C.palette[n.ci % C.palette.length]; }
  let t=0;
  function step(){
    t+=16; ctx.clearRect(0,0,W,H);
    for(const n of nodes){ if(!reduced){n.x+=n.vx;n.y+=n.vy;} if(n.x<0||n.x>W)n.vx*=-1; if(n.y<0||n.y>H)n.vy*=-1; }
    for(let i=0;i<N;i++){
      for(let j=i+1;j<N;j++){
        const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<LINK){
          const alpha=(1-d/LINK)*.30;
          const g=ctx.createLinearGradient(a.x,a.y,b.x,b.y);
          g.addColorStop(0,`rgba(${col(a)},${alpha})`);
          g.addColorStop(1,`rgba(${col(b)},${alpha})`);
          ctx.strokeStyle=g; ctx.lineWidth=1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
      const n=nodes[i], nc=col(n);
      const tw=reduced?1:(0.72+0.28*Math.sin(t*0.0016+n.ph));   /* scintillement doux */
      ctx.shadowBlur=10; ctx.shadowColor=`rgba(${nc},.55)`;
      ctx.fillStyle=`rgba(${nc},${(.85*tw).toFixed(3)})`;
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,7); ctx.fill();
      ctx.shadowBlur=0;
    }
    if(!reduced) requestAnimationFrame(step);
  }
  let rt; addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(()=>{resize();init();},150); });
  addEventListener('orientationchange',()=>{ setTimeout(()=>{resize();init();},200); });
  resize(); init(); step();
})();
