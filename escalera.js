/* Neiro · guía del piano de referencia: lo que suena, dibujado al mismo tiempo que suena.
   Dos vistas (Tú → Piano de referencia → Vista):
   · Escalera (por defecto): pianola vertical. A la izquierda, tu tesitura como teclado; a la derecha, el acorde
     y el patrón como peldaños con su grado (1 = tónica). Cada vuelta, la escalera entera sube o baja medio tono
     y deja una sombra donde estaba. Líneas de puntos: tu tope y tu suelo.
   · Teclado: piano en horizontal con las teclas de esta vuelta marcadas por grado y su nombre, para tocarlo.
     Encima, el orden de las notas. Se puede tocar una tecla para oírla.
   Las dos leen el mismo plan de la vuelta que toca el piano (PAT.round, de patPlan), así que lo encendido es lo que se oye.
   Con «Tu voz» encendido, encima se dibuja lo que cantas (línea naranja), con el mismo reloj que lo encendido.
   En iOS será una vista de SwiftUI (Canvas) alimentada por ese mismo plan. */
'use strict';

const DEGN={0:'1',2:'2',4:'3',5:'4',7:'5',9:'6',11:'7',12:'8'};
/* más allá de la octava, 9 · 10 · 11 · 12; por debajo de la tónica, el grado de la octava de abajo */
const DEGX={14:'9',16:'10',17:'11',19:'12',21:'13'};
const degOf=k=>DEGN[k]||DEGX[k]||(k<0?DEGN[((k%12)+12)%12]||'':'');
const pc12=m=>((m%12)+12)%12;
const isBlk=m=>[1,3,6,8,10].includes(pc12(m));
const gView=()=>pianoCfg().view;
const PNO_VIEW={
  esc:{n:'Escalera',s:'Las notas como peldaños sobre tu tesitura, subiendo medio tono cada vuelta. Para seguir el patrón cantando'},
  tec:{n:'Teclado',s:'Un piano en horizontal con las teclas de cada vuelta y su nombre. Para tocarlo tú: toca una tecla para oírla'}
};
const GD_WIN={esc:{pad:[3,2],max:34},tec:{pad:[1,1],max:29}};
let GD_N=0;

/* ═════ QUÉ SE ENSEÑA ═════ */
const gdPlaying=id=>!!(PAT.on&&PAT.round&&PAT.e&&PAT.e.id===id);
/* tónica que se ve: la de la vuelta que suena o, parado, la del reproductor */
const gdTonic=(id,e)=>gdPlaying(id)?PAT.round.tonic:(PV.id===id?PV.tonic:startTonic(e));
/* plan que se dibuja: el de la vuelta que suena o, parado, el de tus ajustes */
const gdPlan=(id,e)=>gdPlaying(id)?PAT.round.pl:patPlan(e);
const plSig=pl=>pl.tp.toFixed(3)+'|'+pl.D.toFixed(3)+'|'+(pl.ci||0)+(pl.nochord?'n':'');
const patLo=e=>Math.min(...e.pat),patHi=e=>Math.max(...e.pat);
/* ventana de notas: todo tu rango si cabe; si no, la parte alrededor del patrón */
function gdWin(e,tonic,v){
  const {pad,max}=GD_WIN[v],r=myRange(),pLo=tonic+patLo(e),pHi=tonic+patHi(e);
  let a=Math.min(r.lo-pad[0],pLo-1),b=Math.max(r.hi+pad[1],pHi+1);
  if(b-a+1<=max)return{a,b,full:1};
  a=Math.round((pLo+pHi)/2)-Math.floor(max/2);
  a=Math.max(Math.min(a,r.hi+pad[1]-max+1),r.lo-pad[0]);
  if(pLo-1<a)a=pLo-1;if(pHi+1>a+max-1)a=pHi+2-max;
  return{a,b:a+max-1,full:0};
}
function gdInfo(e,tonic,id){
  const top=noteName(tonic+patHi(e));
  if(exLee(e)){
    const N=e.lines.length,ci=gdPlaying(id)?PAT.round.pl.ci:leeCi(e),lb=e.lab&&e.lab[ci]?'Nº '+e.lab[ci]+' · ':'';
    return{c:gdPlaying(id)?'tint':'gray',top,t:gdPlaying(id)?'♪ '+lb+'línea '+(ci+1)+' de '+N:'Lectura seguida · '+(N===1?'1 línea':N+' líneas')+' · tono fijo'};
  }
  if(!gdPlaying(id))return{c:'gray',t:'Medio tono más arriba cada vuelta',top};
  const up=PAT.dir>0,rem=Math.max(0,up?patTop(e)-(tonic+patHi(e)):(tonic+patLo(e))-myRange().lo),n=rem===1?'falta 1':'faltan '+rem;
  return{c:up?'tint':'gray',top,t:up?(rem?'↑ Sube · '+n+' para tu tope':'↑ En tu tope · ahora baja'):(rem?'↓ Baja · '+n+' para abajo':'↓ Abajo del todo · ahora sube')};
}
const gdAria=(e,tonic)=>'Patrón '+e.pat.map(degOf).join(' ')+' desde '+noteName(tonic)+'; nota más aguda '+noteName(tonic+patHi(e));

