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
const getRGBLuminosity = ( r, g, b ) =>
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
    .replace( 'B', blue_s )        // ;LOG( `FILTER: ${matrix_s}` )
  return matrix_s
}

//========================================================= color-scan.js
/**
 * JPEG image data scanner
 * @ scan_o : { canvasId: 'ID', imageId: 'ID', hue_n: 360, type: 'JPEG' }
 * @ canvasId: parent HTML canvas ID attribute
 * @ imageId:  HTML image tag ID attribute
 * @ type:     Image type (default = JPEG)
 * @ hue_n:   Number of color spectrum regions to dispatch hues
 * @ useworker: Scan using workers
 */
/**
 * @Class constructor
 * @ scan_o: options
 */
class ColorScan
{
  constructor ( scan_o )
  {
      this._canvasId = scan_o.canvasId
      this._imageId  = scan_o.imageId
      this._hue_n   = scan_o.hue_n || 360
      this._lum_n    = scan_o.lum_n || 0
      this._type     = scan_o.type || 'JPEG'
      this._useworker= scan_o.useworker || false
      this._canvas = null
      this._display = null
      this._image = null
      this._context = null
      this._imageData = null
      this._data = null
      this._hue_a = new Array( this._hue_n )  // : colors dispatched by hue region
      this._lum_a  = new Array( this._lum_n )   // : luminances dispatched in range 0...255

      this._master_w = null  // : worker
      this._slaves_n = 2     // : default
      this._rawscan_a = []

      this.init()
  }

  init ()
  {
    try {
      this._canvas = document.getElementById( this._canvasId )
      this._image = document.getElementById( this._imageId )
      this._canvas.width  = this._image.width
      this._canvas.height = this._image.height
      this._display = this._canvas.style.display
      this._context = this._canvas.getContext( '2d' )
      this._context.drawImage(this._image, 0, 0)
      this._imageData = this._context.getImageData(0, 0, this._image.width, this._image.height)
      this._data = this._imageData.data
      for ( let ath=0; ath < this._hue_n; ++ath ) this._hue_a[ath] = []   // : Prepare Array of Arrays
      if ( this._lum_n > 0 ) for ( let atl=0; atl < M3_TONE_RANGE; ++atl ) this._lum_a[atl] = []   // : Prepare Array of Arrays
    }
    catch (error) {
      console.log( `[class ColorScan]init method error: ${error}`)
    }
    return this
  }

/**
   * Scan the image data
   * Put a pointer to the red pixel of each pixel in one slot of the spectrum
   * according to the pixel hue value (after RGBA to HSL conversion)
   *
   * @return  class instance
   */
  scan ()
  {
                              //////////////////////
                              console.time('scan');
                              //////////////////////
    
    if ( !this._useworker )
      {
      for ( var at = 0; at < this._hue_n; ++at ) this._hue_a[at] = []  // : Prepare
      const _length = this._data.length
      if ( this._lum_n > 0 )  // : luminosity mode
      {
        for (var at = 0; at < _length; at += 4) this._lum_a[getRGBLuminosity( this._data[at], this._data[at+1], this._data[at+2] )].push(at)  // : imageData pointer
      }
      else  // : hue mode
      {
        for (var at = 0; at < _length; at += 4) this._hue_a[getRGBHue( this._data[at], this._data[at+1], this._data[at+2], this._hue_n )].push(at)  // : imageData pointer
      }
                              //////////////////////
                              console.timeEnd('scan');
                              //////////////////////
      return this
    }
    // ======== WORKERS VERSION
    const workerSet_o =
    {
      slaves_n:   this._slaves_n,
      slavesURL:  '../../static/scripts/color-scan-slave_w.js',
      masterMsg:  'SETUP',
      data_sa:    this._data,
      dataLength: this._data.length,
      hue_n:      this._hue_n
    }
    if ( this._master_w === null )
    {
      this._master_w = new Worker( '../../static/scripts/color-scan-master_w.js' )
      this._master_w.addEventListener("message", this.fromMaster.bind(this), true)
      this._master_w.addEventListener("error",   this.handleError.bind(this), true)
      this._master_w.postMessage( workerSet_o )
    }
    return this
  }

