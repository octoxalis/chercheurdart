LOG ( `main.js` )
//========================================================= Array.js
// FAST array "functions" (some to inline)

// a_push : myArray[myArray.length] = _value_

// a_pop  : var last = myArray[myArray.length--]

const A_unshift = ( _a, item ) =>
{
  let len = _a.length
  while ( len )
  {
    _a[len] = _a[len-1]
    --len
  }
  _a[0] = item
}

//shift : original function is best

const A_splice = ( _a, index ) =>
{
  let len = _a.length
  if ( !len ) return
  while ( index < len )
  { 
    _a[index] = _a[index+1]
    ++index
  }
  --_a.length
}

const A_indexOf = ( _a, item ) =>
{
  for ( let at = 0, len = _a.length; at != len ; at++) if (_a[at] === item) return at
  return -1
}

const A_lastIndexOf = (_a, item) =>
{
  let at = _a.length
  while ( at-- ) if ( _a[at] === item ) break
  return at
}

/**
 * A_fill ( capacity_n, any_n )
 * @param {UInt32} capacity 
 * @param {Int32}  any_n 
 */
const A_fill = ( capacity_n, any_n ) =>
{
  const fill_a = new Array( capacity_n )
  while ( --capacity_n >= 0 ) fill_a[ capacity_n ] = any_n
  return fill_a;
}

//========================================================= rootvar.js
// LOG ( `rootvar.js` )

const DOM_getRootVar = ( varName ) =>
{
  return getComputedStyle( document.documentElement ).getPropertyValue( varName ) || ''
}

const DOM_setRootVar = ( varName, value ) =>
{
  document.documentElement.style.setProperty( varName, value )
}

function DOM_resetNode ( nodeId )
{
  var node = document.getElementById( nodeId )
  while ( node.firstChild ) node.removeChild( node.firstChild )
}

//========================================================= styles.js

const DOM_getStyle = ( elementId, property ) =>
{
  let style_e = document.getElementById( elementId )
  return ( style_e ) ? window.getComputedStyle( style_e ).getPropertyValue( property ) : ''
}



//========================================================= areas.js
// LOG ( `areas.js` )

const areaSelect = ( ID_s ) =>
{
  const isPerpective = document.querySelector( `.ca_area_perspective` ) !== null
  document.getElementById( 'ca_content' ).classList.toggle( 'ca_content_perspective' )
  const areas = document.getElementsByClassName( 'ca_area' )
  const selectors = document.getElementsByClassName( 'ca_area_selector' )
  const length = selectors.length
  for (let at= 0; at < length; ++at)
  {
    areas.item( at ).classList.toggle( `ca_area_perspective` )
    selectors.item( at ).classList.toggle( 'ca_selector_perspective' )
  }
  if ( isPerpective )
  {
    document.querySelector( `.ca_area_active` ).classList.toggle( 'ca_area_active' )
    document.getElementById( ID_s.replace( 'select_', '') ).classList.toggle( 'ca_area_active' )
  }
}

//========================================================= drag.js
// LOG ( `drag.js` )

class DragElement
{
  constructor ( drag_e, keep_b )
  {
    this.gapX = 0
    this.gapY = 0
    this.offsetX = 0
    this.offsetY = 0
    this.atX = 0
    this.atY = 0
    this.drag_e = drag_e
    this.keep_b = keep_b || false
    this.start()
  }

  start ()
  {
    this.drag_e.onmousedown = ( mouse_e ) =>
    {
      this.loose = false
      this.gapX = mouse_e.clientX - this.offsetX
      this.gapY = mouse_e.clientY - this.offsetY
      this.drag_e.addEventListener('mousemove', this, false)
      this.drag_e.addEventListener('mouseup',   this, false)
      return false
    }
  }

  disable ()
  {
    this.loose = true
  }

  handleEvent ( mouse_e )
  {
    if ( this.loose ) return false
    if ( mouse_e.type === 'mousemove' )
    {
      this.atX = mouse_e.clientX - this.gapX
      this.atY = mouse_e.clientY - this.gapY
      this.offsetX = this.atX
      this.offsetY = this.atY
      this.drag_e.style.transform = `translate3d(${this.atX}px, ${this.atY}px, 0)`
      return false
    }
    if ( mouse_e.type === 'mouseup' )
    {
      if ( !this.keep_b )
      {
        this.drag_e.removeEventListener('mousemove', this, true)
        this.drag_e.removeEventListener('mouseup',   this, true)
      }
      this.loose = true
      //return false
    }
  }
}

//========================================================= scrollbar.js
// LOG ( `scrollbar.js` )

const scroll_updateLevel = ( percent ) =>
{
                                        //console.log`percent: ${percent}`
  document.getElementById( 'ca_grad_down_empty' )
   .setAttribute('offset', `${percent}%` )
  document.getElementById( 'ca_grad_down_fill' )
  .setAttribute('offset', `${percent}%` )

  percent = 100 - percent
  document.getElementById( 'ca_grad_up_empty' )
    .setAttribute('offset', `${percent}%` )
  document.getElementById( 'ca_grad_up_fill' )
   .setAttribute('offset', `${percent}%` )
}

