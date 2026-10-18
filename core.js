/* Neiro · lógica de la app: fechas, notas, catálogo de ejercicios, plan de práctica y constancia.
   No toca la interfaz. Está escrita para pasarse casi 1:1 a Swift en la app de iOS. */
'use strict';

/* ═════ FECHAS ═════ */
const WDL=['D','L','M','X','J','V','S'];
const MES3=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const dstr=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const T=()=>dstr(new Date());
const shiftD=(s,n)=>{const d=new Date(s+'T00:00:00');d.setDate(d.getDate()+n);return dstr(d)};
const wdOf=s=>new Date(s+'T00:00:00').getDay();
const daysBetween=(a,b)=>Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/864e5);
const mondayOf=d=>{const x=new Date(d+'T00:00:00');x.setDate(x.getDate()-((x.getDay()+6)%7));return dstr(x)};
const weekDates=()=>{const m=mondayOf(T());return Array.from({length:7},(_,i)=>shiftD(m,i))};
const fmtD=s=>{const d=new Date(s+'T00:00:00');return d.getDate()+' '+MES3[d.getMonth()]};
const fmtDY=s=>{const d=new Date(s+'T00:00:00');return d.getDate()+' '+MES3[d.getMonth()]+(d.getFullYear()!==new Date().getFullYear()?' '+d.getFullYear():'')};
const isDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s);
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);

/* ═════ NOTAS ═════
   Nomenclatura española con Do3 = Do central (MIDI 60), la misma que usa la profe. */
