// MSG MASTER <--> SLAVE WORKER
// SLAVE => MASTER: INLINE (fromMaster): postMessage( scan_sa )

// MASTER => SLAVE
function fromMaster( master_e )
{
  //// ============ PROCESSING ============ Result in sharedArrayBuffer
  const offset = master_e.data.offset
  const hue_n = master_e.data.hue_n
  const u8_data_av = new Uint8ClampedArray( master_e.data.data_sa, offset, master_e.data.bytes )    // TypedArray View
  const scan_sa = new SharedArrayBuffer( master_e.data.bytes )
  const u32_processed_av = new Uint32Array( scan_sa )    // TypedArray View
  let hue
  for (let at=0; at < u8_data_av.length; at+=4)
  {
    hue = hueFromRGB( u8_data_av[at], u8_data_av[at+1], u8_data_av[at+2], hue_n )
    if ( hue !== 0 ) hue = (Math.floor( hue / 6.0 * hue_n )) << 23  // bits 22-31: hue
    //u32_processed_av[at >>> 2] = (hue & 0x7F) | (( offset + at ) & 0x7FFFFF)      // bits  0-21: pointer; u32_processed_av index == u8_data_av / 4 (>>2): Uint32 vs Uint8
    u32_processed_av[at >>> 2] = (hue & 0x1FF) | (( offset + at ) & 0x7FFFFF)      // bits  0-21: pointer; u32_processed_av index == u8_data_av / 4 (>>2): Uint32 vs Uint8
  }
  //// ============ END PROCESSING ============
  postMessage( scan_sa )
}
self.addEventListener("message", fromMaster, true)

const hueFromRGB = ( r, g, b, hue_n ) =>
{
  r /= 255
  g /= 255
  b /= 255
  const min = Math.min( r, g, b )
  const max = Math.max( r, g, b )
  if ( max === min ) return 0 // achromatic
  const maxLmin = max - min
  let h = ( max === r ) ?   (g - b) / maxLmin + ( g < b ? 6.0 : 0 ) :
          ( max === g ) ? ( (b - r) / maxLmin ) + 2 :
                          ( (r - g) / maxLmin ) + 4
return Math.floor( h / 6.0 * hue_n )
}

/* REMOVE
function getHueArc ( r, g, b )
{
  r /= 255
  g /= 255
  b /= 255
  let h = 0
  let max = Math.max( r, g, b )
  let min = Math.min( r, g, b )
  if (max === min) return 0    // achromatic
  let d = max - min
  switch (max)
  {
    case r: h = (g - b) / d + (g < b ? 6.0 : 0); break;
    case g: h = (b - r) / d + 2; break;
    case b: h = (r - g) / d + 4; break;
  }
  return h
}
*/