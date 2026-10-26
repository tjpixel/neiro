/* Neiro · sonido: piano de referencia, patrones que suben solos, grabadora y afinador.
   En iOS esto será AVAudioEngine (piano y afinador) y AVAudioRecorder. */
'use strict';

/* ═════ CONTEXTO ═════ */
let AC=null;
function ac(){
  try{if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(C)AC=new C()}if(AC&&AC.state==='suspended')AC.resume()}catch(e){}
  return AC;
}
document.addEventListener('pointerdown',()=>ac(),{passive:true});

/* ═════ PIANO ═════
   Dos sonidos (Tú → Piano de referencia):
   · suave: nota sostenida, igual de fuerte mientras dura. Es la más fácil de seguir al empezar,
     porque no se apaga mientras cantas encima.
   · piano: piano con más armónicos que antes, para que las notas graves se oigan bien en el altavoz del móvil.
   Velocidad: tranquila (un 30 % más lenta, con la nota de inicio sola antes del patrón) o normal. */
let MASTER=null,ROUTE=null;
function master(){const c=ac();if(!c)return null;if(!MASTER){MASTER=c.createGain();MASTER.gain.value=.9;MASTER.connect(c.destination)}return MASTER}
/* el patrón suena por su propio canal: así, al parar o pausar, se apaga al momento lo que ya estaba programado */
const out_=()=>ROUTE||master();
/* ajustes del piano; si no hay nada elegido: suave y tranquila para quien está empezando, piano y normal para el resto */
function pianoCfg(){
  const c=(typeof DB!=='undefined'&&DB.cfg&&DB.cfg.pno)||{},ini=typeof DB==='undefined'||!DB.profile||!DB.profile.lvl||DB.profile.lvl==='ini';
  return{snd:c.snd||(ini?'suave':'piano'),vel:c.vel||(ini?'tranq':'normal'),view:c.view==='tec'?'tec':'esc'};
}
const VEL={tranq:.7,normal:1};
/* armónicos del piano: más presencia en graves (el altavoz del móvil casi no da la fundamental por debajo de 200 Hz) */
const PIANO_H=[1,.62,.4,.26,.17,.11,.07,.045];
function pianoNote(m,t,dur,vol,snd){
  const c=ac(),out=out_();if(!c||!out)return;
  snd=snd||pianoCfg().snd;
  const f=hzOf(m),v=(vol||.26),end=t+Math.max(.15,dur);
  const g=c.createGain(),lp=c.createBiquadFilter();lp.type='lowpass';lp.Q.value=.5;
  lp.connect(g);g.connect(out);
  if(snd==='suave'){
    /* nota sostenida: entrada suave, se mantiene y se suelta al final, sin vibrato (para que la altura sea clara) */
    lp.frequency.value=Math.min(5000,f*7);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v*1.05,t+.045);
    g.gain.setValueAtTime(v*1.05,end-.03);g.gain.linearRampToValueAtTime(v*.9,end);g.gain.linearRampToValueAtTime(0,end+.14);
    /* en graves, más armónicos: es lo que el altavoz del móvil sí reproduce */
    const lowB=f<260?1.5:1;
    [[1,'triangle',.9],[2,'sine',.5*lowB],[3,'sine',.3*lowB],[4,'sine',.16*lowB],[5,'sine',.08*lowB]].forEach(([k,ty,a])=>{
      const o=c.createOscillator(),gg=c.createGain();o.type=ty;o.frequency.value=f*k;gg.gain.value=a*.72;o.connect(gg);gg.connect(lp);o.start(t);o.stop(end+.2);
    });
    return;
  }
  /* piano: golpe corto, caída lenta mientras dura la nota y apagado al soltar */
  lp.frequency.setValueAtTime(Math.min(9000,f*12),t);lp.frequency.exponentialRampToValueAtTime(Math.min(6000,f*6),t+.6);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v*.62,t+.008);
  g.gain.exponentialRampToValueAtTime(v*.36,t+.18);g.gain.setTargetAtTime(v*.12,t+.18,1.1);
  g.gain.setTargetAtTime(.0001,end,.12);
  PIANO_H.forEach((a,i)=>{
    const k=i+1;if(f*k>12000)return;
    const o=c.createOscillator(),gg=c.createGain();o.type='sine';o.frequency.value=f*k*Math.sqrt(1+.0003*k*k);
    gg.gain.value=a;o.connect(gg);gg.connect(lp);o.start(t);o.stop(end+.7);
  });
}
function glideNote(m1,m2,t,dur){
  const c=ac(),out=out_();if(!c||!out)return;
  const g=c.createGain(),lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=Math.min(5000,hzOf(Math.max(m1,m2))*5);
  lp.connect(g);g.connect(out);
  [[1,'triangle',1],[2,'sine',.38],[3,'sine',.16]].forEach(([k,ty,a])=>{
    const o=c.createOscillator(),gg=c.createGain();o.type=ty;
    o.frequency.setValueAtTime(hzOf(m1)*k,t);o.frequency.exponentialRampToValueAtTime(hzOf(m2)*k,t+dur);
    gg.gain.value=a;o.connect(gg);gg.connect(lp);o.start(t);o.stop(t+dur+.15);
  });
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.2,t+.05);g.gain.setValueAtTime(.2,t+dur-.05);g.gain.linearRampToValueAtTime(0,t+dur+.1);
}
function tone(m,dur){const c=ac();if(!c)return;pianoNote(m,c.currentTime+.02,dur||1.4)}
/* acorde de la tónica: en voces graves el bajo una octava abajo se quita, porque emborrona */
function chord(m,t,dur){[0,4,7].forEach(k=>pianoNote(m+k,t,dur,.12));if(m>=48)pianoNote(m-12,t,dur,.1)}
function ding(){
  const c=ac();if(c){[0,.18,.36].forEach(d=>pianoNote(88,c.currentTime+d,.18,.16,'piano'))}
  if(navigator.vibrate)navigator.vibrate([180,90,180]);
}

