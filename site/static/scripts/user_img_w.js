importScripts( 'keyval_store.js' )

const fromClient = ( client_o ) =>
{
  if ( client_o.task_s === 'STORE' )    //: fromClient --> provider
  {
    Img_o = client_o.img_o    //;console.log( `[fromClient] Img_o: ${Img_o}` )
    return
  }
  if ( client_o.task_s === 'RETRIEVE'  )    //: fromProvider --> client
  {
    Provider_p.postMessage( { task_s: 'DONE', img_o: Img_o } )
    return
  }
}

// ================== INIT WORKER ======================
let Provider_p
let Img_o
onconnect = connect_e =>
{
  Provider_p = connect_e.ports[0]
  Provider_p.onmessageerror = err => console.log( `PROVIDER ERROR: ${err.message}` )
  Provider_p.onmessage = client_e => { fromClient( client_e.data ) }
  Provider_p.start()
}