  // ==============================================
  // MASTER => MAIN
  fromMaster( master_e )
  {
    this._rawscan_a.push( master_e.data )
    if ( this._rawscan_a.length === this._slaves_n )   // all slaves have completed their work
    {
      let length
      let u32_scan_av
      for ( let at=0; at < this._slaves_n; ++at)
      {
        u32_scan_av = new Uint32Array( this._rawscan_a[at] )    // TypedArray View
        length = u32_scan_av.length
        let ath = 0
        try
        {
          for( ; ath < length; ++ath) this._hue_a[u32_scan_av[ath] >>> 23].push( u32_scan_av[ath] & 0x3FFFFF )  // bits 31-23 (9): hue/index + bits 22-0 (23): pointer
        }
        catch
        {
          console.log(`Error: iteration = ${ath} -- hue: ${u32_scan_av[ath] >>> 23}`)
        }
      }
                            //////////////////////
                            //console.timeEnd('scan');
                            //////////////////////
    }
  }
  
  handleError( e )
  {
    console.log(`error: ${e.message}`)
  }

  getHue_a ()
  {
    return this._hue_a
  }

  getHue_n ()
  {
    return this._hue_n
  }

  getSaturLumen_a ( hue )
  {
    const satur_a = new Int32Array( 100 )
    const lumen_a = new Int32Array( 100 )
    let length = this._hue_a[hue].length
    for ( let at = 0; at < length; ++at )
    {
      const pointer = this._hue_a[hue][at]
      satur_a[getRGBSaturation( this._data[pointer], this._data[pointer+1], this._data[pointer+2] )] += 1
      lumen_a[getRGBLuminosity( this._data[pointer], this._data[pointer+1], this._data[pointer+2] )] += 1
    }
    return [ satur_a, lumen_a ]
  }

  /**
   * Hide or show the image to redraw
   *
   * @param   String isdisplay: to show
   * @return  void
   */
  setDisplay ( isdisplay )
  {
    if ( isdisplay ) {
      this._context.putImageData(this._imageData, 0, 0)
      this.display = 'inline'
    }
    else this.display = 'none'
    this._canvas.style.display = this.display
    return this
  }

/** ??????????
   * Put image data of all pixels pointed in a hue value arc.
   *
   * @param   Integer arci: hue arc index
   * @return  class instance
   */
  setImageData ( arci )
  {
    const length = this._hue_a[arci].length
    for (var ati = 0; ati < length; ++ ati)
    {
      let dataPointer = this._hue_a[arci][ati]
      let atX = dataPointer % this._canvas.width
      let atY = dataPointer / this._canvas.width
      this._context.putImageData(this._imageData, atX, atY, atX, atY, 1, 1)
    }
    return this
  }

/**
   * Set opacity of all pixels pointed in a hue value arc.
   *
   * @param   Integer arci: hue arc index
   * @param   Integer opacity: to be set
   * @return  class instance
   */
  setOpacity ( arci, opacity )
  {
    const length = this._hue_a[arci].length
    for (var ati = 0; ati < length; ++ ati) this._data[this._hue_a[arci][ati]+3] = opacity
    return this
  }

  /**
   * 
   * @param {*} canvasId 
   */
  clone ( canvasId )
  {
    let clone = document.getElementById( canvasId )
    clone.width  = this._canvas.width
    clone.height = this._canvas.height
    clone.context = clone.getContext( '2d' )
    return clone
  }
}

//========================================================= color-console.js
/**
 * @ slidersId: parent HTML SVG ID attribute
 * @ hue_n: Number of color spectrum regions to dispatch hues
 */

/**
 * @Class constructor
 * @ console_o: options
 */
const SLIDER_TOP       = 0
const SLIDER_EQ        = 32
const SLIDER_EQ_COUNT  = 2  // EQ atmax + EQ at min

class ColorConsole
{
  constructor ( console_o )
  {
      this._selectorId    = console_o.selectorId
      this._eqInputId     = console_o.eqInputId
      this._slidersId     = console_o.slidersId
      this._slideId       = console_o.slideId
      this._hue_n         = console_o.hue_n
      this._lum_n         = console_o.lum_n || 0
      this._hueWidth      = 360 / this._hue_n
      this._slideWidth    = Math.floor(( window.innerWidth * 0.95 ) / console_o.hue_n )
      this._selectorWidth = this._hue_n * this._slideWidth
      this._gridColor     = console_o.gridColor || DOM_getRootVar( '--M3_CONSOLE_COLOR' )
      this._onHueChange   = console_o.onHueChange
      this._loose          = false
      this._lastHit       = 0  // default
      this._paint         = null
      this._sliders_a     = []
      this._levels_a      = []

      DOM_setRootVar( '--M3_CONSOLE_WIDTH', this._selectorWidth )
      this.init()
  }