const scroll_updatePosition = ( position ) =>
{
  //const height = (document.body.clientHeight - window.innerHeight) || 1 // avoid div by 0
  const height = (document.body.scrollHeight - window.innerHeight) || 1 // avoid div by 0
                                               //console.log`clientHeight: ${document.body.clientHeight}`
                                               //console.log`scrollHeight: ${document.body.scrollHeight}`
                                               //console.log`innerHeight: ${window.innerHeight}`
                                               //console.log`height: ${height}`
  //const percent = Math.floor( position / height * 100.0 )
  //scroll_updateLevel( percent )
  scroll_updateLevel( Math.floor( position / height * 100.0 ) )
}

const scroll_page = ( factor ) =>
{
  const scroll_o =
  {
    left: 0,
    top:  window.innerHeight * factor,
    behavior: 'smooth'
  }
  window.scrollBy( scroll_o );
  scroll_updatePosition( window.pageYOffset )
}

// HTML page init: must be just before </body>
window.addEventListener('scroll', (e) => { scroll_updatePosition( window.pageYOffset ) })

//========================================================= image.js
// LOG ( `image.js` )
const DOM_getImgDim = ( ID ) =>
{
  const img_e = document.getElementById( ID )
  return { width: img_e.getAttribute( 'data-src-width' ), height: img_e.getAttribute( 'data-src-height' ) }
}

//========================================================= rgb_hsl.js
/**
 * Extract the HSL hue of an RGB color value
 * r, g, and b are contained in the set [0, 255] (clampedArray)
 * returns hue in range [0, hue_n].
 *
 * @param   UInt8  r  The red color value
 * @param   UInt8  g  The green color value
 * @param   UInt8  b  The blue color value
 * @param   UInt16 hue_n hue colors number
 * @return  UInt8  s  HSL Saturation
 */
const getRGBHue = ( r, g, b, hue_n ) =>
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

/**
 * Extract the HSL saturation of an RGB color value
 * r, g, and b are contained in the set [0, 255] (clampedArray)
 * returns saturation in range [0, 100].
 *
 * @param   UInt8  r  The red color value
 * @param   UInt8  g  The green color value
 * @param   UInt8  b  The blue color value
 * @return  UInt8  s  HSL Saturation
 */
const getRGBSaturation = ( r, g, b ) =>
{
  const [ maxLmin, minPmax] = getRGBMinMax( r, g, b )
  if ( maxLmin === 0 ) return 0 // achromatic
  let s = ( ( minPmax / 2 ) > 0.5 ) ?
    maxLmin / ( 2 - maxLmin ) :
    maxLmin / minPmax
  return Math.floor( s * 100 )
}

/**
 * Extract the HSL luminosity of an RGB color value
 * r, g, and b are contained in the set [0, 255] (clampedArray)
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
const getRGBLum = ( r, g, b ) =>
{
  return Math.floor( ( getRGBMinMax( r, g, b )[1] / 2 ) * 100 )
}

const getRGBMinMax = ( r, g, b ) =>
{
  r /= 255
  g /= 255
  b /= 255
  const min = Math.min( r, g, b )
  const max = Math.max( r, g, b )
  return [ max - min, min + max ]
}

const getRGB = ( h, s, l ) =>
{
  let r, g, b

  if (s === 0) r = g = b = l // achromatic
  else
  {
    const H2R = ( p, q, t ) => // hsl to rgb
    {
      if ( t < 0 ) t += 1
      if ( t > 1 ) t -= 1
      if ( t < 0.1666667 ) return p + (q - p) * 6 * t  // 1/6
      if ( t < 0.5 ) return q
      if ( t < 0.6666667 ) return p + (q - p) * (0.6666667 - t) * 6
      return p
    }
    h /= 360
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = H2R( p, q, h + 0.3333334 )
    g = H2R( p, q, h )
    b = H2R( p, q, h - 0.3333334 )
  }

  return [ Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255) ]
}

const getRGBMatrix = ( hue ) =>
{
  const GRAY_DELTA = 0.5
  let red_s, green_s, blue_s
  let matrix_s = DOM_getRootVar( '--M3_FE_MATRIX' )
  if ( hue < 0 ) red_s = green_s = blue_s = DOM_getRootVar( '--M3_FE_MATRIX_GRAY_VALUE' )
  else
  {
    rgb_a   = getRGB( hue, 1, 0.5 )  // normalized HSL
    red_s   = (rgb_a[0] / 255) + GRAY_DELTA
    green_s = (rgb_a[1] / 255) + GRAY_DELTA
    blue_s  = (rgb_a[2] / 255) + GRAY_DELTA
  }
  matrix_s = matrix_s
    .replace( 'R', red_s )
    .replace( 'G', green_s )
    .replace( 'B', blue_s )
  return matrix_s
}

