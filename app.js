/* Neiro · interfaz (web de pruebas del diseño de iPhone). App hermana de Tsuyo.
   Pestañas Hoy · Progreso · Estudio, hoja «Tú», práctica guiada a pantalla completa y Plus simulado. */
'use strict';

/* ═════ ICONOS ═════ */
const IC={
  chevR:'<path d="M9 5.5l6.5 6.5L9 18.5"/>',chevL:'<path d="M14.5 5.5L8 12l6.5 6.5"/>',chevD:'<path d="M6 9.5l6 6 6-6"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',x:'<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  plus:'<path d="M12 5.5v13M5.5 12h13"/>',minus:'<path d="M6 12h12"/>',up:'<path d="M12 19V5.5M6.5 11L12 5.5 17.5 11"/>',dn:'<path d="M12 5v13.5M6.5 13L12 18.5 17.5 13"/>',
  more:'<circle cx="5.5" cy="12" r="1.8" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/><circle cx="18.5" cy="12" r="1.8" fill="currentColor" stroke="none"/>',
  play:'<path fill="currentColor" stroke="none" d="M8 5.2v13.6c0 .8.9 1.3 1.6.9l10.6-6.8c.6-.4.6-1.3 0-1.7L9.6 4.3C8.9 3.9 8 4.4 8 5.2z"/>',
  pause:'<rect x="6.5" y="5" width="3.6" height="14" rx="1.3" fill="currentColor" stroke="none"/><rect x="13.9" y="5" width="3.6" height="14" rx="1.3" fill="currentColor" stroke="none"/>',
  star:'<path fill="currentColor" stroke="none" d="M12 3.2l2.3 5.6 6 .5-4.6 3.9 1.4 5.9L12 15.9l-5.1 3.2 1.4-5.9-4.6-3.9 6-.5z"/>',
  book:'<path d="M4.5 5.5c2.5-.9 5-.6 7.5 1 2.5-1.6 5-1.9 7.5-1v13c-2.5-.9-5-.6-7.5 1-2.5-1.6-5-1.9-7.5-1z"/><path d="M12 6.5v13"/>',
  cal:'<rect x="4" y="5" width="16" height="15" rx="3.2"/><path d="M4 10h16M8.5 3v4M15.5 3v4"/>',
  heart:'<path d="M12 20s-7.6-4.6-7.6-10.3A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.6 2.4C19.6 15.4 12 20 12 20z"/>',
  trophy:'<path d="M8 4.5h8v4.2a4 4 0 0 1-8 0z"/><path d="M8 6.2H5.6a2.6 2.6 0 0 0 2.6 3.2M16 6.2h2.4a2.6 2.6 0 0 1-2.6 3.2"/><path d="M12 12.7v3.3M9 20h6M10 16h4v4h-4z"/>',
  pen:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  clock:'<circle cx="12" cy="13" r="7.5"/><path d="M12 9.5V13l2.5 1.5M10 3h4"/>',
  chart:'<path d="M4 19.5h16"/><path d="M5 15.5l4.5-4.5 3.2 3.2L19 8"/>',
  list:'<rect x="4.5" y="3.5" width="15" height="17" rx="3.2"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.4"/>',
  shield:'<path d="M12 3.5l7 2.6v5.4c0 4.4-3 8-7 9-4-1-7-4.6-7-9V6.1z"/>',
  down:'<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
  trash:'<path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/>',
  moon:'<path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  lock:'<rect x="5.5" y="10.5" width="13" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  out:'<path d="M14 4.5h3.5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H14M10 16l4-4-4-4M14 12H4.5"/>',
  skip:'<path d="M5 6l8 6-8 6zM16.5 6v12"/>',stop:'<rect x="6.5" y="6.5" width="11" height="11" rx="2"/>',
  note:'<path d="M9 18V5.5l10-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
  cap:'<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4.2c1.6 1.4 3.4 2.1 5.5 2.1s3.9-.7 5.5-2.1v-4.2"/>',
  target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
  wind:'<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3M3 12h7"/>',
  gauge:'<path d="M4 16.5a8 8 0 0 1 16 0"/><path d="M12 16.5l4-5"/>',
  keys:'<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><path d="M9 5v14M15 5v14"/><path d="M7.5 5v7h3V5M13.5 5v7h3V5" fill="currentColor"/>',
  ear:'<path d="M7 9.5a5 5 0 0 1 10 0c0 3-2.6 3.8-3.2 5.8-.5 1.6-1.4 3.2-3.3 3.2A2.6 2.6 0 0 1 8 16"/><path d="M10 9.5a2 2 0 0 1 4 0"/>',
  smile:'<circle cx="12" cy="12" r="8.5"/><path d="M8.5 14c.9 1.3 2.1 2 3.5 2s2.6-.7 3.5-2M9 9.8v.4M15 9.8v.4"/>',
  user:'<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.8 4-5.6 7.5-5.6s6.3 1.8 7.5 5.6"/>'
};
const ic=(n,s=20,w=2)=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>';
const chev=()=>'<svg class="chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC.chevR+'</svg>';
const $=id=>document.getElementById(id);
const dk=(pose,cell,extra)=>'<span class="deshi" data-pose="'+pose+'" data-cell="'+cell+'"'+(extra||'')+'></span>';
const dkStage=(pose,cell)=>'<div class="dk">'+dk(pose,cell)+'<div class="floor"></div></div>';
const DIAS=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const DIAS3=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const longDate=d=>{const x=new Date(d+'T00:00:00');return DIAS[x.getDay()].replace(/^./,c=>c.toUpperCase())+', '+x.getDate()+' de '+MESES[x.getMonth()]};
const mmss=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const plural=(n,a,b)=>n+' '+(n===1?a:(b||a+'s'));
const CAT_IC={cal:'smile',res:'wind',tec:'note',oido:'ear',enf:'heart'};
const BL_IC={cal:'smile',tec:'note',rep:'book',gus:'heart',enf:'wind'};
const daysTxt=av=>av.slice().sort((a,b)=>((a+6)%7)-((b+6)%7)).map(d=>WDL[d]).join(', ');

/* ═════ AVISOS Y PANTALLA ═════ */
let tmo;
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(tmo);tmo=setTimeout(()=>t.classList.remove('on'),2000)}
let WL=null;
async function keepAwake(on){
  try{if(on&&'wakeLock' in navigator&&document.visibilityState==='visible'){if(!WL){WL=await navigator.wakeLock.request('screen');WL.addEventListener('release',()=>{WL=null})}}
    else if(!on&&WL){await WL.release();WL=null}}catch(e){WL=null}
}