/* ═════ PIEZA DEL REPRODUCTOR ═════ */
function guideHTML(id){
  const e=exBase(id);if(!e||!e.pat)return '';
  const g=gdMake(id,e);
  return '<div class="guide" data-id="'+esc(id)+'" data-st="'+esc(JSON.stringify(g.st))+'">'+g.html+'</div>';
}
/* la guía entera, con su estado (vista, tónica, ventana y ritmo con que se dibujó) */
function gdMake(id,e){
  const v=gView(),tonic=gdTonic(id,e),pl=gdPlan(id,e),w=gdWin(e,tonic,v),inf=gdInfo(e,tonic,id);
  const vz=pianoCfg().voz?1:0;
  /* en lectura seguida no hay cabecera: ni sentido ni nota más aguda (el tono no se mueve) */
  const html=(exLee(e)?'':'<div class="ghd"><span class="pill '+inf.c+'" data-g="pill">'+inf.t+'</span><div class="gtop"><p class="c1 l2">Más aguda</p><p class="fn semi num" data-g="top">'+inf.top+'</p></div></div>')+
    (v==='tec'?tecHTML(e,tonic,w,pl,vz):escHTML(e,tonic,w,pl,++GD_N,vz))+

    (e.seq&&e.seq.length?'<div class="gpg" data-g="staff"></div>':'');
  return{html,pl,st:{v,t:tonic,a:w.a,b:w.b,full:w.full,sig:plSig(pl),top:patTop(e),vz}};
}
/* rehace la guía en su sitio */
function gdBuild(el,id,e){el._pgsig=undefined;const g=gdMake(id,e);el.innerHTML=g.html;el._st=g.st;gdParts(el,e,g.pl)}

