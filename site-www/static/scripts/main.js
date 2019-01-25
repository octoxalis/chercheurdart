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
    //this.keep_b = keep_b || false

    drag_e.onmousedown = ( mouse_e ) =>
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
      if ( true ) //if ( !this.keep_b )
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