  init ()
  {
    this._paint = SVG( this._selectorId )
      .size( this._selectorWidth, M3_TONE_RANGE + (SLIDER_EQ * SLIDER_EQ_COUNT ) )
      .attr('id', this._slidersId )
      .addClass( this._slidersId )
      .group()
    this.drawColors()
    this.drawSliders()
    this.drawGaps()
    const update_o =
    { 
      arc:   0,
      eq:   true,
      level: 0    //// default: set minimum opacity (i.e. full color)
    }
    this.setSlider ( update_o )
    this._svg_el = document.getElementById( this._slidersId )
    this._svg_el.onmousedown = ( mouse_e ) =>
    {
      this._loose = false
      this._svg_el.addEventListener('mousemove', this, false)
      this._svg_el.addEventListener('mouseup',   this, false)
      this.handleEvent( mouse_e )
      return false
    }
    return this
  }

  drawColors ()
  {
    const step = 100 / this._hue_n * 0.01   // step > 0 && step <= 1
    const hue_n = this._hue_n
    const hueWidth = this._hueWidth
    let fill
    if ( this._lum_n > 0 )// : luminosity mode
    {
      fill = this._paint.gradient( 'linear',
      function(stop)
      {
        for (var at=0; at <= hue_n; ++at) stop.at(step * at, `hsla(0, ${hueWidth * at}%, ${hueWidth * at}%, 1.0)`)
      })
    }
    else  // : hue mode
    {
      fill = this._paint.gradient( 'linear',
      function(stop)
      {
        for (var at=0; at <= hue_n; ++at) stop.at(step * at, `hsla(${hueWidth * at}, 100%, 50%, 1.0)`)
      })
    }
    this._paint
      .rect( this._selectorWidth, M3_TONE_RANGE + (SLIDER_EQ * SLIDER_EQ_COUNT ) )  // ALL transparent + ALL opaque + ALL monotone
      .fill( fill )
      return this
  }

  /**
 * @Draw all sliders
 * First, the opaque sliders for maximum opacity value in only one pass
 * Then every slider, adding for each an entry in the sliders array to be able to modify its value
 */
drawSliders ( )
{
  const sColor  = DOM_getRootVar( '--M3_CONSOLE_COLOR' )
  const cColor  = DOM_getRootVar( '--M3_CONSOLE_COLOR' )
  let at, atHue, atX
  for ( at = atHue = atX = 0; at < this._hue_n; ++at)
  {
    this._sliders_a[at] = { slider: null, cursor: null }
    this._sliders_a[at].slider = this._paint
        .rect( this._slideWidth, M3_TONE_RANGE )
        .fill( { color: sColor, opacity: 1 } )
        .move( atX, SLIDER_TOP )
    this._sliders_a[at].cursor = this._paint
        .line( at * this._slideWidth, SLIDER_TOP, (at * this._slideWidth) + this._slideWidth - 2, SLIDER_TOP )
        .stroke( { color: cColor, width: 4 } )
    atHue += this._hueWidth
    atX += this._slideWidth
  }
  return this
}

drawGaps ()  //// HORIZONTALS
{
  const color = this._gridColor
  const stroke_o = { color: color, width: 4 }
 let length = this._selectorWidth
 for ( let at=0, atY = M3_TONE_RANGE - 1; at < SLIDER_EQ_COUNT; ++at, atY+=SLIDER_EQ )
  {
    this._paint
    .line( 0, atY, length, atY )
    .stroke( stroke_o )
  }
  return this
}