/* ── escalera (vertical) ── */
const GW=360,GROW=9,GKX=30,GKW=18,GGX=GKX+GKW+12,GCW=22;
/* forma de una vuelta en coordenadas de la tónica (y = 0 es la fila de la tónica) */
function escShapes(pl){
  const PX=GGX+GCW+(pl.pre?30:12),PW=GW-PX-6,xs=t=>PX+t/pl.D*PW,sh=[];
  if(!pl.nochord)[0,4,7].forEach(k=>sh.push({i:'c',x:GGX,w:GCW,k}));
  if(pl.pre)sh.push({i:'p',x:GGX+GCW+8,w:14,k:pl.pre.k});
  if(pl.glide)pl.it.forEach((it,j)=>sh.push({i:String(j),seg:1,x0:xs(it.t)+(j===0?5:0),x1:xs(it.t+it.d)-(j===pl.it.length-1?5:0),k0:it.k0,k1:it.k1}));
  else pl.it.forEach((it,j)=>sh.push({i:String(j),x:xs(it.t)+1.5,w:Math.max(4,it.len/pl.D*PW-3),k:it.k}));
  return{sh,PX,PW};
}
const gyc=k=>-k*GROW+GROW/2;
function escShape(x,fill,cls){
  const a=' data-i="'+x.i+'"'+(cls?' class="'+cls+'"':'');
  if(x.seg)return '<line'+a+' x1="'+x.x0.toFixed(1)+'" y1="'+gyc(x.k0)+'" x2="'+x.x1.toFixed(1)+'" y2="'+gyc(x.k1)+'" stroke="'+fill+'" stroke-width="'+(GROW-3)+'" stroke-linecap="round"/>';
  return '<rect'+a+' x="'+x.x.toFixed(1)+'" y="'+(-x.k*GROW+1)+'" width="'+x.w.toFixed(1)+'" height="'+(GROW-2)+'" rx="'+((GROW-2)/2)+'" fill="'+fill+'"/>';
}
/* sombra de la vuelta anterior: solo el contorno */
function escGhost(pl){
  return escShapes(pl).sh.filter(x=>x.i!=='c').map(x=>x.seg
    ?'<line x1="'+x.x0.toFixed(1)+'" y1="'+gyc(x.k0)+'" x2="'+x.x1.toFixed(1)+'" y2="'+gyc(x.k1)+'" stroke="var(--label3)" stroke-width="1" stroke-dasharray="2 2"/>'
    :'<rect x="'+x.x.toFixed(1)+'" y="'+(-x.k*GROW+1.5)+'" width="'+x.w.toFixed(1)+'" height="'+(GROW-3)+'" rx="'+((GROW-3)/2)+'" fill="none" stroke="var(--label3)" stroke-width=".8" stroke-dasharray="2 2"/>').join('');
}
function escHTML(e,tonic,w,pl,n,vz){
  const r=myRange(),top=patTop(e),H=(w.b-w.a+1)*GROW,yT=m=>(w.b-m)*GROW,S=escShapes(pl);
  let s='<svg class="gsvg" viewBox="0 0 '+GW+' '+H+'" role="img" aria-label="'+esc(gdAria(e,tonic))+'"><defs><clipPath id="gdc'+n+'" clipPathUnits="userSpaceOnUse"><rect data-g="clip" x="0" y="-4000" width="0" height="8000"/></clipPath></defs>';
  /* filas de las teclas negras y una línea en cada Do, como en una pianola */
  for(let m=w.a;m<=w.b;m++){const y=yT(m);
    if(isBlk(m))s+='<rect x="'+(GGX-6)+'" y="'+y+'" width="'+(GW-GGX+6)+'" height="'+GROW+'" fill="var(--g-row)"/>';
    if(pc12(m)===0)s+='<line x1="'+(GGX-6)+'" x2="'+GW+'" y1="'+(y+GROW)+'" y2="'+(y+GROW)+'" stroke="var(--sep)" stroke-width=".6"/>';
  }
  /* tope (arriba) y suelo (abajo): al llegar, da la vuelta */
  if(top>=w.a&&top<=w.b)s+='<line x1="'+(GGX-6)+'" x2="'+GW+'" y1="'+yT(top)+'" y2="'+yT(top)+'" stroke="var(--label3)" stroke-width=".8" stroke-dasharray="2 3"/>';
  if(r.lo>=w.a&&r.lo<=w.b)s+='<line x1="'+(GGX-6)+'" x2="'+GW+'" y1="'+(yT(r.lo)+GROW)+'" y2="'+(yT(r.lo)+GROW)+'" stroke="var(--label3)" stroke-width=".8" stroke-dasharray="2 3"/>';
  /* teclado vertical: tu tesitura; fuera de ella, más tenue */
  let wk='',bk='',sp='',lb='';
  for(let m=w.a;m<=w.b;m++){
    const y=yT(m),op=m>=r.lo&&m<=r.hi?1:.35;
    if(isBlk(m)){
      wk+='<rect x="'+GKX+'" y="'+y+'" width="'+GKW+'" height="'+GROW+'" fill="var(--kw)" opacity="'+op+'"/>';
      bk+='<rect data-k="'+m+'" x="'+GKX+'" y="'+(y+.6)+'" width="'+(GKW*.6)+'" height="'+(GROW-1.2)+'" rx="1" fill="var(--kb)" opacity="'+op+'"/>';
      sp+='<line x1="'+(GKX+GKW*.6)+'" x2="'+(GKX+GKW)+'" y1="'+(y+GROW/2)+'" y2="'+(y+GROW/2)+'" stroke="var(--kedge)" stroke-width=".6" opacity="'+op+'"/>';
    }else{
      wk+='<rect data-k="'+m+'" x="'+GKX+'" y="'+y+'" width="'+GKW+'" height="'+GROW+'" fill="var(--kw)" opacity="'+op+'"/>';
      if(!isBlk(m-1)&&m>w.a)sp+='<line x1="'+GKX+'" x2="'+(GKX+GKW)+'" y1="'+(y+GROW)+'" y2="'+(y+GROW)+'" stroke="var(--kedge)" stroke-width=".6" opacity="'+op+'"/>';
    }
    if(pc12(m)===0)lb+='<text class="gklab" x="'+(GKX-5)+'" y="'+(y+GROW-1.5)+'">'+noteName(m)+'</text>';
  }
  s+=lb+wk+bk+sp+'<rect x="'+GKX+'" y="0" width="'+GKW+'" height="'+H+'" rx="2" fill="none" stroke="var(--kedge)" stroke-width=".8"/>';
  /* la escalera: base gris, capa encendida (recortada hasta lo que ya ha sonado) y grados encima de cada nota */
  let lab='';
  if(pl.glide){
    const g=S.sh.filter(x=>x.seg),pts=[{x:g[0].x0,k:g[0].k0}].concat(g.map(x=>({x:x.x1,k:x.k1})));
    pts.forEach(p=>lab+='<text class="gdeg" x="'+p.x.toFixed(1)+'" y="'+(-p.k*GROW-2.5)+'">'+degOf(p.k)+'</text>');
  }else S.sh.filter(x=>x.i!=='c').forEach(x=>lab+='<text class="gdeg" data-i="'+x.i+'" x="'+(x.x+x.w/2).toFixed(1)+'" y="'+(-x.k*GROW-2)+'">'+degOf(x.k)+'</text>');
  if(!pl.nochord)lab+='<text class="gtag" x="'+(GGX+GCW/2)+'" y="'+(GROW+9)+'">acorde</text>';
  return s+'<g data-g="ghost"></g><g data-g="pat" class="gpat" style="transform:translate(0px,'+yT(tonic)+'px)">'+
    S.sh.map(x=>escShape(x,'var(--g-bar)')).join('')+
    '<g clip-path="url(#gdc'+n+')">'+S.sh.map(x=>escShape(x,'var(--g-done)','gl')).join('')+'</g>'+lab+
    '<circle data-g="dot" r="5" fill="var(--g-now)" stroke="var(--bg2)" stroke-width="1.5" opacity="0"/></g>'+
    (vz?'<g data-g="vozp"></g><path data-g="voz" class="gvozl" d=""/><circle data-g="vozd" class="gvozd" r="4" opacity="0"/>':'')+'</svg>';
}

