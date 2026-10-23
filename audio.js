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

/* ═════ PIANO ═════ un tono de piano sencillo: tres parciales con caída */
let MASTER=null,ROUTE=null;
function master(){const c=ac();if(!c)return null;if(!MASTER){MASTER=c.createGain();MASTER.gain.value=.9;MASTER.connect(c.destination)}return MASTER}
/* el patrón suena por su propio canal: así, al parar o pausar, se apaga al momento lo que ya estaba programado */
const out_=()=>ROUTE||master();
function pianoNote(m,t,dur,vol){
  const c=ac(),out=out_();if(!c||!out)return;
  const f=hzOf(m),g=c.createGain(),v=vol||.26,end=t+Math.max(.15,dur);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.012);
  g.gain.exponentialRampToValueAtTime(v*.45,t+.25);g.gain.exponentialRampToValueAtTime(.0008,end+.35);
  g.connect(out);
  [[1,'triangle',1],[2,'sine',.32],[3,'sine',.1],[4,'sine',.04]].forEach(([k,ty,a])=>{
    const o=c.createOscillator(),gg=c.createGain();o.type=ty;o.frequency.value=f*k;gg.gain.value=a;o.connect(gg);gg.connect(g);o.start(t);o.stop(end+.4);
  });
}
function glideNote(m1,m2,t,dur){
  const c=ac(),out=out_();if(!c||!out)return;
  const g=c.createGain(),o=c.createOscillator();o.type='triangle';
  o.frequency.setValueAtTime(hzOf(m1),t);o.frequency.exponentialRampToValueAtTime(hzOf(m2),t+dur);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.2,t+.05);g.gain.setValueAtTime(.2,t+dur-.05);g.gain.linearRampToValueAtTime(0,t+dur+.1);
  o.connect(g);g.connect(out);o.start(t);o.stop(t+dur+.15);
}
function tone(m,dur){const c=ac();if(!c)return;pianoNote(m,c.currentTime+.02,dur||1.4)}
function chord(m,t,dur){[0,4,7].forEach(k=>pianoNote(m+k,t,dur,.13));pianoNote(m-12,t,dur,.12)}
function ding(){
  const c=ac();if(c){[0,.18,.36].forEach(d=>pianoNote(88,c.currentTime+d,.18,.16))}
  if(navigator.vibrate)navigator.vibrate([180,90,180]);
}

/* ═════ PATRÓN ═════
   Toca el acorde de la tónica, después el patrón, y vuelve a empezar medio tono más arriba.
   Al llegar al límite de tu rango, baja. Devuelve la duración de una pasada en segundos. */
function patternLength(e){const b=60/(e.bpm||100);return 1.1+(e.glide?(e.pat.length-1)*b*2:e.pat.length*b)+(e.hold?e.hold:0)+.9}
function playPattern(e,tonic,t0){
  const c=ac();if(!c||!e.pat)return 0;
  let t=(t0||c.currentTime)+.05;const b=60/(e.bpm||100);
  chord(tonic,t,.8);t+=1.1;
  if(e.glide){for(let i=1;i<e.pat.length;i++){glideNote(tonic+e.pat[i-1],tonic+e.pat[i],t,b*2);t+=b*2}}
  else e.pat.forEach((k,i)=>{const len=e.hold&&i===0?e.hold:(e.stac?b*.35:b*.95);pianoNote(tonic+k,t,len);t+=e.hold&&i===0?e.hold:b});
  return t-(t0||c.currentTime);
}
const PAT={on:false,e:null,tonic:48,dir:1,timer:null,cb:null,bus:null};
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
    const r=myRange(),hiK=Math.max(...PAT.e.pat),loK=Math.min(...PAT.e.pat);
    const top=Math.min(r.hi-1,midiOf(DB.extop[PAT.e.id||'']||'')||99);
    if(PAT.dir>0&&PAT.tonic+1+hiK>top)PAT.dir=-1;
    if(PAT.dir<0&&PAT.tonic-1+loK<r.lo)PAT.dir=1;
    PAT.tonic+=PAT.dir;patLoop();
  },(len+.5)*1000);
}
function patStop(){
  PAT.on=false;clearTimeout(PAT.timer);PAT.timer=null;
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
