// ;LOG ( `main.js` )

const MAIN_o =
{
  math:
  {
    pi2_n:    Math.PI * 2,
    radDeg_n: 180 / Math.PI,
  }
}

// : FAST array "functions" (some to inline)
// : a_push : myArray[myArray.length] = _value_
// : a_pop  : var last = myArray[myArray.length--]
// ?? A_shift : original function is best

const A_unshift = ( array_a, item_x ) =>
{
  let length_n = array_a.length
  while ( length_n )
  {
    array_a[length_n] = array_a[length_n-1]
    --length_n
  }
  array_a[0] = item_x
}

const A_splice = ( array_a, index_n ) =>
{
  let length_n = array_a.length
  if ( !length_n ) return
  while ( index_n < length_n )
  { 
    array_a[index_n] = array_a[index_n+1]
    ++index_n
  }
  --array_a.length
}

const A_indexOf__i = ( array_a, item_x ) =>
{
  for ( let at_n = 0, length_n = array_a.length; at_n != length_n ; at_n++) if ( array_a[at_n] === item_x ) return at_n
  return -1
}

const A_lastIndexOf__i = ( array_a, item_x ) =>
{
  let at_n = array_a.length
  while ( at_n-- ) if ( array_a[at_n] === item_x ) break
  return at_n
}

/**
 * A_fill__a ( capacity_n, any_n )
 * @param {UInt32} capacity_n
 * @param {any}  any_x
 */
const A_fill__a = ( capacity_n, any_x ) =>
{
  const fill_a = new Array( capacity_n )
  while ( --capacity_n >= 0 ) fill_a[ capacity_n ] = any_x
  return fill_a;
}