/* ═════ PATRÓN ═════
   Toca el acorde de la tónica, después el patrón, y vuelve a empezar medio tono más arriba.
   En velocidad tranquila, entre el acorde y el patrón suena sola la nota de inicio.
   Al llegar al límite de tu rango, baja.
   Una vuelta es un plan con sus tiempos: el piano lo toca y la escalera lo dibuja con los mismos tiempos. */
function patPlan(e){
  const pc=pianoCfg(),k=VEL[pc.vel]||1,calm=pc.vel==='tranq';
  /* las sirenas ya son lentas: en tranquila solo se frenan un poco */
  const b=60/((e.bpm||100)*(e.glide?Math.max(k,.85):k));
  const pl={glide:!!e.glide,chord:calm?1.1:.8,cd:calm?1.5:1.1,pre:null,it:[],tail:calm?.5:0};
  let t=pl.cd;
  if(calm&&!e.glide&&!e.hold){pl.pre={k:e.pat[0],t,len:.9,d:1.3};t+=1.3}
  pl.tp=t;let u=0;
  if(e.glide){for(let i=1;i<e.pat.length;i++){pl.it.push({k0:e.pat[i-1],k1:e.pat[i],t:u,d:b*2,len:b*2});u+=b*2}}
  else e.pat.forEach((s,i)=>{const h=e.hold&&i===0,d=h?e.hold:b,len=h?e.hold:(e.stac?b*.35:b*.95);pl.it.push({k:s,t:u,d,len});u+=d});
  pl.D=u;return pl;
}
/* toca una vuelta y devuelve cuánto dura en segundos; la deja en PAT.round para la escalera */
function playPattern(e,tonic,t0){
  const c=ac();if(!c||!e.pat)return 0;
  const pl=patPlan(e),base=t0||c.currentTime,s=base+.05;
  chord(tonic,s,pl.chord);
  if(pl.pre)pianoNote(tonic+pl.pre.k,s+pl.pre.t,pl.pre.len);
  pl.it.forEach(n=>{if(pl.glide)glideNote(tonic+n.k0,tonic+n.k1,s+pl.tp+n.t,n.d);else pianoNote(tonic+n.k,s+pl.tp+n.t,n.len)});
  PAT.round={tonic,s,pl};
  return s+pl.tp+pl.D-base+pl.tail;
}
/* techo del patrón: lo más agudo de tu rango menos un semitono, o tu «nota más aguda cómoda» del ejercicio */
function patTop(e){const r=myRange();return Math.min(r.hi-1,midiOf(DB.extop[(e&&e.id)||'']||'')||99)}
const PAT={on:false,e:null,tonic:48,dir:1,timer:null,cb:null,bus:null,round:null};
/* dir: 1 sube, -1 baja (al seguir tras una pausa, continúa en el sentido en que iba) */
function patStart(e,tonic,cb,dir){
  patStop();if(!e||!e.pat)return;
  const c=ac(),m=master();
  if(c&&m){PAT.bus=c.createGain();PAT.bus.gain.value=1;PAT.bus.connect(m)}
  PAT.on=true;PAT.e=e;PAT.tonic=tonic;PAT.dir=dir<0?-1:1;PAT.cb=cb||null;patLoop();
}
function patLoop(){
  if(!PAT.on)return;
  ROUTE=PAT.bus;const len=playPattern(PAT.e,PAT.tonic);ROUTE=null;
  if(PAT.cb)PAT.cb(PAT.tonic);
  PAT.timer=setTimeout(()=>{
    if(!PAT.on)return;
    const r=myRange(),hiK=Math.max(...PAT.e.pat),loK=Math.min(...PAT.e.pat),top=patTop(PAT.e);
    if(PAT.dir>0&&PAT.tonic+1+hiK>top)PAT.dir=-1;
    if(PAT.dir<0&&PAT.tonic-1+loK<r.lo)PAT.dir=1;
    PAT.tonic+=PAT.dir;patLoop();
  },(len+.5)*1000);
}
function patStop(){
  PAT.on=false;PAT.round=null;clearTimeout(PAT.timer);PAT.timer=null;
  const b=PAT.bus,c=AC;PAT.bus=null;
  if(b&&c){try{const t=c.currentTime;b.gain.cancelScheduledValues(t);b.gain.setValueAtTime(b.gain.value,t);b.gain.linearRampToValueAtTime(0,t+.04);setTimeout(()=>{try{b.disconnect()}catch(e){}},120)}catch(e){}}
  if(PAT.cb)PAT.cb(PAT.tonic);
}
function patShift(d){PAT.tonic=Math.max(36,Math.min(84,PAT.tonic+d));return PAT.tonic}