/* ── teclado (horizontal) ── */
const TKH=104,TBH=64;
function tecKeys(w){
  let a=w.a,b=w.b;if(isBlk(a))a--;if(isBlk(b))b++;
  const wh=[];for(let m=a;m<=b;m++)if(!isBlk(m))wh.push(m);
  const kw=GW/wh.length,x={};wh.forEach((m,i)=>x[m]=i*kw);
  for(let m=a;m<=b;m++)if(isBlk(m))x[m]=x[m-1]+kw;   // centro de la tecla negra, entre sus dos blancas
  return{a,b,wh,kw,bw:kw*.6,x};
}
function tecHTML(e,tonic,w,pl,vz){
  const r=myRange(),K=tecKeys(w),names=K.kw>=17,inR=m=>m>=r.lo&&m<=r.hi;
  /* el orden: acorde, nota de inicio (en tranquila) y el patrón; en las sirenas, los puntos de giro */
  let q=(pl.nochord?'':'<span class="wd" data-i="c">Acorde</span>')+(pl.pre?'<span data-i="p">'+degOf(pl.pre.k)+'</span><i></i>':'');
  q+=(pl.glide?e.pat:pl.it.map(x=>x.k)).map((k,j,a)=>'<span data-i="'+j+'">'+degOf(k)+'</span>'+(pl.glide&&j<a.length-1?'<b>→</b>':'')).join('');
  /* patrones muy largos: el orden no cabe; el pentagrama de abajo ya lo enseña */
  let s=(pl.it.length>28?'':'<div class="gseq" aria-label="Orden de las notas">'+q+'</div>')+
    '<svg class="gsvg gkbd" viewBox="0 0 '+GW+' '+TKH+'" role="img" aria-label="'+esc(gdAria(e,tonic))+'" onclick="gdTap(event)">';
  K.wh.forEach(m=>{const x=K.x[m],cx=(x+K.kw/2).toFixed(1);
    s+='<g opacity="'+(inR(m)?1:.4)+'"><rect data-m="'+m+'" x="'+(x+.5).toFixed(1)+'" y="0" width="'+(K.kw-1).toFixed(1)+'" height="'+TKH+'" rx="3" fill="var(--kw)" stroke="var(--kedge)" stroke-width=".6"/>'+
      '<rect data-k="'+m+'" x="'+(x+1.5).toFixed(1)+'" y="1" width="'+(K.kw-3).toFixed(1)+'" height="'+(TKH-2)+'" rx="2.5" fill="transparent" pointer-events="none"/>'+
      (names||pc12(m)===0?'<text class="gkname" x="'+cx+'" y="'+(TKH-7)+'" pointer-events="none">'+(pc12(m)===0?noteName(m):NN[pc12(m)])+'</text>':'')+
      '<text class="gkdeg" data-d="'+m+'" x="'+cx+'" y="'+(TKH-22)+'" pointer-events="none"></text></g>'});
  for(let m=K.a;m<=K.b;m++)if(isBlk(m)){const x=K.x[m]-K.bw/2;
    s+='<g opacity="'+(inR(m)?1:.4)+'"><rect data-m="'+m+'" data-k="'+m+'" x="'+x.toFixed(1)+'" y="0" width="'+K.bw.toFixed(1)+'" height="'+TBH+'" rx="2.5" fill="var(--kb)"/>'+
      '<text class="gkdeg blk" data-d="'+m+'" x="'+K.x[m].toFixed(1)+'" y="'+(TBH-10)+'" pointer-events="none"></text></g>'}
  /* tu voz: una franja naranja encima de las teclas, en la altura exacta que cantas (sin tapar grado ni nombre) */
  if(vz)s+='<rect data-g="vozk" class="gvozk" x="-3" y="3" width="6" height="'+(TKH-36)+'" rx="3" opacity="0"/>';
  return s+'</svg>';
}
function gdTap(ev){const k=ev.target.closest('[data-m]');if(k)tone(+k.dataset.m,.9)}