const dateAsLocale__o = ( date_d=null ) =>
{
  let rawNow = !date_d ? new Date() : new Date( date_d )
  const yearNow = rawNow.getFullYear()
  const rawMonth = rawNow.getMonth() + 1
  const monthNow = ( rawMonth < 10 ) ? `0${rawMonth}` : `${rawMonth}`
  const rawDay = rawNow.getDate()
  const dayNow = ( rawDay < 10 ) ? `0${rawDay}` : `${rawDay}`
  const now_s = `${yearNow}-${monthNow}-${dayNow}`
  const locale_s = rawNow.toLocaleDateString( 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' } )    //;console.log( `date: ${dateNow} -- ${today}` )
  return { now_s: now_s, locale_s: locale_s }
}

//========================================================= hash.js
const cyrb53__i = ( string_s, seed_n=0 ) =>
{
  let h1_n = 0xdeadbeef ^ seed_n
  let h2_n = 0x41c6ce57 ^ seed_n
  let char_n
  for ( let at_n = 0; at_n < string_s.length; ++at_n )
  {
    char_n = string_s.charCodeAt( at_n )
    h1_n = Math.imul( h1_n ^ char_n, 2654435761 )
    h2_n = Math.imul( h2_n ^ char_n, 1597334677 )
  }
  h1_n = Math.imul( h1_n ^ h1_n>>>16, 2246822507 ) ^ Math.imul( h2_n ^ h2_n>>>13, 3266489909 )
  h2_n = Math.imul( h2_n ^ h2_n>>>16, 2246822507 ) ^ Math.imul( h1_n ^ h1_n>>>13, 3266489909 )
  return 4294967296 * ( 2097151 & h2_n ) + ( h1_n>>>0 )
}

//========================================================= styles.js
const DOMRootVar = ( varName_s, value_s ) =>
{
  document.documentElement.style.setProperty( varName_s, value_s )
}

const DOMRootVar__s = ( varName_s ) =>
{
  return getComputedStyle( document.documentElement ).getPropertyValue( varName_s ) || ''
}

const DOMResetNode = ( nodeId_s ) =>
{
  const node_e = document.getElementById( nodeId_s )
  while ( node_e.firstChild ) node_e.removeChild( node_e.firstChild )
}

const DOMStyle__s = ( elementId_s, property_s ) =>
{
  let style_e = document.getElementById( elementId_s )
  return ( style_e ) ? window.getComputedStyle( style_e ).getPropertyValue( property_s ) : ''
}

const DOMImgDim__o = ( id_s ) =>
{
  const img_e = document.getElementById( id_s )
  return { width: img_e.getAttribute( 'data-src-width' ), height: img_e.getAttribute( 'data-src-height' ) }
}

const DOMStrimHTML__s = ( string_s ) =>
{
  return string_s.replace( /(<([^>]+)>)/ig, '' )
}

const DOMOpenFolder = ( fold_e ) =>
{
  fold_e.nextElementSibling.classList.toggle( 'ca_is_open' )
  fold_e.parentElement.classList.toggle( 'ca_has_open' )
}

const DOMOpenFolderAll = () =>
{
  const opener_e = document.getElementById( 'ca_folder_opener' )
  const opened_b = opener_e.classList.contains( '_ca_folder_opener_' )  //: a class only for toggling
  opener_e.classList.toggle( '_ca_folder_opener_' )

  const folder_a = document.getElementById( 'ca_folder_container_inner' ).querySelectorAll( '.ca_fold_content' )
  let foldItem_a
  for ( let fold_e of folder_a )
  {
    if ( opened_b )
    {
      fold_e.classList.remove( 'ca_has_open' )
      foldItem_a = fold_e.querySelectorAll( '.ca_fold_content_item' )
      for ( let foldItem_e of foldItem_a ) foldItem_e.classList.remove( 'ca_is_open' )
      continue
    }
    fold_e.classList.add( 'ca_has_open' )
    foldItem_a = fold_e.querySelectorAll( '.ca_fold_content_item' )
    for ( let foldItem_e of foldItem_a ) foldItem_e.classList.add( 'ca_is_open' )
  }
}

/**
 * 
 * @param {*} dialog_o: { header_s: '', content_s: '', mark_s: '', options_a: [ 'option_x', ] }
 */
const DOMDialog = ( dialog_o, noDialog_b ) =>
{
  const type_s = dialog_o.type_s
  dialog_e = document.getElementById( `ca_dialog_is_${type_s}` )
  if ( noDialog_b || ( typeof dialog_e.showModal !== 'function' ) )
  {
    const mark_s = dialog_o.mark_s ? DOMStrimHTML__s( dialog_o.mark_s ) : ''
    window.alert( `${dialog_o.header_s || ''}: ${dialog_o.content_s || ''} (${mark_s})` )
    return
  }
  //: modal dialog
  if ( dialog_o.header_s ) document.getElementById( `ca_dialog_header_is_${type_s}` ).innerHTML = dialog_o.header_s
  if ( dialog_o.content_s ) document.getElementById( `ca_dialog_content_is_${type_s}` )
      .innerHTML = dialog_o.content_s + ( ( dialog_o.mark_s ) ? dialog_o.mark_s : '' )
  if ( dialog_o.options_a === undefined )
  {
    const opt_e = document.getElementById( `ca_dialog_options_is_${type_s}` )
    if ( opt_e ) opt_e.classList.add( 'ca_dialog_option_hidden' )
  }
  else
  {
    options_e = document.getElementById( `ca_dialog_options_is_${type_s}` )
    options_e.classList.remove( 'ca_dialog_option_hidden' )
    const options_a = options_e.querySelectorAll( 'li' )
    for ( let at_n = 0; at_n < options_a.length; ++at_n )
    {
      const isHidden = options_a[at_n].classList.contains( 'ca_dialog_option_hidden' )
      if ( dialog_o.options_a[at_n] )
      {
        options_a[at_n].innerHTML = dialog_o.options_a[at_n]
        options_a[at_n].classList.remove( 'ca_dialog_option_hidden' )
        options_a[at_n].addEventListener('click', () =>
        {
          dialog_o.result = options_a[at_n].id    // ;console.log( `[DOMDialog] dialog_o.result: ${dialog_o.result}` )
          if ( dialog_o.callback_f ) dialog_o.callback_f( dialog_o.result )
          dialog_e.close( dialog_o.result )
        } )
      }
      else if ( !isHidden ) options_a[at_n].classList.add( 'ca_dialog_option_hidden' )
    }
  }
  const cancel_s = dialog_o.cancel || 'cancelled'
  document.getElementById( `ca_dialog_close_is_${type_s}` )
    .addEventListener('click', () => { console.log( `type_s: ${dialog_o.type_s}` ) ;dialog_e.close( cancel_s ) } )
  dialog_e.addEventListener('click', ( event ) => { if ( event.target === dialog_e ) dialog_e.close( cancel_s ) })
  dialog_e.addEventListener('close', ( event ) => { dialog_o.result = dialog_e.returnValue } )
  dialog_e.showModal()
}

const DOMToClipboard = ( clip_o ) =>
{
  const noClipboard = () =>
  {
    clip_o.mark_s += ` impossible`
    DOMDialog( clip_o, true )
  }
  const updateClipboard = () =>
  {
    navigator.clipboard.writeText( clip_o.content_s )
      .then( () => { DOMDialog( clip_o ) },
             () => { noClipboard() } )
  }

  navigator.permissions.query( { name: "clipboard-write" } )
    .then( ( result ) => { if (result.state == "granted" || result.state == "prompt") updateClipboard() })
    .catch( () => { noClipboard() } )
}

const mailtoDialog__s = ( author_s ) =>
{
  const getAddress = ( name, dom ) =>
  {
    const rot13 = ( c ) => { return String.fromCharCode( ( c <= 'Z' ? 90 :122 ) >= ( c = c.charCodeAt(0) + 13 ) ? c : c-26 ) }
    const ident_s = name.replace( /[a-zA-Z]/g, rot13 )
    const dom_s  = dom.replace( /[a-zA-Z]/g, rot13 )
    return `${ident_s}@${dom_s}`
  }

  const dialog_o =
  {
    type_s: 'note',
    header_s: `Adresse pour contacter l'auteur`,
    content_s: getAddress( 'nqhcva', 'purepurheq.neg' ),        //: adupin@chercheurd.art
    mark_s: `<p><mark>copie dans le presse-papier</mark></p>`,
  }
  DOMToClipboard( dialog_o, DOMDialog )
}

/*
const menuTechDialog =  () =>
{
  const dialog_o =
  {
    type_s: 'menu_tech',
    header_s: 'Technologies Web',
    content_s: `Chercheurd.art s'appuie sur les technologies du Web les plus récentes, notamment pour le traitement des images numériques haute-définiition.
    Afin d'en apprécier tous les aspects, je vous recommande d'utiliser en priorité les versions les plus récentes des navigateurs Chrome ou Firefox.`,
    cancel: `Merci de votre visite`
  }
  DOMDialog( dialog_o )
}
*/

const confirmDialog =  ( confirm_s, callback_f ) =>
{
  const dialog_o =
  {
    type_s: 'confirm',
    content_s: confirm_s,
    options_a: [ 'Je renonce', 'Je confirme' ],
    callback_f: callback_f,
  }
  DOMDialog( dialog_o )
}

const statusDialog =  () =>
{
  const dialog_o =
  {
    type_s: 'status',
  }
  DOMDialog( dialog_o )
}

const searchTagsDialog =  () =>
{
  const dialog_o =
  {
    type_s: 'search',
  }
  DOMDialog( dialog_o )
}

const contextDialog =  ( context_s ) =>
{
  const dialog_o =
  {
    type_s: context_s,
  }
  if ( context_s === 'user_file' )
  {
    dialog_o.options_a =  [ 'Abandonner', 'Analyser' ]
    dialog_o.callback_f = userImgFileToIDB
  }
  if ( context_s === 'user_file_modify' )
  {
    dialog_o.options_a =  [ 'Abandonner', 'Modifier' ]
    dialog_o.callback_f = userGalleryItemUpdate
  }
  DOMDialog( dialog_o )
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
      this.loose_b = false
      this.gapX = mouse_e.clientX - this.offsetX
      this.gapY = mouse_e.clientY - this.offsetY
      this.drag_e.addEventListener('mousemove', this, false)
      this.drag_e.addEventListener('mouseup',   this, false)
      return false
    }
  }

  disable ()
  {
    this.loose_b = true
  }

  handleEvent ( mouse_e )
  {
    if ( this.loose_b ) return false
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
      this.loose_b = true
      //return false
    }
  }
}

