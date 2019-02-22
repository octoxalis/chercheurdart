const Pool = []
let   WorkerIsSet = false
let   Settings_o


// MSG MASTER WORKER <--> MAIN
// MASTER => MAIN: INLINE (fromSlave): postMessage( Scan_a )

// MAIN => MASTER
function fromMain( main_e )
{
  Settings_o = main_e.data
  if ( Settings_o.masterMsg === 'SETUP' )
  {
    setupSlaves()
    return
  }

  if ( Settings_o.masterMsg === 'STOP_SLAVES' )
  {
    ///// TODO
  }
}
self.addEventListener('message', fromMain, true)

function setupSlaves()
{
  const slaves_n = Settings_o.slaves_n
  const url      = Settings_o.slavesURL
  const length   = Settings_o.dataLength    // ;console.log( `length: ${length}` )
  let slice = length >> (( slaves_n === 2 ) ? 1 : ( slaves_n === 4 ) ? 2 : ( slaves_n === 8 ) ? 3 : ( slaves_n === 16 ) ? 4 : 0)    // ;console.log( `slice: ${slice}` )
  const modulo = slice % 4                 // ;console.log( `modulo: ${modulo}` )
  if ( modulo ) slice += 4 - modulo        // ;console.log( `slice: ${slice}` )

  let slave
  for (let at=0; at < slaves_n; ++at)
  {
    if ( WorkerIsSet ) slave = Pool[at]
    else
    {
      slave = new Worker( url )
      Pool.push(slave)
      slave.addEventListener('message', fromSlave, true)
      slave.addEventListener('error',   errorFromSlave, true)
    }
                                          // ;console.log( `offset: ${slice * at}` )
    const offset = slice * at
    const slice_o =
    {
      index:    at,
      offset:   slice * at,
      bytes:    at < (slaves_n - 1) ? slice : length - offset,  // last slave takes the remain
      data_sa:  Settings_o.data_sa
    }
    slave.postMessage( slice_o ) // toSlave( slave, slice_o )
  }
  WorkerIsSet = true
}

// MSG MASTER <--> SLAVE
// MASTER => SLAVE: INLINE (setupSlaves): slave.postMessage( slice_o )

// SLAVE => MASTER
function fromSlave( slave_e )
{
  postMessage( slave_e.data )  // TRANSFER TO MAIN
}

function errorFromSlave( slave_e )
{
  console.log`ERROR FROM SLAVE: ${slave_e}`

}