/* ═════ ANIMACIÓN ═════ */
function gdParts(el,e,pl){
  const q=s=>el.querySelector('[data-g="'+s+'"]');
  const P={pill:q('pill'),top:q('top'),pat:q('pat'),ghost:q('ghost'),clip:q('clip'),dot:q('dot'),
    lit:[...el.querySelectorAll('.gl')],lab:[...el.querySelectorAll('.gdeg[data-i]')],chips:[...el.querySelectorAll('.gseq [data-i]')],
    deg:[...el.querySelectorAll('[data-d]')],keys:{},S:escShapes(pl),pl,
    voz:q('voz'),vozp:q('vozp'),vozd:q('vozd'),vozk:q('vozk'),vozn:q('vozn'),vozs:q('vozs')};
  if(el._st.v==='tec')P.K=tecKeys(el._st);
  el.querySelectorAll('[data-k]').forEach(k=>P.keys[k.dataset.k]=k);
  el._p=P;el._last={};el._mk={};
  if(el._st.v==='tec')tecMark(el,e,el._st.t);
}
/* teclado horizontal: las teclas de esta vuelta, marcadas con su grado */
function tecMark(el,e,tonic){
  const mk={};e.pat.forEach(k=>mk[tonic+k]=degOf(k));el._mk=mk;
  el._p.deg.forEach(t=>t.textContent=mk[t.dataset.d]||'');
  el._last.keys=null;
}
/* pinta cada tecla: la que suena en lima; en el teclado, las de esta vuelta en lima suave */
function gdPaintKeys(el,on){
  const P=el._p,tec=el._st.v==='tec',mk=el._mk;
  for(const k in P.keys){const m=+k,b=isBlk(m),s=on.includes(m);
    P.keys[k].setAttribute('fill',s?'var(--g-now)':(tec?(mk[m]?(b?'var(--g-markb)':'var(--g-mark)'):(b?'var(--kb)':'transparent')):(b?'var(--kb)':'var(--kw)')));
  }
  if(tec)P.deg.forEach(t=>t.classList.toggle('now',on.includes(+t.dataset.d)));
}
/* qué suena en el instante t de la vuelta R */
function gdSound(R,t){
  const s=R.s,pl=R.pl,m=R.tonic;
  if(t<s)return{cur:null,keys:[]};
  if(t<s+pl.cd)return{cur:'c',keys:t<s+pl.chord?[m,m+4,m+7].concat(m>=48?[m-12]:[]):[]};
  if(pl.pre&&t<s+pl.tp)return{cur:'p',keys:t<s+pl.pre.t+pl.pre.len?[m+pl.pre.k]:[]};
  const tr=t-s-pl.tp;
  if(tr>=pl.D)return{cur:'end',keys:[]};
  let j=0;pl.it.forEach((x,i)=>{if(tr>=x.t)j=i});const n=pl.it[j];
  if(pl.glide){const k=n.k0+(n.k1-n.k0)*(tr-n.t)/n.d;return{cur:String(j),keys:[m+Math.round(k)],tr,k}}
  return{cur:String(j),keys:tr<n.t+n.len?[m+n.k]:[],tr,n};
}
const gdSet=(el,k,v,fn)=>{if(el._last[k]!==v){el._last[k]=v;fn(v)}};
function gdFrame(){
  requestAnimationFrame(gdFrame);
  for(const el of document.getElementsByClassName('guide'))if(el.getClientRects().length)gdTick(el);
}
function gdTick(el){
  const id=el.dataset.id,e=exBase(id);if(!e||!e.pat)return;
  if(!el._st){try{el._st=JSON.parse(el.dataset.st)}catch(x){gdBuild(el,id,e);return}gdParts(el,e,gdPlan(id,e))}
  const v=gView(),tonic=gdTonic(id,e),pl=gdPlan(id,e),st=el._st;
  /* otra vista, otro ritmo (velocidad) o el patrón se sale de lo que se ve: se rehace */
  const nw=gdWin(e,tonic,v),fits=tonic+patLo(e)>st.a&&tonic+patHi(e)<st.b;
  if(st.v!==v||st.vz!==(pianoCfg().voz?1:0)||st.sig!==plSig(pl)||st.top!==patTop(e)||!fits||(st.full&&(nw.a!==st.a||nw.b!==st.b))){gdBuild(el,id,e);return}
  const P=el._p;
  /* vuelta nueva o cambio de tónica: la escalera se mueve y deja una sombra donde estaba */
  if(st.t!==tonic){
    const old=st.t;st.t=tonic;
    if(v==='esc'){
      if(P.ghost)P.ghost.innerHTML='<g class="gghost" transform="translate(0 '+((st.b-old)*GROW)+')">'+escGhost(pl)+'</g>';
      P.pat.style.transform='translate(0px,'+((st.b-tonic)*GROW)+'px)';
    }else tecMark(el,e,tonic);
    const sv=el.querySelector('svg[role="img"]');if(sv)sv.setAttribute('aria-label',gdAria(e,tonic));
  }
  const inf=gdInfo(e,tonic,id);
  if(P.pill)gdSet(el,'pill',inf.c+inf.t,()=>{P.pill.className='pill '+inf.c;P.pill.textContent=inf.t});
  if(P.top)gdSet(el,'top',inf.top,x=>P.top.textContent=x);
  /* lo que suena ahora, descontando el retardo del altavoz o de los auriculares */
  const R=gdPlaying(id)?PAT.round:null,c=AC;
  const snd=R&&c?gdSound(R,c.currentTime-Math.min(.5,(c.outputLatency||0)+(c.baseLatency||0))):{cur:null,keys:[]};
  gdSet(el,'keys',snd.keys.join(','),()=>gdPaintKeys(el,snd.keys));
  const cur=snd.cur;
  if(v==='esc'){
    /* lo que ya ha sonado, en lima suave; la nota de ahora, entera y en lima */
    const S=P.S;let cx=GGX-2;
    if(cur==='c')cx=GGX+GCW+1;
    else if(cur==='p'){const p=S.sh.find(x=>x.i==='p');cx=p.x+p.w+1}
    else if(cur==='end')cx=GW;
    else if(cur!=null)cx=pl.glide||e.hold||!snd.n?S.PX+snd.tr/pl.D*S.PW:S.PX+(snd.n.t+snd.n.len)/pl.D*S.PW+1;
    gdSet(el,'clip',cx.toFixed(1),x=>P.clip.setAttribute('width',x));
    gdSet(el,'cur',String(cur),()=>{
      P.lit.forEach(x=>x.setAttribute(x.tagName==='line'?'stroke':'fill',cur!=null&&x.dataset.i===cur?'var(--g-now)':'var(--g-done)'));
      P.lab.forEach(x=>x.classList.toggle('now',cur!=null&&x.dataset.i===cur));
    });
    const d=pl.glide&&snd.k!=null?[S.PX+snd.tr/pl.D*S.PW,gyc(snd.k)]:null;
    if(d){P.dot.setAttribute('cx',d[0].toFixed(1));P.dot.setAttribute('cy',d[1].toFixed(1))}
    gdSet(el,'dot',d?1:0,x=>P.dot.setAttribute('opacity',x));
  }else{
    /* orden de las notas: lo hecho, lo de ahora y lo que falta (en las sirenas, el punto al que vas) */
    const ord=P.chips.map(x=>x.dataset.i);
    const ci=cur==null?-1:(cur==='end'?ord.length:ord.indexOf(cur==='c'||cur==='p'||!pl.glide?cur:String(+cur+1)));
    gdSet(el,'chip',ci,()=>P.chips.forEach((x,j)=>{x.classList.toggle('now',j===ci);x.classList.toggle('done',ci>=0&&j<ci)}));
  }
  if(st.vz)gdVoz(el,v,R);
  if(e.seq&&e.seq.length)pgTick(el,e,R,snd,pl);
}