  /**
 * Clicking left: arc set at maximum if above slider range
 *                 arc set at range value if within slider range
 *                 arc set at minimum if bellow slider range
 * Shiftkey :  all arcs set at maximum if above slider range
 *             all arcs set at range value if within slider range
 *             all arcs set at minimum if bellow slider range
 * 
 * @param {*} mouse_e
 */
  handleEvent ( mouse_e )
  {
    if ( this._loose ) return false
    if ( mouse_e.type === 'mouseup' )
    {
      this._loose = true
      this._svg_el.removeEventListener('mousemove', this, true)
      this._svg_el.removeEventListener('mouseup',   this, true)
      return false
    }
    if ( mouse_e.type === 'mousedown' || mouse_e.type === 'mousemove' )
    {
      let bounds = this._svg_el.getBoundingClientRect()
      const atX =  mouse_e.clientX - bounds.left
      const atY =  mouse_e.clientY - bounds.top    // ;LOG(`atY: ${atY}`)
      this._lastHit =  Math.floor( atX / this._slideWidth )
      const update_o =
        { 
          arc:   this._lastHit,
          eq:    document.getElementById( this._eqInputId ).value === '1',
          level: 0    //// default: set minimum opacity (no color, i.e. white)
        }
      if ( atY < M3_TONE_RANGE )  update_o.level = Math.floor( atY ) // slider level
      else
      { 
        if ( atY > (M3_TONE_RANGE + ( SLIDER_EQ * 2 ) ) )  update_o.level = -1    //  hue color monotone
        else if ( atY > (M3_TONE_RANGE + SLIDER_EQ ) ) update_o.level = M3_TONE_RANGE   //// maximum opacity 
          // else update_o.level = Math.floor( 0 ) => default   //// minimum opacity 
      }
      this.setSlider( update_o )
      this._onHueChange( update_o )
    }
  }

  setSlider ( update_o )
  {
    let at = 0
    let stop = this._hue_n
    if ( update_o.eq === false )
    {
      at = update_o.arc
      stop = update_o.arc + 1
    }
    for (; at < stop; ++at)
    {
      this._sliders_a[at].slider
        .opacity( update_o.level / M3_TONE_RANGE )
      this._sliders_a[at].cursor
        .move( at * this._slideWidth, SLIDER_TOP + update_o.level )
      this._levels_a[at] = update_o.level
    }
                                                    // ;LOG(`511-_levels_a: ${this._levels_a}`)
  }
}
//========================================================= color-burst.js
/**
 * Draw a color chart as a burst wheel
 * With a number of bins according to the length of the colors array given as config
 */
const DOUBLE_PI = 2 * Math.PI
const RAD_DEG   = 180 / Math.PI

class ColorBurst
{
  /**
   * 
   * @param {*} settings_o configuration object: { svgId: 'ID', colors_a: [ {hsl: 'hsl(34,100%, 50%)', frequency: 0.0, max: 0 } ]
   */
  constructor ( settings_o )
  {
    this._svgId  = settings_o.svgId
    this._colors = settings_o.colors
    this._max    = settings_o.max
    this._onHueChange = settings_o.onHueChange || null
    this._svg_el = document.getElementById( this._svgId )
    if ( settings_o.onHueChange ) this._svg_el.addEventListener('click', this, false)  
  }

  /**
   * 
   * @param {*} atArc  (IntU32): position of the arc in the wheel
   * @param {*} freq_n (IntU32): frequency ratio of the occurences of a color
   */
  getCoords( atArc, freq_n )
  {
    const sincos = DOUBLE_PI * atArc           // DOUBLE_PI is full circle (360°)
    return [ Math.cos( sincos ) * freq_n, Math.sin( sincos ) * freq_n ]
  }

  /**
   * 
   * @param {*} arcDim (float): Ratio of the full color wheel to be used (full = 1.0, half = 0.5, etc.)
   */
  draw ( arcDim )
  {
    const arc = ( arcDim || 1.0 ) / this._colors.length
    const scale = new LogScale( { minpos: 0, maxpos: 100, minval: 0, maxval: this._max } )
    let cumul = 0
    let at = 0
    this._colors.forEach( color_o =>
    {
      if ( color_o )
      {
        const position_n = scale.getPosition( color_o.frequency )
        const [startX, startY] = this.getCoords( cumul, position_n )  // destructuring assignment sets the two variables at once
        cumul += arc                                    // each color starts where the last color ended, so keep a cumulative bin
        const [endX, endY] = this.getCoords( cumul, position_n )
        
        const path_e = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' )  // create a <path> and append it to the <svg> element
        path_e.setAttribute( 'd', `M ${startX} ${startY} A 1 1 0 0 1 ${endX} ${endY} L 0 0` )
        path_e.setAttribute( 'fill', color_o.hsl )
        this._svg_el.appendChild( path_e )
      }
      else
      {
        cumul += arc    // have to increment however
      }
      at++
    })
  }

