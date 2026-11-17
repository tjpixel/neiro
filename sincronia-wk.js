/* Neiro · «Ajustar sincronía»: escucha el micro muestra a muestra para saber en qué momento exacto empieza cada «ta».
   Manda la envolvente (el pico de cada bloque de 16 muestras) con el número de muestra del reloj del sonido. */
registerProcessor('neiro-env',class extends AudioWorkletProcessor{
  constructor(){super();this.b=[];this.f0=-1}
  flush(){if(this.b.length)this.port.postMessage({f:this.f0,v:this.b});this.b=[];this.f0=-1}
  process(inputs){
    const x=inputs[0]&&inputs[0][0];
    if(!x){this.flush();return true}
    if(this.f0<0)this.f0=currentFrame;
    for(let k=0;k<x.length;k+=16){let m=0;for(let j=k;j<k+16&&j<x.length;j++){const a=x[j]<0?-x[j]:x[j];if(a>m)m=a}this.b.push(m)}
    if(this.b.length>=256)this.flush();
    return true;
  }
});
