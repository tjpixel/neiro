/* Neiro · pentagrama debajo de la guía, en los ejercicios propios con notas.
   Enseña la línea que suena (4 compases de 4/4, como en la hoja), escrita en Do tal cual la apuntaste,
   con un cursor que va al compás del piano y la nota de ahora resaltada. Lee el mismo plan que la escalera.
   En iOS será otra vista de SwiftUI (Canvas) con el mismo cálculo de posiciones. */
'use strict';

const PG={W:360,H:76,X0:44,TOP:14,SP:8};
/* paso en el pentagrama (Do4 = 0, Re4 = 1…) y alteración de una nota escrita en semitonos desde el Do */
const PG_PC=[[0,''],[0,'#'],[1,''],[1,'#'],[2,''],[3,''],[3,'#'],[4,''],[4,'#'],[5,''],[6,'b'],[6,'']];
function pgStep(k){const o=Math.floor(k/12),p=PG_PC[((k%12)+12)%12];return{st:p[0]+7*o,acc:p[1]}}
const pgY=st=>PG.TOP+PG.SP*4-(st-2)*PG.SP/2;          // Mi4 en la línea de abajo
const pgN=e=>Math.max(1,Math.ceil(seqBeats(e.seq)/SEQ_LINE-1e-6));
/* notas de una línea con su tiempo dentro de la línea */
function pgLine(e,li){
  const out=[];let b=0;
  (e.seq||[]).forEach(([k,t])=>{const l=Math.floor(b/SEQ_LINE+1e-6);if(l===li)out.push({k,t,b:b-li*SEQ_LINE});b+=t});
  return out;
}
function pgX(b){const bw=(PG.W-PG.X0-4)/4,bar=Math.min(3,Math.floor(b/4+1e-6));return PG.X0+bar*bw+9+(b-bar*4)/4*(bw-16)}
/* clave de sol dibujada a mano (sin depender de fuentes con símbolos musicales) */
const PG_CLEF='<path d="M16.5 72c-4 0-5.6-3.6-3.2-5.6 2.2-1.8 5.2.2 4.2 2.8M15.2 70.5c1 0 1.6-1 1.4-3.4L12.6 20c-.3-4 1.8-8 4.6-8 2.6 0 3.4 4.6.6 9.6-2.6 4.6-9.6 10-10 18.4-.4 7.6 5 12 11 11.4 5.6-.6 7.8-6.4 5.4-10.4-2.6-4.4-9.6-3.6-10.2 1.8-.4 3.4 2 5 3.8 4.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>';
function pgSVG(e,li){
  const N=pgN(e),L=pgLine(e,li),T=PG.TOP,SP=PG.SP;
  let s='<svg class="gstaff" viewBox="0 0 '+PG.W+' '+PG.H+'" role="img" aria-label="Pentagrama, línea '+(li+1)+' de '+N+'">';
  for(let i=0;i<5;i++)s+='<line class="pgl" x1="2" x2="'+(PG.W-2)+'" y1="'+(T+i*SP)+'" y2="'+(T+i*SP)+'"/>';
  s+='<g class="pgclef" transform="translate(0 '+(T-12)+') scale(.78)">'+PG_CLEF+'</g>';
  if(li===0)s+='<text class="pgts" x="33" y="'+(T+SP*2+5)+'">C</text>';
  const bw=(PG.W-PG.X0-4)/4;
  for(let i=1;i<=4;i++){const x=PG.X0+i*bw-(i===4?1:0);s+='<line class="pgl b" x1="'+x+'" x2="'+x+'" y1="'+T+'" y2="'+(T+SP*4)+'"/>'}
  if(li===N-1){const x=PG.W-6;s+='<line class="pgl b" x1="'+x+'" x2="'+x+'" y1="'+T+'" y2="'+(T+SP*4)+'"/><rect x="'+(PG.W-4)+'" y="'+T+'" width="2.6" height="'+SP*4+'" class="pgfill"/>'}
  s+='<rect data-g="pgcur" class="pgcur" x="0" y="'+(T-6)+'" width="14" height="'+(SP*4+12)+'" rx="7" opacity="0"/>';
  /* corcheas: de dos en dos, unidas por la barra, cuando empiezan en la parte fuerte del tiempo */
  const beam=new Set();
  L.forEach((n,i)=>{const m=L[i+1];if(n.k!==null&&n.t===.5&&m&&m.k!==null&&m.t===.5&&Math.abs(n.b%1)<1e-6)beam.add(i)});
  L.forEach((n,i)=>{
    const x=pgX(n.b);
    if(n.k===null){s+=pgRest(x,n.t);return}
    const {st,acc}=pgStep(n.k),y=pgY(st),hol=n.t>=2,inB=beam.has(i)||beam.has(i-1);
    let up=st<6;if(inB){const o=beam.has(i)?L[i+1]:L[i-1];up=(st+pgStep(o.k).st)/2<6}
    /* líneas adicionales (Do grave, La agudo…) */
    for(let q=0;q>=st;q-=2)s+='<line class="pgl" x1="'+(x-7.5)+'" x2="'+(x+7.5)+'" y1="'+pgY(q)+'" y2="'+pgY(q)+'"/>';
    for(let q=12;q<=st;q+=2)s+='<line class="pgl" x1="'+(x-7.5)+'" x2="'+(x+7.5)+'" y1="'+pgY(q)+'" y2="'+pgY(q)+'"/>';
    if(acc)s+='<text class="pgacc" x="'+(x-9)+'" y="'+(y+3.5)+'">'+(acc==='#'?'♯':'♭')+'</text>';
    s+='<g data-n="'+i+'" class="pgn">';
    s+='<ellipse cx="'+x+'" cy="'+y+'" rx="4.7" ry="3.5" transform="rotate(-20 '+x+' '+y+')" class="'+(hol?'pgh':'pgf')+'"/>';
    if(n.t===1.5||n.t===3)s+='<circle cx="'+(x+8)+'" cy="'+(y-(st%2?0:2))+'" r="1.4" class="pgfill"/>';
    if(n.t<4){
      const sx=up?x+4.2:x-4.2,sy2=up?y-25:y+25;
      if(!inB)s+='<line class="pgst" x1="'+sx+'" x2="'+sx+'" y1="'+y+'" y2="'+sy2+'"/>';
      if(n.t===.5&&!inB)s+=up?'<path class="pgflag" d="M'+sx+' '+sy2+'c1 5 7 7 5 15"/>':'<path class="pgflag" d="M'+sx+' '+sy2+'c1-5 7-7 5-15"/>';
    }
    s+='</g>';
    if(beam.has(i)){
      const m=L[i+1],x2=pgX(m.b),s2=pgStep(m.k).st,y1=y,y2=pgY(s2);
      const sx1=up?x+4.2:x-4.2,sx2=up?x2+4.2:x2-4.2,ty=up?Math.min(y1,y2)-25:Math.max(y1,y2)+25;
      s+='<line class="pgst" x1="'+sx1+'" x2="'+sx1+'" y1="'+y1+'" y2="'+ty+'"/><line class="pgst" x1="'+sx2+'" x2="'+sx2+'" y1="'+y2+'" y2="'+ty+'"/>'+
        '<line class="pgbeam" x1="'+(sx1-.6)+'" x2="'+(sx2+.6)+'" y1="'+ty+'" y2="'+ty+'"/>';
    }
  });
  return s+'</svg>';
}
function pgRest(x,t){
  const T=PG.TOP,SP=PG.SP;
  if(t>=4)return '<rect class="pgfill" x="'+(x-4)+'" y="'+(T+SP)+'" width="9" height="4"/>';
  if(t>=2)return '<rect class="pgfill" x="'+(x-4)+'" y="'+(T+SP*2-4)+'" width="9" height="4"/>';
  if(t>=1)return '<path class="pgrest" d="M'+(x-2)+' '+(T+6)+'l4.4 5.6-3.6 4.4 4.4 5.4c-3-1.4-5.6-.6-4 2.8" />';
  return '<path class="pgrest" d="M'+(x+3)+' '+(T+SP+4)+'l-3.6 12M'+(x+3)+' '+(T+SP+4)+'c-1.6 2.4-4.6 2.8-5.6 1"/><circle class="pgfill" cx="'+(x-2.4)+'" cy="'+(T+SP+4.6)+'" r="1.7"/>';
}
/* qué línea se enseña y en qué tiempo de ella va el piano (null si no suena ninguna nota) */
function pgWhere(e,R,snd){
  if(!R)return{li:exLee(e)?leeCi(e):0,b:null};
  const pl=R.pl,base=pl.lee?pl.ci*SEQ_LINE:0;
  if(snd.tr==null)return{li:pl.lee?pl.ci:0,b:null};
  const ab=base+snd.tr/pl.b;
  return{li:pl.lee?pl.ci:Math.min(pgN(e)-1,Math.floor(ab/SEQ_LINE+1e-6)),b:ab};
}
function pgTick(el,e,R,snd){
  const box=el.querySelector('[data-g="staff"]');if(!box)return;
  const w=pgWhere(e,R,snd);
  if(el._pgli!==w.li||el._pgsig!==e.seq.length+'|'+seqBeats(e.seq)){el._pgli=w.li;el._pgsig=e.seq.length+'|'+seqBeats(e.seq);box.innerHTML=pgSVG(e,w.li);el._pgc=box.querySelector('[data-g="pgcur"]');el._pgn=[...box.querySelectorAll('[data-n]')];el._pgL=pgLine(e,w.li);el._pgi=-2}
  const lb=w.b==null?null:w.b-w.li*SEQ_LINE,cur=el._pgc;
  if(lb==null||lb<0||lb>SEQ_LINE){if(cur&&el._pgo!==0){cur.setAttribute('opacity',0);el._pgo=0}}
  else{
    /* el cursor avanza entre nota y nota, con el pulso */
    const L=el._pgL;let j=-1;L.forEach((n,i)=>{if(lb>=n.b-1e-6)j=i});
    const n=L[j],nx=L[j+1],x0=n?pgX(n.b):PG.X0,x1=nx?pgX(nx.b):PG.W-8,f=n?Math.min(1,(lb-n.b)/n.t):0;
    cur.setAttribute('x',(x0+(x1-x0)*f-7).toFixed(1));if(el._pgo!==1){cur.setAttribute('opacity',1);el._pgo=1}
    if(el._pgi!==j){el._pgi=j;el._pgn.forEach(g=>g.classList.toggle('now',+g.dataset.n===j&&n&&n.k!==null))}
    return;
  }
  if(el._pgi!==-1){el._pgi=-1;el._pgn.forEach(g=>g.classList.remove('now'))}
}