  handleEvent ( mouse_e )
  {
    if ( mouse_e.type === 'click' )
    {
      let bounds = this._svg_el.getBoundingClientRect()
      const atX =  mouse_e.clientX - ( bounds.left + ( bounds.width / 2 ) )
      const atY =  mouse_e.clientY - ( bounds.top + ( bounds.height / 2 ) )
      let angle = Math.atan2(atY, atX) * RAD_DEG
      if ( angle < 0 ) angle += 360
      this.atHue = Math.floor( ( angle + 90 ) % 360 )    // rotate default X axis by -90° to set angle origin at 12:00 not at 3:00
      if ( this._onHueChange ) this._onHueChange( this.atHue )
      return false
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
    this.minpos = scale_o.minpos || 0
    //this.maxpos = scale_o.maxpos || 100
    this.minlval = Math.log( scale_o.minval || 1 )
    this.maxlval = Math.log( scale_o.maxval || 100000 )
    this.scale = ( this.maxlval - this.minlval ) / ( scale_o.maxpos - this.minpos )
  }

  getPosition ( value_n )
  {
    return this.minpos + (( Math.log( value_n ) - this.minlval ) / this.scale )
  }

  /* NOT USED
  getValue ( position_n )
  {
    return Math.exp( (position - this.minpos) * this.scale + this.minlval )
  }
  */
}

//========================================================= animationFrames.js
/**
 * Build an array of animation frames: {offset: 1, opacity: 1.0, transform: 'scale(1.0) translate(1px, 1px)'}
 */
class AnimationFrames
{
  constructor ( iWidth, iHeight, frames_a )
  {
    this._frames_a = []
    this._imgWidth = iWidth
    this._imgHeight = iHeight
    this.init( frames_a )
  }

  init ( frames_a )
  {
    const fromX = this._imgWidth / 2
    let atX   = fromX
    const fromY = this._imgHeight / 2
    let atY   = fromY
    let toX = 0
    let toY = 0
    let deltaX, deltaY

    for ( let at = 0; at < frames_a.length; ++at )
    {
      this._frames_a[at] = { offset: frames_a[at].o / 100 }
      if ( frames_a[at].p ) this._frames_a[at].opacity = frames_a[at].p
      let transform = ''
      if ( frames_a[at].s ) transform += `scale(${frames_a[at].s})`
      if ( frames_a[at].t )
      {
        toX = frames_a[at].t[0]
        toY = frames_a[at].t[1]
        deltaX = -(toX - fromX)
        deltaY = -(toY - fromY)
        if ( deltaX || deltaY )
        {
          transform += ` translate(${deltaX}px, ${deltaY}px)`
          atX = toX
          atY = toY
        }
      }
      if ( transform !== '' ) this._frames_a[at].transform = transform
    }
  }

