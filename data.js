/* Neiro · datos. Local primero: todo se guarda en el móvil al instante.
   Las grabaciones van aparte, en IndexedDB, porque pesan. Las cuentas llegarán con la app de iOS. */
'use strict';

const CFG={
  owner:'Telmo Rivas',
  ownerEmail:'nexafit.dojo@gmail.com',
  version:'0.1 · pruebas'
};

/* ═════ ALMACÉN LOCAL (con respaldo en memoria) ═════ */
const S={
  ok:(()=>{try{localStorage.setItem('__t','1');localStorage.removeItem('__t');return true}catch(e){return false}})(),
  mem:{},
  get(k){if(this.ok){try{return localStorage.getItem(k)}catch(e){}}return this.mem[k]??null},
  set(k,v){if(this.ok){try{localStorage.setItem(k,v);return}catch(e){}}this.mem[k]=v},
  del(k){if(this.ok){try{localStorage.removeItem(k)}catch(e){}}delete this.mem[k]}
};
const KEY='neiro_v1';
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean=(v,n)=>String(v??'').trim().slice(0,n||2000);

/* ajustes de este dispositivo */
const PREF={
  get(k,d){try{const v=JSON.parse(S.get(KEY+'_pref')||'{}');return k in v?v[k]:d}catch(e){return d}},
  set(k,val){let v={};try{v=JSON.parse(S.get(KEY+'_pref')||'{}')}catch(e){}v[k]=val;S.set(KEY+'_pref',JSON.stringify(v))}
};
/* Plus simulado: en la app de iOS lo decidirá la compra en la App Store */
const isPlus=()=>!!PREF.get('plus',false);
const FREE_SONGS=3;

/* ═════ FORMATO DE DATOS ═════
   Compatible con NEXA Voz: classes, songs, ss, recs, range y goals tienen la misma forma. */
function freshDB(){return{v:1,_ts:0,
  profile:{},                                  // name, goal, lvl, voice, teacher, classDay, done, deshi
  cfg:{avail:[1,3,5],mins:20,bl:null,start:null,pno:null},
  plan:null,                                   // {ex:[ids], src:'auto'|'edit'|'nexa-voz'}
  cex:{},                                      // ejercicios propios {id:{n,c,how}}
  extop:{},                                    // nota más aguda cómoda por ejercicio
  best:{},                                     // marcas de aguante (s) por ejercicio
  classes:[],songs:[],ss:[],recs:[],range:[],goals:[]
}}
const isObj=o=>o&&typeof o==='object'&&!Array.isArray(o);
function mergeDefaults(o){
  const f=freshDB();if(!isObj(o))return f;
  const arr=a=>Array.isArray(a)?a.filter(isObj):[];
  const D=Object.assign(f,{
    _ts:+o._ts||0,profile:isObj(o.profile)?o.profile:{},
    cfg:Object.assign(f.cfg,isObj(o.cfg)?o.cfg:{}),
    plan:isObj(o.plan)&&Array.isArray(o.plan.ex)?o.plan:null,
    cex:isObj(o.cex)?o.cex:{},extop:isObj(o.extop)?o.extop:{},best:isObj(o.best)?o.best:{},
    classes:arr(o.classes),songs:arr(o.songs),ss:arr(o.ss),recs:arr(o.recs),range:arr(o.range),goals:arr(o.goals)
  });
  if(!Array.isArray(D.cfg.avail)||!D.cfg.avail.length)D.cfg.avail=[1,3,5];
  D.cfg.avail=D.cfg.avail.map(Number).filter(n=>n>=0&&n<=6);
  if(!MINS.includes(+D.cfg.mins))D.cfg.mins=20;
  if(D.cfg.bl&&!(Array.isArray(D.cfg.bl)&&D.cfg.bl.length===5))D.cfg.bl=null;
  if(D.cfg.bl)D.cfg.bl=D.cfg.bl.map(v=>Math.max(0,Math.min(60,parseInt(v)||0)));
  return D;
}
let DB=freshDB();
function load(){let o=null;try{o=JSON.parse(S.get(KEY)||'null')}catch(e){}DB=mergeDefaults(o)}
function writeLocal(){try{S.set(KEY,JSON.stringify(DB))}catch(e){toast('No se pudo guardar')}}
function save(){DB._ts=Date.now();writeLocal()}

/* ═════ AUDIO GUARDADO (IndexedDB) ═════ */
const IDB={
  db:null,
  open(){return this.db?Promise.resolve(this.db):new Promise((res,rej)=>{
    if(!window.indexedDB){rej(new Error('noidb'));return}
    const r=indexedDB.open('neiro_audio',1);
    r.onupgradeneeded=()=>r.result.createObjectStore('audio');
    r.onsuccess=()=>{this.db=r.result;res(this.db)};r.onerror=()=>rej(r.error);
  })},
  async tx(mode,fn){const db=await this.open();return new Promise((res,rej)=>{const t=db.transaction('audio',mode),q=fn(t.objectStore('audio'));t.oncomplete=()=>res(q&&q.result);t.onerror=()=>rej(t.error)})},
  put(id,blob){return this.tx('readwrite',s=>s.put(blob,id))},
  get(id){return this.tx('readonly',s=>s.get(id))},
  del(id){return this.tx('readwrite',s=>s.delete(id)).catch(()=>{})},
  clear(){return this.tx('readwrite',s=>s.clear()).catch(()=>{})}
};
async function persistStorage(){try{if(navigator.storage&&navigator.storage.persist){return (await navigator.storage.persisted())||await navigator.storage.persist()}}catch(e){}return false}
