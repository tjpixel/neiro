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
  return{snd:c.snd||(ini?'suave':'piano'),vel:c.vel||(ini?'tranq':'normal'),view:c.view==='tec'?'tec':'esc',fin:FIN_OPTS.includes(c.fin)?c.fin:'cadencia',voz:!!c.voz};
}
const VEL={tranq:.7,normal:1};
const FIN_OPTS=['cadencia','cuenco','campana','kalimba','soplo','nada'];
/* armónicos del piano: más presencia en graves (el altavoz del móvil casi no da la fundamental por debajo de 200 Hz) */
const PIANO_H=[1,.62,.4,.26,.17,.11,.07,.045];
function pianoNote(m,t,dur,vol,snd){
  const c=ac(),out=out_();if(!c||!out)return;
  snd=snd||pianoCfg().snd;
  const f=hzOf(m),v=(vol||.26),end=t+Math.max(.15,dur);
  tunMute(end+(snd==='suave'?.35:.55)); // el afinador no escucha mientras suena (más la cola)
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
  tunMute(t+dur+.35);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.2,t+.05);g.gain.setValueAtTime(.2,t+dur-.05);g.gain.linearRampToValueAtTime(0,t+dur+.1);
}
function tone(m,dur){const c=ac();if(!c)return;pianoNote(m,c.currentTime+.02,dur||1.4)}
/* acorde de la tónica: en voces graves el bajo una octava abajo se quita, porque emborrona */
function chord(m,t,dur){[0,4,7].forEach(k=>pianoNote(m+k,t,dur,.12));if(m>=48)pianoNote(m-12,t,dur,.1)}
/* ═════ AVISO AL ACABAR EL PASO ═════
   Pensado para una sala de canto en silencio: suave, sin golpe seco y que se apaga solo.
   Se elige en Tú → Piano de referencia (cfg.pno.fin). La vibración es una sola, corta. */
