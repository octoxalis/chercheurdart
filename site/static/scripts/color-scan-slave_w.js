// MSG MASTER <--> SLAVE WORKER
// SLAVE => MASTER: INLINE (fromMaster): postMessage( scan_sa )

// MASTER => SLAVE
function fromMaster( master_e )
{
  //// ============ PROCESSING ============ Result in sharedArrayBuffer
  const offset = master_e.data.offset   // ;console.log( `offset: ${offset}` )
  const u8_data_av = new Uint8ClampedArray( master_e.data.data_sa, offset, master_e.data.bytes )    // TypedArray View
  const scan_sa = new SharedArrayBuffer( master_e.data.bytes )
  const u32_processed_av = new Uint32Array( scan_sa ) // TypedArray View
  let hue
  for (let at=0; at < u8_data_av.length; at+=4)
  {
    hue = RGB_H( u8_data_av[at], u8_data_av[at+1], u8_data_av[at+2] )
    // ;if ( at < 8 ) console.log( `${at}: ${hue}` )
    if ( hue !== 0 ) hue <<= 23  // bits 22-31: hue
    // ;if ( at < 8 ) console.log( `${at}: ${hue}` )

    // xx u32_processed_av[at >>> 2] = (hue & 0xFF800000) | (( offset + at ) & 0x7FFFFF)      // bits  0-21: pointer; u32_processed_av index == u8_data_av / 4 (>>2): Uint32 vs Uint8
    u32_processed_av[at >>> 2] = (hue) | (( offset + at ))      // bits  0-21: pointer; u32_processed_av index == u8_data_av / 4 (>>2): Uint32 vs Uint8
    // ;if ( at < 8 ) console.log( `out: ${(hue) | (( offset + at ))}` )
  }
  //// ============ END PROCESSING ============
 
  postMessage( scan_sa )
}
self.addEventListener("message", fromMaster, true)

const RGB_H = ( r, g, b ) =>
{
  const min = Math.min( r, g, b )
  const max = Math.max( r, g, b )
  if ( max === min ) return 0 // achromatic
  const max_min = max - min
  const h = ( max === r ) ? ( (g - b) / max_min ) + ( g < b ? 6 : 0 ) :
          ( max === g ) ? ( (b - r) / max_min ) + 2 :
                          ( (r - g) / max_min ) + 4
return Math.floor( h * 60 )
}