const NN=['Do','Do#','Re','Re#','Mi','Fa','Fa#','Sol','Sol#','La','La#','Si'];
const noteName=m=>NN[((m%12)+12)%12]+(Math.floor(m/12)-2);
const midiOf=n=>{const r=/^(Do#?|Re#?|Mi|Fa#?|Sol#?|La#?|Si)(-?\d)$/.exec(String(n||''));return r?(+r[2]+2)*12+NN.indexOf(r[1]):null};
const NOTES=[];for(let m=36;m<=84;m++)NOTES.push(m);
const hzOf=m=>440*Math.pow(2,(m-69)/12);
const midiOfHz=f=>69+12*Math.log2(f/440);

/* tesituras orientativas (para empezar; el afinador las sustituye por tu rango real) */
const VOICES={
  grave:{n:'Grave',s:'Bajo o barítono',lo:43,hi:64},
  media:{n:'Media',s:'Tenor o contralto',lo:48,hi:69},
  aguda:{n:'Aguda',s:'Mezzo o soprano',lo:55,hi:76},
  nose:{n:'No lo sé',s:'Lo medimos luego con el afinador',lo:48,hi:67}
};

/* ═════ PERFIL ═════ */
const GOALS={
  disfrutar:{n:'Disfrutar cantando',s:'Cantar más y con más ganas'},
  cancion:{n:'Preparar canciones',s:'Un repertorio, una audición, un concierto'},
  tecnica:{n:'Mejorar la técnica',s:'Rango, apoyo y control'},
  afinar:{n:'Afinar mejor',s:'Entrenar el oído'},
  grupo:{n:'Cantar en grupo',s:'Coro, banda o con amigos'}
};
const LEVELS={
  ini:{n:'Estoy empezando',s:'Nunca he dado clases de canto'},
  med:{n:'Algo de experiencia',s:'He cantado o dado algunas clases'},
  av:{n:'Llevo años',s:'Canto con regularidad'}
};
const LVN={ini:0,med:1,av:2};
const MINS=[10,15,20,30,45];
/* minutos por bloque: calentamiento, técnica, canción, por gusto, enfriamiento */
const MINS_BL={10:[2,3,3,2,0],15:[3,4,5,3,0],20:[3,6,6,4,1],30:[4,9,10,5,2],45:[5,13,16,8,3]};

/* ═════ CATÁLOGO ═════
   pat: notas del patrón en semitonos desde la tónica (lo que toca el piano de referencia)
   mode: breath (guía de respiración) · hold (cronómetro de aguante) · tuner (afinador)
   lv: nivel mínimo recomendado (0 empezando, 1 algo, 2 años) */
const CATS=[['cal','Calentamiento'],['res','Respiración'],['tec','Técnica'],['oido','Oído'],['enf','Enfriamiento']];
const CATN=Object.fromEntries(CATS);
const EXC={
  labios:{n:'Vibración de labios',c:'cal',lv:0,pat:[0,2,4,5,7,5,4,2,0],bpm:132,
    how:'Labios sueltos vibrando («brrr») mientras sigues el piano. Cuello y mandíbula relajados. Si los labios se paran, apoya dos dedos en las mejillas.'},
  humming:{n:'Humming',c:'cal',lv:0,pat:[0,4,7,4,0],bpm:100,
    how:'Boca cerrada, «mmm», como si te gustara algo. Busca la vibración en labios y nariz, no en la garganta.'},
  sirena:{n:'Sirenas',c:'cal',lv:0,pat:[0,12,0],glide:1,bpm:50,
    how:'Desliza la voz de grave a agudo y vuelta, sin cortes, con «u» o con los labios vibrando. Lo importante es que no haya saltos bruscos.'},
  bostezo:{n:'Bostezo-suspiro',c:'cal',lv:0,
    how:'Bosteza con la boca abierta y suelta el aire con un suspiro sonoro de agudo a grave. Abre la garganta y quita tensión. Repite sin prisa.'},
  resp448:{n:'Respiración 4 · 4 · 8',c:'res',lv:0,mode:'breath',
    how:'Inhala por la nariz en 4 tiempos llevando el aire abajo (costillas y abdomen, sin subir los hombros), sostén 4 y suelta en 8 con una «s» suave.'},
  siseo:{n:'Siseo sostenido',c:'res',lv:0,mode:'hold',
    how:'Coge aire sin subir los hombros y suelta una «sss» constante, sin empujar. Para cuando el sonido empiece a temblar. Apunta tu marca y supérala poco a poco.'},
  escala5:{n:'Escala de 5 notas',c:'tec',lv:0,pat:[0,2,4,5,7,5,4,2,0],bpm:120,
    how:'Do–Re–Mi–Fa–Sol y vuelta, con «a» o «u». Notas unidas (legato), mismo volumen arriba y abajo.'},
  arp1358:{n:'Arpegio 1 · 3 · 5 · 8',c:'tec',lv:1,pat:[0,4,7,12,7,4,0],bpm:112,
    how:'Saltos del acorde hasta la octava y vuelta. Piensa la nota aguda «encima» y no la empujes: deja que la coja el aire.'},
  arp7:{n:'Arpegio de séptima',c:'tec',lv:1,pat:[0,4,7,11,11,7,4,0],bpm:100,
    how:'Grados I–III–V–VII–VII–V–III–I. Primero dí los números mientras suena el piano; luego cántalo con «brrr», «mmg» y «rr». Sube medio tono cada vez.'},
  ngah:{n:'Ng → ah',c:'tec',lv:1,pat:[0,4,7,4,0],bpm:100,
    how:'Empieza en «ng» (como el final de «tengo» sin la o) y abre a «ah» sin perder la resonancia de delante.'},
  octava:{n:'Saltos de octava',c:'tec',lv:1,pat:[0,12,0],bpm:72,
    how:'Salta a la octava sin «tirar» de la nota y vuelve unido. Si se rompe la voz, baja la tónica.'},
  staccato:{n:'Staccato «ja»',c:'tec',lv:1,pat:[0,4,7,4,0],stac:1,bpm:120,
    how:'Notas cortas y separadas con «ja», con un pequeño impulso del abdomen en cada una. Ligero, sin golpear la garganta.'},
  messa:{n:'Messa di voce',c:'tec',lv:2,pat:[0],hold:6,bpm:60,
    how:'Una nota larga: empieza suave, crece y vuelve a suave sin cambiar de color ni de afinación.'},
  belt:{n:'Belt corto',c:'tec',lv:2,pat:[0,2,4,2,0],bpm:110,
    how:'Cuatro emisiones cortas, potentes y apoyadas; después la escala dos veces con la misma colocación. Siempre con la voz caliente. Si notas picor o tensión, para y baja un tono.'},
  refnota:{n:'Afinar una nota',c:'oido',lv:0,mode:'tuner',
    how:'Escucha la nota del piano y cántala con «a». El afinador te dice si vas alto o bajo. Mantén la aguja en el centro dos o tres segundos.'},
  intervalos:{n:'Terceras y quintas',c:'oido',lv:0,pat:[0,4,0,7,0],bpm:80,
    how:'Escucha el patrón una vez y después cántalo encima. Di el número de cada grado mientras lo cantas: conecta el sonido con su nombre.'},
  saltos:{n:'Escala y saltos',c:'oido',lv:1,pat:[0,4,7,9,7,4,0],bpm:96,
    how:'Grados I–III–V–VI y vuelta. Cuando salga limpio con el piano, escucha solo la tónica y cántalo sin ayuda.'},
  enfriar:{n:'Sirenas descendentes',c:'enf',lv:0,pat:[12,0],glide:1,bpm:40,
    how:'Sirenas descendentes muy suaves con «u» o labios. Baja la intensidad: la voz debe quedar cómoda, no cansada.'}
};
const exBase=id=>EXC[id]||(DB.cex||{})[id]||null;
const exName=id=>{const e=exBase(id);return e?e.n:id};
const exMinutes=e=>e.mode==='breath'?2:3;

/* objetivos del perfil (hasta 3); las copias antiguas guardaban uno solo en «goal» */
const goalsOf=p=>{p=p||DB.profile||{};const g=Array.isArray(p.goals)?p.goals:(p.goal?[p.goal]:[]);return g.filter(k=>GOALS[k]).slice(0,3)};
const MAX_GOALS=3;

/* plan propuesto según objetivos, nivel y minutos */
function proposePlan(goals,lvl,mins){
  if(!Array.isArray(goals))goals=goals?[goals]:[];
  const has=k=>goals.includes(k);
  const L=LVN[lvl]||0,ids=['labios','humming'];
  if(L===0)ids.push('resp448');else ids.push('sirena');
  if(L===0)ids.push('escala5');
  if(L===1)ids.push('arp1358','escala5');
  if(L===2)ids.push('arp7','octava');
  if(has('tecnica'))ids.push(L>=2?'messa':(L>=1?'staccato':'siseo'));
  if(has('afinar'))ids.push('intervalos','refnota');
  if(has('grupo'))ids.push('intervalos','saltos');
  if(!has('afinar')&&!has('grupo')&&L===0)ids.push('refnota');
  if(mins>=20)ids.push('enfriar');
  const uniq=[...new Set(ids)];
  /* con poco tiempo, o si lo importante son las canciones o disfrutar, menos ejercicios de técnica */
  const maxTec=mins<=10?2:((has('cancion')||has('disfrutar'))&&!has('tecnica')&&!has('afinar')&&!has('grupo')?2:9);
  const tec=uniq.filter(id=>['tec','oido'].includes(EXC[id].c));
  tec.slice(maxTec).forEach(id=>uniq.splice(uniq.indexOf(id),1));
  return{ex:uniq,src:'auto'};
}
/* minutos por bloque según los objetivos: cada objetivo se lleva minutos hacia su bloque
   (técnica, canción o por gusto), quitándolos de los otros sin bajar de 2 min. El total no cambia. */
const GOAL_BLOCK={tecnica:1,afinar:1,grupo:1,cancion:2,disfrutar:3};
function goalMins(goals,mins){
  const b=(MINS_BL[mins]||MINS_BL[20]).slice(),tg=[...new Set((goals||[]).map(g=>GOAL_BLOCK[g]).filter(x=>x!=null))];
  if(!tg.length||tg.length===3)return b;
  const per=Math.max(1,Math.round(mins*.15));
  tg.forEach(t=>{for(let k=0;k<per;k++){
    const donors=[1,2,3].filter(i=>!tg.includes(i)&&b[i]>2).sort((x,y)=>b[y]-b[x]);
    if(!donors.length)break;b[donors[0]]--;b[t]++;
  }});
  return b;
}

/* ═════ BLOQUES DE LA PRÁCTICA ═════ */
const BLOCKS=[
  {k:'cal',n:'Calentamiento',cats:['cal','res'],d:'Voz suave para despertar. Sin forzar nada.'},
  {k:'tec',n:'Técnica',cats:['tec','oido'],d:'El trabajo de la semana. Despacio y bien antes que rápido.'},
  {k:'rep',n:'Canción',cats:[],d:'Primero la frase difícil, aislada. Después, la canción entera.'},
  {k:'gus',n:'Cantar por gusto',cats:[],d:'Algo que te apetezca, sin corregirte. Este rato es solo para disfrutar.'},
  {k:'enf',n:'Enfriamiento',cats:['enf'],d:'Bajar la intensidad para que la voz quede cómoda.'}
];
const planEx=()=>((DB.plan&&DB.plan.ex)||[]).filter(id=>exBase(id));
const exOfBlock=b=>planEx().filter(id=>b.cats.includes(exBase(id).c));
/* minutos de cada bloque; si no hay ejercicios de enfriamiento, ese rato pasa a «por gusto» */
function blockMins(){
  const bl=(DB.cfg.bl&&DB.cfg.bl.length===5?DB.cfg.bl:goalMins(goalsOf(),DB.cfg.mins)).slice();
  if(!exOfBlock(BLOCKS[4]).length){bl[3]+=bl[4];bl[4]=0}
  return bl;
}
function practiceBlocks(){
  const bm=blockMins();
  return BLOCKS.map((b,i)=>Object.assign({},b,{min:bm[i],ex:b.cats.length?exOfBlock(b):[]})).filter(b=>b.min>0&&(b.cats.length===0||b.ex.length||b.k==='cal'));
}
const practiceMinutes=()=>practiceBlocks().reduce((a,b)=>a+b.min,0);

/* ═════ PRÁCTICAS Y CONSTANCIA ═════ */
const minsByDay=()=>{const m={};(DB.ss||[]).forEach(s=>{if(isDate(s.d))m[s.d]=(m[s.d]||0)+(s.m||0)});return m};
const practicedOn=d=>(minsByDay()[d]||0)>=5||(DB.ss||[]).some(s=>s.d===d&&s.g);
const isPracticeDay=d=>(DB.cfg.avail||[]).includes(wdOf(d));
const perWeek=()=>Math.max(1,(DB.cfg.avail||[]).length||3);
function weekCounts(){const by={};[...new Set((DB.ss||[]).map(s=>s.d).filter(isDate))].forEach(d=>{if(!practicedOn(d))return;const w=mondayOf(d);by[w]=(by[w]||0)+1});return by}
const BELT_STEPS=[['blanco','Blanco',0],['amarillo','Amarillo',4],['naranja','Naranja',12],['verde','Verde',24],['azul','Azul',40],['marrón','Marrón',60],['negro','Negro',90]];
function constancy(){
  const by=weekCounts(),need=Math.max(1,Math.ceil(perWeek()*.75)),thisW=mondayOf(T());
  const good=Object.keys(by).filter(w=>by[w]>=need);
  let streak=0,w=(by[thisW]||0)>=need?thisW:shiftD(thisW,-7);
  while((by[w]||0)>=need){streak++;w=shiftD(w,-7)}
  const n=good.length;let i=0;BELT_STEPS.forEach((b,k)=>{if(n>=b[2])i=k});
  return{n,streak,need,belt:BELT_STEPS[i],next:BELT_STEPS[i+1]||null,thisWeek:by[thisW]||0};
}
function nextPracticeDay(){for(let i=1;i<=7;i++){const d=shiftD(T(),i);if(isPracticeDay(d))return d}return null}
const lastClass=()=>(DB.classes||[]).slice().sort((a,b)=>b.d.localeCompare(a.d))[0]||null;
const lastRec=()=>(DB.recs||[]).map(r=>r.d).sort().pop()||null;
const recDue=()=>{const l=lastRec();return !l||daysBetween(l,T())>=7};
function myRange(){
  const R=(DB.range||[]).slice().sort((a,b)=>a.d.localeCompare(b.d)).pop();
  if(R&&midiOf(R.l)!=null&&midiOf(R.h)!=null)return{lo:midiOf(R.l),hi:midiOf(R.h),measured:true};
  const v=VOICES[DB.profile.voice]||VOICES.nose;return{lo:v.lo,hi:v.hi,measured:false};
}
/* tónica de partida de un patrón: un par de semitonos por encima de lo más grave cómodo */
function startTonic(e){
  const r=myRange(),pat=e.pat||[0],lo=Math.min(...pat);
  return Math.max(36,r.lo+2-lo);
}
function quarter(d){
  const x=new Date(d+'T00:00:00'),q=Math.floor(x.getMonth()/3);
  return{k:x.getFullYear()+'-T'+(q+1),n:'T'+(q+1)+' '+x.getFullYear(),st:dstr(new Date(x.getFullYear(),q*3,1)),en:dstr(new Date(x.getFullYear(),q*3+3,0))};
}
const STAT=['aprendiendo','pulida','dominada'];