/* ═════ TU VOZ ENCIMA ═════
   Escalera: la línea de lo que has cantado en esta vuelta, con el mismo eje de tiempo que los peldaños
   y la altura exacta (no redondeada a la nota). Al empezar otra vuelta, la anterior se va con su sombra.
   Teclado: una franja naranja sobre las teclas, en la altura que cantas ahora. */
/* dónde cae en la escalera el instante t de la vuelta R (null si queda fuera) */
function gdX(R,t){
  const pl=R.pl,S=R._S||(R._S=escShapes(pl)),u=t-R.s;if(u<0)return null;
  const p=pl.pre?S.sh.find(x=>x.i==='p'):null,x1=p?p.x:S.PX;
  if(u<pl.cd)return GGX+u/pl.cd*(x1-4-GGX);
  if(p&&u<pl.tp)return p.x+(u-pl.cd)/(pl.tp-pl.cd)*(S.PX-4-p.x);
  const tr=u-pl.tp;if(tr>pl.D+.35)return null;
  return Math.min(GW-1,S.PX+tr/pl.D*S.PW);
}
/* trazo de la voz en una vuelta: se corta en cada hueco */
function vozPath(R,yv){
  let d='',pen=false,lt=-9;
  for(const p of VOZ.pts){
    if(p.t<R.s-.05)continue;
    const x=p.m==null?null:gdX(R,p.t);
    if(x==null){if(p.t>R.s+R.pl.tp+R.pl.D+.4)break;pen=false;continue}
    const y=yv(p.m).toFixed(1);
    if(pen&&p.t-lt<.15)d+='L'+x.toFixed(1)+' '+y;else d+='M'+x.toFixed(1)+' '+y+'l.01 0';
    pen=true;lt=p.t;
  }
  return d;
}
/* centro de la tecla de la nota m (con decimales, entre dos teclas) en el teclado horizontal */
function tecXc(K,m){
  const c=k=>K.x[k]==null?null:(isBlk(k)?K.x[k]:K.x[k]+K.kw/2),a=Math.floor(m),f=m-a,x0=c(a),x1=c(a+1);
  if(x0==null||x1==null)return null;return x0+(x1-x0)*f;
}
/* ═════ AVISO DE «TU VOZ» ═════
   Solo cuando hay algo que decir: una píldora arriba que sale, avisa y se va (no una leyenda fija bajo la guía).
   «Comprobando…» se queda mientras dura la comprobación; los demás avisos se van solos a los 6 s. */