  getFrames ()
  {
    return this._frames_a
  }
}

//========================================================= media_1

M1_process = () =>
{
  try
  {
                                                                                   // ;LOG(`M1_img_e has loaded: ${performance.now()}`)
    const M1_img_e = document.getElementById( 'ca_media_1_img' )
    const M1_anim_f = ( key_e ) =>
    {
      if ( !M1_frames_a ) return    //// TEMPORARY: all works should have a M1_frames_a
      DOM_setRootVar( '--MEDIA_1_CURSOR', 'var(--CURSOR_PLAY)' )
      DOM_setRootVar( '--MEDIA_1_FADEIN_COUNT', 1 )
      const M1_processor_e = document.getElementById( 'ca_media_1_processor_anim' )
      let width, height
      ( { width, height } = DOM_getImgDim( 'ca_media_1_img' ) )
      const imgW = width
      const imgH = height
      const imgRatio = imgW / imgH
      const screenW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      const screenH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      let imgDelta = ( ( screenW > screenH ) ? screenH : screenW ) * 0.25
      if ( ( screenW > imgW ) || ( screenH > imgH ) ) imgDelta *= 0.75
      let borderH, borderV
      if ( imgRatio > 0 )
      {
        borderH = imgDelta * imgRatio
        borderV = imgDelta
      }
      else
      {
        borderH = imgDelta
        borderV = imgDelta * imgRatio
      }
      let clipH = Math.floor( ( imgW * 0.25 ) - borderH )
      let clipV = Math.floor( ( imgH * 0.25 ) - borderV )
      M1_processor_e.style.setProperty( 'clip-path', `inset(${clipV}px ${clipH}px)` )  ; LOG(`clipV: ${clipV} -- clipH: ${clipH}`)
      M1_frames = new AnimationFrames( imgW, imgH, M1_frames_a )
      M1_img_e.animate( M1_frames.getFrames(), M1_anim_o )      // ;LOG( `M1_anim_a: ${M1_frames.getFrames()}`)
      M1_imgAnim = M1_img_e.getAnimations()[0]                  // ;LOG( `M1_imgAnim: ${M1_imgAnim}`)
      M1_imgAnim.finished.then(
        ( ) =>
        {
          M1_img_e.style.setProperty( 'opacity', '1' )
          M1_img_e.style.setProperty( 'transform', `scale( 1 )` )
          M1_processor_e.style.setProperty( 'clip-path', `inset(0px 0px)` )
          M1_imgDrag.start()
          DOM_setRootVar( '--MEDIA_1_CURSOR', 'move' )
        }
      )
    }
    const M1_imgDrag = new DragElement( M1_img_e )
    M1_img_e.addEventListener( 'dblclick', M1_anim_f, false)
  }
  catch ( error )
  {
    console.log(`ERROR DETECTED @M1_process: ${ error }`)
  }
}

//========================================================= media_2
M2_process = () =>
{
  try
  {
                                                                          // ;LOG(`M2_img_e has loaded: ${performance.now()}`)
    const M2_image_e = document.getElementById( 'ca_media_2_img' )
    let width, height
    ( { width, height } = DOM_getImgDim( 'ca_media_2_img' ) )
    DOM_setRootVar( '--MEDIA_PROCESSOR_DIM', ( width < height ) ? '75vmin' : '90vmin' )
  
    const gapX = width / 4
    const vtX = gapX
    const gapY = height / 4
    const hzY = gapY
    const svgNS = 'http://www.w3.org/2000/svg'
    let at
    const svg_e = document.getElementById( 'ca_media_2_processor_lines' )
    svg_e.setAttribute('viewBox', `0 0 ${width} ${height}`)
    const gvert_e = document.createElementNS(svgNS, 'g')
    gvert_e.setAttribute('id','ca_media_2_lines_v')
    for ( at = vtX; at < width; at += gapX )
    {
      const vt_e = document.createElementNS(svgNS, 'line')
      vt_e.setAttribute('x1', `${at}`)
      vt_e.setAttribute('y1', `${0}`)
      vt_e.setAttribute('x2', `${at}`)
      vt_e.setAttribute('y2', `${height}`)
      gvert_e.appendChild( vt_e )
    }
    svg_e.appendChild( gvert_e )
  
    const ghoriz_e = document.createElementNS(svgNS, 'g')
    ghoriz_e.setAttribute('id','ca_media_2_lines_hz')
    for ( at = hzY; at < height; at += gapY )
    {
      const hz_e = document.createElementNS(svgNS, 'line')
      hz_e.setAttribute('x1', `${0}`)
      hz_e.setAttribute('y1', `${at}`)
      hz_e.setAttribute('x2', `${width}`)
      hz_e.setAttribute('y2', `${at}`)
      ghoriz_e.appendChild( hz_e )
    }
    svg_e.appendChild( ghoriz_e )
  
    const diagTLtoBR_e = document.createElementNS(svgNS, 'line')
    diagTLtoBR_e.setAttribute('id','ca_media_2_lines_lr')
    diagTLtoBR_e.setAttribute('x1', `${0}`)
    diagTLtoBR_e.setAttribute('y1', `${0}`)
    diagTLtoBR_e.setAttribute('x2', `${width}`)
    diagTLtoBR_e.setAttribute('y2', `${height}`)
    svg_e.appendChild( diagTLtoBR_e )
  
    const diagTRtoBL_e = document.createElementNS(svgNS, 'line')
    diagTRtoBL_e.setAttribute('id','ca_media_2_lines_rl')
    diagTRtoBL_e.setAttribute('x1', `${width}`)
    diagTRtoBL_e.setAttribute('y1', `${0}`)
    diagTRtoBL_e.setAttribute('x2', `${0}`)
    diagTRtoBL_e.setAttribute('y2', `${height}`)
    svg_e.appendChild( diagTRtoBL_e )
  
    let M2_rotationAt = 0
    let M2_flipAt     = 0
    M2_processInput = ( process_s ) =>
    {
      let transform
      switch ( process_s )
      {
        case 'UNDO':
        {
          M2_rotationAt = 0
          M2_flipAt     = 0
          return
        }
        case 'lines_v':
        case 'lines_hz':
        case 'lines_lr':
        case 'lines_rl':
        {
          const line_e = document.getElementById( `ca_media_2_${process_s}` )
          line_e.style.opacity = ( window.getComputedStyle( line_e )
            .getPropertyValue('opacity') === '1' ) ? 0 : 1
          return
        }
    
        case 'ROTATE_CW':
        {
          M2_rotationAt += 90
          M2_rotationAt %= 360
          transform = `rotate(${M2_rotationAt}deg)`
          break
        }
        case 'ROTATE_CW_R':
        {
          M2_rotationAt -= 90
          M2_rotationAt %= 360
          transform = `rotate(${M2_rotationAt}deg)`
          break
        }
        case 'FLIP_CW':
        {
          M2_flipAt += 180
          M2_flipAt %= 360
          transform = `rotateY(${M2_flipAt}deg)`
          break
        }
        case 'FLIP_CW_R':
        {
          M2_flipAt += 180
          M2_flipAt %= 360
          transform = `rotateX(${M2_flipAt}deg)`
          break
        }
      }
      if ( transform ) document.getElementById( 'ca_media_2_processor' ).style.transform = transform
    }
  }
  catch ( error )
  {
    console.log(`ERROR DETECTED @M2_process: ${ error }`)
  }
}

//========================================================= media_3
M3_process = () =>
  {
    try
    {
                                                                // ;LOG(`M3_img_e has loaded: ${performance.now()}`)
      
      M3_processInput = ( input_s, label_e ) =>
      {
        const input_e = document.getElementById( input_s )
        const type = input_e.getAttribute( 'type' )
        const toggle_b = input_e.value === '1' ? '0' : '1'
        if ( type === 'radio' )
        {
          if ( toggle_b === '0' ) return // already active
          document.querySelector( '.ca_color_pad_input[value="1"]' ).value = '0'
          document.querySelector( '.ca_color_pad_label[value="1"]' ).setAttribute( 'value', '0')
        }
        input_e.value = toggle_b
        label_e.setAttribute( 'value', toggle_b )

        if ( label_e.id === 'ca_media_3_eq_label' ) return
        if ( label_e.id === 'ca_media_3_lum_label' ) return  // TEMPORARY
        const values_s =
            ( label_e.id === 'ca_media_3_hue_label' ) ?  DOM_getRootVar( '--M3_FE_MATRIX_RESET' )
          : ( label_e.id === 'ca_media_3_tone_label' ) ? getRGBMatrix( M3_hueConsole._lastHit )
          : getRGBMatrix( -1 )
          document.getElementById( 'ca_media_3_filter_matrix' )
            .setAttribute( 'values', values_s )
      }
  
      const M3_HUE_N = 360  // ; DOM_getRootVar( '--COLOR_CONSOLE_HUE_N' )   ; LOG(`hue_n: ${hue_n}`)
      let width
      ( { width } = DOM_getImgDim( 'ca_media_3_img' ) )
      DOM_setRootVar( '--MEDIA_PROCESSOR_ATMIN', window.innerWidth / width )
      const M3_scanSettings_o =
      {
        canvasId: 'ca_media_3_processor_canvas',
        imageId:  'ca_media_3_img',
        hue_n:     M3_HUE_N
      }
      M3_processScan = new ColorScan( M3_scanSettings_o )
      M3_processScan
        .setDisplay( 'inline' )
        .scan()    // TODO: debug worker scan
  
      const M3_hueSettings_o =
      {
        selectorId: 'ca_media_3_selector_console',
        eqInputId:  'ca_media_3_eq_input',
        slidersId:  'ca_media_3_selector_sliders',
        slideId:    'ca_media_3_selector_slide',
        hue_n:       M3_HUE_N,

        onHueChange: update_o =>    // : event handle
        {
          M3_processScan.setDisplay()
          if ( !update_o.eq )
          {
            if ( update_o.level >= 0 ) M3_processScan.setOpacity( update_o.arc, (M3_TONE_RANGE - 1) - update_o.level )
          }
          else
          {
            if ( update_o.level >= 0 )
            {
              const length = M3_processScan.getHue_n()
              for ( let ath = 0; ath < length; ++ath) M3_processScan.setOpacity( ath, (M3_TONE_RANGE - 1) - update_o.level )
            }
          }
          M3_processScan.setDisplay('inline')
        }
      }
      const M3_hueConsole = new ColorConsole( M3_hueSettings_o )
    }
    catch ( error )
    {
      console.log(`ERROR DETECTED @M3_process: ${ error }`)
    }
  }

//========================================================= media_4
M4_process = () =>
{
  try
  {
                                                                              // ;LOG(`M4_hue_e has loaded: ${performance.now()}`)
    const M4_hue_e = document.getElementById( 'ca_media_4_huesvg' )
      // Hues
    let M4_hue_a = M3_processScan.getHue_a()
    let hue_n     = M3_processScan.getHue_n()
    let hue_a = []
    let hmaxFreq_n = 0
    let freq_n
    for ( let at = 0; at < hue_n; ++at )
    {
      freq_n = M4_hue_a[at].length
      if ( freq_n > hmaxFreq_n ) hmaxFreq_n = freq_n
      hue_a[at] = freq_n ? { frequency: freq_n, hsl: `hsl(${at}, 100%, 50%)` } : null
    }
  
    let M4_ControlSettings_o =
    {
      svgId   : 'ca_media_4_huesvg',
      colors  : hue_a,
      maxfreq: hmaxFreq_n,
  
      onHueChange: hue =>    // : event handle
      {
        if ( !M4_hue_a[hue] ||  M4_hue_a[hue].length === 0 ) return
        const [ satur_a, lumen_a ] = M3_processScan.getSaturLumen_a( hue )
        const length = satur_a.length
        const saturations_a = []
        const luminosities_a = []
        let smaxFreq_n = 0
        let lmaxFreq_n = 0
        let freq_n
        for ( let at = 0; at < length; ++at )
        {
          freq_n = satur_a[at]
          if ( freq_n > smaxFreq_n ) smaxFreq_n = freq_n
          saturations_a[at] = freq_n ? { frequency: freq_n, hsl: `hsl(${hue}, ${at}%, 50%)` } : null
          freq_n = lumen_a[at]
          if ( freq_n > lmaxFreq_n ) lmaxFreq_n = freq_n
          luminosities_a[at] = freq_n ? { frequency: freq_n, hsl: `hsl(${hue}, 100%, ${at}%)` } : null
        }
        // Saturations
        DOM_resetNode( 'ca_media_4_processor_saturationID' )
        const saturationBurst = new ColorBurst( { svgId: 'ca_media_4_processor_saturationID', colors: saturations_a, maxfreq: smaxFreq_n } )
        saturationBurst.draw()
        // Luminosities
        DOM_resetNode( 'ca_media_4_processor_lumenID' )
        const lumenBurst = new ColorBurst( { svgId : 'ca_media_4_processor_lumenID', colors : luminosities_a, maxfreq: lmaxFreq_n } )
        lumenBurst.draw()
      }
    }
    let M4_Control = new ColorBurst( M4_ControlSettings_o )
    M4_Control.draw()
  }
  catch ( error )
  {
    console.log(`ERROR DETECTED @M4_hue_e: ${ error }`)
  }
}

//========================================================= media
const M_process = ( mediaImg_e ) =>
{
                                                // ;LOG(`M_process: ${performance.now()}`)
  const Mg_imgSrc = mediaImg_e.getAttribute( 'src' )
  const Media_img_a = document.querySelectorAll( '.ca_media_processor_img' )
  for ( let at=0; at < Media_img_a.length; ++at ) Media_img_a[at].setAttribute( 'src', Mg_imgSrc )
  M1_process()
  M2_process()
  M3_process()
  M4_process()
}

//======================
let M2_processInput        // : media_2
let M3_processInput        // : media_3
let M3_processScan         // : media_3 + media_4
const M3_TONE_RANGE = 256  // ; DOM_getRootVar( '--M3_TONE_RANGE' ) ;LOG(`_COLOR_RANGE: ${_COLOR_RANGE}`)

const Mg_img_e = document.getElementById( 'ca_gallery_img' )
if ( Mg_img_e.complete === false ) Mg_img_e.onload = () => { M_process( Mg_img_e ) }
else M_process( Mg_img_e )