//========================================================= rgb_hsl.js

/**
 * 
 * @param {Uint8} r : red   color component
 * @param {Uint8} g : green color component
 * @param {Uint8} b : blue  color component
 * 
 * return hue in range [0..359]
 */
const RGB_H__i = ( r, g, b ) =>
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
const RGB_S__i = ( r, g, b ) =>
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
const RGB_L__i = ( r, g, b ) =>
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
const HSL_RGB__o = ( h, s, l ) =>
{
  let r, g, b

  if ( s === 0 ) r = g = b = l // achromatic
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

const HueMatrix__s = ( hue_n ) =>
{
  const GRAY_DELTA = 0.5
  let red_s, green_s, blue_s
  let matrix_s = DOMRootVar__s( '--M3_FE_MATRIX' )
  if ( hue_n < 0 ) red_s = green_s = blue_s = DOMRootVar__s( '--M3_FE_MATRIX_GRAY_VALUE' )
  else
  {
    // ~ rgb_a   = HSL_RGB__o( hue, 100, 50 )  // normalized HSL
    rgb_a   = HSL_RGB__o( hue_n, 1, 0.5 )  // normalized HSL
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
    this.matrixToDOM( animate_a )
  }

  matrix__o ( rgb_o )
  {
    const from_s = `${rgb_o.r0} 0 0 0 0    0 ${rgb_o.g0} 0 0 0    0 0 ${rgb_o.b0} 0 0    0 0 0 1 0`
    const to_s   = `${rgb_o.r1} 0 0 0 0    0 ${rgb_o.g1} 0 0 0    0 0 ${rgb_o.b1} 0 0    0 0 0 1 0`
    return { from_s: from_s, to_s: to_s }
  }
  
  begin__s ( previousID_s, delay_n )
  {
    let begin_s = ( delay_n !== undefined ) ? `${delay_n}s;` : ``
    if ( previousID_s !== undefined ) begin_s += `${previousID_s}.end`
    return begin_s
  }
  
  duration__s ( dur_o )
  {
    return `${dur_o.d}s`
  }
  
  animate__o ( index_n, anim_a )
  {
    const anim_e = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    anim_e.setAttribute( 'id', `${this._animateID}_${index_n}` )
    anim_e.setAttribute( 'attributeType', 'XML' )
    anim_e.setAttribute( 'attributeName', 'values' )
    anim_e.setAttribute( 'dur', this.duration__s( anim_a ) )
    anim_e.setAttribute( 'repeatCount', 1 )
    let from_s, to_s
    ( {from_s, to_s } = this.matrix__o( anim_a ) )
    anim_e.setAttribute( 'from', from_s )
    anim_e.setAttribute( 'to', to_s )
    return anim_e
  }
  
  matrixToDOM ( animate_a )
  {
    const lastIndex_n = animate_a.length - 1
    for (let at_n = 0; at_n <= lastIndex_n; ++at_n )
    {
      const animate_e = this.animate__o( at_n, animate_a[at_n])
      const begin_s = ( at_n === 0 ) ? this.begin__s( `${this._animateID}_${lastIndex_n}`, 0 ) : this.begin__s( `${this._animateID}_${at_n - 1}` )
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

  position__i ( value_n )
  {
    return this.minpos + (( Math.log( value_n ) - this.minlval ) / this.scale )
  }

  //  ?? NOT USED
  //  ?? value__i ( position_n )
  //  ?? {
  //  ??   return Math.exp( (position - this.minpos) * this.scale + this.minlval )
  //  ?? }
  
}

//========================================================= areas.js
const AreaActive__o = ID_s => document.getElementById( `ca_area_${ID_s}` )

const AreaSwap = ( fromID_s, toID_s ) =>
{
  AreaActive__o( fromID_s ).classList.toggle( 'ca_area_active' )
  AreaActive__o( toID_s ).classList.toggle( 'ca_area_active' )
}

const AreaSwitch = ( fromID_s ) =>
{
  const isPerpective_b = document.querySelector( `.ca_area_perspective` ) !== null
  document.getElementById( 'ca_content' ).classList.toggle( 'ca_content_perspective' )
  const area_a = document.getElementsByClassName( 'ca_area' )
  const selectors = document.getElementsByClassName( 'ca_area_selector' )
  const length = selectors.length
  for (let at_n= 0; at_n < length; ++at_n)
  {
    area_a.item( at_n ).classList.toggle( `ca_area_perspective` )
    selectors.item( at_n ).classList.toggle( 'ca_selector_perspective' )
  }
  if ( isPerpective_b ) document.getElementById( fromID_s.replace( 'select_', '') ).classList.toggle( 'ca_area_active' )
  else document.querySelector( `.ca_area_active` ).classList.toggle( 'ca_area_active' )
}

//========================================================= scrollbar.js

const ScrollLevel = ( percent_n ) =>
{
                                        //console.log`percent_n: ${percent_n}`
  document.getElementById( 'ca_grad_down_empty' )
   .setAttribute('offset', `${percent_n}%` )
  document.getElementById( 'ca_grad_down_fill' )
  .setAttribute('offset', `${percent_n}%` )

  percent_n = 100 - percent_n
  document.getElementById( 'ca_grad_up_empty' )
    .setAttribute('offset', `${percent_n}%` )
  document.getElementById( 'ca_grad_up_fill' )
   .setAttribute('offset', `${percent_n}%` )
}

const ScrollPosition = ( position_n ) =>
{
  const height_n = (document.body.scrollHeight - window.innerHeight) || 1 // avoid div by 0
  ScrollLevel( Math.floor( position_n / height_n * 100.0 ) )
}

const ScrollPage = ( factor_n ) =>
{
  const scroll_o =
  {
    left: 0,
    top:  window.innerHeight * factor_n,
    behavior: 'smooth'
  }
  window.scrollBy( scroll_o );
  ScrollPosition( window.pageYOffset )
}
window.addEventListener('scroll', (e) => { ScrollPosition( window.pageYOffset ) })  // : HTML page init must be just before </body>