function vozState(){
  if(VOZ.st==='check')return 'check';
  if(VOZ.st==='nomic')return 'nomic';
  if(!PAT.on)return '';
  if(VOZ.ear==='bleed')return 'bleed';
  if(VOZ.ear==null)return 'chg';
  return '';
}
const VOZ_MSG={check:'Comprobando el micro · no cantes un momento',nomic:'Sin acceso al micro',bleed:'El micro oye el altavoz: ponte auriculares',chg:'Cambió el sonido'};
const VN={k:'',tm:null};
function vozNotice(k){
  if(VN.k===k)return;VN.k=k;
  let el=document.getElementById('vozPill');
  if(!el){el=document.createElement('div');el.id='vozPill';el.className='vpill glass';el.setAttribute('role','status');document.body.appendChild(el)}
  clearTimeout(VN.tm);
  if(!k){el.classList.remove('on');return}
  const act=k==='bleed'||k==='chg';
  el.innerHTML='<i></i><span class="fn semi">'+VOZ_MSG[k]+'</span>'+(act?'<button class="fn semi link" onclick="vozRetry()">Comprobar</button>':'');
  el.classList.add('on');
  VN.tm=setTimeout(()=>el.classList.remove('on'),k==='check'?8000:6000);
}
function gdVoz(el,v,R){
  const P=el._p,st=el._st,wall=performance.now(),cur=VOZ.cur&&wall-VOZ.cur.at<220?VOZ.cur:null;
  vozNotice(vozState());
  if(v==='esc'){
    if(!P.voz)return;
    const yv=m=>(st.b-m)*GROW+GROW/2;
    /* vuelta nueva: la línea de la anterior se queda un momento y se va con su sombra */
    if(R&&el._vs!==R.s){
      if(el._vR&&P.vozp){const d=vozPath(el._vR,yv);P.vozp.innerHTML=d?'<path class="gvozl old" d="'+d+'"/>':''}
      el._vR=R;el._vs=R.s;
    }
    /* con el piano parado se queda a la vista la última vuelta */
    const Rr=R||el._vR,lp=VOZ.pts[VOZ.pts.length-1];
    gdSet(el,'vozl',Rr?Rr.s+'|'+(lp?lp.t:0)+'|'+st.b:'',()=>P.voz.setAttribute('d',Rr?vozPath(Rr,yv):''));
    const x=cur&&R?gdX(R,cur.t):null;
    if(x!=null){P.vozd.setAttribute('cx',x.toFixed(1));P.vozd.setAttribute('cy',yv(cur.m).toFixed(1))}
    gdSet(el,'vozd',x!=null?1:0,o=>P.vozd.setAttribute('opacity',o));
  }else{
    if(!P.vozk||!P.K)return;
    const x=cur?tecXc(P.K,cur.m):null;
    if(x!=null)P.vozk.setAttribute('x',(x-3).toFixed(1));
    gdSet(el,'vozk',x!=null?.9:0,o=>P.vozk.setAttribute('opacity',o));
  }
}
requestAnimationFrame(gdFrame);