/* ═════ GRABADORA ═════ */
const REC={mr:null,stream:null,chunks:[],t0:0,blob:null,dur:0,an:null,src:null,raf:0,lvlEl:null};
function recType(){
  if(!window.MediaRecorder)return null;
  for(const t of ['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus']){try{if(MediaRecorder.isTypeSupported(t))return t}catch(e){}}
  return '';
}
const recSupported=()=>recType()!==null&&!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia);
async function micStream(){
  if(!window.isSecureContext||!navigator.mediaDevices)throw new Error('insecure');
  return navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
}
async function recStart(bitrate,onStop,onLevel){
  const stream=await micStream(),t=recType();
  REC.stream=stream;REC.chunks=[];REC.blob=null;
  try{REC.mr=new MediaRecorder(stream,t?{mimeType:t,audioBitsPerSecond:bitrate||96000}:undefined)}catch(e){REC.mr=new MediaRecorder(stream)}
  REC.mr.ondataavailable=ev=>{if(ev.data&&ev.data.size)REC.chunks.push(ev.data)};
  REC.mr.onstop=()=>{REC.dur=(Date.now()-REC.t0)/1000;REC.blob=new Blob(REC.chunks,{type:(REC.mr&&REC.mr.mimeType)||t||'audio/webm'});recRelease();onStop&&onStop()};
  REC.mr.start(1000);REC.t0=Date.now();
  try{const c=ac();REC.src=c.createMediaStreamSource(stream);REC.an=c.createAnalyser();REC.an.fftSize=512;REC.src.connect(REC.an);
    const buf=new Uint8Array(REC.an.fftSize);
    const loop=()=>{if(!REC.an)return;REC.an.getByteTimeDomainData(buf);let pk=0;for(const v of buf)pk=Math.max(pk,Math.abs(v-128));onLevel&&onLevel(Math.min(1,pk/128*1.6));REC.raf=requestAnimationFrame(loop)};loop();
  }catch(e){}
}
const recOn=()=>!!(REC.mr&&REC.mr.state==='recording');
function recStop(){if(recOn())REC.mr.stop()}
function recCancel(){if(REC.mr){REC.mr.onstop=null;if(REC.mr.state==='recording')REC.mr.stop()}REC.mr=null;recRelease();REC.blob=null}
function recRelease(){
  cancelAnimationFrame(REC.raf);try{REC.src&&REC.src.disconnect()}catch(e){}REC.src=null;REC.an=null;
  if(REC.stream)REC.stream.getTracks().forEach(t=>t.stop());REC.stream=null;
}