/* ═════ TEMA ═════ */
const DARKQ=matchMedia('(prefers-color-scheme: dark)');
const isDark=()=>{const t=PREF.get('theme','auto');return t==='dark'||(t==='auto'&&DARKQ.matches)};
function applyTheme(){
  const t=PREF.get('theme','auto');document.documentElement.dataset.theme=t;
  document.querySelectorAll('meta[name=theme-color]').forEach(m=>{m.dataset.c=m.dataset.c||m.content;m.content=t==='auto'?m.dataset.c:(t==='dark'?'#0A0A0C':'#F2F2F6')});
  const b=$('btnTheme');if(b){const d=isDark();b.innerHTML=ic(d?'sun':'moon',20);b.setAttribute('aria-label',d?'Cambiar a tema claro':'Cambiar a tema oscuro')}
}
function toggleTheme(){
  const go=()=>{PREF.set('theme',isDark()?'light':'dark');applyTheme()};
  const b=$('btnTheme');if(b){b.classList.add('spin');setTimeout(()=>b.classList.remove('spin'),60)}
  if(document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.startViewTransition(go);else go();
}
DARKQ.addEventListener&&DARKQ.addEventListener('change',applyTheme);
function setTheme(t){PREF.set('theme',t);applyTheme();openSheet(meSheet,true,true)}

function applyLook(){
  const L=Object.assign({},DB.profile.deshi||{},{belt:constancy().belt[0]});
  Deshi.setLook(L);document.documentElement.style.setProperty('--belt',Deshi.BELTS[L.belt]);
}

/* ═════ NAVEGACIÓN ═════ */
let cur='hoy',curDate=T();
function go(v){
  cur=v;
  document.querySelectorAll('.view').forEach(x=>x.classList.toggle('on',x.id==='v-'+v));
  document.querySelectorAll('.tab').forEach(b=>{const on=b.dataset.v===v;b.classList.toggle('on',on);if(on)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
  window.scrollTo(0,0);render();
}
function render(){
  curDate=T();applyLook();
  if(cur==='hoy')renderHoy();if(cur==='progreso')renderProg();if(cur==='estudio')renderStudy();
  renderAcc();
  $('btnMe').innerHTML='<span class="deshi" data-pose="stand" data-crop="head" data-box="40" data-still></span>';
}

/* ═════ HOY ═════ */
const minsToday=()=>minsByDay()[T()]||0;
function weekStrip(){
  const m=minsByDay();
  return '<div class="week">'+weekDates().map(dt=>{
    const hd=practicedOn(dt),pl=isPracticeDay(dt),hoy=dt===T();
    let c=hd?'done':(pl&&dt>=T()?'plan':'');if(hoy)c+=' today';
    const dot=DB.profile.teacher&&wdOf(dt)===DB.profile.classDay?'tint':'';
    return '<div class="day'+(hoy?' today':'')+'"><span class="dl">'+WDL[wdOf(dt)]+'</span><span class="dc '+c+'">'+Number(dt.slice(8))+'</span><span class="dot '+dot+'"></span></div>';
  }).join('')+'</div>';
}
function renderHoy(){
  const v=$('v-hoy'),mt=minsToday(),done=practicedOn(T()),pday=isPracticeDay(T()),B=practiceBlocks(),total=practiceMinutes();
  const nEx=B.reduce((a,b)=>a+b.ex.length,0),C=constancy();
  const classToday=DB.profile.teacher&&DB.profile.classDay===wdOf(T());
  const classLogged=(DB.classes||[]).some(c=>c.d===T());
  let h='<div class="head"><div><h1 class="lt">Hoy</h1><p class="sb l2 sub">'+longDate(T())+'</p></div></div><div class="pad stack" style="padding-top:16px">';
  if(done){
    h+='<div class="card" style="padding:18px 18px 18px 20px"><div class="row" style="align-items:flex-end;gap:10px"><div class="grow" style="padding-bottom:8px">'+
      '<p class="fn l2">Práctica hecha</p><h2 class="t1" style="margin-top:4px">¡Bien cantado!</h2><p class="sb l2" style="margin-top:2px">'+mt+' min hoy · '+C.thisWeek+' de '+perWeek()+' días esta semana</p></div>'+dkStage('cheer',1.55)+'</div>'+
      '<div class="row" style="margin-top:18px"><button class="btn '+(SS.on||savedSess()?'pri':'sec')+' grow" onclick="startSession()">'+ic('play',18)+(SS.on||savedSess()?'Continuar':'Practicar otra vez')+'</button>'+
      '<button class="btn sec" style="width:54px;flex-shrink:0" onclick="openTodayMenu()" aria-label="Más opciones">'+ic('more',22)+'</button></div></div>';
  }else if(pday){
    h+='<div class="card" style="padding:18px 18px 18px 20px"><div class="row" style="align-items:flex-end;gap:10px"><div class="grow" style="padding-bottom:8px">'+
      '<p class="fn l2">Práctica de hoy</p><h2 class="t1" style="margin-top:4px">'+total+' minutos</h2>'+
      '<p class="sb l2" style="margin-top:2px">'+(!SS.on&&savedSess()?'Llevas '+mmss(savedSec(savedSess()))+' · sigue donde lo dejaste':plural(B.length,'bloque')+' · '+plural(nEx,'ejercicio'))+'</p>'+
      (classToday?'<span class="pill tint" style="margin-top:10px">'+ic(classLogged?'check':'cap',13,2.4)+(classLogged?'Clase apuntada':'Hoy tienes clase')+'</span>':'')+
      '</div>'+dkStage('stand',1.9)+'</div>'+
      '<div class="row" style="margin-top:18px"><button class="btn pri grow" onclick="startSession()">'+ic('play',18)+(SS.on||savedSess()?'Continuar':'Empezar')+'</button>'+
      '<button class="btn sec" style="width:54px;flex-shrink:0" onclick="openTodayMenu()" aria-label="Más opciones">'+ic('more',22)+'</button></div></div>';
  }else{
    const nx=nextPracticeDay();
    h+='<div class="card" style="padding:18px 18px 18px 20px"><div class="row" style="align-items:flex-end;gap:10px"><div class="grow" style="padding-bottom:8px">'+
      '<p class="fn l2">Sin práctica</p><h2 class="t1" style="margin-top:4px">Voz en reposo</h2><p class="sb l2" style="margin-top:4px">Descansar también es entrenar la voz.</p></div>'+dkStage('seiza',1.75)+'</div>'+
      (nx?'<div class="row" style="margin-top:16px;padding:12px 14px;border-radius:18px;background:var(--fill2)"><span class="ic soft" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center">'+ic('cal',20)+'</span>'+
        '<div class="grow"><p class="fn l2">Próxima práctica</p><p class="hl">'+(nx===shiftD(T(),1)?'Mañana':DIAS[wdOf(nx)].replace(/^./,c=>c.toUpperCase()))+' · '+total+' min</p></div></div>':'')+
      '<button class="btn sec" style="margin-top:12px" onclick="startSession()">Practicar igualmente</button></div>';
  }
  if(classToday&&!classLogged)
    h+='<button class="card row" style="padding:14px 16px;gap:13px;width:100%;text-align:left" onclick="openClass()"><span class="ic soft" style="width:38px;height:38px;border-radius:11px;display:grid;place-items:center">'+ic('cap',20)+'</span><div class="grow"><p class="hl">Apunta la clase de hoy</p><p class="fn l2">Qué habéis trabajado, qué practicar y en qué fijarte</p></div>'+chev()+'</button>';
  if(recDue()){const l=lastRec();
    h+='<button class="card row" style="padding:14px 16px;gap:13px;width:100%;text-align:left" onclick="openRec(\'prog\')"><span class="ic rec" style="width:38px;height:38px;border-radius:11px;display:grid;place-items:center">'+ic('mic',20)+'</span><div class="grow"><p class="hl">Grabación semanal</p><p class="fn l2">'+(l?'Hace '+daysBetween(l,T())+' días de la última':'Grábate hoy y compara dentro de unas semanas')+'</p></div>'+chev()+'</button>';}
  h+='</div>';
  // deberes
  const c=lastClass();
  if(DB.profile.teacher){
    h+='<div class="sec"><div class="stitle"><h3 class="t3">Deberes de clase</h3>'+(c?'<span class="fn l2">Clase del '+fmtD(c.d)+'</span>':'')+'</div><div class="pad"><div class="group">'+
      (c&&(c.h||c.f)?(c.h?'<div class="cell static"><span class="ic soft">'+ic('list',17)+'</span><div class="cb"><div class="tt"><p class="fn l2">Practicar</p><p class="bd" style="white-space:pre-wrap">'+esc(c.h)+'</p></div></div></div>':'')+
        (c.f?'<div class="cell static"><span class="ic amb">'+ic('target',17)+'</span><div class="cb"><div class="tt"><p class="fn l2">En qué fijarte</p><p class="bd" style="white-space:pre-wrap">'+esc(c.f)+'</p></div></div></div>':'')
        :'<div class="empty">'+(c?'Tu última clase no tiene deberes apuntados.':'Apunta tu próxima clase y aquí verás qué practicar.')+'</div>')+
      '</div></div></div>';
  }
  // semana
  h+='<div class="sec"><div class="stitle"><h3 class="t3">Esta semana</h3><span class="fn l2">'+C.thisWeek+' de '+perWeek()+' días</span></div><div class="pad"><div class="card" style="padding:14px 8px 12px">'+weekStrip()+'</div>'+
    (DB.profile.teacher&&DB.profile.classDay!=null?'<p class="fn l2" style="padding:8px 16px 0">El punto marca tu día de clase.</p>':'')+'</div></div>';
  // bloques
  h+='<div class="sec"><div class="stitle"><h3 class="t3">La práctica</h3><button class="fn link" onclick="go(\'estudio\')">Ejercicios</button></div><div class="pad"><div class="group">'+
    B.map((b,i)=>'<button class="cell" onclick="openBlockSheet(\''+b.k+'\')"><span class="exn">'+(i+1)+'</span><div class="cb"><div class="tt"><p class="bd">'+b.n+'</p><p class="fn l2 ell">'+b.min+' min'+(b.ex.length?' · '+b.ex.map(exName).map(esc).join(', '):(b.k==='rep'?' · '+esc(songsActive()[0]?songsActive()[0].t:'añade una canción'):''))+'</p></div>'+chev()+'</div></button>').join('')+
    '</div></div></div>';
  v.innerHTML=h;
}
function openTodayMenu(){
  openSheet(()=>({title:'Práctica de hoy',body:'<div class="pad"><div class="group">'+
    '<button class="cell" onclick="closeSheet();startSession(10)"><span class="ic gray">'+ic('clock',18)+'</span><div class="cb"><div class="tt"><p class="bd">Versión corta</p><p class="fn l2">10 minutos: calentar y lo esencial</p></div></div></button>'+
    '<button class="cell" onclick="openQuick(true)"><span class="ic gray">'+ic('pen',18)+'</span><div class="cb"><div class="tt"><p class="bd">Registrar sin guía</p><p class="fn l2">Si has practicado por tu cuenta o en clase</p></div>'+chev()+'</div></button>'+
    '<button class="cell" onclick="openRec(\'prog\',true)"><span class="ic rec">'+ic('mic',18)+'</span><div class="cb"><span class="tt bd">Hacer una grabación</span>'+chev()+'</div></button>'+
    '<button class="cell" onclick="openTuner(true)"><span class="ic gray">'+ic('gauge',18)+'</span><div class="cb"><span class="tt bd">Afinador</span>'+chev()+'</div></button>'+
    '</div></div>'}));
}
function openBlockSheet(k){
  const b=practiceBlocks().find(x=>x.k===k);if(!b)return;
  openSheet(()=>({title:b.n,body:'<div class="pad"><p class="sb l2 center" style="padding:0 12px 16px">'+b.d+' '+b.min+' minutos.</p>'+
    (b.ex.length?'<div class="group">'+b.ex.map(id=>exCell(id)).join('')+'</div>'
      :(b.k==='rep'?songsBlockHTML():'<div class="card" style="padding:18px;text-align:center">'+dkStage(b.k==='gus'?'cheer':'stand',1.6)+'<p class="sb l2" style="margin-top:12px">'+(b.k==='gus'?'Pon una canción que te guste y cántala sin pensar en la técnica.':'Calienta como te enseñe tu profe.')+'</p></div>'))+
    '</div>'}));
}
function songsBlockHTML(){
  const L=songsActive();
  return L.length?'<div class="group">'+L.map(s=>'<button class="cell" onclick="openSong(\''+s.id+'\',true)"><span class="ic soft">'+ic('note',17)+'</span><div class="cb"><div class="tt"><p class="bd ell">'+esc(s.t)+'</p><p class="fn l2 ell">'+esc(s.h||s.a||s.s)+'</p></div>'+chev()+'</div></button>').join('')+'</div>'
    :'<div class="card" style="padding:16px"><p class="sb l2 center">Añade la canción que estás trabajando y aparecerá aquí con sus frases difíciles.</p><button class="btn pri" style="margin-top:12px" onclick="openSong(null,true)">Añadir canción</button></div>';
}

/* ═════ PROGRESO ═════ */
function weekMins(nw){const m=minsByDay(),thisW=mondayOf(T()),out=[];for(let i=nw-1;i>=0;i--){const w=shiftD(thisW,-7*i);let t=0;Object.keys(m).forEach(d=>{if(mondayOf(d)===w)t+=m[d]});out.push({w,t})}return out}
function barChart(V,unit){
  const W=330,H=124,left=6,right=40,top=10,bot=22,mx=Math.max(...V.map(v=>v.t),30);
  const st=mx<=60?30:mx<=150?60:120,max=Math.max(mx,st*2);
  const cw=(W-left-right)/V.length,Y=v=>top+(H-top-bot)*(1-v/max);let g='';
  [st,st*2].forEach(t=>{if(t>max)return;g+='<line x1="'+left+'" x2="'+(W-right+6)+'" y1="'+Y(t)+'" y2="'+Y(t)+'" stroke="var(--sep)" stroke-dasharray="3 3"/><text x="'+(W-2)+'" y="'+(Y(t)+4)+'" text-anchor="end" font-size="10.5" fill="var(--label3)">'+t+' '+unit+'</text>'});
  V.forEach((v,i)=>{const x=left+i*cw+4,w=cw-8,h=Math.max(v.t?3:0,(H-top-bot)*(v.t/max)),y=H-bot-h,isCur=i===V.length-1;
    g+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="5" fill="'+(isCur?'var(--tint-soft)':'var(--tint)')+'"'+(isCur?' stroke="var(--ink)" stroke-width="1.5"':'')+'/>';
    const d=new Date(v.w+'T00:00:00');g+='<text x="'+(x+w/2)+'" y="'+(H-6)+'" text-anchor="middle" font-size="10" fill="'+(isCur?'var(--ink)':'var(--label3)')+'" font-weight="'+(isCur?600:400)+'">'+(isCur?'Esta':d.getDate()+' '+MES3[d.getMonth()])+'</text>'});
  return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="Minutos de práctica por semana">'+g+'</svg>';
}
function joyChart(L){
  const W=330,H=120,l=20,r=8,t=8,b=8,X=i=>l+i*(W-l-r)/Math.max(1,L.length-1),Y=v=>t+(5-v)/4*(H-t-b);
  let g='';[1,3,5].forEach(v=>{g+='<line x1="'+l+'" x2="'+(W-r)+'" y1="'+Y(v)+'" y2="'+Y(v)+'" stroke="var(--sep)" stroke-dasharray="3 3"/><text x="2" y="'+(Y(v)+4)+'" font-size="10" fill="var(--label3)">'+v+'</text>'});
  [['snd','var(--label3)'],['joy','var(--ink)']].forEach(([k,c])=>{const P=L.map((s,i)=>s[k]?[X(i),Y(s[k])]:null).filter(Boolean);if(!P.length)return;
    g+='<path d="'+P.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('')+'" fill="none" stroke="'+c+'" stroke-width="'+(k==='joy'?2.5:1.8)+'" stroke-linejoin="round" stroke-linecap="round"/>'+P.map(p=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(k==='joy'?3:2.4)+'" fill="'+c+'"/>').join('')});
  return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="Disfrute y sonido de tus últimas prácticas">'+g+'</svg>';
}
const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;
const fmt1=n=>n==null?'–':n.toFixed(1).replace('.',',');
function renderProg(){
  const C=constancy(),goal=C.next?C.next[2]:C.belt[2],from=C.belt[2],cells=C.next?(goal-from):1;
  const rated=(DB.ss||[]).filter(s=>s.joy||s.snd).sort((a,b)=>(a.d+(a.ts||0)).localeCompare(b.d+(b.ts||0))).slice(-20);
  const half=Math.floor(rated.length/2),j1=avg(rated.slice(0,half).map(s=>s.joy).filter(Boolean)),j2=avg(rated.slice(half).map(s=>s.joy).filter(Boolean));
  const jAll=avg(rated.slice(-8).map(s=>s.joy).filter(Boolean)),V=weekMins(8),last=V[V.length-1].t;
  let h='<div class="head"><div><h1 class="lt">Progreso</h1><p class="sb l2 sub">Tu constancia y tu voz</p></div></div><div class="pad stack" style="padding-top:16px">';
  h+='<button class="card" style="padding:16px 18px 16px 16px;display:block;width:100%;text-align:left" onclick="openBeltSheet()"><div class="row" style="gap:14px">'+
    '<div class="avatar" style="width:58px;height:58px;background:var(--fill2)"><span class="deshi" data-pose="stand" data-crop="head" data-box="58" data-still></span></div>'+
    '<div class="grow"><p class="fn l2">Constancia</p><p class="t2">Cinturón '+C.belt[1].toLowerCase()+'</p><p class="fn l2">'+plural(C.n,'semana')+' constante'+(C.n===1?'':'s')+(C.streak>1?' · '+C.streak+' seguidas':'')+'</p></div></div>'+
    (C.next?'<div class="beltbar">'+Array.from({length:Math.min(cells,30)},(_,i)=>'<i class="'+(i<C.n-from?'on':'')+'"></i>').join('')+'</div>'+
      '<div class="row" style="justify-content:space-between;margin-top:7px"><span class="c1 l2">Faltan '+plural(goal-C.n,'semana')+' para el '+C.next[1].toLowerCase()+'</span><span class="c1 l3 num">'+C.n+'/'+goal+'</span></div>'
      :'<p class="fn l2" style="margin-top:10px">Has llegado al cinturón negro.</p>')+'</button>';
  h+='<div class="card" style="padding:16px 16px 14px"><p class="fn l2">Disfrute</p><div class="row" style="margin-top:2px;gap:8px"><span class="t2 num">'+fmt1(jAll)+'<span class="sb l3 semi"> de 5</span></span>'+
    (j1!=null&&j2!=null&&Math.abs(j2-j1)>=.3?'<span class="pill '+(j2>j1?'tint':'amb')+'">'+(j2>j1?'Disfrutas más':'Disfrutas menos')+'</span>':'')+'</div>'+
    '<p class="fn l2">'+(rated.length?'Media de tus últimas prácticas':'Valora tus prácticas al terminar')+'</p>'+
    (rated.length>=2?'<div class="chart">'+joyChart(rated)+'</div><div class="row" style="gap:16px;margin-top:8px"><span class="c1 l2 row" style="gap:6px"><i style="width:10px;height:3px;border-radius:2px;background:var(--ink);display:block"></i>Disfrute</span><span class="c1 l2 row" style="gap:6px"><i style="width:10px;height:3px;border-radius:2px;background:var(--label3);display:block"></i>Cómo ha sonado</span></div>':'')+
    (j1!=null&&j2!=null&&j1-j2>=.3?'<p class="fn l2" style="margin-top:10px">¿Más rato de cantar por gusto, o una canción que te motive más?</p>':'')+'</div>';
  h+='<div class="card" style="padding:16px 16px 14px"><p class="fn l2">Minutos de práctica</p><div class="row" style="margin-top:2px;gap:8px"><span class="t2 num">'+last+' min</span></div><p class="fn l2">Esta semana, por ahora</p><div class="chart">'+barChart(V,'min')+'</div></div>';
  h+='</div>';
  // grabaciones
  const R=(DB.recs||[]).slice().sort((a,b)=>b.ts-a.ts);
  h+='<div class="sec"><div class="stitle"><h3 class="t3">Grabaciones</h3>'+(R.length>3?'<button class="fn link" onclick="openAllRecs()">Ver todas</button>':'')+'</div><div class="pad stack">'+
    '<button class="card row" style="padding:14px 16px;gap:13px;width:100%;text-align:left" onclick="openRec(\'prog\')"><span class="ic rec" style="width:38px;height:38px;border-radius:50%;display:grid;place-items:center">'+ic('mic',20)+'</span><div class="grow"><p class="hl">Nueva grabación</p><p class="fn l2">La misma frase cada semana para poder comparar</p></div>'+chev()+'</button>'+
    compareHTML()+
    (R.length?'<div class="group">'+R.slice(0,3).map(recCell).join('')+'</div>':'')+'</div></div>';
  // rango
  const rg=myRange(),rl=(DB.range||[]).slice().sort((a,b)=>a.d.localeCompare(b.d)),first=rl[0],lastR=rl[rl.length-1];
  const lo=36,hi=84,pct=m=>((m-lo)/(hi-lo)*100).toFixed(1);
  h+='<div class="sec"><div class="stitle"><h3 class="t3">Rango cómodo</h3>'+(lastR?'<span class="fn l2">'+fmtD(lastR.d)+'</span>':'')+'</div><div class="pad"><div class="card" style="padding:16px">'+
    (rg.measured?'<div class="row" style="gap:8px"><span class="t2">'+noteName(rg.lo)+' – '+noteName(rg.hi)+'</span><span class="pill gray num">'+(rg.hi-rg.lo)+' semitonos</span></div>'+
      (first&&first!==lastR?'<p class="fn l2">El '+fmtD(first.d)+': '+esc(first.l)+' – '+esc(first.h)+((midiOf(lastR.h)-midiOf(lastR.l))-(midiOf(first.h)-midiOf(first.l))>0?' · has ganado '+plural((midiOf(lastR.h)-midiOf(lastR.l))-(midiOf(first.h)-midiOf(first.l)),'semitono'):'')+'</p>':'<p class="fn l2">Mídelo de nuevo dentro de un mes</p>')
      :'<p class="hl">Todavía sin medir</p><p class="fn l2">Ahora usamos una tesitura orientativa: '+noteName(rg.lo)+' – '+noteName(rg.hi)+'.</p>')+
    '<div class="rangebar">'+(first&&first!==lastR?'<i style="left:'+pct(midiOf(first.l))+'%;right:'+(100-pct(midiOf(first.h)))+'%;background:var(--fill)"></i>':'')+'<i style="left:'+pct(rg.lo)+'%;right:'+(100-pct(rg.hi))+'%;'+(rg.measured?'':'background:var(--tint-soft)')+'"></i></div>'+
    '<div class="row" style="justify-content:space-between;margin-top:5px"><span class="c1 l3">Do1</span><span class="c1 l3">Do3 · central</span><span class="c1 l3">Do5</span></div>'+
    '<div class="row" style="margin-top:14px"><button class="btn pri grow" style="height:46px" onclick="openRangeTest()">'+ic('gauge',18)+'Medir con el afinador</button><button class="btn sec" style="width:auto;padding:0 16px;height:46px" onclick="openRangeManual()">A mano</button></div>'+
    '</div></div></div>';
  // objetivos
  const q=quarter(T()),tot=daysBetween(q.st,q.en)+1,el=daysBetween(q.st,T())+1,G=(DB.goals||[]).filter(g=>g.q===q.k),ok=G.filter(g=>g.s==='logrado').length;
  h+='<div class="sec"><div class="stitle"><h3 class="t3">Objetivos · '+q.n+'</h3><span class="fn l2">'+(G.length?ok+' de '+G.length:'día '+el+' de '+tot)+'</span></div><div class="pad"><div class="group">'+
    G.map(goalCell).join('')+
    '<button class="cell" onclick="openGoal()"><span class="ic soft">'+ic('plus',17,2.4)+'</span><div class="cb"><div class="tt"><p class="bd ink">Nuevo objetivo</p>'+(G.length?'':'<p class="fn l2">Pide a tu profe 3 objetivos concretos para el trimestre</p>')+'</div></div></button></div>'+
    '<div class="qbar" style="margin:12px 16px 0"><i style="width:'+(el/tot*100).toFixed(1)+'%"></i></div><p class="gfoot" style="padding-left:16px">Quedan '+plural(tot-el,'día')+' de trimestre'+((DB.goals||[]).some(g=>g.q!==q.k)?' · <button class="link" onclick="openOldGoals()">Trimestres anteriores</button>':'')+'</p></div></div>';
  // más
  h+='<div class="sec"><div class="stitle" style="justify-content:flex-start;gap:8px"><h3 class="t3">Más detalle</h3>'+(isPlus()?'':'<span class="pill plus">Plus</span>')+'</div><div class="pad"><div class="group">'+
    '<button class="cell" onclick="openHistory()"><span class="ic soft">'+ic('cal',18)+'</span><div class="cb"><div class="tt"><p class="bd">Historial de prácticas</p>'+(isPlus()?'':'<p class="fn l2">Últimos 30 días; completo con Plus</p>')+'</div>'+chev()+'</div></button>'+
    '</div></div></div>';
  $('v-progreso').innerHTML=h;
}
function openBeltSheet(){
  const C=constancy();
  openSheet(()=>({title:'Cinturón',body:'<div style="display:flex;justify-content:center;padding:6px 0 4px">'+dkStage('rei',2.4)+'</div><div class="pad">'+
    '<p class="sb l2 center" style="padding:6px 10px 16px">Una semana cuenta como constante si practicas al menos <b>'+plural(C.need,'día')+'</b> (tres cuartas partes de los días que elegiste). Deshi cambia de cinturón con las semanas constantes.</p>'+
    '<div class="group">'+BELT_STEPS.map(b=>'<div class="cell static"><span class="ic" style="background:'+Deshi.BELTS[b[0]]+';box-shadow:inset 0 0 0 .5px var(--sep)"></span><div class="cb"><span class="tt bd'+(b[0]===C.belt[0]?' semi':'')+'">'+b[1]+'</span><span class="val num">'+(b[2]?plural(b[2],'semana'):'Al empezar')+'</span>'+(C.n>=b[2]?ic('check',17,2.6):'')+'</div></div>').join('')+'</div></div>'}));
}
function openHistory(){
  const lim=isPlus()?null:shiftD(T(),-30);
  const L=(DB.ss||[]).filter(s=>!lim||s.d>=lim).sort((a,b)=>(b.d+(b.ts||0)).localeCompare(a.d+(a.ts||0)));
  openSheet(()=>({title:'Historial',body:'<div class="pad">'+(L.length?'<div class="group">'+L.map(s=>sessCell(s)).join('')+'</div>':'<div class="empty">Aún no hay prácticas.</div>')+
    (isPlus()?'':'<button class="btn sec" style="margin-top:14px" onclick="openPlus()">Ver todo con Plus</button>')+'</div>'}));
}
function sessCell(s){
  return '<div class="cell static"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd ell">'+(s.note?esc(s.note):(s.g?'Práctica guiada':'Práctica'))+'</p><p class="fn l2">'+fmtDY(s.d)+' · '+s.m+' min'+(s.song?' · '+esc(songName(s.song)):'')+'</p></div>'+
    '<span class="fn l2 num" style="text-align:right">'+(s.joy?'disfrute '+s.joy:'')+'</span><button class="ibtn" style="width:34px;height:34px;color:var(--label3)" onclick="delSess(\''+s.id+'\')" aria-label="Borrar">'+ic('trash',16)+'</button></div></div>';
}
function delSess(id){confirmSheet('Borrar práctica','Se quitará de tu historial.','Borrar',"DB.ss=DB.ss.filter(s=>s.id!=='"+id+"');save();backSheet();drawSheet();render()",true)}

/* grabaciones */
function recCell(r,px){px=px||'pl';
  return '<div><div class="cell static"><button class="playbtn" style="width:36px;height:36px;align-self:center;margin-right:12px" onclick="playRec(\''+r.id+'\',\''+px+'-'+r.id+'\')" aria-label="Escuchar">'+ic('play',14)+'</button><div class="cb"><div class="tt"><p class="bd ell">'+esc(r.l)+'</p><p class="fn l2 num">'+fmtDY(r.d)+' · '+mmss(r.dur||0)+(r.afi||r.res||r.com?' · afinación '+(r.afi||'–')+' · aire '+(r.res||'–')+' · comodidad '+(r.com||'–'):'')+'</p></div>'+
    '<button class="ibtn" style="width:34px;height:34px;color:var(--label3)" onclick="delRec(\''+r.id+'\')" aria-label="Borrar grabación">'+ic('trash',16)+'</button></div></div><div id="'+px+'-'+r.id+'" style="padding:0 16px"></div></div>';
}
async function playRec(id,el){
  const box=$(el||('pl-'+id));if(!box)return;
  if(box.innerHTML){box.innerHTML='';return}
  const u=await audioURL(id).catch(()=>null);
  box.innerHTML=u?'<audio controls autoplay src="'+u+'" style="margin:2px 0 10px"></audio>':'<p class="fn l2" style="padding:4px 0 10px">Este audio no está en este dispositivo.</p>';
}
function delRec(id){confirmSheet('Borrar grabación','No se puede deshacer.','Borrar',"IDB.del('"+id+"');DB.recs=DB.recs.filter(r=>r.id!=='"+id+"');save();closeSheet();render()",true)}
let CMP=null;
function compareHTML(){
  const g={};(DB.recs||[]).forEach(r=>{(g[r.l]=g[r.l]||[]).push(r)});
  const keys=Object.keys(g).filter(k=>g[k].length>1).sort((a,b)=>g[b].length-g[a].length);
  if(!keys.length)return (DB.recs||[]).length?'<p class="fn l2" style="padding:0 6px">Cuando tengas dos grabaciones con el mismo nombre podrás escuchar la primera y la última, una al lado de la otra.</p>':'';
  if(!keys.includes(CMP))CMP=keys[0];
  const L=g[CMP].slice().sort((a,b)=>a.ts-b.ts),a=L[0],b=L[L.length-1];
  const sc=r=>avg([r.afi,r.res,r.com].filter(Boolean)),da=sc(a),db=sc(b),diff=da!=null&&db!=null?db-da:null;
  const col=(t,r)=>'<div class="grow" style="min-width:0"><p class="c1 l2 caps semi">'+t+'</p><p class="hl">'+fmtDY(r.d)+'</p><p class="c1 l2 num">'+(sc(r)!=null?'media '+fmt1(sc(r)):'sin valorar')+'</p><button class="btn sec sm" style="margin-top:8px;width:100%" onclick="playRec(\''+r.id+'\',\'cmp-'+r.id+'\')">'+ic('play',14)+'Escuchar</button><div id="cmp-'+r.id+'"></div></div>';
  return '<div class="card" style="padding:16px"><div class="row" style="justify-content:space-between"><p class="fn l2">Primera frente a última</p>'+(diff!=null?'<span class="pill '+(diff>=0?'tint':'amb')+' num">'+(diff>=0?'+':'')+fmt1(diff)+'</span>':'')+'</div>'+
    (keys.length>1?'<div class="segc" style="margin-top:10px;overflow-x:auto">'+keys.slice(0,3).map(k=>'<button class="'+(k===CMP?'on':'')+'" style="padding:0 8px;white-space:nowrap" onclick="CMP=this.dataset.k;render()" data-k="'+esc(k)+'">'+esc(k)+'</button>').join('')+'</div>':'<p class="hl" style="margin-top:2px">'+esc(CMP)+'</p>')+
    '<div class="row" style="gap:14px;margin-top:12px;align-items:flex-start">'+col('Primera',a)+col('Última',b)+'</div>'+
    '<p class="c1 l2 center" style="margin-top:10px">'+L.length+' grabaciones · '+(daysBetween(a.d,b.d)?daysBetween(a.d,b.d)+' días entre la primera y la última':'el mismo día')+'</p></div>';
}
function openAllRecs(){
  const R=(DB.recs||[]).slice().sort((a,b)=>b.ts-a.ts);
  openSheet(()=>({title:'Grabaciones',body:'<div class="pad"><div class="group">'+R.map(r=>recCell(r,'sp')).join('')+'</div></div>'}));
}
/* objetivos */
function goalCell(g){
  const late=g.s==='en curso'&&g.due&&g.due<T();
  return '<div class="cell"><button class="goalbox'+(g.s==='logrado'?' ok':(g.s==='pausado'?' pause':''))+'" onclick="cycGoal(\''+g.id+'\')" aria-label="Cambiar estado: '+g.s+'">'+(g.s==='logrado'?ic('check',14,3):'')+'</button>'+
    '<button class="cb" style="text-align:left" onclick="openGoal(\''+g.id+'\')"><div class="tt"><p class="bd'+(g.s==='logrado'?' strike l2':'')+'">'+esc(g.t)+'</p><p class="fn '+(late?'red':'l2')+'">'+(g.s==='logrado'?'Logrado el '+fmtD(g.dd||T()):(g.s==='pausado'?'En pausa':(g.due?(late?'Venció el ':'Hasta el ')+fmtD(g.due):'En curso')))+'</p></div></button></div>';
}
function cycGoal(id){const g=DB.goals.find(x=>x.id===id);if(!g)return;const O=['en curso','logrado','pausado'];g.s=O[(O.indexOf(g.s)+1)%3];if(g.s==='logrado'){g.dd=T();toast('¡Objetivo logrado!')}save();render()}
let GL=null;
function openGoal(id){
  const g=id?DB.goals.find(x=>x.id===id):null;GL={id:id||null,t:g?g.t:'',due:g?g.due||'':quarter(T()).en};
  openSheet(()=>({title:g?'Objetivo':'Nuevo objetivo',ok:1,onOk:'saveGoal()',body:'<div class="pad stack">'+
    '<div class="field"><label for="glT">Objetivo</label><textarea class="ta" id="glT" placeholder="Ej.: llegar cómodo al Mi3 con el arpegio" oninput="GL.t=this.value">'+esc(GL.t)+'</textarea></div>'+
    '<div class="field"><label for="glD">Fecha límite</label><input id="glD" type="date" value="'+esc(GL.due)+'" oninput="GL.due=this.value"></div>'+
    '<p class="fn l2" style="padding:0 6px">Que sea concreto y se pueda comprobar: una nota, un ejercicio limpio, una canción entera.</p>'+
    (g?'<button class="btn sec danger" onclick="confirmSheet(\'Borrar objetivo\',\'\',\'Borrar\',\'DB.goals=DB.goals.filter(x=>x.id!==GL.id);save();closeSheet();render()\',true)">Borrar objetivo</button>':'')+'</div>'}));
}
function saveGoal(){
  const t=clean(GL.t,200);if(!t)return toast('Escribe el objetivo');
  let g=GL.id?DB.goals.find(x=>x.id===GL.id):null;if(!g){g={id:uid(),s:'en curso',q:quarter(T()).k};DB.goals.push(g)}
  g.t=t;g.due=isDate(GL.due)?GL.due:'';save();closeSheet();render();toast('Guardado');
}
function openOldGoals(){
  const q=quarter(T()).k,by={};(DB.goals||[]).filter(g=>g.q!==q).forEach(g=>{(by[g.q]=by[g.q]||[]).push(g)});
  openSheet(()=>({title:'Trimestres anteriores',body:'<div class="pad">'+Object.keys(by).sort().reverse().map(k=>'<p class="ghead" style="padding-left:16px;margin-top:14px">'+k.replace('-',' · ')+' · '+by[k].filter(g=>g.s==='logrado').length+' de '+by[k].length+'</p><div class="group">'+by[k].map(goalCell).join('')+'</div>').join('')+'</div>'}));
}

/* ═════ ESTUDIO ═════ */
const songsActive=()=>(DB.songs||[]).filter(s=>s.s!=='dominada');
const songName=id=>{const s=(DB.songs||[]).find(x=>x.id===id);return s?s.t:''};
function renderStudy(){
  const tab=PREF.get('st','ex');
  let h='<div class="head"><div><h1 class="lt">Estudio</h1><p class="sb l2 sub">Ejercicios, canciones y clases</p></div></div>'+
    '<div class="pad" style="padding-top:14px"><div class="segc" role="tablist">'+[['ex','Ejercicios'],['songs','Canciones'],['classes','Clases']].map(([k,l])=>'<button role="tab" class="'+(tab===k?'on':'')+'" aria-selected="'+(tab===k)+'" onclick="PREF.set(\'st\',\''+k+'\');renderStudy()">'+l+'</button>').join('')+'</div></div>';
  if(tab==='ex')h+=studyEx();if(tab==='songs')h+=studySongs();if(tab==='classes')h+=studyClasses();
  $('v-estudio').innerHTML=h;
}
function exCell(id){
  const e=exBase(id),inP=planEx().includes(id);if(!e)return'';
  return '<button class="cell" onclick="openEx(\''+id+'\')"><span class="ic soft">'+ic(CAT_IC[e.c]||'note',17)+'</span><div class="cb"><div class="tt"><p class="bd ell">'+esc(e.n)+'</p><p class="fn l2 ell">'+CATN[e.c]+(e.pat?' · con piano':(e.mode==='tuner'?' · con afinador':(e.mode==='breath'?' · guiada':'')))+(DB.extop[id]?' · hasta '+esc(DB.extop[id]):'')+'</p></div>'+
    (inP?'<span class="pill tint">'+ic('check',12,3)+'En tu práctica</span>':'')+chev()+'</div></button>';
}
function studyEx(){
  const B=practiceBlocks().filter(b=>b.ex.length),inP=planEx();
  let h='<div class="sec"><div class="stitle"><h3 class="t3">Tu práctica</h3><span class="fn l2">'+practiceMinutes()+' min</span></div><div class="pad">'+
    B.map(b=>'<p class="ghead" style="padding-left:16px;margin-top:6px">'+b.n+' · '+b.min+' min</p><div class="group" style="margin-bottom:12px">'+b.ex.map(exCell).join('')+'</div>').join('')+
    '<button class="btn sec" onclick="'+(isPlus()?'openPlanEditor()':'openPlus()')+'">'+(isPlus()?ic('pen',18)+'Ajustar mi práctica':ic('lock',17)+'Ajustar mi práctica · Plus')+'</button>'+
    (isPlus()?'':'<p class="gfoot center">Neiro te propone la práctica según tu objetivo y tu nivel. Puedes cambiarlos en Tú.</p>')+'</div></div>';
  const cex=Object.keys(DB.cex||{});
  h+='<div class="sec"><div class="stitle"><h3 class="t3">Catálogo</h3></div><div class="pad">'+
    CATS.map(([c,n])=>{const ids=Object.keys(EXC).filter(id=>EXC[id].c===c).concat(cex.filter(id=>DB.cex[id].c===c));if(!ids.length)return'';
      return '<p class="ghead" style="padding-left:16px;margin-top:6px">'+n+'</p><div class="group" style="margin-bottom:12px">'+ids.map(exCell).join('')+'</div>'}).join('')+
    '<button class="btn sec" onclick="'+(isPlus()?'openCustomEx()':'openPlus()')+'">'+ic('plus',18,2.4)+'Crear un ejercicio'+(isPlus()?'':' · Plus')+'</button></div></div>';
  return h;
}
function studySongs(){
  const act=songsActive(),dom=(DB.songs||[]).filter(s=>s.s==='dominada');
  const cell=s=>{const rc=(DB.recs||[]).filter(r=>r.song===s.id).length,ss=(DB.ss||[]).filter(x=>x.song===s.id);
    return '<button class="cell" onclick="openSong(\''+s.id+'\')"><span class="ic soft">'+ic('note',17)+'</span><div class="cb"><div class="tt"><p class="bd ell">'+esc(s.t)+'</p><p class="fn l2 ell">'+(s.a?esc(s.a)+' · ':'')+(ss.length?plural(ss.length,'práctica'):'sin practicar')+(rc?' · '+plural(rc,'grabación','grabaciones'):'')+'</p></div>'+
      '<span class="pill '+(s.s==='dominada'?'plus':(s.s==='pulida'?'tint':'gray'))+'">'+s.s+'</span>'+chev()+'</div></button>'};
  return '<div class="sec"><div class="stitle"><h3 class="t3">En estudio</h3><span class="fn l2">'+(isPlus()?act.length:act.length+' de '+FREE_SONGS)+'</span></div><div class="pad">'+
    (act.length?'<div class="group">'+act.map(cell).join('')+'</div>':'<div class="card empty">Añade la canción que estás trabajando: sale en la práctica con sus frases difíciles.</div>')+
    '<button class="btn sec" style="margin-top:12px" onclick="openSong()">'+ic('plus',18,2.4)+'Añadir canción</button></div></div>'+
    (dom.length?'<div class="sec"><div class="stitle"><h3 class="t3">Dominadas</h3><span class="fn l2">'+dom.length+'</span></div><div class="pad"><div class="group">'+dom.map(cell).join('')+'</div></div></div>':'');
}
function studyClasses(){
  if(!DB.profile.teacher)return '<div class="pad" style="padding-top:20px"><div class="card" style="padding:20px;text-align:center"><div style="display:flex;justify-content:center">'+dkStage('rei',2)+'</div>'+
    '<h2 class="t2" style="margin-top:14px">¿Vas a clase de canto?</h2><p class="sb l2" style="margin-top:6px">Apunta cada clase en dos minutos: qué habéis trabajado, qué practicar y en qué fijarte. Los deberes salen en Hoy hasta la siguiente.</p>'+
    '<button class="btn pri" style="margin-top:16px" onclick="setTeacher(true)">Sí, voy a clase</button></div></div>';
  const L=(DB.classes||[]).slice().sort((a,b)=>b.d.localeCompare(a.d));
  return '<div class="sec"><div class="stitle"><h3 class="t3">Clases</h3><span class="fn l2">'+(DB.profile.classDay!=null?'Los '+DIAS[DB.profile.classDay]:'')+'</span></div><div class="pad">'+
    '<button class="btn pri" onclick="openClass()">'+ic('plus',18,2.4)+'Apuntar una clase</button>'+
    (L.length?'<div class="group" style="margin-top:14px">'+L.map((c,i)=>'<button class="cell" onclick="openClass(\''+c.id+'\')"><span class="ic '+(i?'gray':'soft')+'">'+ic('cap',17)+'</span><div class="cb"><div class="tt"><p class="bd">Clase del '+fmtDY(c.d)+'</p><p class="fn l2 ell">'+esc(c.w||c.h||'Sin notas')+'</p></div>'+(c.a?'<span class="pill gray">'+ic('mic',12,2.4)+'audio</span>':'')+chev()+'</div></button>').join('')+'</div>'
      :'<p class="gfoot center" style="padding-top:14px">Pide permiso a tu profe para grabar la clase: es oro para practicar después.</p>')+'</div></div>';
}
function setTeacher(on,quiet){DB.profile=Object.assign({},DB.profile,{teacher:!!on});if(on&&DB.profile.classDay==null)DB.profile.classDay=wdOf(T());save();render();if(on&&!quiet)openClassDay()}

/* ═════ HOJAS ═════ */
const SHS=[];
let onSheetClose=null;
function openSheet(fn,push,replace){
  if(replace&&SHS.length)SHS[SHS.length-1]=fn;else if(push&&$('sheet').classList.contains('on'))SHS.push(fn);else{sheetCleanup();SHS.length=0;SHS.push(fn)}
  drawSheet();
}
function drawSheet(){
  const fn=SHS[SHS.length-1];if(!fn)return closeSheet();
  const o=fn(),sh=$('sheet'),sc=sh.querySelector('.sbody')?.scrollTop||0,same=sh.dataset.k===String(SHS.length);
  sh.innerHTML='<div class="grabber"></div><div class="shead">'+(SHS.length>1?'<button class="ibtn l x-btn" onclick="backSheet()" aria-label="Atrás">'+ic('chevL',18,2.4)+'</button>':'')+
    '<p class="hl ell">'+(o.title||'')+'</p><button class="ibtn r '+(o.ok?'ok-btn':'x-btn')+'" onclick="'+(o.onOk||'closeSheet()')+'" aria-label="'+(o.ok?'Guardar':'Cerrar')+'">'+ic(o.ok?'check':'x',o.ok?18:16,o.ok?2.8:2.4)+'</button></div>'+
    '<div class="sbody">'+o.body+'</div>';
  sh.dataset.k=SHS.length;
  if(same)sh.querySelector('.sbody').scrollTop=sc;
  sh.classList.add('on');$('scrim').classList.add('on');lockScroll(true);
}
function sheetCleanup(){if(onSheetClose){const f=onSheetClose;onSheetClose=null;f()}}
function backSheet(){sheetCleanup();SHS.pop();SHS.length?drawSheet():closeSheet()}
function closeSheet(){sheetCleanup();const sh=$('sheet');sh.classList.remove('on','drag');sh.style.transform='';$('scrim').classList.remove('on');$('scrim').style.opacity='';SHS.length=0;delete sh.dataset.k;lockScroll(false);if(document.activeElement)document.activeElement.blur();if(!SS.on||SS.min)patStop()}
/* con una hoja abierta, la pantalla de detrás no se mueve */
let LOCKY=null;
function lockScroll(on){
  const b=document.body;
  if(on&&LOCKY==null){LOCKY=window.scrollY;b.style.top=-LOCKY+'px';b.classList.add('locked')}
  else if(!on&&LOCKY!=null){b.classList.remove('locked');b.style.top='';window.scrollTo(0,LOCKY);LOCKY=null}
}
/* arrastrar hacia abajo para cerrar, como en iOS: desde la barrita o la cabecera, o desde el contenido si ya está arriba del todo.
   Un gesto que empieza de lado (carruseles, selectores) no cuenta. */
(function(){
  let x0=0,y0=0,t0=0,dy=0,on=false,ok=false;
  const sh=()=>$('sheet');
  document.addEventListener('touchstart',e=>{
    const s=sh();if(!s||!s.classList.contains('on')||!s.contains(e.target)||e.touches.length>1){ok=false;return}
    const body=s.querySelector('.sbody'),inHead=!!e.target.closest('.grabber,.shead')&&!e.target.closest('button');
    ok=inHead||(body&&body.contains(e.target)&&body.scrollTop<=0&&!e.target.closest('input,textarea,select,.seg3,.segc'));
    x0=e.touches[0].clientX;y0=e.touches[0].clientY;t0=Date.now();dy=0;on=false;
  },{passive:true});
  document.addEventListener('touchmove',e=>{
    if(!ok||e.touches.length>1)return;const s=sh();dy=e.touches[0].clientY-y0;const dx=e.touches[0].clientX-x0;
    if(!on){if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>6){ok=false;return}if(dy>8){on=true;s.classList.add('drag')}else if(dy<-4){ok=false;return}else return}
    e.preventDefault();const d=Math.max(0,dy);
    s.style.transform='translate(-50%,'+d+'px)';$('scrim').style.opacity=String(Math.max(0,1-d/(s.offsetHeight||600)));
  },{passive:false});
  document.addEventListener('touchend',()=>{
    if(!on){ok=false;return}
    const s=sh(),v=dy/Math.max(1,Date.now()-t0);s.classList.remove('drag');on=false;ok=false;
    if(dy>Math.min(140,s.offsetHeight*.3)||v>.6)closeSheet();
    else{s.style.transform='';$('scrim').style.opacity=''}
  });
})();
function confirmSheet(title,text,btn,fn,danger){
  openSheet(()=>({title,body:'<div class="pad">'+(text?'<p class="sb center" style="padding:0 12px">'+text+'</p>':'')+'<div class="stack" style="margin-top:18px"><button class="btn '+(danger?'sec danger':'pri')+'" onclick="'+fn.replace(/"/g,'&quot;')+'">'+btn+'</button><button class="btn sec" onclick="backSheet()">Cancelar</button></div></div>'}),true);
}

/* ═════ EJERCICIO ═════ */
let PV={id:null,tonic:48};
function playerHTML(id,tonic,on,small){
  return '<div class="player"'+(small?' style="background:var(--sheet2)"':'')+'><button class="playbtn'+(on?' on':'')+'" id="pvBtn" onclick="pvToggle()" aria-label="'+(on?'Parar el piano':'Tocar el patrón')+'">'+ic(on?'pause':'play',20)+'</button>'+
    '<div class="grow"><p class="hl num" id="pvT">'+noteName(tonic)+'</p><p class="c1 l2">'+(on?'Sube medio tono en cada vuelta':'Piano de referencia')+'</p></div>'+
    '<button class="mini" style="background:var(--fill2)" onclick="pvShift(-1)" aria-label="Bajar medio tono">'+ic('dn',17,2.4)+'</button><button class="mini" style="background:var(--fill2)" onclick="pvShift(1)" aria-label="Subir medio tono">'+ic('up',17,2.4)+'</button></div>';
}
function pvToggle(dir){
  if(PAT.on){patStop();drawPlayerState();return}
  if(SS.on&&!SS.min&&SS.ph==='step'&&!SS.run)togglePause();
  const e=Object.assign({id:PV.id},exBase(PV.id));
  patStart(e,PV.tonic,t=>{PV.tonic=t;const el=$('pvT');if(el)el.textContent=noteName(t)},dir);drawPlayerState();
}
function pvShift(d){PV.tonic=Math.max(36,Math.min(84,PV.tonic+d));if(PAT.on)PAT.tonic=PV.tonic;else tone(PV.tonic,.9);const el=$('pvT');if(el)el.textContent=noteName(PV.tonic)}
function drawPlayerState(){const b=$('pvBtn');if(!b)return;b.classList.toggle('on',PAT.on);b.innerHTML=ic(PAT.on?'pause':'play',20);const s=b.parentNode.querySelector('.c1');if(s)s.textContent=PAT.on?'Sube medio tono en cada vuelta':'Piano de referencia'}
function openEx(id){
  const e=exBase(id);if(!e)return;patStop();PV={id,tonic:startTonic(e)};
  openSheet(()=>{const inP=planEx().includes(id),custom=!EXC[id];
    return{title:esc(e.n),body:'<div class="pad stack">'+
      '<div class="row" style="gap:8px;padding:0 4px"><span class="pill gray">'+CATN[e.c]+'</span>'+(e.lv?'<span class="pill gray">'+(e.lv===2?'Avanzado':'Intermedio')+'</span>':'')+(inP?'<span class="pill tint">En tu práctica</span>':'')+'</div>'+
      '<p class="bd" style="padding:0 4px;white-space:pre-wrap">'+esc(e.how||'')+'</p>'+
      (e.pat?playerHTML(id,PV.tonic,PAT.on,true)+'<p class="fn l2" style="padding:0 6px;margin-top:-4px">Suena el acorde de la tónica y después el patrón. Canta encima; al llegar arriba de tu rango, baja solo.</p>':'')+
      (e.mode==='tuner'?'<button class="btn sec" onclick="openTuner(true)">'+ic('gauge',18)+'Abrir el afinador</button>':'')+
      (e.mode==='hold'&&DB.best[id]?'<div class="card row" style="padding:12px 16px;gap:12px;background:var(--sheet2)"><span class="ic soft" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center">'+ic('trophy',18)+'</span><div class="grow"><p class="fn l2">Tu marca</p><p class="hl num">'+DB.best[id]+' s</p></div></div>':'')+
      (e.pat?'<div class="group"><div class="cell static"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd">Hasta dónde llegas cómodo</p><p class="fn l2">Nota más aguda del patrón sin apretar</p></div>'+
        '<select style="border:0;background:none;color:var(--label2);font-size:17px;text-align:right" onchange="DB.extop[\''+id+'\']=this.value;save();render()" aria-label="Nota más aguda cómoda"><option value="">—</option>'+NOTES.map(m=>'<option'+(DB.extop[id]===noteName(m)?' selected':'')+'>'+noteName(m)+'</option>').join('')+'</select></div></div></div>':'')+
      '<div class="group"><button class="cell" onclick="'+(isPlus()?'togglePlanEx(\''+id+'\')':'openPlus()')+'"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd">En mi práctica</p>'+(isPlus()?'':'<p class="fn l2">Elegir ejercicios es de Plus</p>')+'</div>'+
        (isPlus()?'<span class="sw'+(inP?' on':'')+'" role="switch" aria-checked="'+inP+'"></span>':ic('lock',17))+'</div></button></div>'+
      (custom?'<button class="btn sec" onclick="openCustomEx(\''+id+'\')">Editar ejercicio</button>':'')+
      '</div>'}},SHS.length>0&&$('sheet').classList.contains('on'));
  onSheetClose=()=>patStop();
}
function togglePlanEx(id){
  const p=DB.plan||{ex:[]},i=p.ex.indexOf(id);if(i>=0)p.ex.splice(i,1);else p.ex.push(id);
  p.src='edit';DB.plan=p;save();drawSheet();render();
}
function openPlanEditor(){
  const bl=blockMins();
  openSheet(()=>{const b=(DB.cfg.bl||goalMins(goalsOf(),DB.cfg.mins)).slice();
    return{title:'Ajustar mi práctica',body:'<div class="pad stack"><p class="sb l2 center" style="padding:0 10px">Minutos de cada bloque. Los ejercicios los eliges en cada uno, con «En mi práctica».</p>'+
      BLOCKS.map((B,i)=>'<div class="card row" style="padding:10px 10px 10px 18px;background:var(--sheet2)"><span class="bd grow">'+B.n+'</span><button class="mini" style="background:var(--fill2)" onclick="blAdj('+i+',-1)" aria-label="Menos">'+ic('minus',16,2.4)+'</button><span class="t3 num" style="min-width:64px;text-align:center">'+b[i]+' <span class="fn l2">min</span></span><button class="mini" style="background:var(--fill2)" onclick="blAdj('+i+',1)" aria-label="Más">'+ic('plus',16,2.4)+'</button></div>').join('')+
      '<p class="fn l2 center">Total: '+b.reduce((x,y)=>x+y,0)+' min</p>'+
      '<button class="btn sec" onclick="DB.cfg.bl=null;DB.plan=proposePlan(goalsOf(),DB.profile.lvl,DB.cfg.mins);save();drawSheet();render();toast(\'Práctica propuesta restaurada\')">Volver a la práctica propuesta</button></div>'}});
  void bl;
}
function blAdj(i,d){const b=(DB.cfg.bl||goalMins(goalsOf(),DB.cfg.mins)).slice();b[i]=Math.max(0,Math.min(60,b[i]+d));DB.cfg.bl=b;save();drawSheet();render()}
let CX=null;
function openCustomEx(id){
  const e=id?DB.cex[id]:null;CX={id:id||null,n:e?e.n:'',c:e?e.c:'tec',how:e?e.how:''};
  openSheet(()=>({title:e?'Editar ejercicio':'Nuevo ejercicio',ok:1,onOk:'saveCustomEx()',body:'<div class="pad stack">'+
    '<div class="field"><label for="cxN">Nombre</label><input id="cxN" maxlength="60" value="'+esc(CX.n)+'" oninput="CX.n=this.value"></div>'+
    '<div class="field"><label>Tipo</label><div class="segc" style="flex-wrap:wrap">'+CATS.map(([k,n])=>'<button class="'+(CX.c===k?'on':'')+'" style="padding:0 6px;font-size:13px" onclick="CX.c=\''+k+'\';this.parentNode.querySelectorAll(\'button\').forEach(b=>b.classList.remove(\'on\'));this.classList.add(\'on\')">'+n+'</button>').join('')+'</div></div>'+
    '<div class="field"><label for="cxH">Cómo se hace</label><textarea class="ta" id="cxH" oninput="CX.how=this.value">'+esc(CX.how)+'</textarea></div>'+
    (e?'<button class="btn sec danger" onclick="delCustomEx()">Borrar ejercicio</button>':'')+'</div>'}),true);
}
function saveCustomEx(){
  const n=clean(CX.n,60);if(!n)return toast('Ponle nombre');
  const id=CX.id||'c_'+uid();DB.cex[id]={n,c:CX.c,how:clean(CX.how),custom:1};
  if(!CX.id){DB.plan=DB.plan||{ex:[]};DB.plan.ex.push(id);DB.plan.src='edit'}
  save();closeSheet();render();toast('Guardado');
}
function delCustomEx(){const id=CX.id;delete DB.cex[id];if(DB.plan)DB.plan.ex=DB.plan.ex.filter(x=>x!==id);save();closeSheet();render();toast('Ejercicio borrado')}

/* ═════ CANCIÓN ═════ */
let SG=null;
function openSong(id,push){
  if(!id&&!isPlus()&&songsActive().length>=FREE_SONGS){openPlus();return}
  const s=id?DB.songs.find(x=>x.id===id):null;SG={id:id||null,t:s?s.t:'',a:s?s.a||'':'',s:s?s.s:'aprendiendo',h:s?s.h||'':'',nt:s?s.nt||'':''};
  openSheet(()=>{const rc=id?(DB.recs||[]).filter(r=>r.song===id).sort((a,b)=>b.ts-a.ts):[];
    return{title:s?'Canción':'Nueva canción',ok:1,onOk:'saveSong()',body:'<div class="pad stack">'+
    '<div class="field"><label for="sgT">Título</label><input id="sgT" maxlength="80" value="'+esc(SG.t)+'" oninput="SG.t=this.value"></div>'+
    '<div class="field"><label for="sgA">Artista u origen</label><input id="sgA" maxlength="80" value="'+esc(SG.a)+'" oninput="SG.a=this.value"></div>'+
    '<div class="field"><label>Estado</label><div class="segc">'+STAT.map(x=>'<button class="'+(SG.s===x?'on':'')+'" onclick="SG.s=\''+x+'\';this.parentNode.querySelectorAll(\'button\').forEach(b=>b.classList.remove(\'on\'));this.classList.add(\'on\')">'+x+'</button>').join('')+'</div></div>'+
    '<div class="field"><label for="sgH">Frases difíciles</label><textarea class="ta" id="sgH" placeholder="Dónde se te escapa: compás, frase, nota…" oninput="SG.h=this.value">'+esc(SG.h)+'</textarea></div>'+
    '<div class="field"><label for="sgN">Notas</label><textarea class="ta" id="sgN" placeholder="Tonalidad, respiraciones, lo que te dijo tu profe…" oninput="SG.nt=this.value">'+esc(SG.nt)+'</textarea></div>'+
    (s?'<button class="btn sec" onclick="openRec(\'song\',true,\''+s.id+'\')">'+ic('mic',18)+'Grabar una toma</button>':'')+
    (rc.length?'<p class="ghead" style="padding-left:16px;margin:4px 0 -4px">Grabaciones</p><div class="group">'+rc.map(r=>recCell(r,'sp')).join('')+'</div>':'')+
    (s?'<button class="btn sec danger" onclick="confirmSheet(\'Borrar canción\',\'Sus grabaciones se conservan.\',\'Borrar\',\'DB.songs=DB.songs.filter(x=>x.id!==SG.id);save();closeSheet();render()\',true)">Borrar canción</button>':'')+'</div>'}},push);
}
function saveSong(){
  const t=clean(SG.t,80);if(!t)return toast('Ponle título');
  let s=SG.id?DB.songs.find(x=>x.id===SG.id):null;if(!s){s={id:uid(),d:T()};DB.songs.push(s)}
  const was=s.s;Object.assign(s,{t,a:clean(SG.a,80),s:SG.s,h:clean(SG.h),nt:clean(SG.nt)});if(SG.s==='dominada'&&was!=='dominada'){s.dd=T();toast('¡Dominada!')}else toast('Guardada');
  save();SHS.length>1?(SHS.pop(),drawSheet()):closeSheet();render();
}

/* ═════ CLASE ═════ */
let CL=null;   // borrador de la clase: sobrevive al abrir la grabadora encima
function openClass(id){
  const c=id?DB.classes.find(x=>x.id===id):null;
  CL={id:id||null,d:c?c.d:T(),w:c?c.w||'':'',h:c?c.h||'':'',f:c?c.f||'':'',audio:c&&c.a?'keep':null};
  openSheet(classSheet);
}
function classSheet(){
  const c=CL.id?DB.classes.find(x=>x.id===CL.id):null;
  const aud=CL.audio==='keep'?'<div class="card row" style="padding:10px 12px;gap:10px;background:var(--sheet2)"><button class="playbtn" style="width:40px;height:40px" onclick="playRec(\''+c.a+'\',\'clPl\')" aria-label="Escuchar">'+ic('play',16)+'</button><div class="grow"><p class="bd">Audio de la clase</p><p class="fn l2">'+(c.ad?mmss(c.ad):'Guardado')+'</p></div><button class="btn sec sm" onclick="CL.audio=null;drawSheet()">Quitar</button></div><div id="clPl"></div>'
    :(CL.audio?'<div class="card row" style="padding:12px 14px;gap:10px;background:var(--sheet2)"><span class="ic soft" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center">'+ic('mic',18)+'</span><div class="grow"><p class="bd ell">'+esc(CL.audio.name)+'</p><p class="fn l2">'+(CL.audio.dur?mmss(CL.audio.dur)+' · ':'')+(CL.audio.blob.size/1048576).toFixed(1)+' MB · se guarda al confirmar</p></div><button class="btn sec sm" onclick="CL.audio=null;drawSheet()">Quitar</button></div>'
      :'<div class="row" style="gap:8px"><button class="btn sec grow" style="height:46px" onclick="openRec(\'class\',true)">'+ic('mic',18)+'Grabar</button><label class="btn sec grow" style="height:46px" for="clFile">'+ic('down',18)+'Adjuntar</label><input id="clFile" type="file" accept="audio/*" hidden onchange="clFile(this)"></div>');
  return{title:c?'Clase del '+fmtD(c.d):'Nueva clase',ok:1,onOk:'saveClass()',body:'<div class="pad stack">'+
    '<div class="field"><label for="clD">Fecha</label><input id="clD" type="date" value="'+esc(CL.d)+'" oninput="CL.d=this.value"></div>'+
    '<div class="field"><label for="clW">Qué hemos trabajado</label><textarea class="ta" id="clW" placeholder="Ej.: apoyo en los agudos, arpegio con mmg" oninput="CL.w=this.value">'+esc(CL.w)+'</textarea></div>'+
    '<div class="field"><label for="clH">Qué practicar esta semana</label><textarea class="ta" id="clH" placeholder="Ej.: arpegio hasta Fa3, estrofa 2" oninput="CL.h=this.value">'+esc(CL.h)+'</textarea></div>'+
    '<div class="field"><label for="clF">En qué fijarme</label><textarea class="ta" id="clF" placeholder="Ej.: no subir la laringe al subir de tono" oninput="CL.f=this.value">'+esc(CL.f)+'</textarea></div>'+
    '<div class="field"><label>Audio de la clase (opcional)</label>'+aud+'</div>'+
    (c?'<button class="btn sec danger" onclick="confirmSheet(\'Borrar clase\',\'Se borrará también su audio.\',\'Borrar\',\'delClass()\',true)">Borrar clase</button>':'')+'</div>'};
}
function clFile(inp){
  const f=inp.files&&inp.files[0];inp.value='';if(!f)return;
  if(!/^audio\//.test(f.type)&&!/\.(m4a|mp3|wav|ogg|opus|aac|webm|amr|3gp)$/i.test(f.name))return toast('Eso no parece un audio');
  if(f.size>300*1048576)return toast('Archivo demasiado grande (máx. 300 MB)');
  CL.audio={blob:f,name:f.name,dur:0};drawSheet();
}
async function saveClass(){
  if(!isDate(CL.d))return toast('Pon la fecha');
  let c=CL.id?DB.classes.find(x=>x.id===CL.id):null;if(!c){c={id:uid()};DB.classes.push(c)}
  const oldA=c.a;Object.assign(c,{d:CL.d,w:clean(CL.w),h:clean(CL.h),f:clean(CL.f)});
  if(CL.audio&&CL.audio!=='keep'){const aid='cl_'+uid();try{await IDB.put(aid,CL.audio.blob);c.a=aid;c.ad=Math.round(CL.audio.dur||0);persistStorage();if(oldA)IDB.del(oldA)}catch(e){toast('No se pudo guardar el audio')}}
  else if(!CL.audio&&oldA){IDB.del(oldA);delete c.a;delete c.ad}
  if(!DB.profile.teacher)DB.profile.teacher=true;
  save();closeSheet();render();toast('Clase guardada');
}
function delClass(){const c=DB.classes.find(x=>x.id===CL.id);if(c&&c.a)IDB.del(c.a);DB.classes=DB.classes.filter(x=>x.id!==CL.id);save();closeSheet();render()}

/* ═════ GRABADORA ═════ */
let RS=null;
function openRec(mode,push,song){
  const act=songsActive()[0],lastL=((DB.recs||[]).slice().sort((a,b)=>b.ts-a.ts)[0]||{}).l;
  const sg=song?DB.songs.find(s=>s.id===song):null;
  RS={mode,ph:'idle',song:sg?sg.id:'',l:sg?sg.t:(lastL||(act?act.t:'Frase de la semana')),afi:0,res:0,com:0,nt:'',url:null};
  openSheet(recSheet,push);
  onSheetClose=()=>{if(recOn())recCancel();if(RS&&RS.url){URL.revokeObjectURL(RS.url)}RS=null;if(SS.on&&!SS.min)keepAwake(true)};
}
function recSheet(){
  if(!RS)return{title:'',body:''};
  const title=RS.mode==='class'?'Grabar la clase':(RS.mode==='song'?'Grabar una toma':'Grabación semanal');
  if(RS.ph!=='review'){
    const on=RS.ph==='rec';
    if(!recSupported())return{title,body:'<div class="pad"><div class="empty">'+(window.isSecureContext?'Este navegador no permite grabar audio. Prueba con Safari o Chrome actualizados.':'Para grabar, abre Neiro desde su dirección web (no como archivo del móvil).')+'</div></div>'};
    return{title,body:'<div class="pad" style="text-align:center">'+
      '<p class="sb l2 balance" style="padding:0 16px">'+(RS.mode==='class'?'Deja el móvil cerca, sin tapar el micro.':(RS.mode==='song'?'Canta la canción o la frase difícil.':'Canta <b>la misma frase o canción</b> que la última vez. Así podrás comparar de verdad.'))+'</p>'+
      '<button class="recbtn'+(on?' on':'')+'" onclick="recToggle()" aria-label="'+(on?'Parar':'Grabar')+'"><i></i></button>'+
      '<p class="t1 num" id="recT" style="margin-top:16px">0:00</p><div class="lvl"><i id="recL"></i></div>'+
      '<p class="fn l2" style="margin-top:12px">'+(on?'Grabando… toca para parar':'Toca para empezar')+'</p></div>'};
  }
  if(!RS.url)RS.url=URL.createObjectURL(REC.blob);
  const labels=[...new Set([...songsActive().map(s=>s.t),...(DB.recs||[]).map(r=>r.l)].filter(Boolean))];
  const rate=(k,l)=>'<p class="fn l2" style="margin:10px 4px 6px">'+l+'</p><div class="seg5 sm">'+[1,2,3,4,5].map(i=>'<button class="'+(RS[k]===i?'on':'')+'" onclick="RS.'+k+'=RS.'+k+'==='+i+'?0:'+i+';this.parentNode.querySelectorAll(\'button\').forEach((b,j)=>b.classList.toggle(\'on\',RS.'+k+'===j+1))"><span class="n">'+i+'</span></button>').join('')+'</div>';
  return{title:title+' · '+mmss(REC.dur),body:'<div class="pad stack"><audio controls src="'+RS.url+'"></audio>'+
    (RS.mode==='class'?'<div class="row" style="gap:8px"><button class="btn sec grow" onclick="recRedo()">Repetir</button><button class="btn pri grow" onclick="recUse()">Usar esta</button></div>'
    :'<div class="field"><label for="rcL">Qué has cantado · usa siempre el mismo nombre</label><input id="rcL" list="rcLL" maxlength="80" value="'+esc(RS.l)+'" oninput="RS.l=this.value"><datalist id="rcLL">'+labels.map(l=>'<option value="'+esc(l)+'">').join('')+'</datalist></div>'+
      '<div><p class="hl" style="padding:4px 4px 0">Escúchala y valora</p>'+rate('afi','Afinación')+rate('res','Respiración')+rate('com','Comodidad')+'</div>'+
      '<div class="field"><label for="rcN">Nota</label><textarea class="ta" id="rcN" style="min-height:60px" placeholder="Qué oyes que ha mejorado o qué falla" oninput="RS.nt=this.value">'+esc(RS.nt)+'</textarea></div>'+
      '<div class="row" style="gap:8px"><button class="btn sec grow" onclick="recRedo()">Repetir</button><button class="btn pri grow" onclick="recSave()">Guardar</button></div>')+'</div>'};
}
let recIv=null;
async function recToggle(){
  if(recOn()){recStop();return}
  try{await recStart(RS.mode==='class'?48000:96000,()=>{clearInterval(recIv);keepAwake(false);if(RS){RS.ph='review';drawSheet()}},lv=>{const l=$('recL');if(l)l.style.width=(lv*100)+'%'})}
  catch(e){return toast(e&&e.message==='insecure'?'Abre Neiro desde su dirección web para grabar':(e&&e.name==='NotAllowedError'?'Permiso de micrófono denegado':'No se pudo abrir el micrófono'))}
  if(PAT.on)patStop();
  RS.ph='rec';drawSheet();keepAwake(true);
  recIv=setInterval(()=>{const t=$('recT');if(t)t.textContent=mmss((Date.now()-REC.t0)/1000)},400);
}
function recRedo(){if(RS.url)URL.revokeObjectURL(RS.url);RS.url=null;REC.blob=null;RS.ph='idle';drawSheet()}
function recUse(){
  CL.audio={blob:REC.blob,dur:REC.dur,name:'Grabación de la clase'};
  if(RS.url)URL.revokeObjectURL(RS.url);RS.url=null;onSheetClose=null;RS=null;SHS.pop();drawSheet();
}
async function recSave(){
  const l=clean(RS.l,80);if(!l)return toast('Ponle un nombre');
  const id='rc_'+uid();
  try{await IDB.put(id,REC.blob)}catch(e){return toast('No se pudo guardar el audio')}
  const song=RS.song||((DB.songs||[]).find(s=>s.t.toLowerCase()===l.toLowerCase())||{}).id||'';
  DB.recs.push({id,d:T(),ts:Date.now(),l,song,dur:Math.round(REC.dur),afi:RS.afi||0,res:RS.res||0,com:RS.com||0,nt:clean(RS.nt,300)});
  save();persistStorage();
  if(RS.url)URL.revokeObjectURL(RS.url);RS.url=null;onSheetClose=null;RS=null;
  if(SHS.length>1){SHS.pop();drawSheet()}else closeSheet();
  render();toast('Grabación guardada');
}

/* ═════ AFINADOR Y RANGO ═════ */
const tunerHTML=(target)=>'<div class="tuner"'+(SHS.length?' style="background:var(--sheet2)"':'')+'><p class="fn l2" id="tnS">'+(target!=null?'Objetivo: '+noteName(target):'Canta una nota')+'</p><p class="tnote num" id="tnN">—</p><p class="fn l2 num" id="tnC">&nbsp;</p>'+
  '<div class="tgauge"><div class="scale"></div><div class="mid"></div><div class="needle" id="tnX" style="left:50%"></div></div><div class="row" style="justify-content:space-between"><span class="c1 l3">Bajo</span><span class="c1 l3">Afinado</span><span class="c1 l3">Alto</span></div></div>';
let TUNT=null;
function tunerUpdate(r){
  const n=$('tnN'),c=$('tnC'),x=$('tnX');if(!n)return;
  if(!r){x.style.opacity=.35;return}
  const m=TUNT!=null?TUNT:Math.round(r.m),cents=Math.round((r.m-m)*100),cl=Math.max(-50,Math.min(50,cents));
  n.textContent=noteName(Math.round(r.m));c.textContent=(TUNT!=null&&Math.round(r.m)!==TUNT?(r.m>TUNT?'Demasiado alto':'Demasiado bajo'):(Math.abs(cents)<=10?'Afinado':(cents>0?'+':'')+cents+' cents'));
  x.style.opacity=1;x.style.left=(50+cl)+'%';x.classList.toggle('ok',Math.abs(cents)<=10&&(TUNT==null||Math.round(r.m)===TUNT));
}
async function tunerGo(){
  try{await tunerStart((r)=>tunerUpdate(r))}catch(e){toast(e&&e.message==='insecure'?'Abre Neiro desde su dirección web para usar el micro':'No se pudo abrir el micrófono');return false}
  return true;
}
function openTuner(push){
  TUNT=null;
  openSheet(()=>({title:'Afinador',body:'<div class="pad stack">'+tunerHTML(null)+'<p class="fn l2 center" style="padding:0 16px">Canta una nota mantenida. La aguja en el centro y en verde: afinado.</p>'+
    '<div class="row" style="gap:8px"><button class="btn sec grow" onclick="tone(startTonic({pat:[0]}),1.6)">'+ic('keys',18)+'Nota de referencia</button></div></div>'}),push);
  onSheetClose=()=>{tunerStop();TUNT=null};
  tunerGo();
}
let RT=null;
function openRangeTest(){
  RT={step:0,lo:null,hi:null,stable:null};
  openSheet(rangeSheet);onSheetClose=()=>{tunerStop();RT=null};startRangeTuner();
}
async function startRangeTuner(){
  try{await tunerStart((r,st)=>{if(!RT)return;tunerUpdate(r);RT.stable=st;const b=$('rtBtn');if(b){b.disabled=st==null;b.textContent=st!=null?'Esta es: '+noteName(st):'Mantén una nota…'}})}
  catch(e){toast(e&&e.message==='insecure'?'Abre Neiro desde su dirección web para usar el micro':'No se pudo abrir el micrófono')}
}
function rangeSheet(){
  if(!RT)return{title:'',body:''};
  if(RT.step===2){const n=RT.hi-RT.lo;
    return{title:'Tu rango',body:'<div class="pad stack" style="text-align:center"><div style="display:flex;justify-content:center">'+dkStage('cheer',2)+'</div>'+
      '<p class="t1">'+noteName(RT.lo)+' – '+noteName(RT.hi)+'</p><p class="sb l2">'+n+' semitonos cómodos · '+(n>=24?'¡más de dos octavas!':(n>=12?'más de una octava':'irá creciendo con la práctica'))+'</p>'+
      '<p class="fn l2" style="padding:0 16px">Neiro usará este rango para que el piano de referencia suba y baje dentro de lo que te sale cómodo.</p>'+
      '<button class="btn pri" onclick="saveRange(\''+noteName(RT.lo)+'\',\''+noteName(RT.hi)+'\')">Guardar</button><button class="btn sec" onclick="RT.step=0;RT.lo=RT.hi=null;drawSheet();startRangeTuner()">Repetir</button></div>'};
  }
  const lo=RT.step===0;
  return{title:'Medir mi rango',body:'<div class="pad stack"><div class="dots" style="width:90px;margin:0 auto"><i class="on"></i><i class="'+(lo?'':'on')+'"></i><i></i></div>'+
    '<h2 class="t2 center balance">'+(lo?'Canta tu nota más grave cómoda':'Ahora la más aguda cómoda')+'</h2>'+
    '<p class="sb l2 center balance" style="padding:0 12px">'+(lo?'Baja poco a poco con «a» hasta donde suene bien, sin forzar ni rascar. Mantén esa nota.':'Sube poco a poco hasta donde suene limpio, sin apretar ni gritar. Mantén esa nota.')+'</p>'+
    tunerHTML(null)+
    '<button class="btn pri" id="rtBtn" disabled onclick="rangeTake()">Mantén una nota…</button>'+
    (lo?'':'<p class="fn l2 center">Grave: '+noteName(RT.lo)+'</p>')+'</div>'};
}
function rangeTake(){
  if(!RT||RT.stable==null)return;
  if(RT.step===0){RT.lo=RT.stable;RT.step=1;TUN.hist=[];drawSheet();return}
  if(RT.stable<=RT.lo+2)return toast('Esa nota está muy cerca de la grave. Sube un poco más.');
  RT.hi=RT.stable;RT.step=2;tunerStop();drawSheet();
}
function saveRange(l,h){DB.range=(DB.range||[]).filter(r=>r.d!==T());DB.range.push({d:T(),l,h});save();closeSheet();render();toast('Rango guardado')}
function openRangeManual(){
  const r=myRange();let L=noteName(r.lo),H=noteName(r.hi);
  const sel=(id,v)=>'<select id="'+id+'" class="grow" style="height:50px;border-radius:14px;border:0;background:var(--sheet2);padding:0 14px;font-size:17px">'+NOTES.map(m=>'<option'+(noteName(m)===v?' selected':'')+'>'+noteName(m)+'</option>').join('')+'</select>';
  openSheet(()=>({title:'Rango a mano',ok:1,onOk:"(()=>{const l=$('rgL').value,h=$('rgH').value;if(midiOf(h)<=midiOf(l))return toast('La aguda debe estar por encima de la grave');saveRange(l,h)})()",body:'<div class="pad stack">'+
    '<p class="sb l2 center" style="padding:0 10px">Si tu profe te ha medido el rango, apúntalo aquí. Do3 es el Do central.</p>'+
    '<div class="field"><label for="rgL">Más grave</label><div class="row" style="gap:8px">'+sel('rgL',L)+'<button class="btn sec" style="width:50px;height:50px;padding:0" onclick="tone(midiOf($(\'rgL\').value),1.4)" aria-label="Escuchar">'+ic('play',16)+'</button></div></div>'+
    '<div class="field"><label for="rgH">Más aguda</label><div class="row" style="gap:8px">'+sel('rgH',H)+'<button class="btn sec" style="width:50px;height:50px;padding:0" onclick="tone(midiOf($(\'rgH\').value),1.4)" aria-label="Escuchar">'+ic('play',16)+'</button></div></div></div>'}),true);
}

/* ═════ PRÁCTICA SIN GUÍA ═════ */
let QK=null;
function openQuick(push){
  QK={d:T(),m:20,song:'',joy:0,snd:0,note:''};
  openSheet(()=>({title:'Registrar práctica',ok:1,onOk:'saveQuick()',body:'<div class="pad stack">'+
    '<div class="row" style="gap:10px"><div class="field grow"><label for="qkD">Fecha</label><input id="qkD" type="date" value="'+QK.d+'" oninput="QK.d=this.value"></div>'+
    '<div class="field" style="width:110px"><label for="qkM">Minutos</label><input id="qkM" type="number" inputmode="numeric" min="1" max="300" value="'+QK.m+'" oninput="QK.m=parseInt(this.value)||0"></div></div>'+
    (DB.songs.length?'<div class="field"><label for="qkS">Canción</label><select id="qkS" onchange="QK.song=this.value"><option value="">—</option>'+DB.songs.map(s=>'<option value="'+s.id+'">'+esc(s.t)+'</option>').join('')+'</select></div>':'')+
    rateBlock('QK')+
    '<div class="field"><label for="qkN">Nota</label><textarea class="ta" id="qkN" style="min-height:60px" oninput="QK.note=this.value"></textarea></div></div>'}),push);
}
function saveQuick(){
  if(!isDate(QK.d)||!(QK.m>0))return toast('Revisa fecha y minutos');
  DB.ss.push({id:uid(),d:QK.d,ts:Date.now(),m:Math.min(300,QK.m),g:false,bl:[],song:QK.song,ex:[],joy:QK.joy||0,snd:QK.snd||0,note:clean(QK.note,300)});
  save();closeSheet();render();toast('Práctica guardada');
}
const SND=['Mal','Flojo','Normal','Bien','Muy bien'],JOY=['Nada','Poco','Normal','Bien','Mucho'];
function rateBlock(obj){
  const row=(k,t,L)=>'<div><p class="hl" style="padding:4px 4px 8px">'+t+'</p><div class="seg5">'+L.map((l,i)=>'<button class="'+((obj==='QK'?QK:SS)[k]===i+1?'on':'')+'" onclick="rateSet(\''+obj+'\',\''+k+'\','+(i+1)+',this)"><span class="n">'+(i+1)+'</span><span class="s">'+l+'</span></button>').join('')+'</div></div>';
  return row('snd','¿Cómo ha sonado?',SND)+row('joy','¿Cuánto has disfrutado?',JOY);
}
function rateSet(obj,k,v,btn){const o=obj==='QK'?QK:SS;o[k]=o[k]===v?0:v;btn.parentNode.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('on',o[k]===i+1))}

/* ═════ TÚ ═════ */
function openMe(){openSheet(meSheet)}
function meSheet(){
  const p=DB.profile||{},C=constancy(),th=PREF.get('theme','auto');
  const row=(lbl,val,fn)=>'<button class="cell" onclick="'+fn+'"><div class="cb" style="padding-left:2px"><span class="tt bd">'+lbl+'</span><span class="val">'+val+'</span>'+chev()+'</div></button>';
  return{title:'Tú',ok:1,body:
    '<div class="row" style="align-items:flex-end;gap:16px;padding:4px 24px 0">'+dkStage('stand',2)+'<div class="grow" style="padding-bottom:8px">'+
      '<input class="t2" style="border:0;background:none;width:100%;outline:none;padding:0" value="'+esc(p.name||'')+'" placeholder="Tu nombre" maxlength="30" onchange="setProfile(\'name\',this.value.trim().slice(0,30))" aria-label="Tu nombre">'+
      '<p class="fn l2">En este móvil · sin cuenta</p><span class="pill" style="margin-top:8px;background:var(--amber-soft);color:var(--amber)">Cinturón '+C.belt[1].toLowerCase()+'</span></div></div>'+
    '<div class="pad" style="margin-top:22px"><p class="ghead" style="padding-left:16px">Práctica</p><div class="group">'+
      row('Días',daysTxt(DB.cfg.avail||[]),'openDays()')+row('Minutos al día',DB.cfg.mins+' min','openMins()')+row(goalsOf(p).length>1?'Objetivos':'Objetivo',goalsOf(p).length?(goalsOf(p).length>1?goalsOf(p).length+' elegidos':GOALS[goalsOf(p)[0]].n):'—','openGoals()')+row('Experiencia',p.lvl?LEVELS[p.lvl].n:'—','openPick(\'lvl\')')+row('Tu voz',(VOICES[p.voice]||VOICES.nose).n,'openPick(\'voice\')')+'</div></div>'+
    '<div class="pad" style="margin-top:22px"><p class="ghead" style="padding-left:16px">Clases</p><div class="group">'+
      '<button class="cell" onclick="setTeacher(!DB.profile.teacher,true);openSheet(meSheet,true,true)"><div class="cb" style="padding-left:2px"><span class="tt bd">Voy a clase</span><span class="sw'+(p.teacher?' on':'')+'" role="switch" aria-checked="'+!!p.teacher+'"></span></div></button>'+
      (p.teacher?row('Día de clase',p.classDay!=null?DIAS[p.classDay]:'—','openClassDay(true)'):'')+'</div></div>'+
    '<div class="pad" style="margin-top:22px"><p class="ghead" style="padding-left:16px">Deshi</p><div class="group">'+row('Aspecto','Piel, pelo y gi','openLook()')+row('Cinturón','Por constancia','openBeltSheet()')+'</div></div>'+
    '<div class="pad" style="margin-top:22px"><button class="group" style="display:block;width:100%" onclick="openPlus()"><div class="cell" style="min-height:64px"><span class="ic tint" style="width:34px;height:34px;border-radius:10px">'+ic('star',18)+'</span>'+
      '<div class="cb"><div class="tt"><p class="hl">'+(isPlus()?'Neiro Plus activo':'Prueba Neiro Plus')+'</p><p class="fn l2">'+(isPlus()?'Simulado en esta versión de pruebas':'7 días gratis · práctica a tu medida y más')+'</p></div>'+chev()+'</div></div></button></div>'+
    '<div class="pad" style="margin-top:22px"><p class="ghead" style="padding-left:16px">Apariencia</p><div class="segc" role="group" aria-label="Apariencia">'+
      [['auto','Automática'],['light','Clara'],['dark','Oscura']].map(([k,l])=>'<button class="'+(th===k?'on':'')+'" onclick="setTheme(\''+k+'\')">'+l+'</button>').join('')+'</div></div>'+
    '<div class="pad" style="margin-top:22px"><p class="ghead" style="padding-left:16px">Tus datos</p><div class="group">'+
      '<button class="cell" onclick="exportData(false)"><span class="ic gray">'+ic('down',17)+'</span><div class="cb"><span class="tt bd">Descargar mis datos</span></div></button>'+
      '<button class="cell" onclick="exportData(true)"><span class="ic gray">'+ic('mic',17)+'</span><div class="cb"><div class="tt"><p class="bd">Descargar con las grabaciones</p><p class="fn l2">Copia completa, para guardarla o cambiar de móvil</p></div></div></button>'+
      '<button class="cell" onclick="openImport(true)"><span class="ic gray">'+ic('up',17)+'</span><div class="cb"><div class="tt"><p class="bd">Importar una copia</p><p class="fn l2">De Neiro o de NEXA Voz</p></div>'+chev()+'</div></button>'+
      '<button class="cell" onclick="openStorage()"><span class="ic gray">'+ic('lock',17)+'</span><div class="cb"><span class="tt bd">Grabaciones en este móvil</span>'+chev()+'</div></button>'+
      '<button class="cell" onclick="openPrivacy()"><span class="ic gray">'+ic('shield',17)+'</span><div class="cb"><span class="tt bd">Privacidad</span>'+chev()+'</div></button>'+
      '<button class="cell" onclick="confirmSheet(\'Borrar datos\',\'Se borrarán tu práctica, tus clases y tus grabaciones de este móvil. <b>No se puede deshacer.</b>\',\'Borrar\',\'doWipe()\',true)"><span class="ic red">'+ic('trash',17)+'</span><div class="cb"><span class="tt bd red">Borrar los datos de este móvil</span></div></button>'+
    '</div><p class="gfoot center" style="padding:16px 0 0">Neiro '+CFG.version+' · de la familia de Tsuyo</p></div>'};
}
function setProfile(k,v){DB.profile=Object.assign({},DB.profile,{[k]:v});save();render()}
function openDays(){
  openSheet(()=>{const av=DB.cfg.avail||[];
    return{title:'Días de práctica',body:'<div class="pad"><p class="sb l2 center" style="padding:0 10px 16px">Mejor 15 minutos casi cada día que una hora el domingo.</p>'+
      '<div class="daysel">'+[1,2,3,4,5,6,0].map(d=>'<button class="'+(av.includes(d)?'on':'')+'" onclick="toggleDay('+d+')" aria-pressed="'+av.includes(d)+'">'+WDL[d]+'</button>').join('')+'</div>'+
      '<p class="fn l2 center" style="margin-top:12px">'+plural(av.length,'día')+' a la semana</p></div>'}},true);
}
function toggleDay(d){const a=DB.cfg.avail||[];const i=a.indexOf(d);if(i>=0){if(a.length===1)return toast('Elige al menos un día');a.splice(i,1)}else a.push(d);DB.cfg.avail=a;save();drawSheet();render()}
function openMins(){
  openSheet(()=>({title:'Minutos al día',body:'<div class="pad stack">'+MINS.map(m=>optBtn({n:m+' minutos',s:{10:'Lo justo para no perder el hilo',15:'Una buena base',20:'Lo recomendado',30:'Para avanzar con ganas',45:'Práctica larga'}[m]},DB.cfg.mins===m,"setMins("+m+")")).join('')+
    (DB.cfg.bl?'<p class="fn l2 center">Tienes los bloques ajustados a mano; al elegir aquí se recalculan.</p>':'')+'</div>'}),true);
}
function setMins(m){DB.cfg.mins=m;DB.cfg.bl=null;if(!DB.plan||DB.plan.src==='auto')DB.plan=proposePlan(goalsOf(),DB.profile.lvl,m);save();backSheet();render()}
function openPick(k){
  const M={goal:[GOALS,'Objetivo'],lvl:[LEVELS,'Experiencia'],voice:[VOICES,'Tu voz']}[k];
  openSheet(()=>({title:M[1],body:'<div class="pad stack">'+(k==='voice'?'<p class="sb l2 center" style="padding:0 10px">Orientativo: si mides tu rango con el afinador, Neiro usa el tuyo.</p>':'')+
    Object.keys(M[0]).map(x=>optBtn(M[0][x],DB.profile[k]===x,"pickSet('"+k+"','"+x+"')",k==='goal'?GOAL_IC[x]:null)).join('')+
    (k!=='voice'&&DB.plan&&DB.plan.src!=='auto'?'<p class="fn l2 center">Tu práctica está ajustada a mano: no se cambiará.</p>':'')+'</div>'}),true);
}

/* objetivos: hasta tres, y qué cambia cada uno */
const GOAL_FX={disfrutar:'más rato de cantar por gusto',cancion:'más minutos de canción',tecnica:'más técnica',afinar:'ejercicios de oído y afinador',grupo:'intervalos y cantar sin piano'};
const goalSummary=g=>{const t=g.map(k=>GOAL_FX[k]);return t.length?t.join(', ').replace(/^./,c=>c.toUpperCase()):''};
function openGoals(){
  openSheet(()=>{const g=goalsOf(),auto=!DB.plan||DB.plan.src==='auto';
    return{title:'Objetivos',body:'<div class="pad stack"><p class="sb l2 center" style="padding:0 10px">Elige hasta tres. Cada uno cambia los ejercicios y los minutos de tu práctica.</p>'+
      Object.keys(GOALS).map(k=>optBtn({n:GOALS[k].n,s:'Añade '+GOAL_FX[k]},g.includes(k),"toggleGoal('"+k+"')",GOAL_IC[k])).join('')+
      (auto?'':'<p class="fn l2 center">Tus ejercicios están elegidos a mano y no cambian; sí cambian los minutos de cada bloque'+(DB.cfg.bl?', salvo que también los hayas ajustado':'')+'.</p>')+'</div>'}},true);
}
function toggleGoal(k){
  const g=goalsOf().slice(),i=g.indexOf(k);
  if(i>=0){if(g.length===1)return toast('Deja al menos un objetivo');g.splice(i,1)}else{if(g.length>=MAX_GOALS)return toast('Hasta tres objetivos');g.push(k)}
  DB.profile=Object.assign({},DB.profile,{goals:g,goal:g[0]});
  if(!DB.plan||DB.plan.src==='auto')DB.plan=proposePlan(g,DB.profile.lvl,DB.cfg.mins);
  save();drawSheet();render();
}
function pickSet(k,v){DB.profile=Object.assign({},DB.profile,{[k]:v});if(k!=='voice'&&(!DB.plan||DB.plan.src==='auto'))DB.plan=proposePlan(goalsOf(),DB.profile.lvl,DB.cfg.mins);save();backSheet();render()}
function openClassDay(push){
  openSheet(()=>({title:'Día de clase',body:'<div class="pad"><p class="sb l2 center" style="padding:0 10px 16px">Ese día Neiro te recordará apuntar la clase al salir.</p><div class="daysel">'+
    [1,2,3,4,5,6,0].map(d=>'<button class="'+(DB.profile.classDay===d?'on':'')+'" onclick="DB.profile.classDay='+d+';save();'+(push?'backSheet()':'closeSheet()')+';render()">'+WDL[d]+'</button>').join('')+'</div></div>'}),push);
}
function openLook(){
  openSheet(()=>{const L=Deshi.getLook(),chip=(on,js,color,lbl)=>'<button class="ibtn" style="width:46px;height:46px;background:'+color+';box-shadow:inset 0 0 0 '+(on?'3px var(--ink)':'.5px var(--sep)')+'" onclick="'+js+'" aria-label="'+lbl+'" aria-pressed="'+on+'"></button>';
    const grp=(t,arr,key)=>'<p class="ghead" style="padding-left:16px;margin-top:16px">'+t+'</p><div class="card row" style="padding:12px 14px;flex-wrap:wrap">'+arr.map(([n,c],i)=>chip(L[key]===i,"setLook('"+key+"',"+i+")",c,t+' '+n)).join('')+'</div>';
    return{title:'Aspecto de Deshi',body:'<div style="display:flex;justify-content:center;padding:8px 0 10px">'+dkStage('stand',2.6)+'</div><div class="pad">'+grp('Piel',Deshi.SKINS,'skin')+grp('Pelo',Deshi.HAIRS,'hair')+grp('Gi',Deshi.GIS,'gi')+'</div>'}},true);
}
function setLook(k,i){const L=Object.assign({},DB.profile.deshi||{});L[k]=i;DB.profile=Object.assign({},DB.profile,{deshi:Deshi.cleanLook(L)});save();applyLook();drawSheet();render()}
async function openStorage(){
  let used='',prot=false;
  try{if(navigator.storage&&navigator.storage.estimate){const e=await navigator.storage.estimate();used=((e.usage||0)/1048576).toFixed(1)+' MB'}if(navigator.storage&&navigator.storage.persisted)prot=await navigator.storage.persisted()}catch(e){}
  openSheet(()=>({title:'Grabaciones',body:'<div class="pad stack"><div class="group"><div class="cell static"><div class="cb" style="padding-left:2px"><span class="tt bd">Grabaciones</span><span class="val">'+(DB.recs||[]).length+'</span></div></div>'+
    '<div class="cell static"><div class="cb" style="padding-left:2px"><span class="tt bd">Espacio usado</span><span class="val">'+(used||'—')+'</span></div></div>'+
    '<div class="cell static"><div class="cb" style="padding-left:2px"><span class="tt bd">Protegidas</span><span class="val">'+(prot?'Sí':'No')+'</span></div></div></div>'+
    '<p class="fn l2" style="padding:0 6px">Se guardan solo en este móvil. '+(prot?'El navegador no las borrará para liberar espacio.':'Si el móvil se queda sin espacio, el navegador podría borrarlas.')+' En la app de iOS irán a tu iCloud.</p>'+
    (prot?'':'<button class="btn pri" onclick="persistStorage().then(ok=>{toast(ok?\'Grabaciones protegidas\':\'El navegador no lo ha permitido\');backSheet();openStorage()})">Proteger grabaciones</button>')+
    '<button class="btn sec" onclick="exportData(true)">Descargar una copia con audios</button></div>'}),true);
}
function openPrivacy(){
  openSheet(()=>({title:'Privacidad',body:'<div class="prose fn" style="font-size:15px;line-height:21px">'+
    '<h4>Responsable</h4><p>'+esc(CFG.owner)+' · '+esc(CFG.ownerEmail)+'</p>'+
    '<h4>Qué se guarda</h4><p>Tu perfil (nombre, objetivo, experiencia, días), tus prácticas y valoraciones, tus clases, canciones, objetivos, tu rango y tus grabaciones de voz.</p>'+
    '<h4>Dónde</h4><p>Esta versión de pruebas lo guarda todo solo en este móvil. Nadie más puede escuchar tus grabaciones.</p>'+
    '<h4>El micrófono</h4><p>Solo se usa mientras grabas o usas el afinador. El afinador no graba nada: analiza la nota en el momento.</p>'+
    '<h4>Tus derechos</h4><p>Puedes descargar tus datos y borrarlos desde Tú. Para cualquier otra petición escribe a '+esc(CFG.ownerEmail)+'. También puedes reclamar ante la AEPD (aepd.es).</p></div>'}),true);
}
async function doWipe(){await IDB.clear();DB=freshDB();S.del(KEY);PREF.set('sess',null);closeSheet();started=false;toast('Datos borrados');showWelcome()}

/* ═════ COPIAS ═════ */
const b2d=b=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(b)});
const d2b=du=>{const i=du.indexOf(','),mt=(du.slice(5,i).split(';')[0])||'audio/webm',bin=atob(du.slice(i+1)),u=new Uint8Array(bin.length);for(let k=0;k<bin.length;k++)u[k]=bin.charCodeAt(k);return new Blob([u],{type:mt})};
async function exportData(withAudio){
  const out={app:'neiro',v:1,exported:new Date().toISOString(),data:DB};
  if(withAudio){toast('Preparando audios…');out.audio={};
    for(const id of [...(DB.recs||[]).map(r=>r.id),...(DB.classes||[]).filter(c=>c.a).map(c=>c.a)]){try{const b=await IDB.get(id);if(b)out.audio[id]=await b2d(b)}catch(e){}}}
  try{const b=new Blob([JSON.stringify(out)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='neiro-'+T()+(withAudio?'-con-audios':'')+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
  catch(e){toast('No se pudo descargar')}
}
let IMP=null;
function openImport(push){
  openSheet(()=>({title:'Importar una copia',body:'<div class="pad stack">'+
    '<p class="sb l2" style="padding:0 6px">Elige una copia de Neiro o de NEXA Voz (Ajustes → Exportar con audios). Se importan también las grabaciones.</p>'+
    '<label class="btn pri" for="impFile">'+ic('down',18)+'Elegir archivo</label><input id="impFile" type="file" accept=".json,application/json" hidden onchange="impFile(this)">'+
    '<p class="msg" id="impMsg"></p></div>'}),push);
}
function impFile(inp){
  const f=inp.files&&inp.files[0];inp.value='';if(!f)return;
  const r=new FileReader();r.onload=()=>impCheck(String(r.result||''));r.onerror=()=>{const m=$('impMsg');if(m)m.textContent='No se pudo leer el archivo.'};r.readAsText(f);
}
/* nombres de los ejercicios que traía NEXA Voz → ejercicios del catálogo de Neiro */
const NV_MAP={'vibración de labios (brrr)':'labios','arpegio de séptima i–iii–v–vii':'arp7','escala i–v y saltos i–iii–v–vi':'saltos','belt: 4 emisiones + escala ×2':'belt'};
const NV_CAT={'Calentamiento':'cal','Respiración':'res','Técnica':'tec','Oído':'oido','Otro':'tec'};
function fromNexaVoz(d){
  const out={cex:{},plan:[],extop:{},idmap:{}};
  (Array.isArray(d.ex)?d.ex:[]).forEach(e=>{
    if(!e||!e.n)return;
    const key=String(e.n).toLowerCase().trim();
    let id=NV_MAP[key]||Object.keys(EXC).find(k=>EXC[k].n.toLowerCase()===key);
    if(!id){id='c_'+(e.id||uid());out.cex[id]={n:clean(e.n,60),c:NV_CAT[e.c]||'tec',how:clean(e.how||e.nt||''),custom:1}}
    out.idmap[e.id]=id;if(e.star)out.plan.push(id);if(e.top&&midiOf(e.top)!=null)out.extop[id]=e.top;
  });
  return out;
}
function impCheck(txt){
  const msg=m=>{const e=$('impMsg');if(e)e.textContent=m};
  let o;try{o=JSON.parse(String(txt).trim())}catch(e){return msg('Ese archivo no es una copia válida.')}
  if(!o||!o.data||!['neiro','nexa-voz'].includes(o.app))return msg('No es una copia de Neiro ni de NEXA Voz.');
  const d=o.data,nAud=o.audio?Object.keys(o.audio).length:0;
  IMP=o;
  const cnt=(a,s,p)=>Array.isArray(a)&&a.length?'<div class="cell static"><div class="cb" style="padding-left:2px"><span class="tt bd">'+p+'</span><span class="val num">'+a.length+'</span></div></div>':'';
  openSheet(()=>({title:'Revisar copia',body:'<div class="pad stack">'+
    '<div class="card row" style="padding:14px 16px;gap:12px;background:var(--sheet2)"><span class="ic soft" style="width:38px;height:38px;border-radius:11px;display:grid;place-items:center">'+ic(o.app==='neiro'?'note':'up',20)+'</span><div class="grow"><p class="hl">Copia de '+(o.app==='neiro'?'Neiro':'NEXA Voz')+'</p><p class="fn l2">'+(o.exported?'Del '+fmtDY(String(o.exported).slice(0,10)):'')+(nAud?' · '+plural(nAud,'audio'):' · sin audios')+'</p></div></div>'+
    '<div class="group">'+cnt(d.ss,'','Prácticas')+cnt(d.classes,'','Clases')+cnt(d.songs,'','Canciones')+cnt(d.recs,'','Grabaciones')+cnt(d.range,'','Mediciones de rango')+cnt(d.goals,'','Objetivos')+cnt(d.ex,'','Ejercicios')+'</div>'+
    (o.app==='nexa-voz'?'<p class="fn l2" style="padding:0 6px">Tus ejercicios de NEXA Voz pasan al catálogo de Neiro; los marcados con ★ forman tu práctica.</p>':'')+
    '<p class="fn l2" style="padding:0 6px">Se sustituyen los datos de Neiro de este móvil.</p>'+
    '<button class="btn pri" onclick="impApply()">Importar</button><button class="btn sec" onclick="backSheet()">Cancelar</button></div>'}),true);
}
async function impApply(){
  const o=IMP;if(!o)return;const d=o.data;
  if(o.app==='neiro'){const keepP=DB.profile;DB=mergeDefaults(d);if(!DB.profile.done&&keepP.done)DB.profile=keepP}
  else{
    const m=fromNexaVoz(d),base=freshDB();
    base.profile=Object.assign({},DB.profile,{teacher:(d.classes||[]).length>0||DB.profile.teacher});
    if(base.profile.teacher&&base.profile.classDay==null&&(d.classes||[]).length){const c={};d.classes.forEach(x=>{if(isDate(x.d))c[wdOf(x.d)]=(c[wdOf(x.d)]||0)+1});const best=Object.keys(c).sort((a,b)=>c[b]-c[a])[0];if(best!=null)base.profile.classDay=+best}
    base.cfg=Object.assign({},DB.cfg);
    if(d.cfg&&Array.isArray(d.cfg.bl)&&d.cfg.bl.length===4){const sum=d.cfg.bl.reduce((a,b)=>a+(+b||0),0);base.cfg.mins=MINS.reduce((a,b)=>Math.abs(b-sum)<Math.abs(a-sum)?b:a,20);base.cfg.bl=[...d.cfg.bl.map(v=>+v||0),0]}
    base.cex=m.cex;base.extop=m.extop;
    base.plan=m.plan.length?{ex:[...new Set(m.plan)],src:'nexa-voz'}:(DB.plan||null);
    ['classes','songs','recs','range','goals'].forEach(k=>base[k]=Array.isArray(d[k])?d[k]:[]);
    base.ss=(Array.isArray(d.ss)?d.ss:[]).map(s=>Object.assign({},s,{ex:(s.ex||[]).map(x=>m.idmap[x]||x)}));
    DB=mergeDefaults(base);
  }
  if(o.audio){let n=0;for(const [id,du] of Object.entries(o.audio)){try{await IDB.put(id,d2b(du));n++}catch(e){}}if(n)persistStorage()}
  save();closeSheet();toast('Copia importada');
  if(!started){if(DB.profile.done){startApp()}else{S.set(KEY+'_mode','local');started=true;openOnb()}}else render();
}

/* ═════ PLUS ═════ */
let PLUSP='y';
function openPlus(){
  openSheet(()=>({title:'',body:'<div style="display:flex;flex-direction:column;align-items:center;padding:0 20px">'+dkStage('cheer',2)+
    '<div class="row" style="gap:8px;margin-top:14px"><span class="brand" style="font-size:22px">Neiro</span><span class="pill plus">PLUS</span></div><h2 class="t1 center" style="margin-top:6px">Practica a tu medida</h2></div>'+
    '<div class="stack" style="padding:18px 28px 0;gap:14px">'+[['pen','Tu práctica, a mano','Elige ejercicios, minutos de cada bloque y crea los tuyos.'],['note','Canciones sin límite','Todo tu repertorio con sus frases difíciles y tomas.'],['chart','Historial completo','Todas tus prácticas y grabaciones, sin límite de fechas.'],['heart','Copias en iCloud','Tus grabaciones a salvo cuando llegue la app de iPhone.']].map(([i,t,s])=>
      '<div class="row" style="gap:13px;align-items:flex-start"><span class="ic soft" style="width:32px;height:32px;border-radius:9px;display:grid;place-items:center">'+ic(i,17)+'</span><div><p class="hl">'+t+'</p><p class="fn l2">'+s+'</p></div></div>').join('')+'</div>'+
    (isPlus()?'<div class="pad stack" style="margin-top:22px"><div class="note"><span>Plus está activo en modo de pruebas. No se ha cobrado nada.</span></div><button class="btn sec danger" onclick="PREF.set(\'plus\',false);closeSheet();render();toast(\'Plus desactivado\')">Desactivar Plus</button></div>'
    :'<div class="pad stack" style="margin-top:22px;gap:8px">'+
      [['y','Anual','19,99 € al año','1,67 € al mes','7 días gratis'],['m','Mensual','2,99 € al mes','','']].map(([k,t,p,s,b])=>'<button class="card row" style="padding:12px 14px 12px 16px;text-align:left;width:100%;background:var(--sheet2)'+(PLUSP===k?';box-shadow:inset 0 0 0 2px var(--ink);background:var(--tint-soft)':'')+'" onclick="PLUSP=\''+k+'\';drawSheet()">'+
        '<span style="width:24px;height:24px;border-radius:50%;display:grid;place-items:center;'+(PLUSP===k?'background:var(--ink);color:var(--bg)':'box-shadow:inset 0 0 0 1.5px var(--fill)')+'">'+(PLUSP===k?ic('check',13,3.2):'')+'</span>'+
        '<span class="grow"><span class="hl" style="display:block">'+t+'</span><span class="fn num"><span class="semi">'+p+'</span><span class="c1 l3">'+(s?' · '+s:'')+'</span></span></span>'+(b?'<span class="pill plus">'+b+'</span>':'')+'</button>').join('')+
      '<button class="btn pri" style="margin-top:6px" onclick="PREF.set(\'plus\',true);closeSheet();render();toast(\'Plus activado (simulado, sin cobro)\')">'+(PLUSP==='y'?'Empezar la prueba gratis':'Suscribirme')+'</button>'+
      '<p class="c1 l2 center balance">'+(PLUSP==='y'?'7 días gratis; después, 19,99 € al año.':'2,99 € al mes.')+' Se renueva salvo que canceles al menos 24 h antes.</p>'+
      '<p class="c1 l2 center">Versión de pruebas: no se cobra nada.</p></div>')}),$('sheet').classList.contains('on'));
}

/* ═════ BIENVENIDA Y CONFIGURACIÓN ═════ */
let started=false;
function showWelcome(){
  $('tabbar').hidden=true;$('btnMe').hidden=true;$('btnTheme').hidden=true;$('acc').hidden=true;
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('on'));
  $('welcome').innerHTML='<div class="fullin" style="justify-content:space-between">'+
    '<div style="display:flex;flex-direction:column;align-items:center;padding-top:8vh">'+dkStage('rei',3.6)+
    '<div class="brand" style="font-size:22px;margin-top:30px;color:var(--label2)">Neiro</div>'+
    '<h1 class="t1 center balance" style="margin-top:12px;max-width:330px">Canta cada día, y disfrútalo más</h1>'+
    '<p class="sb l2 center balance" style="margin-top:10px;max-width:310px">Te guía en la práctica, recuerda lo que te dijo tu profe y te enseña cómo mejora tu voz.</p></div>'+
    '<div class="foot"><button class="btn pri" onclick="startLocal()">Empezar</button><button class="btn tx" onclick="openImport()">Tengo una copia de NEXA Voz</button>'+
    '<p class="c1 l2 center">Versión de pruebas: tus datos se guardan en este móvil.</p>'+
    '<p class="c1 l3 center balance" style="margin-top:4px">Al continuar aceptas la <button class="semi l2" onclick="openPrivacy()">política de privacidad</button>.</p></div></div>';
  $('welcome').classList.add('on');
}
function startLocal(){S.set(KEY+'_mode','local');startApp()}
const GOAL_IC={disfrutar:'smile',cancion:'note',tecnica:'target',afinar:'ear',grupo:'user'};
const optBtn=(o,on,js,icn)=>'<button class="opt'+(on?' on':'')+'" onclick="'+js+'" aria-pressed="'+on+'">'+(icn?'<span class="gi">'+ic(icn,22)+'</span>':'')+
  '<span class="grow"><span class="hl" style="display:block">'+esc(o.n)+'</span>'+(o.s?'<span class="fn l2" style="display:block">'+esc(o.s)+'</span>':'')+'</span><span class="ck">'+(on?ic('check',14,3):'')+'</span></button>';
let ONB=null;
const ONB_ST=['goal','lvl','days','class','ready'];
function openOnb(){
  const p=DB.profile;
  ONB={i:0,goals:goalsOf(p).slice(),lvl:p.lvl||'',av:(DB.cfg.avail||[1,3,5]).slice(),mins:DB.cfg.mins||20,teacher:p.teacher==null?null:!!p.teacher,cday:p.classDay!=null?p.classDay:null};
  renderOnb();$('welcome').classList.remove('on');$('onb').classList.add('on');
}
function onbGo(d){
  const st=ONB_ST[ONB.i];
  if(d>0&&st==='goal'&&!ONB.goals.length)return toast('Elige al menos un objetivo');
  if(d>0&&st==='lvl'&&!ONB.lvl)return toast('Elige tu experiencia');
  if(d>0&&st==='days'&&!ONB.av.length)return toast('Elige al menos un día');
  if(d>0&&st==='class'&&ONB.teacher==null)return toast('Dinos si vas a clase');
  if(d>0&&st==='class'&&ONB.teacher&&ONB.cday==null)return toast('Elige el día de clase');
  if(d>0&&st==='ready')return finishOnb();
  if(d<0&&ONB.i===0){$('onb').classList.remove('on');if(!DB.profile.done){started=false;S.del(KEY+'_mode');showWelcome()}return}
  ONB.i+=d;renderOnb();$('onb').scrollTop=0;
}
function renderOnb(){
  const st=ONB_ST[ONB.i];let h='';
  const head='<div class="fnav"><button class="ibtn glass" onclick="onbGo(-1)" aria-label="Atrás">'+ic('chevL',22,2.2)+'</button><div class="dots" style="width:150px" aria-label="Paso '+(ONB.i+1)+' de 5">'+ONB_ST.map((_,i)=>'<i class="'+(i<=ONB.i?'on':'')+'"></i>').join('')+'</div><div style="width:44px"></div></div>';
  if(st==='goal')h='<h1 class="lt balance" style="margin-top:24px">¿Qué quieres conseguir?</h1><p class="sb l2" style="margin-top:8px">Elige hasta tres. Con esto preparamos tu práctica y puedes cambiarlo cuando quieras.</p><div class="stack" style="margin-top:24px;gap:10px">'+
    Object.keys(GOALS).map(k=>optBtn(GOALS[k],ONB.goals.includes(k),"onbGoal('"+k+"')",GOAL_IC[k])).join('')+'</div>'+
    '<p class="fn l2 center" style="margin-top:12px">'+(ONB.goals.length?ONB.goals.length+' de '+MAX_GOALS+' · '+goalSummary(ONB.goals):'Puedes marcar varios')+'</p>';
  if(st==='lvl')h='<h1 class="lt balance" style="margin-top:24px">¿Cuánto has cantado?</h1><p class="sb l2" style="margin-top:8px">Así elegimos los ejercicios con los que empiezas.</p><div class="stack" style="margin-top:24px;gap:10px">'+
    Object.keys(LEVELS).map(k=>optBtn(LEVELS[k],ONB.lvl===k,"ONB.lvl='"+k+"';renderOnb()")).join('')+'</div>';
  if(st==='days')h='<h1 class="lt balance" style="margin-top:24px">¿Cuándo puedes practicar?</h1><p class="sb l2" style="margin-top:8px">Mejor poco y a menudo que mucho de vez en cuando.</p><div class="daysel" style="margin-top:26px">'+
    [1,2,3,4,5,6,0].map(d=>'<button class="'+(ONB.av.includes(d)?'on':'')+'" onclick="onbDay('+d+')" aria-pressed="'+ONB.av.includes(d)+'">'+WDL[d]+'</button>').join('')+'</div><p class="fn l2 center" style="margin-top:10px">'+plural(ONB.av.length,'día')+' a la semana</p>'+
    '<p class="hl" style="margin-top:26px;padding:0 4px">Minutos cada día</p><div class="segc" style="margin-top:10px">'+MINS.map(m=>'<button class="'+(ONB.mins===m?'on':'')+'" onclick="ONB.mins='+m+';renderOnb()">'+m+'</button>').join('')+'</div>'+
    '<p class="fn l2 center" style="margin-top:10px">'+{10:'Lo justo para no perder el hilo',15:'Una buena base',20:'Lo recomendado',30:'Para avanzar con ganas',45:'Práctica larga'}[ONB.mins]+'</p>';
  if(st==='class')h='<h1 class="lt balance" style="margin-top:24px">¿Vas a clase de canto?</h1><p class="sb l2" style="margin-top:8px">Si vas, al salir apuntas qué toca practicar y Neiro te lo recuerda toda la semana.</p><div class="stack" style="margin-top:24px;gap:10px">'+
    optBtn({n:'Sí, con profe',s:'Clases particulares o en grupo'},ONB.teacher===true,"ONB.teacher=true;if(ONB.cday==null)ONB.cday="+wdOf(T())+";renderOnb()",'cap')+
    optBtn({n:'Aprendo por mi cuenta',s:'Neiro te guía con su práctica'},ONB.teacher===false,"ONB.teacher=false;renderOnb()",'user')+'</div>'+
    (ONB.teacher?'<p class="hl" style="margin-top:24px;padding:0 4px">¿Qué día tienes clase?</p><div class="daysel" style="margin-top:10px">'+[1,2,3,4,5,6,0].map(d=>'<button class="'+(ONB.cday===d?'on':'')+'" onclick="ONB.cday='+d+';renderOnb()">'+WDL[d]+'</button>').join('')+'</div>':'');
  if(st==='ready'){
    const keep=DB.plan&&DB.plan.src!=='auto';
    const saved={plan:DB.plan,mins:DB.cfg.mins,bl:DB.cfg.bl};
    const pg=DB.profile.goals;DB.profile.goals=ONB.goals;
    if(!keep)DB.plan=proposePlan(ONB.goals,ONB.lvl,ONB.mins);
    DB.cfg.mins=ONB.mins;if(!keep)DB.cfg.bl=null;
    const B=practiceBlocks(),tot=practiceMinutes();
    DB.plan=saved.plan;DB.cfg.mins=saved.mins;DB.cfg.bl=saved.bl;DB.profile.goals=pg;ONB.preview=keep?null:proposePlan(ONB.goals,ONB.lvl,ONB.mins);
    h='<div class="row" style="align-items:flex-end;margin-top:16px"><div class="grow" style="padding-bottom:6px"><h1 class="lt balance">Tu práctica está lista</h1><p class="sb l2 balance" style="margin-top:8px">'+tot+' minutos, '+plural(ONB.av.length,'día')+' a la semana'+(keep?', con los ejercicios de tu copia':'')+'.</p></div>'+dkStage('walk',2)+'</div>'+
      '<div class="card" style="padding:16px 18px 6px;margin-top:20px">'+B.map(b=>'<div class="row" style="gap:12px;padding:11px 0;border-top:.5px solid var(--sep)"><span class="ic soft" style="width:32px;height:32px;border-radius:9px;display:grid;place-items:center;flex-shrink:0">'+ic(BL_IC[b.k],17)+'</span><div class="grow" style="min-width:0"><p class="hl">'+b.n+'</p><p class="fn l2 ell">'+(b.ex.length?b.ex.map(exName).map(esc).join(', '):(b.k==='rep'?'Tus canciones':(b.k==='gus'?'Lo que te apetezca':'Libre')))+'</p></div><span class="fn l2 num">'+b.min+' min</span></div>').join('').replace('border-top:.5px solid var(--sep)','border-top:0')+'</div>'+
      '<p class="fn l2" style="padding:12px 16px 0">El piano de referencia te acompaña en cada ejercicio. Mide tu rango en Progreso para que suba justo hasta donde llegas.</p>';
  }
  $('onb').innerHTML='<div class="fullin">'+head+h+'<div class="foot"><button class="btn pri" onclick="onbGo(1)">'+(st==='ready'?'Empezar a cantar':'Continuar')+'</button></div></div>';
}
function onbGoal(k){const i=ONB.goals.indexOf(k);if(i>=0)ONB.goals.splice(i,1);else{if(ONB.goals.length>=MAX_GOALS)return toast('Hasta tres objetivos');ONB.goals.push(k)}renderOnb()}
function onbDay(d){const i=ONB.av.indexOf(d);if(i>=0)ONB.av.splice(i,1);else ONB.av.push(d);renderOnb()}
function finishOnb(){
  DB.profile=Object.assign({},DB.profile,{goals:ONB.goals.slice(),goal:ONB.goals[0],lvl:ONB.lvl,teacher:!!ONB.teacher,classDay:ONB.teacher?ONB.cday:null,voice:DB.profile.voice||'nose',done:1});
  DB.cfg.avail=ONB.av.slice();DB.cfg.mins=ONB.mins;
  if(ONB.preview){DB.plan=ONB.preview;DB.cfg.bl=null}
  if(!DB.cfg.start)DB.cfg.start=T();
  save();$('onb').classList.remove('on');showApp();go('hoy');
}

/* ═════ PRÁCTICA GUIADA ═════ */
const SS={on:false,min:false,steps:[],i:0,t0:0,endAt:0,left:0,run:false,used:[],beeped:false,song:'',ph:'step',joy:0,snd:0,note:'',holdOn:false,holdT0:0,tIv:null,mins:null};
function buildSteps(minsOverride){
  const st=[];
  let blocks=practiceBlocks();
  if(minsOverride){ /* versión corta: calentamiento y técnica reducidos, una pizca de canción */
    const sc=minsOverride/practiceMinutes();blocks=blocks.map(b=>Object.assign({},b,{min:Math.max(1,Math.round(b.min*sc)),ex:b.ex.slice(0,b.k==='tec'?1:2)}));
  }
  blocks.forEach(b=>{
    if(b.k==='rep'||b.k==='gus'){st.push({b:b.k,bn:b.n,sec:b.min*60});return}
    const ex=b.ex.length?b.ex:[null];
    ex.forEach((id,i)=>st.push({b:b.k,bn:b.n,ex:id,k:i+1,of:ex.length,sec:Math.max(60,Math.round(b.min*60/ex.length/30)*30)}));
  });
  return st;
}
function startSession(short){
  if(SS.on){expandSession();return}
  closeSheet();
  const sv=savedSess();if(sv&&!short){restoreSess(sv,true);toast('Sigues donde lo dejaste');return}
  Object.assign(SS,{on:true,min:false,steps:buildSteps(short),i:0,t0:Date.now(),used:[],ph:'step',joy:0,snd:0,note:'',song:(songsActive()[0]||{}).id||'',holdOn:false,mins:short||null});
  enterStep(false);$('session').classList.add('on');keepAwake(true);renderSession();renderAcc();
}
function sessPersist(out){PREF.set('sess',SS.on&&SS.ph==='step'?{d:T(),i:SS.i,used:SS.used,left:stepLeft(),sec:(SS.steps[SS.i]||{}).sec,t0:SS.t0,mins:SS.mins,wait:!!SS.wait,out:!!out}:null)}
/* práctica que dejaste con «Salir» hoy: se puede seguir desde el mismo tiempo, sin sumar el rato fuera */
function savedSess(){const st=PREF.get('sess',null);return st&&st.out&&st.d===T()?st:null}
const savedSec=st=>(st.used||[]).reduce((a,b)=>a+(b||0),0)+Math.max(0,(st.sec||0)-Math.max(0,st.left||0));
function restoreSess(st,run){
  Object.assign(SS,{on:true,min:!run,steps:buildSteps(st.mins),i:Math.min(st.i||0,1e3),t0:st.t0||Date.now(),used:st.used||[],ph:'step',joy:0,snd:0,note:'',song:(songsActive()[0]||{}).id||'',holdOn:false,mins:st.mins||null});
  if(SS.i>=SS.steps.length)SS.i=SS.steps.length-1;
  const s=SS.steps[SS.i];if(st.sec)s.sec=st.sec;
  enterStep(false);if(st.left!=null){SS.left=Math.max(0,st.left);SS.beeped=SS.left<=0}
  SS.wait=!!st.wait;
  if(run&&!SS.wait&&SS.left>0){SS.run=true;SS.endAt=Date.now()+SS.left*1000}
  sessPersist();
  if(run){$('session').classList.add('on');keepAwake(true);renderSession()}
  renderAcc();
}
function enterStep(autostart){
  patStop();tunerStop();SS.holdOn=false;SS.pauseAt=0;SS.patWas=SS.tunWas=false;
  const s=SS.steps[SS.i];SS.left=s.sec;SS.beeped=false;SS.run=!!autostart;SS.wait=!autostart;SS.endAt=Date.now()+SS.left*1000;
  startTick();sessPersist();
}
/* una sola fuente de verdad para el tiempo: lo que queda del paso, cómo se escribe y el tiempo de práctica (sin pausas) */
const stepLeft=()=>SS.run?(SS.endAt-Date.now())/1000:SS.left;
/* al acabarse el tiempo, el paso se para solo: sin segundos de más */
const fmtL=L=>L>0?mmss(Math.ceil(L)):'Hecho';
const doneLbl=()=>SS.i>=SS.steps.length-1?'Ya puedes terminar':'Pasa al siguiente';
const ringLbl=(L,s)=>L<=0?doneLbl():(SS.run?'de '+mmss(s.sec):(SS.wait?'Cuando quieras':'En pausa'));
function practiceSec(){return SS.used.reduce((a,b)=>a+(b||0),0)+(SS.ph==='step'?stepElapsed():0)}
const holdSec=()=>Math.max(0,Math.floor(((SS.run||!SS.pauseAt?Date.now():SS.pauseAt)-SS.holdT0)/1000));
function stepElapsed(){const s=SS.steps[SS.i];if(!s)return 0;const left=SS.run?(SS.endAt-Date.now())/1000:SS.left;return Math.max(0,s.sec-left)}
function nextStep(){
  SS.used[SS.i]=(SS.used[SS.i]||0)+stepElapsed();
  if(SS.i>=SS.steps.length-1){finishSession();return}
  SS.i++;enterStep(false);renderSession();renderAcc();
}
function jumpStep(i){SS.used[SS.i]=(SS.used[SS.i]||0)+stepElapsed();SS.i=i;closeSheet();enterStep(false);renderSession();renderAcc()}
/* la pausa lo congela todo: temporizador, reloj de práctica, piano, afinador, siseo y respiración; al seguir, vuelve lo que sonaba */
function togglePause(){
  if(SS.run){
    SS.left=(SS.endAt-Date.now())/1000;SS.run=false;SS.pauseAt=Date.now();endPrev=null;
    SS.patWas=PAT.on;SS.patDir=PAT.dir;SS.tunWas=TUN.on;patStop();tunerStop();sessPersist();
    renderSession();renderAcc();return;
  }
  if(SS.left<=0)return; // paso hecho: el piano o el afinador se pueden usar, pero ya no suman tiempo
  SS.endAt=Date.now()+SS.left*1000;SS.run=true;SS.wait=false;
  if(SS.holdOn&&SS.pauseAt)SS.holdT0+=Date.now()-SS.pauseAt;
  SS.pauseAt=0;const pw=SS.patWas,tw=SS.tunWas;SS.patWas=SS.tunWas=false;
  renderSession();renderAcc();
  if(pw&&!PAT.on&&!SS.min)pvToggle(SS.patDir);
  if(tw&&!TUN.on&&!SS.min)tunerGo().then(ok=>{if(ok)renderSession()});
}
function addMin(){endPrev=null;const was=SS.left<=0&&!SS.run;if(SS.run)SS.endAt+=60000;else SS.left+=60;SS.steps[SS.i].sec+=60;SS.beeped=false;
  if(was){SS.run=true;SS.wait=false;SS.pauseAt=0;SS.endAt=Date.now()+SS.left*1000;sessPersist();renderSession();renderAcc();return}
  tick()}
/* el tiempo del paso se ha cumplido: se para todo (temporizador, reloj, piano, afinador, siseo) y espera a «Siguiente» */
function completeStep(){
  if(SS.holdOn)holdStop();
  SS.left=0;SS.run=false;SS.pauseAt=0;endPrev=null;SS.patWas=SS.tunWas=false;
  patStop();tunerStop();if(!SS.beeped){SS.beeped=true;ding()}
  sessPersist();renderSession();renderAcc();
}
/* temporizador: se vacía en sentido horario y avisa al acabarse: ámbar en los últimos 10 s, rojo en los 3 últimos, con vibración (como en Tsuyo) */
const endCol=L=>L<=0?'var(--tint)':(L<=3.05?'var(--red)':(L<=10.05?'var(--warn)':'var(--tint)'));
const endTxt=L=>L<=0?'':(L<=3.05?'var(--red)':(L<=10.05?'var(--amber)':''));
let endPrev=null;
function endBuzz(L){const p=endPrev;endPrev=L;if(p==null)return;if((p>10&&L<=10)||(p>3&&L<=3))try{navigator.vibrate&&navigator.vibrate(60)}catch(e){}}
function startTick(){clearInterval(SS.tIv);SS.tIv=setInterval(tick,250)}
function tick(){
  if(!SS.on)return;
  const c=$('ssClock');if(c)c.textContent=mmss(practiceSec());
  if(SS.ph!=='step')return;
  const s=SS.steps[SS.i],L=stepLeft();
  if(SS.run&&L<=0){completeStep();return}
  const t=$('ssT'),a=$('ssArc'),lb=$('ssL');
  if(t){t.textContent=fmtL(L);t.style.color=endTxt(L)}
  if(a){const C=2*Math.PI*82;a.setAttribute('stroke-dashoffset',L<=0?0:-C*(1-L/s.sec));a.setAttribute('stroke',endCol(L))}
  if(SS.run)endBuzz(L);else endPrev=null;
  if(lb)lb.textContent=ringLbl(L,s);
  // respiración: 4 inhala · 4 sostén · 8 suelta
  const br=$('ssBreath');
  if(br){const el=stepElapsed()%16,ph=el<4?['Inhala',1,4-el]:(el<8?['Sostén',1,8-el]:['Suelta',.55,16-el]);
    br.style.setProperty('--b',SS.run?(el<4?.55+.45*(el/4):(el<8?1:1-.45*((el-8)/8))):.55);
    const tx=$('ssBrT'),n=$('ssBrN');if(tx)tx.textContent=SS.run?ph[0]:(SS.left<=0?'Hecho':(SS.wait?'Preparado':'En pausa'));if(n)n.textContent=SS.run?Math.ceil(ph[2]):''}
  if(SS.holdOn){const h=$('ssHold');if(h)h.textContent=holdSec()+' s'}
  renderAcc();
}
function sessHead(){
  return '<div class="fnav"><button class="ibtn glass" onclick="minimizeSession()" aria-label="Minimizar la práctica">'+ic('chevD',22,2.2)+'</button>'+
    '<div class="center"><p class="fn semi">Práctica</p><p class="c1 l2 num" id="ssClock">'+mmss(practiceSec())+'</p></div>'+
    '<button class="ibtn glass" onclick="openSessMenu()" aria-label="Opciones de la práctica">'+ic('more',22)+'</button></div>'+
    '<div style="margin-top:10px" class="dots" aria-label="Paso '+(SS.i+1)+' de '+SS.steps.length+'">'+SS.steps.map((s,i)=>'<i class="'+(i<SS.i?'on':(i===SS.i?'now':''))+'"></i>').join('')+'</div>';
}
function renderSession(){
  if(!SS.on)return;
  if(SS.ph==='rate'){renderRate();return}
  if(SS.ph==='done'){renderDone();return}
  const s=SS.steps[SS.i],e=s.ex?exBase(s.ex):null,last=SS.i===SS.steps.length-1,nx=SS.steps[SS.i+1];
  const L=stepLeft(),R=82,C=2*Math.PI*R,RING=160;
  const ring=(sz)=>'<div class="ring" style="width:'+sz+'px;height:'+sz+'px"><svg width="'+sz+'" height="'+sz+'" viewBox="0 0 176 176" aria-hidden="true"><circle cx="88" cy="88" r="'+R+'" fill="none" stroke="var(--fill2)" stroke-width="11"/>'+
    '<circle id="ssArc" cx="88" cy="88" r="'+R+'" fill="none" stroke="'+endCol(L)+'" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+(L<=0?0:-C*(1-L/s.sec))+'"/></svg>'+
    '<div class="in"><span class="rnd num bold" style="font-size:'+(L<=0?(sz>150?34:26):(sz>150?46:34))+'px;line-height:1.1;color:'+endTxt(L)+'" id="ssT">'+fmtL(L)+'</span><span class="fn l2 num" id="ssL">'+ringLbl(L,s)+'</span></div></div>';
  let title=e?esc(e.n):s.bn,sub=s.of>1?s.bn+' · '+s.k+' de '+s.of:s.bn,body='';
  const lc=lastClass();
  if(s.b==='cal'&&!e){title='Calentamiento libre';body='<p class="sb" style="margin-top:14px">Calienta como te enseñe tu profe: labios, humming, sirenas suaves. Sin forzar.</p><div style="display:flex;justify-content:center;margin-top:20px">'+ring(RING)+'</div>'}
  else if(e&&e.mode==='breath'){
    body='<p class="sb l2" style="margin-top:10px">'+esc(e.how)+'</p><div class="breath" id="ssBreath" style="margin-top:22px"><div class="in"><p class="t2" id="ssBrT">Inhala</p><p class="rnd num bold" style="font-size:40px;line-height:46px" id="ssBrN"></p></div></div>'+
      '<div style="display:flex;justify-content:center;margin-top:16px">'+miniTimer()+'</div>';
  }else if(e&&e.mode==='hold'){
    body='<p class="sb l2" style="margin-top:10px">'+esc(e.how)+'</p><div class="card" style="margin-top:18px;padding:18px;text-align:center"><p class="fn l2">'+(DB.best[s.ex]?'Tu marca: '+DB.best[s.ex]+' s':'Primera vez: apunta tu marca')+'</p><p class="big rnd" id="ssHold">'+(SS.holdOn?holdSec():0)+' s</p>'+
      '<button class="btn '+(SS.holdOn?'inv':'pri')+'" style="margin-top:10px" onclick="holdToggle()">'+(SS.holdOn?ic('stop',20)+'Parar':ic('play',18)+'Empezar el siseo')+'</button></div><div style="display:flex;justify-content:center;margin-top:16px">'+miniTimer()+'</div>';
  }else if(e&&e.mode==='tuner'){
    const tgt=startTonic({pat:[0]})+(SS.tgtOff||0);TUNT=tgt;
    body='<p class="sb l2" style="margin-top:10px">'+esc(e.how)+'</p><div style="margin-top:16px">'+tunerHTML(tgt)+'</div>'+
      '<div class="row" style="gap:8px;margin-top:12px"><button class="btn sec grow" style="height:46px" onclick="tone('+tgt+',1.8)">'+ic('keys',18)+'Escuchar '+noteName(tgt)+'</button><button class="btn sec" style="width:auto;padding:0 14px;height:46px" onclick="SS.tgtOff=((SS.tgtOff||0)+[2,2,1,2,2,2,1][(SS.tgtN=(SS.tgtN||0)+1)%7])%12;renderSession()">Otra nota</button></div>'+
      (TUN.on?'':'<button class="btn pri" style="margin-top:8px" onclick="if(!SS.run)togglePause();tunerGo().then(ok=>{if(ok)renderSession()})">'+ic('mic',18)+'Activar el afinador</button>')+
      '<div style="display:flex;justify-content:center;margin-top:14px">'+miniTimer()+'</div>';
  }else if(e){
    if(PV.id!==s.ex){PV={id:s.ex,tonic:startTonic(e)}}
    body='<div class="card" style="margin-top:14px;padding:13px 16px"><p class="sb">'+esc(e.how)+'</p></div>'+
      (s.b==='tec'&&lc&&lc.f?'<div class="note" style="margin-top:10px"><span>En qué fijarte: <b>'+esc(lc.f)+'</b></span></div>':'')+
      '<div style="display:flex;justify-content:center;margin-top:18px">'+ring(RING)+'</div>'+
      (e.pat?'<div style="margin-top:16px">'+playerHTML(s.ex,PV.tonic,PAT.on)+'</div>':'');
  }else if(s.b==='rep'){
    const L2=songsActive(),sg=L2.find(x=>x.id===SS.song)||L2[0];
    body=(L2.length>1?'<div class="segc" style="margin-top:12px;overflow-x:auto">'+L2.slice(0,3).map(x=>'<button class="'+(sg&&x.id===sg.id?'on':'')+'" style="white-space:nowrap;padding:0 8px" onclick="SS.song=\''+x.id+'\';renderSession()">'+esc(x.t)+'</button>').join('')+'</div>':'')+
      (sg?'<div class="card" style="margin-top:12px;padding:16px"><p class="t3">'+esc(sg.t)+'</p>'+(sg.a?'<p class="fn l2">'+esc(sg.a)+'</p>':'')+
        (sg.h?'<p class="fn amb semi" style="margin-top:10px">Frases difíciles</p><p class="sb" style="white-space:pre-wrap">'+esc(sg.h)+'</p>':'')+(sg.nt?'<p class="fn l2" style="margin-top:8px;white-space:pre-wrap">'+esc(sg.nt)+'</p>':'')+'</div>'
        :'<div class="card" style="margin-top:12px;padding:16px;text-align:center"><p class="sb l2">Aún no tienes canciones en estudio. Canta la que estés trabajando y añádela después en Estudio.</p></div>')+
      (sg&&goalsOf().includes('cancion')&&!(DB.recs||[]).some(r=>r.song===sg.id&&daysBetween(r.d,T())<7)?'<div class="note" style="margin-top:10px"><span>Esta semana aún no tienes una toma de esta canción. <b>Graba la frase difícil</b> y compárala dentro de unos días.</span></div>':'')+'<div class="row" style="justify-content:center;gap:20px;margin-top:18px;align-items:center">'+ring(RING)+(sg?'<button class="btn sec" style="width:auto;padding:0 18px;height:46px" onclick="openRec(\'song\',false,\''+sg.id+'\')">'+ic('mic',18)+'Grabar toma</button>':'')+'</div>';
    if(sg)SS.song=sg.id;
  }else if(s.b==='gus'){
    body='<p class="sb l2" style="margin-top:10px">Algo que te apetezca, sin corregirte. Este rato es solo para disfrutar.</p><div class="row" style="justify-content:center;gap:24px;margin-top:26px;align-items:flex-end">'+dkStage('cheer',1.5)+ring(RING)+'</div>';
  }
  const foot='<div class="foot"><div class="row" style="gap:8px;justify-content:center">'+(L<=0?'':'<button class="btn '+(SS.run?'sec':'pri')+' sm" style="height:44px;min-width:124px;padding:0 20px;border-radius:22px;font-size:15px" onclick="togglePause()" aria-label="'+(SS.run?'Pausar la práctica':(SS.wait?'Empezar este paso':'Seguir con la práctica'))+'">'+(SS.run?ic('pause',16)+'Pausa':ic('play',14)+(SS.wait?'Empezar':'Seguir'))+'</button>')+'<button class="btn sec sm" style="height:44px;min-width:124px;padding:0 20px;border-radius:22px;font-size:15px" onclick="addMin()">+1 min</button></div>'+
    '<button class="btn pri lg" style="margin-top:6px" onclick="nextStep()">'+(last?ic('check',22,2.6)+'Terminar':'Siguiente: '+esc(nx.ex?exName(nx.ex):nx.bn))+'</button></div>';
  $('session').innerHTML='<div class="fullin">'+sessHead()+'<p class="fn l2" style="margin-top:20px">'+sub+'</p><h1 class="lt balance" style="margin-top:2px">'+title+'</h1>'+body+foot+'</div>';
  if(e&&e.mode==='tuner'&&TUN.on){TUN.cb=(r)=>tunerUpdate(r)}
}
const miniTimer=()=>{const L=stepLeft(),s=SS.steps[SS.i];return '<div class="row" style="gap:8px;padding:8px 16px;border-radius:20px;background:var(--fill2)">'+ic('clock',16)+'<span class="fn num semi" id="ssT" style="color:'+endTxt(L)+'">'+fmtL(L)+'</span><span class="c1 l2" id="ssL">'+ringLbl(L,s)+'</span></div>'};
function holdToggle(){
  const s=SS.steps[SS.i];
  if(!SS.holdOn){if(!SS.run)togglePause();SS.holdOn=true;SS.holdT0=Date.now();renderSession();return}
  holdStop();renderSession();
}
function holdStop(){
  const s=SS.steps[SS.i],sec=holdSec();SS.holdOn=false;
  if(sec>=3){const prev=DB.best[s.ex]||0;if(sec>prev){DB.best[s.ex]=sec;save();toast(prev?'¡Nueva marca: '+sec+' s!':'Marca apuntada: '+sec+' s')}else toast(sec+' s')}
}
function minimizeSession(){SS.min=true;$('session').classList.remove('on');patStop();tunerStop();render()}
function expandSession(){if(!SS.on)return;SS.min=false;$('session').classList.add('on');renderSession();renderAcc();keepAwake(true)}
function openSessMenu(){
  openSheet(()=>({title:'Práctica',body:'<div class="pad"><p class="ghead" style="padding-left:16px">Ir a un paso</p><div class="group">'+SS.steps.map((s,i)=>
    '<button class="cell" onclick="jumpStep('+i+')"><span class="exn'+(i<SS.i?' done':'')+'">'+(i<SS.i?ic('check',14,2.8):(i+1))+'</span><div class="cb"><div class="tt"><p class="bd ell">'+esc(s.ex?exName(s.ex):s.bn)+'</p><p class="fn l2">'+s.bn+' · '+mmss(s.sec)+'</p></div>'+(i===SS.i?'<span class="pill tint">Ahora</span>':'')+'</div></button>').join('')+'</div>'+
    '<div class="group" style="margin-top:18px"><button class="cell" onclick="closeSheet();finishSession()"><span class="ic soft">'+ic('check',17,2.6)+'</span><div class="cb"><span class="tt bd">Terminar ahora y valorar</span></div></button>'+
    '<button class="cell" onclick="exitSession()"><span class="ic gray">'+ic('out',17)+'</span><div class="cb"><div class="tt"><p class="bd">Salir y seguir más tarde</p><p class="fn l2">Se queda en '+mmss(practiceSec())+'; hoy sigues desde ahí</p></div></div></button>'+
    '<button class="cell" onclick="confirmSheet(\'Descartar la práctica\',\'Lo que llevas hoy no contará como práctica.\',\'Descartar\',\'closeSheet();quitSession()\',true)"><span class="ic gray">'+ic('trash',17)+'</span><div class="cb"><div class="tt"><p class="bd red">Descartar la práctica</p><p class="fn l2">No contará como práctica</p></div></div></button></div></div>'}));
}
/* salir sin terminar: el reloj se queda quieto y lo practicado se guarda para seguir hoy */
function exitSession(){
  if(SS.run){SS.left=(SS.endAt-Date.now())/1000;SS.run=false}
  sessPersist(true);clearInterval(SS.tIv);patStop();tunerStop();SS.on=false;SS.min=false;
  $('session').classList.remove('on');keepAwake(false);closeSheet();render();renderAcc();toast('Guardada en '+mmss(savedSec(savedSess()))+' · sigue hoy cuando quieras');
}
function quitSession(){clearInterval(SS.tIv);patStop();tunerStop();SS.on=false;SS.min=false;$('session').classList.remove('on');keepAwake(false);PREF.set('sess',null);render()}
function finishSession(){
  if(SS.ph==='step')SS.used[SS.i]=(SS.used[SS.i]||0)+stepElapsed();
  patStop();tunerStop();SS.run=false;SS.ph='rate';PREF.set('sess',null);renderSession();renderAcc();
}
function renderRate(){
  const sec=SS.used.reduce((a,b)=>a+(b||0),0),m=Math.max(1,Math.round(sec/60));
  $('session').innerHTML='<div class="fullin"><div class="fnav"><div style="width:44px"></div><div class="center"><p class="fn semi">Práctica</p><p class="c1 l2 num">'+m+' min</p></div><div style="width:44px"></div></div>'+
    '<h1 class="lt balance" style="margin-top:20px">¿Qué tal ha ido?</h1><p class="sb l2" style="margin-top:6px">Sé sincero con la segunda: es la que más importa.</p>'+
    '<div class="stack" style="margin-top:22px;gap:20px">'+rateBlock('SS')+
    '<div class="field"><label for="ssN">Una línea para tu yo del futuro</label><textarea class="ta" id="ssN" style="min-height:64px" placeholder="Qué ha salido, qué no, qué preguntar en clase…" oninput="SS.note=this.value">'+esc(SS.note)+'</textarea></div></div>'+
    '<div class="foot"><button class="btn pri lg" onclick="saveSession()">Guardar</button></div></div>';
}
function saveSession(){
  const sec=SS.used.reduce((a,b)=>a+(b||0),0);
  const usedB=[...new Set(SS.steps.filter((s,i)=>(SS.used[i]||0)>20).map(s=>s.b))];
  const ex=[...new Set(SS.steps.filter((s,i)=>s.ex&&(SS.used[i]||0)>20).map(s=>s.ex))];
  SS.saved={m:Math.max(1,Math.round(sec/60)),ex:ex.length};
  DB.ss.push({id:uid(),d:T(),ts:Date.now(),m:SS.saved.m,g:true,bl:usedB,song:usedB.includes('rep')?SS.song:'',ex,joy:SS.joy||0,snd:SS.snd||0,note:clean(SS.note,300)});
  save();SS.ph='done';renderSession();
}
function renderDone(){
  const C=constancy(),pw=perWeek(),sv=SS.saved||{m:0,ex:0};
  $('session').innerHTML='<div class="fullin"><div style="display:flex;justify-content:center;margin-top:28px">'+dkStage(SS.joy&&SS.joy<=2?'tired':'cheer',3)+'</div>'+
    '<h1 class="t1 center" style="margin-top:22px">'+(SS.joy>=4?'¡Así se disfruta!':'Práctica completada')+'</h1><p class="sb l2 center" style="margin-top:4px">'+(SS.joy&&SS.joy<=2?'Los días flojos también cuentan. Mañana más.':'Cada día suma, aunque no lo oigas todavía.')+'</p>'+
    '<div class="stack" style="margin-top:22px"><div class="card row" style="gap:0">'+[['Minutos',sv.m,''],['Ejercicios',sv.ex,''],['Esta semana',C.thisWeek,'/'+pw]].map(([l,v,u],i)=>
      '<div class="grow center" style="padding:13px 8px 12px'+(i?';border-left:.5px solid var(--sep)':'')+'"><p class="fn l2">'+l+'</p><p class="t2 num">'+v+'<span class="sb l3 semi">'+u+'</span></p></div>').join('')+'</div>'+
    (C.thisWeek>=C.need?'<div class="card row" style="padding:14px 16px;gap:13px"><span class="ic tint" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center">'+ic('trophy',22)+'</span><div class="grow"><p class="fn ink semi">Semana constante</p><p class="hl">Cuenta para tu cinturón '+(C.next?C.next[1].toLowerCase():'')+'</p></div></div>':'')+
    (recDue()?'<button class="card row" style="padding:14px 16px;gap:13px;width:100%;text-align:left" onclick="openRec(\'prog\')"><span class="ic rec" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center">'+ic('mic',20)+'</span><div class="grow"><p class="hl">Haz la grabación semanal</p><p class="fn l2">Ahora que tienes la voz caliente</p></div>'+chev()+'</button>':'')+
    '</div><div class="foot"><button class="btn pri lg" onclick="closeSession()">Listo</button></div></div>';
}
function closeSession(){clearInterval(SS.tIv);patStop();tunerStop();SS.on=false;SS.min=false;$('session').classList.remove('on');keepAwake(false);PREF.set('sess',null);closeSheet();render()}
function renderAcc(){
  const a=$('acc'),on=SS.on&&SS.min&&started;a.hidden=!on;
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('with-acc',on));
  if(!on)return;
  const s=SS.steps[SS.i],L=SS.ph==='step'?(SS.run?(SS.endAt-Date.now())/1000:SS.left):0,C=2*Math.PI*16.5,pct=SS.ph==='step'?Math.max(0,L)/s.sec:1;
  a.innerHTML='<div class="ring" style="width:40px;height:40px"><svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="16.5" fill="none" stroke="var(--fill)" stroke-width="4"/>'+
    '<circle cx="20" cy="20" r="16.5" fill="none" stroke="'+(SS.ph==='step'?endCol(L):'var(--tint)')+'" stroke-width="4" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+(-C*(1-pct))+'"/></svg><div class="in">'+(SS.ph==='step'?'':ic('check',15))+'</div></div>'+
    '<div class="grow"><p class="fn semi num">'+(SS.ph==='step'?(SS.run?mmss(Math.ceil(Math.max(0,L))):(L<=0?'Paso hecho':(SS.wait?'Sin empezar':'En pausa'))):'Falta valorar')+'</p><p class="c1 l2 ell">'+esc(s?(s.ex?exName(s.ex):s.bn):'Práctica')+'</p></div>'+
    '<span class="btn sec sm" style="height:38px">Abrir</span>';
}

/* tamaño bloqueado, como una app: sin pellizcar para ampliar ni doble toque (Safari ignora user-scalable) */
['gesturestart','gesturechange'].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),{passive:false}));
document.addEventListener('touchmove',e=>{if(e.touches.length>1)e.preventDefault()},{passive:false});
/* ═════ ARRANQUE ═════ */
function showApp(){$('welcome').classList.remove('on');$('tabbar').hidden=false;$('btnMe').hidden=false;$('btnTheme').hidden=false;applyTheme()}
function startApp(){
  started=true;load();applyLook();
  if(!DB.plan&&goalsOf().length)DB.plan=proposePlan(goalsOf(),DB.profile.lvl,DB.cfg.mins);
  if(!(DB.profile&&DB.profile.done)){openOnb();return}
  showApp();go('hoy');
  const st=PREF.get('sess',null);
  if(st&&st.d===T()&&!st.out){restoreSess(st,false);render()}
}
function boot(){
  applyTheme();
  if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))navigator.serviceWorker.register('sw.js').catch(()=>{});
  document.addEventListener('visibilitychange',()=>{
    if(!started)return;
    if(document.visibilityState==='visible'){if(SS.on&&!SS.min)keepAwake(true);if(SS.on)tick();if(T()!==curDate)render()}
    else{patStop();if(SS.on&&SS.ph==='step')sessPersist()}
  });
  if(S.get(KEY+'_mode')==='local')startApp();else showWelcome();
}
boot();
