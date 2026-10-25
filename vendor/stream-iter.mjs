/* Safari (iPhone) non permette ancora «for await» su un ReadableStream, che il lettore PDF usa per estrarre il testo.
   Questa piccola aggiunta lo rende possibile; se il browser lo sa già fare, non cambia niente. */
if(typeof ReadableStream!=='undefined'&&!ReadableStream.prototype[Symbol.asyncIterator]){
  ReadableStream.prototype[Symbol.asyncIterator]=async function*(){
    const r=this.getReader();
    try{for(;;){const {done,value}=await r.read();if(done)return;yield value}}
    finally{r.releaseLock()}};
}