/* ═════ AFINADOR ═════
   Detecta la nota cantada con el método de McLeod (autocorrelación normalizada). */
const TUN={on:false,stream:null,an:null,src:null,buf:null,iv:null,cb:null,hist:[]};
async function tunerStart(cb){
  tunerStop();
  const stream=await micStream(),c=ac();
  TUN.stream=stream;TUN.src=c.createMediaStreamSource(stream);TUN.an=c.createAnalyser();TUN.an.fftSize=2048;
  TUN.src.connect(TUN.an);TUN.buf=new Float32Array(TUN.an.fftSize);TUN.cb=cb;TUN.on=true;TUN.hist=[];
  TUN.iv=setInterval(()=>{
    if(!TUN.on)return;
    TUN.an.getFloatTimeDomainData(TUN.buf);
    const f=detectPitch(TUN.buf,c.sampleRate);
    const now=Date.now();
    if(f){const m=midiOfHz(f);TUN.hist.push({t:now,m});}
    TUN.hist=TUN.hist.filter(x=>now-x.t<1200);
    TUN.cb&&TUN.cb(f?{hz:f,m:midiOfHz(f)}:null,tunerStable());
  },50);
}
function tunerStop(){
  TUN.on=false;clearInterval(TUN.iv);TUN.iv=null;
  try{TUN.src&&TUN.src.disconnect()}catch(e){}
  if(TUN.stream)TUN.stream.getTracks().forEach(t=>t.stop());
  TUN.stream=null;TUN.src=null;TUN.an=null;
}
/* nota mantenida: al menos 14 lecturas en el último segundo y poca variación */
function tunerStable(){
  const h=TUN.hist;if(h.length<14)return null;
  const ms=h.map(x=>x.m).sort((a,b)=>a-b),med=ms[Math.floor(ms.length/2)];
  const near=ms.filter(m=>Math.abs(m-med)<.6);
  return near.length>=h.length*.8?Math.round(med):null;
}
function detectPitch(x,sr){
  const n=x.length;let rms=0;for(let i=0;i<n;i++)rms+=x[i]*x[i];rms=Math.sqrt(rms/n);
  if(rms<.012)return null;
  const minLag=Math.floor(sr/1100),maxLag=Math.min(n-2,Math.floor(sr/65)),W=n-maxLag;
  const nsdf=new Float32Array(maxLag+2);
  for(let tau=minLag;tau<=maxLag+1;tau++){
    let ac=0,m=0;for(let i=0;i<W;i++){const a=x[i],b=x[i+tau];ac+=a*b;m+=a*a+b*b}
    nsdf[tau]=m>0?2*ac/m:0;
  }
  /* picos positivos entre cruces por cero; el primero que llegue al 90 % del mayor */
  const peaks=[];let pos=false,best=-1,bi=-1;
  for(let t=minLag+1;t<=maxLag;t++){
    if(nsdf[t]>0&&nsdf[t-1]<=0){pos=true;best=-1;bi=-1}
    if(pos&&nsdf[t]>best){best=nsdf[t];bi=t}
    if(pos&&nsdf[t]<=0&&nsdf[t-1]>0){pos=false;if(bi>0)peaks.push([bi,best])}
  }
  if(!peaks.length)return null;
  const mx=Math.max(...peaks.map(p=>p[1]));if(mx<.6)return null;
  const p=peaks.find(q=>q[1]>=mx*.9);let t=p[0];
  const a=nsdf[t-1],b=nsdf[t],c2=nsdf[t+1],den=a-2*b+c2;if(den)t+=.5*(a-c2)/den;
  const f=sr/t;return f>=65&&f<=1100?f:null;
}

/* ═════ REPRODUCIR GRABACIONES ═════ */
const AURL={};
async function audioURL(id){if(AURL[id])return AURL[id];const b=await IDB.get(id);if(!b)return null;AURL[id]=URL.createObjectURL(b);return AURL[id]}
