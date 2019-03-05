// ;LOG ( `main.js` )
//========================================================= Array.js
// : FAST array "functions" (some to inline)
// : a_push : myArray[myArray.length] = _value_
// : a_pop  : var last = myArray[myArray.length--]
// ?? A_shift : original function is best

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

//========================================================= styles.js

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

const DOM_getStyle = ( elementId, property ) =>
{
  let style_e = document.getElementById( elementId )
  return ( style_e ) ? window.getComputedStyle( style_e ).getPropertyValue( property ) : ''
}

const DOM_getImgDim = ( ID ) =>
{
  const img_e = document.getElementById( ID )
  return { width: img_e.getAttribute( 'data-src-width' ), height: img_e.getAttribute( 'data-src-height' ) }
}

//========================================================= drag.js

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

//========================================================= rgb_hsl.js

/**
 * 
 * @param {UInt8} r : red   color component
 * @param {UInt8} g : green color component
 * @param {UInt8} b : blue  color component
 * 
 * return hue in range [0..359]
 */
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

/**
 * return saturation in range [0..1]
 */
const RGB_S = ( r, g, b ) =>
{
  const min = Math.min( r, g, b )
  const max = Math.max( r, g, b )
  const max_min = max - min
  if ( !max_min ) return 0 // achromatic
  const min_max = min + max
  return ( min_max > 255 ) ? max_min / ( 510 - max - min ) : max_min / min_max
}

/**
 * return luminosity in range [0..1]
 */
const RGB_L = ( r, g, b ) =>
{
  return ( Math.min( r, g, b ) + Math.max( r, g, b ) )  / 510
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * 
 * @param {*} h  range [0..359]
 * @param {*} s  range [0..1]
 * @param {*} l  range [0..1]
 * 
 * return [r,g,b] range [0..1]
 */
const HSL_RGB = ( h, s, l ) =>
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
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    h /= 360
    r = H2R( p, q, h + 0.3333334 )
    g = H2R( p, q, h )
    b = H2R( p, q, h - 0.3333334 )
  }
  return [ r, g, b ]
}

const H_toMatrix = ( hue ) =>
{
  const GRAY_DELTA = 0.5
  let red_s, green_s, blue_s
  let matrix_s = DOM_getRootVar( '--M3_FE_MATRIX' )
  if ( hue < 0 ) red_s = green_s = blue_s = DOM_getRootVar( '--M3_FE_MATRIX_GRAY_VALUE' )
  else
  {
    rgb_a   = HSL_RGB( hue, 1, 0.5 )  // normalized HSL
    // ~ rgb_a   = HSL_RGB( hue, 100, 50 )  // normalized HSL
    red_s   = rgb_a[0] + GRAY_DELTA
    green_s = rgb_a[1] + GRAY_DELTA
    blue_s  = rgb_a[2] + GRAY_DELTA
  }
  matrix_s = matrix_s
    .replace( 'R', red_s )
    .replace( 'G', green_s )
    .replace( 'B', blue_s )
  return matrix_s
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//========================================================= colorMatrix.js

class DOM_FeColorMatrix
{
  constructor ( filterID, animateID, animate_a )
  {
    this._animateID = animateID || 'ca_animate'
    this._filter_e = document.getElementById( filterID )
    this.createMatrix( animate_a )
  }

  toMatrix ( rgb_o )
  {
    const from_s = `${rgb_o.r0} 0 0 0 0    0 ${rgb_o.g0} 0 0 0    0 0 ${rgb_o.b0} 0 0    0 0 0 1 0`
    const to_s   = `${rgb_o.r1} 0 0 0 0    0 ${rgb_o.g1} 0 0 0    0 0 ${rgb_o.b1} 0 0    0 0 0 1 0`
    return { from_s: from_s, to_s: to_s }
  }
  
  toBegin ( previousID, delay )
  {
    let begin_s = ( delay !== undefined ) ? `${delay}s;` : ``
    if ( previousID !== undefined ) begin_s += `${previousID}.end`
    return begin_s
  }
  
  toDuration ( dur_o )
  {
    return `${dur_o.d}s`
  }
  
  createAnimate ( index, anim_a )
  {
    const anim_e = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    anim_e.setAttribute( 'id', `${this._animateID}_${index}` )
    anim_e.setAttribute( 'attributeType', 'XML' )
    anim_e.setAttribute( 'attributeName', 'values' )
    anim_e.setAttribute( 'dur', this.toDuration( anim_a ) )
    anim_e.setAttribute( 'repeatCount', 1 )
    let from_s, to_s
    ( {from_s, to_s } = this.toMatrix( anim_a ) )
    anim_e.setAttribute( 'from', from_s )
    anim_e.setAttribute( 'to', to_s )
    return anim_e
  }
  
  createMatrix ( animate_a )
  {
    const lastIndex = animate_a.length - 1
    for (let at = 0; at <= lastIndex; ++at )
    {
      const animate_e = this.createAnimate( at, animate_a[at])
      const begin_s = ( at === 0 ) ? this.toBegin( `${this._animateID}_${lastIndex}`, 0 ) : this.toBegin( `${this._animateID}_${at - 1}` )
      animate_e.setAttribute( 'begin', begin_s )
      this._filter_e.appendChild( animate_e )
    }
  }
}


//========================================================= LogScale.js
/**
 * Logarithmic scale
 * @param {*} scale_o : { minpos: _n, maxpos: _n, minval: _n, maxval: _n }
 */
class LogScale
{
  constructor ( scale_o )
  {
    // ?? this.maxpos = scale_o.maxpos || 100
    this.minpos = scale_o.minpos || 0
    this.minlval = Math.log( scale_o.minval || 1 )
    this.maxlval = Math.log( scale_o.maxval || 100000 )
    this.scale = ( this.maxlval - this.minlval ) / ( scale_o.maxpos - this.minpos )
  }

  getPosition ( value_n )
  {
    return this.minpos + (( Math.log( value_n ) - this.minlval ) / this.scale )
  }

  //  ?? NOT USED
  //  ?? getValue ( position_n )
  //  ?? {
  //  ??   return Math.exp( (position - this.minpos) * this.scale + this.minlval )
  //  ?? }
  
}

//========================================================= areas.js

const AreaInput = ( ID_s ) =>
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
  if ( isPerpective ) document.getElementById( ID_s.replace( 'select_', '') ).classList.toggle( 'ca_area_active' )
  else document.querySelector( `.ca_area_active` ).classList.toggle( 'ca_area_active' )
}

//========================================================= scrollbar.js

const ScrollLevel = ( percent ) =>
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

const ScrollPosition = ( position ) =>
{
  //const height = (document.body.clientHeight - window.innerHeight) || 1 // avoid div by 0
  const height = (document.body.scrollHeight - window.innerHeight) || 1 // avoid div by 0
                                               //console.log`clientHeight: ${document.body.clientHeight}`
                                               //console.log`scrollHeight: ${document.body.scrollHeight}`
                                               //console.log`innerHeight: ${window.innerHeight}`
                                               //console.log`height: ${height}`
  //const percent = Math.floor( position / height * 100.0 )
  //ScrollLevel( percent )
  ScrollLevel( Math.floor( position / height * 100.0 ) )
}

const ScrollPage = ( factor ) =>
{
  const scroll_o =
  {
    left: 0,
    top:  window.innerHeight * factor,
    behavior: 'smooth'
  }
  window.scrollBy( scroll_o );
  ScrollPosition( window.pageYOffset )
}
window.addEventListener('scroll', (e) => { ScrollPosition( window.pageYOffset ) })  // : HTML page init must be just before </body>