const hzM=m=>440*Math.pow(2,(m-69)/12); // MIDI; Do3 (Do central) = 60
function finVoice(t,parts,env,lp){
  const c=ac(),m=master();if(!c||!m)return;
  const g=c.createGain(),f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=lp||4000;f.Q.value=.3;
  f.connect(g);g.connect(m);env(g.gain,t);
  parts.forEach(p=>{const o=c.createOscillator(),gg=c.createGain();o.type=p.type||'sine';o.frequency.value=p.f;
    gg.gain.setValueAtTime(p.a,t);if(p.dec)gg.gain.setTargetAtTime(0,t,p.dec);
    o.connect(gg);gg.connect(f);o.start(t);o.stop(t+(p.len||4))});
}
const FIN={
  /* cuenco: parciales inarmónicos con un leve batido; entrada blanda y caída larga */
  cuenco(t){const f=hzM(55);finVoice(t,[{f,a:.5,len:6},{f:f*1.003,a:.25,len:6},{f:f*2.71,a:.16,dec:1.6,len:5},{f:f*5.15,a:.05,dec:.7,len:3}],
    (g,t)=>{g.setValueAtTime(0,t);g.linearRampToValueAtTime(.16,t+.06);g.setTargetAtTime(0,t+.15,1.5)},2200)},
  /* campanilla: Sol y Mi con un armónico de campana */
  campana(t){[[67,0],[64,.42]].forEach(([m,d])=>{const f=hzM(m);finVoice(t+d,[{f,a:.6,len:3},{f:f*2,a:.18,dec:.4,len:2},{f:f*3.01,a:.06,dec:.2,len:1}],
    (g,t)=>{g.setValueAtTime(0,t);g.linearRampToValueAtTime(.12,t+.012);g.setTargetAtTime(0,t+.02,.55)},3500)})},
  /* cadencia: arpegio de dominante que se resuelve en la tónica que estabas cantando */
  cadencia(t,T){T=T||60;while(T<55)T+=12;while(T>67)T-=12;
    [[T+7,0],[T+11,.22],[T+14,.44]].forEach(([m,d])=>finVoice(t+d,[{f:hzM(m),a:.5,type:'triangle',len:1.2}],
      (g,t)=>{g.setValueAtTime(0,t);g.linearRampToValueAtTime(.08,t+.03);g.setTargetAtTime(0,t+.05,.25)},2400));
    [T,T+4,T+7,T+12].forEach(m=>finVoice(t+.78,[{f:hzM(m),a:.42,type:'triangle',len:3},{f:hzM(m)*2,a:.08,len:2}],
      (g,t)=>{g.setValueAtTime(0,t);g.linearRampToValueAtTime(.06,t+.08);g.setTargetAtTime(0,t+.4,.7)},2000))},
  /* kalimba: pulsación corta con su armónico característico */
  kalimba(t){[[57,0],[52,.3]].forEach(([m,d])=>{const f=hzM(m);finVoice(t+d,[{f,a:.7,dec:.5,len:2},{f:f*5.4,a:.12,dec:.05,len:.3},{f:f*2,a:.08,dec:.15,len:.6}],
    (g,t)=>{g.setValueAtTime(0,t);g.linearRampToValueAtTime(.2,t+.004);g.setTargetAtTime(0,t+.01,.4)},3000)})},
  /* soplo: quinta Do3–Sol3 que crece y se va, sin ataque */
  soplo(t){finVoice(t,[{f:hzM(60),a:.5,len:3.2},{f:hzM(67),a:.38,len:3.2},{f:hzM(72),a:.1,len:3.2}],
    (g,t)=>{g.setValueAtTime(0,t);g.linearRampToValueAtTime(.09,t+.9);g.setValueAtTime(.09,t+1.3);g.linearRampToValueAtTime(0,t+3)},1800)},
  nada(){}
};
/* tonic: la nota en la que estabas cantando (para la cadencia); k: para probar un aviso concreto sin vibrar */
function ding(tonic,k){
  const c=ac(),key=k||pianoCfg().fin;
  if(c&&FIN[key])FIN[key](c.currentTime+.05,tonic);
  if((!k||k==='nada')&&navigator.vibrate)try{navigator.vibrate(60)}catch(e){}
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
  /* ejercicios propios: cada nota con su duración (dur, en tiempos) y su silencio detrás (gap); lead = silencio antes de la primera */
  else{if(e.lead)u+=e.lead*b;e.pat.forEach((s,i)=>{const h=e.hold&&i===0,bt=e.dur?(+e.dur[i]||1):1,d=h?e.hold:b*bt,len=h?e.hold:(e.stac?b*.35:b*bt*.95);pl.it.push({k:s,t:u,d,len});u+=d+(e.gap?(+e.gap[i]||0)*b:0)})}
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
const PAT={on:false,e:null,tonic:48,dir:1,timer:null,cb:null,bus:null,round:null,ending:false,onEnd:null,req:0};
/* dir: 1 sube, -1 baja (al seguir tras una pausa, continúa en el sentido en que iba) */
function patStart(e,tonic,cb,dir){
  patStop();if(!e||!e.pat)return;
  const c=ac(),m=master();
  if(c&&m){PAT.bus=c.createGain();PAT.bus.gain.value=1;PAT.bus.connect(m)}
  PAT.ending=false;PAT.onEnd=null;PAT.on=true;PAT.e=e;PAT.tonic=tonic;PAT.dir=dir<0?-1:1;PAT.cb=cb||null;patLoop();
  if(vozWanted()&&e.id!=='cx_prev')vozStart();
}
function patLoop(){
  if(!PAT.on)return;
  ROUTE=PAT.bus;const len=playPattern(PAT.e,PAT.tonic);ROUTE=null;
  if(PAT.cb)PAT.cb(PAT.tonic);
  PAT.timer=setTimeout(()=>{
    if(!PAT.on)return;
    if(PAT.ending){const f=PAT.onEnd;patStop();if(f)f();return}
    const r=myRange(),hiK=Math.max(...PAT.e.pat),loK=Math.min(...PAT.e.pat),top=patTop(PAT.e);
    if(PAT.dir>0&&PAT.tonic+1+hiK>top)PAT.dir=-1;
    if(PAT.dir<0&&PAT.tonic-1+loK<r.lo)PAT.dir=1;
    PAT.tonic+=PAT.dir;patLoop();
  },(len+.5)*1000);
}
/* acaba la vuelta que está sonando y se para (al acabarse el tiempo del paso: sin cortar en seco) */
function patFinish(onEnd){if(!PAT.on){if(onEnd)onEnd();return}PAT.ending=true;PAT.onEnd=onEnd||null}
function patStop(){
  PAT.req++;if(VOZ.on||VOZ.stream)vozLater();
  PAT.on=false;PAT.ending=false;PAT.onEnd=null;PAT.round=null;clearTimeout(PAT.timer);PAT.timer=null;
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
/* ═════ MICRÓFONO ═════
   Todo lo que escucha (afinador, «Tu voz encima», medir el rango, grabar) abre el micro aquí.
   Por defecto, el que elige el móvil. En Tú → Micrófono se puede fijar uno (se guarda en cfg.mic = {id, label}).
   Si el elegido no está (auriculares desconectados), se usa el del móvil por defecto sin dar error.
   Con un micro bluetooth el móvil pasa los auriculares a «modo llamada»: voz y piano con calidad de teléfono. */
const MIC={cur:null,warned:false};
const MIC_RAW={echoCancellation:false,noiseSuppression:false,autoGainControl:false};
function micKind(label){
  const l=(label||'').toLowerCase();
  if(/bluetooth|airpods|buds|hands-?free|\bbt\b|sco\b|manos libres/.test(l))return 'bt';
  if(/usb|external|externo|lavalier|rode|shure|blue yeti|irig/.test(l))return 'usb';
  if(/headset|headphone|auricular|wired|cable|earpiece|jack|line/.test(l))return 'wired';
  if(/speakerphone|built-?in|internal|integrad|interno|phone|bottom|top|back|front|micr[oó]fono$|^microphone$/.test(l))return 'phone';
  return l?'other':'phone';
}
const MIC_N={phone:'Micro del móvil',wired:'Micro de los auriculares',bt:'Micro de los auriculares bluetooth',usb:'Micro externo',other:'Micro'};
function micName(d){const k=d.kind||micKind(d.label);return k==='other'?(d.label||MIC_N.other):MIC_N[k]}
const micPref=()=>{const m=typeof DB!=='undefined'&&DB.cfg&&DB.cfg.mic;return m&&m.id?m:null};
/* lista de micros (los nombres solo llegan después de dar permiso al micro) */
async function micList(){
  try{
    const all=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='audioinput');
    const seen=new Set(),out=[];
    for(const d of all){
      if(d.deviceId==='default'||d.deviceId==='communications'||!d.deviceId)continue;   // alias del sistema
      const label=(d.label||'').replace(/^(Default|Predeterminado|Communications) - /i,'');
      if(seen.has(label+d.groupId))continue;seen.add(label+d.groupId);
      out.push({id:d.deviceId,label,kind:micKind(label)});
    }
    return out;
  }catch(e){return []}
}
async function micStream(){
  if(!window.isSecureContext||!navigator.mediaDevices)throw new Error('insecure');
  const p=micPref();let stream=null;
  if(p){
    let id=p.id;
    /* el identificador puede cambiar (datos del navegador borrados): se busca también por nombre */
    try{const L=await micList();if(L.length&&!L.some(d=>d.id===id)){const m=L.find(d=>d.label&&d.label===p.label);if(m)id=m.id}}catch(e){}
    try{stream=await navigator.mediaDevices.getUserMedia({audio:Object.assign({deviceId:{exact:id}},MIC_RAW)})}
    catch(e){if(e&&e.name==='NotAllowedError')throw e;stream=null}
  }
  if(!stream)stream=await navigator.mediaDevices.getUserMedia({audio:MIC_RAW});
  micNote(stream,p);
  return stream;
}
/* apunta qué micro se ha abierto de verdad y avisa una vez si es bluetooth */
function micNote(stream,p){
  try{
    const t=stream.getAudioTracks()[0],s=t.getSettings?t.getSettings():{};
    const label=t.label||'',kind=micKind(label);
    MIC.cur={id:s.deviceId||'',label,kind,chosen:!!(p&&(s.deviceId===p.id||label===p.label)),missing:!!(p&&s.deviceId!==p.id&&label!==p.label)};
  }catch(e){MIC.cur=null}
  if(MIC.cur&&MIC.cur.kind==='bt'&&!MIC.warned&&typeof micWarn==='function'){MIC.warned=true;setTimeout(micWarn,300)}
  if(typeof micUI==='function')micUI();
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
   Detecta la nota cantada con el método de McLeod (autocorrelación normalizada, calculada con FFT).
   Comprobado el 26 oct 2026 con un banco de pruebas: acierta la nota de Do1 a Re5 con ~1 cent de error típico,
   con micro de móvil, eco y ruido fuerte, y no da lecturas falsas con silencio o zumbido.
   Lo que se ve en pantalla es la media de los últimos 0,35 s (unas dos vueltas de vibrato): es la altura que se percibe.
   Mientras suena el piano de referencia, el afinador no escucha (el micro oiría el piano y diría «Afinado»). */
const TUN={on:false,stream:null,an:null,src:null,buf:null,iv:null,cb:null,hist:[],disp:[],note:null,jump:0,lastOk:0};
const TUN_WIN=350;              // ms que se promedian para la aguja
let TUN_MUTE=0;                 // hasta cuándo (tiempo del AudioContext) suena la referencia
function tunMute(until){TUN_MUTE=Math.max(TUN_MUTE,until)}
async function tunerStart(cb){
  tunerStop();vozClose();
  const stream=await micStream(),c=ac();
  TUN.stream=stream;TUN.src=c.createMediaStreamSource(stream);TUN.an=c.createAnalyser();TUN.an.fftSize=2048;
  TUN.src.connect(TUN.an);TUN.buf=new Float32Array(TUN.an.fftSize);TUN.cb=cb;TUN.on=true;TUN.hist=[];tunReset();
  TUN.iv=setInterval(tunTick,50);
}
function tunReset(){TUN.disp=[];TUN.note=null;TUN.jump=0;TUN.lastOk=0}
function tunTick(){
  if(!TUN.on||!TUN.an)return;
  const c=ac(),now=performance.now();
  if(c&&c.currentTime<TUN_MUTE){tunReset();TUN.hist=[];TUN.cb&&TUN.cb({muted:true,t:now},null);return}
  TUN.an.getFloatTimeDomainData(TUN.buf);
  const f=detectPitch(TUN.buf,c.sampleRate);
  TUN.disp=TUN.disp.filter(x=>now-x.t<TUN_WIN);
  if(f){
    const m=midiOfHz(f);
    /* un salto de más de 7 semitonos solo se cree si se repite 3 veces (quita los saltos de octava sueltos) */
    if(TUN.disp.length&&Math.abs(m-tunMed(TUN.disp.map(x=>x.m)))>7){if(++TUN.jump>=3){TUN.disp=[];TUN.note=null}}
    if(!TUN.disp.length||Math.abs(m-tunMed(TUN.disp.map(x=>x.m)))<=7){TUN.jump=0;TUN.disp.push({t:now,m});TUN.hist.push({t:now,m});TUN.lastOk=now}
  }
  TUN.hist=TUN.hist.filter(x=>now-x.t<1200);
  /* huecos cortos (una consonante, coger aire) no apagan la aguja */
  if(!TUN.disp.length||now-TUN.lastOk>200){if(!TUN.disp.length)TUN.note=null;TUN.cb&&TUN.cb(null,tunerStable());return}
  const vs=TUN.disp.map(x=>x.m),med=tunMed(vs),avg=tunTrim(vs);
  /* el nombre de la nota no cambia hasta pasar 65 cents del centro de la que se muestra */
  if(TUN.note==null||Math.abs(med-TUN.note)>.65)TUN.note=Math.round(med);
  TUN.cb&&TUN.cb({hz:440*Math.pow(2,(avg-69)/12),m:avg,note:TUN.note,t:now},tunerStable());
}
const tunMed=a=>{const s=a.slice().sort((x,y)=>x-y);return s[s.length>>1]};
const tunTrim=a=>{const s=a.slice().sort((x,y)=>x-y),k=Math.floor(s.length*.15),r=s.slice(k,s.length-k);const u=r.length?r:s;return u.reduce((x,y)=>x+y,0)/u.length};
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
/* FFT (radix 2) para la autocorrelación: unas 20 veces más rápida que sumar a mano */
const FFTP={};
function fftPlan(n){if(FFTP[n])return FFTP[n];const rev=new Uint32Array(n),lg=Math.log2(n);for(let i=0;i<n;i++){let r=0;for(let b=0;b<lg;b++)r|=((i>>b)&1)<<(lg-1-b);rev[i]=r}
  const co=new Float64Array(n/2),si=new Float64Array(n/2);for(let i=0;i<n/2;i++){co[i]=Math.cos(2*Math.PI*i/n);si[i]=Math.sin(2*Math.PI*i/n)}
  return FFTP[n]={rev,co,si,re:new Float64Array(n),im:new Float64Array(n)}}
function fftRun(p,re,im,inv){const n=re.length;
  for(let i=0;i<n;i++){const j=p.rev[i];if(j>i){let t=re[i];re[i]=re[j];re[j]=t;t=im[i];im[i]=im[j];im[j]=t}}
  for(let s=2;s<=n;s<<=1){const h=s>>1,st=n/s;for(let i=0;i<n;i+=s)for(let k=0;k<h;k++){const c=p.co[k*st],sn=inv?-p.si[k*st]:p.si[k*st];
    const a=i+k,b=a+h,tr=re[b]*c+im[b]*sn,ti=im[b]*c-re[b]*sn;re[b]=re[a]-tr;im[b]=im[a]-ti;re[a]+=tr;im[a]+=ti}}}
const TUN_LO=55,TUN_HI=1400;   // de La0 a Fa5 largo: cubre de bajo profundo a soprano
function detectPitch(x,sr){
  const n=x.length;let e=0;for(let i=0;i<n;i++)e+=x[i]*x[i];
  if(Math.sqrt(e/n)<.0015)return null;            // solo descarta el silencio; la claridad decide si hay nota
  const N=2*n,p=fftPlan(N),re=p.re,im=p.im;re.fill(0);im.fill(0);for(let i=0;i<n;i++)re[i]=x[i];
  fftRun(p,re,im,false);for(let i=0;i<N;i++){re[i]=re[i]*re[i]+im[i]*im[i];im[i]=0}fftRun(p,re,im,true);
  const maxLag=Math.min(n>>1,Math.ceil(sr/TUN_LO)),minLag=Math.floor(sr/TUN_HI);
  const nsdf=new Float64Array(maxLag+2);let m=2*e;
  for(let t=0;t<=maxLag+1;t++){if(t>0)m-=x[t-1]*x[t-1]+x[n-t]*x[n-t];nsdf[t]=m>1e-12?2*(re[t]/N)/m:0}
  /* picos clave: el más alto entre cada cruce hacia arriba y el siguiente hacia abajo, buscando desde el principio
     (si se empieza tarde, en agudos se salta el pico bueno y marca una octava abajo) */
  const peaks=[];let pos=false,best=-1,bi=-1;
  for(let t=1;t<=maxLag;t++){
    if(nsdf[t]>0&&nsdf[t-1]<=0){pos=true;best=-1;bi=-1}
    if(pos&&nsdf[t]>best){best=nsdf[t];bi=t}
    if(pos&&nsdf[t]<=0&&nsdf[t-1]>0){pos=false;if(bi>=minLag)peaks.push([bi,best])}
  }
  if(pos&&bi>=minLag&&bi<maxLag)peaks.push([bi,best]);   // el último pico aunque no se cierre (notas graves)
  if(!peaks.length)return null;
  let mx=0;for(const q of peaks)if(q[1]>mx)mx=q[1];if(mx<.6)return null;
  const q=peaks.find(r=>r[1]>=mx*.93);let t=q[0];
  const a=nsdf[t-1],b=nsdf[t],c2=nsdf[t+1],den=a-2*b+c2;if(den)t+=.5*(a-c2)/den;
  const f=sr/t;return f>=TUN_LO&&f<=TUN_HI?f:null;
}

/* ═════ TU VOZ ENCIMA DE LA GUÍA ═════
   Con «Tu voz» encendido (botón del micro en el reproductor, o Tú → Piano de referencia), mientras suena el piano
   se escucha la voz con el mismo detector que el afinador y la guía la dibuja encima como una línea naranja.
   A diferencia del afinador, aquí no se deja de escuchar mientras suena el piano (si no, no habría línea al cantar con él).
   Por eso, la primera vez y cada vez que cambian los auriculares, se comprueba si el micro oye el piano:
   una nota corta en silencio. Si la oye (altavoz), la línea solo se dibuja en los huecos del piano,
   para no hacer pasar el piano por tu voz. Con auriculares se dibuja todo el rato. */
const VOZ={on:false,stream:null,src:null,an:null,buf:null,iv:null,pts:[],raw:[],cur:null,jump:0,lag:.02,okAt:0,
  ear:null,     // 'ok': el micro no oye el piano · 'bleed': lo oye (altavoz) · null: sin comprobar
  st:'',        // 'check' comprobando · 'nomic' sin micro
  tok:0,chk:null,off:0,sig:''};
const vozWanted=()=>pianoCfg().voz;
const pcf=x=>((x%12)+12)%12;
async function vozOpen(){
  clearTimeout(VOZ.off);VOZ.off=0;
  if(VOZ.stream&&VOZ.stream.active&&VOZ.an)return;
  vozClose();
  const stream=await micStream(),c=ac();
  VOZ.stream=stream;VOZ.src=c.createMediaStreamSource(stream);VOZ.an=c.createAnalyser();VOZ.an.fftSize=2048;
  VOZ.src.connect(VOZ.an);VOZ.buf=new Float32Array(VOZ.an.fftSize);
  try{const s=stream.getAudioTracks()[0].getSettings();VOZ.lag=Math.min(.2,s.latency||.02)}catch(e){VOZ.lag=.02}
}
function vozClose(){
  clearTimeout(VOZ.off);VOZ.off=0;clearInterval(VOZ.iv);VOZ.iv=null;VOZ.on=false;VOZ.cur=null;
  try{VOZ.src&&VOZ.src.disconnect()}catch(e){}
  if(VOZ.stream)VOZ.stream.getTracks().forEach(t=>t.stop());VOZ.stream=null;VOZ.src=null;VOZ.an=null;
}
/* empieza a escuchar mientras suena el piano */
async function vozStart(){
  if(!vozWanted()||TUN.on)return;
  try{await vozOpen()}catch(e){VOZ.st='nomic';vozNote();return}
  if(!PAT.on||!vozWanted()){vozLater();return}
  VOZ.on=true;VOZ.raw=[];VOZ.jump=0;if(VOZ.st==='nomic')VOZ.st='';
  if(!VOZ.iv)VOZ.iv=setInterval(vozTick,40);
  vozNote();
}
/* al parar el piano sigue un momento (la última nota que alargas) y después suelta el micro */
function vozLater(){clearTimeout(VOZ.off);VOZ.off=setTimeout(()=>{if(!PAT.on&&!VOZ.chk)vozClose();vozNote()},900)}
function vozTick(){
  if(!VOZ.an||VOZ.chk)return;
  const c=ac(),now=c.currentTime,wall=performance.now();
  /* el momento del piano al que corresponde lo que se canta ahora: el mismo reloj que usa la guía
     (retardo del altavoz o auriculares, del micro, media ventana de análisis y la mediana de 3 lecturas) */
  const t=now-Math.min(.5,(c.outputLatency||0)+(c.baseLatency||0))-VOZ.lag-VOZ.an.fftSize/c.sampleRate/2-.04;
  let f=null;
  /* sin comprobar o con altavoz: no se escucha mientras suena el piano (lo confundiría con tu voz) */
  if(VOZ.ear==='ok'||now>=TUN_MUTE){VOZ.an.getFloatTimeDomainData(VOZ.buf);f=detectPitch(VOZ.buf,c.sampleRate)}
  if(f){
    const m=midiOfHz(f),r=VOZ.raw=VOZ.raw.filter(x=>wall-x.w<160);
    /* un salto de más de 7 semitonos solo se cree si se repite 3 veces (como en el afinador) */
    if(r.length&&Math.abs(m-tunMed(r.map(x=>x.m)))>7){if(++VOZ.jump<3)return;r.length=0}
    VOZ.jump=0;r.push({w:wall,m});if(r.length>3)r.shift();
    const sm=tunMed(r.map(x=>x.m));
    VOZ.pts.push({t,m:sm});VOZ.cur={t,m:sm,at:wall};VOZ.okAt=wall;
  }else if(wall-VOZ.okAt>150){
    /* un hueco (coger aire, una consonante larga) corta la línea */
    const l=VOZ.pts[VOZ.pts.length-1];if(l&&l.m!=null)VOZ.pts.push({t,m:null});
    if(wall-VOZ.okAt>220)VOZ.cur=null;
  }
  if(VOZ.pts.length>1500)VOZ.pts=VOZ.pts.filter(x=>x.t>now-40);
}
/* ¿el micro oye el piano? Una nota corta en el centro de tu rango, en silencio.
   Devuelve 'ok', 'bleed', 'nomic' o null si se cancela. */
function vozCheck(){
  if(VOZ.chk)return VOZ.chk;
  const tok=++VOZ.tok;VOZ.st='check';
  VOZ.chk=(async()=>{
    try{await vozOpen()}catch(e){return 'nomic'}
    const c=ac();if(!c)return null;
    if(c.state!=='running'){try{await c.resume()}catch(e){}}
    if(tok!==VOZ.tok||c.state!=='running')return null;
    const r=myRange(),m=Math.round((r.lo+r.hi)/2),t0=c.currentTime+.1;
    pianoNote(m,t0,1.1);
    const hit=await new Promise(res=>{let h=0;const iv=setInterval(()=>{
      if(tok!==VOZ.tok||!VOZ.an){clearInterval(iv);res(-1);return}
      const t=c.currentTime;if(t<t0+.25)return;if(t>t0+1.15){clearInterval(iv);res(h);return}
      VOZ.an.getFloatTimeDomainData(VOZ.buf);const f=detectPitch(VOZ.buf,c.sampleRate);
      if(f){const d=pcf(midiOfHz(f)-m);if(d<.6||d>11.4)h++}   // la nota de la prueba (en cualquier octava)
    },40)});
    if(hit<0)return null;
    return hit>=4?'bleed':'ok';
  })().then(x=>{
    if(tok!==VOZ.tok)return null;
    VOZ.chk=null;VOZ.st=x==='nomic'?'nomic':'';
    if(x==='ok'||x==='bleed'){VOZ.ear=x;vozSig().then(s=>VOZ.sig=s)}
    if(!PAT.on)vozLater();vozNote();return x;
  });
  vozNote();
  return VOZ.chk;
}
function vozCancel(){if(VOZ.chk){VOZ.tok++;VOZ.chk=null;VOZ.st='';if(!PAT.on)vozLater();vozNote()}}
/* si cambian los auriculares o el altavoz, hay que volver a comprobar */
async function vozSig(){try{return (await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind!=='videoinput').map(d=>d.kind+':'+d.deviceId+':'+d.label).sort().join('|')}catch(e){return ''}}
if(navigator.mediaDevices&&navigator.mediaDevices.addEventListener)navigator.mediaDevices.addEventListener('devicechange',()=>{
  if(!VOZ.ear)return;vozSig().then(s=>{if(VOZ.sig&&s&&s!==VOZ.sig){VOZ.ear=null;VOZ.sig='';vozNote()}});
});
function vozNote(){if(typeof vozUI==='function')vozUI()}

/* ═════ REPRODUCIR GRABACIONES ═════ */
const AURL={};
async function audioURL(id){if(AURL[id])return AURL[id];const b=await IDB.get(id);if(!b)return null;AURL[id]=URL.createObjectURL(b);return AURL[id]}
