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
      this._canvasId  = scan_o.canvasId
      this._imageId   = scan_o.imageId
      this._hue_n     = scan_o.hue_n
      this._lum_n     = scan_o.lum_n
      this._type      = scan_o.type || 'JPEG'
      this._canvas    = null
      this._display   = null
      this._image     = null
      this._context   = null
      this._imageData = null
      this._data      = null
      this._hue_a     = new Array( this._hue_n )   // : colors dispatched by hue region
      this._lum_a     = new Array( this._lum_n )   // : luminances dispatched in range 0...100
      this._master_w  = null  // : worker
      this._slaves_n  = scan_o.slaves_n || 0
      this._rawscan_a = []

      this.init()
  }

  init ()
  {
    try
    {
      this._canvas        = document.getElementById( this._canvasId )
      this._image         = document.getElementById( this._imageId )
      this._canvas.width  = this._image.width
      this._canvas.height = this._image.height
      this._display       = this._canvas.style.display
      this._context       = this._canvas.getContext( '2d' )

      this._context.drawImage(this._image, 0, 0)
      this._imageData = this._context.getImageData(0, 0, this._image.width, this._image.height)
      this._data = this._imageData.data
      if ( this._hue_n > 0 ) for ( let ath=0; ath < this._hue_n; ++ath ) this._hue_a[ath] = []   // : Prepare Array of Arrays
      if ( this._lum_n > 0 ) for ( let atl=0; atl < this._lum_n; ++atl ) this._lum_a[atl] = []   // : idem
    }
    catch (error)
    {
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
                              ;console.time('scan');
                              //////////////////////
    
    if ( this._slaves_n === 0 )
    {
      try
      {
        for ( let at = 0; at < this._hue_n; ++at ) this._hue_a[at] = []  // : Prepare
        const _length = this._data.length
        if ( this._hue_n > 0 )
        {
          for ( let at = 0; at < _length; at += 4)
          {
            // ; if ( at < 16*4 )  console.log( `hue[${RGB_H( this._data[at], this._data[at+1], this._data[at+2])}]` )
            this._hue_a[RGB_H( this._data[at], this._data[at+1], this._data[at+2])].push(at)  // : imageData pointer
          }
          ;for ( let at=0; at < 32; ++at ) LOG(`@${at}: ${this._hue_a[at].length}`)
        }
        if ( this._lum_n > 0 )
        {
          for ( let at = 0; at < _length; at += 4) this._lum_a[Math.floor(RGB_L( this._data[at], this._data[at+1], this._data[at+2] ) * 100 )].push(at)  // : imageData pointer
        }
      }
      catch (error)
      {
        console.log( `[class ColorScan]init method error: ${error} -- at = ${at}`)
      }
      // ;for ( let at=0; at < this._hue_a.length/90; ++at ) LOG(`@${at}: ${this._hue_a[at].length}`)
                              //////////////////////
                              ;console.timeEnd('scan');
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
      // xx hue_n:      this._hue_n
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

  // ============================
  // MASTER => MAIN
  fromMaster( master_e )
  {
    this._rawscan_a.push( master_e.data )    // ;console.log( `_rawscan_a.length: ${this._rawscan_a.length}` )
    if ( this._rawscan_a.length === this._slaves_n )   // all slaves have completed their work
    {
      let length
      let u32_scan_av
      let at = 0
      for ( ; at < this._rawscan_a.length; ++at)
      {
        u32_scan_av = new Uint32Array( this._rawscan_a[at] )    // TypedArray View
        length = u32_scan_av.length                                 // ;console.log( `length: ${length}` )
        let ath = 0
        try
        {
          for( ; ath < length; ++ath)
          {
            // ..................................
            // ; if ( ath < 16 )  console.log( `hue[${u32_scan_av[ath] >>> 23}] = ${u32_scan_av[ath] & 0x3FFFFF}` )
            this._hue_a[u32_scan_av[ath] >>> 23].push( u32_scan_av[ath] & 0x3FFFFF )  // bits 31-23 (9): hue/index + bits 22-0 (23): pointer
            // ..................................
          }
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          //for ( let b=0; b<360; b+= 12 )  ;console.log( `hue_a @${b}: ${this._hue_a[b].length}` )
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        }
        catch
        {
          console.log(`Error: iteration = ${ath} -- hue: ${u32_scan_av[ath] >>> 23}`)
        }
      }
      // ;for ( let at=0; at < 32; ++at ) LOG(`@${at}: ${this._hue_a[at].length}`)
                            //////////////////////
                            ;console.timeEnd('scan');
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

  getCanvasWidth ()
  {
    return this._canvas.width
  }

  /**
   * Get RGBA value at x/y position
   * @param {*} atX 
   * @param {*} atY 
   * @param {*} ratio: (canvas / screen img) width: > 1
   */
  HSL_RGBA_a ( atX, atY, ratio )
  {
    const atdata_p = ( Math.floor( atY * ratio ) * this._canvas.width * 4 ) + ( Math.floor( atX * ratio ) * 4 )
    return { r: this._data[atdata_p], g: this._data[atdata_p + 1], b: this._data[atdata_p + 2], a: this._data[atdata_p + 3] }
  }

  getSaturLumen_a ( hue )
  {
    const satur_a = new Int32Array( 100 )
    const lumen_a = new Int32Array( 100 )
    let length = this._hue_a[hue].length
    for ( let at = 0; at < length; ++at )
    {
      const pointer = this._hue_a[hue][at]
      satur_a[Math.floor(RGB_S( this._data[pointer], this._data[pointer+1], this._data[pointer+2] ) * 100)] += 1
      lumen_a[Math.floor(RGB_L( this._data[pointer], this._data[pointer+1], this._data[pointer+2] ) * 100)] += 1
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

  /**
   * Set opacity of all pixels pointed in a hue value arc.
   *
   * @param   Integer arci: hue arc index
   * @param   Integer opacity: to be set
   * @return  class instance
   */
  setOpacity ( mode, arci, opacity )
  {
    let length
    if ( mode === 0 )    // : M3_HUE_MODE
    {
      length = this._hue_a[arci].length
      for (var ati = 0; ati < length; ++ ati) this._data[this._hue_a[arci][ati]+3] = opacity
    }
    else    // : M3_LUM_MODE
    {
      length = this._lum_a[arci].length
      for (var ati = 0; ati < length; ++ ati) this._data[this._lum_a[arci][ati]+3] = opacity
    }
    return this
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
const SLIDER_EQ_HEIGHT = 32
const SLIDER_EQ_N      = 2  // EQ atmax + EQ at min

class ColorConsole
{
  constructor ( console_o )
  {
      const arcMax = ( console_o.mode === 'hue' ) ? 360 : 100
      
      this._selectorId     = console_o.selectorId
      this._eqInputId      = console_o.eqInputId
      this._slidersId      = console_o.slidersId
      this._slideId        = console_o.slideId
      this._slider_n       = console_o.slider_n
      this._mode           = console_o.mode
      this._arcWidth       = arcMax / this._slider_n
      this._slideWidth     = Math.floor(( window.innerWidth * 0.92 ) / this._slider_n )
      this._consoleWidth   = this._slider_n * this._slideWidth
      this._gridColor      = console_o.gridColor || DOM_getRootVar( '--M3_CONSOLE_COLOR' )
      this._onSelectHandle = console_o.onSelectHandle

      this._loose          = false
      this._lastHit        = 0    // : default
      this._paint          = null
      this._sliders_a      = []
      this._levels_a       = []

      DOM_setRootVar( '--M3_CONSOLE_WIDTH', this._consoleWidth )
      this.init()
  }

  init ()
  {
    this._paint = SVG( this._selectorId )
      .size( this._consoleWidth, M3_SLIDE_RANGE + (SLIDER_EQ_HEIGHT * SLIDER_EQ_N ) )
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
      level: 0    // : set minimum opacity (i.e. full color)
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
    const step = 100 / this._slider_n * 0.01   // step > 0 && step <= 1
    const hue_n = this._slider_n
    const arcWidth = this._arcWidth
    let fill
    if ( this._mode === 'hue' )
    {
      fill = this._paint.gradient( 'linear',
      function(stop)
      {
        for (var at=0; at <= hue_n; ++at) stop.at(step * at, `hsla(${arcWidth * at}, 100%, 50%, 1.0)`)
      })
    }
    else  // : luminosity mode
    {
      fill = this._paint.gradient( 'linear',
      function(stop)
      {
        for (var at=0; at <= hue_n; ++at) stop.at(step * at, `hsla(0, 0%, ${arcWidth * at}%, 1.0)`)
      })
    }
    this._paint
      .rect( this._consoleWidth, M3_SLIDE_RANGE + (SLIDER_EQ_HEIGHT * SLIDER_EQ_N ) )
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
    for ( at = atHue = atX = 0; at < this._slider_n; ++at)
    {
      this._sliders_a[at] = { slider: null, cursor: null }
      this._sliders_a[at].slider = this._paint
          .rect( this._slideWidth, M3_SLIDE_RANGE )
          .fill( { color: sColor, opacity: 1 } )
          .move( atX, SLIDER_TOP )
      this._sliders_a[at].cursor = this._paint
          .line( at * this._slideWidth, SLIDER_TOP, (at * this._slideWidth) + this._slideWidth - 2, SLIDER_TOP )
          .stroke( { color: cColor, width: 4 } )
      atHue += this._arcWidth
      atX += this._slideWidth
    }
    return this
  }

  drawGaps ()  //// HORIZONTALS
  {
    const color = this._gridColor
    const stroke_o = { color: color, width: 4 }
   let length = this._consoleWidth
   for ( let at=0, atY = M3_SLIDE_RANGE - 1; at < SLIDER_EQ_N; ++at, atY+=SLIDER_EQ_HEIGHT )
  {
    this._paint
    .line( 0, atY, length, atY )
    .stroke( stroke_o )
    }
    return this
  }

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
      const atY =  mouse_e.clientY - bounds.top
      this._lastHit =  Math.floor( atX / this._slideWidth )
      const update_o =
        { 
          arc:      this._lastHit,
          slider_n: this._slider_n,
          eq:       document.getElementById( this._eqInputId ).value === '1',
          level:    0    // : set minimum opacity (no color, i.e. white)
        }
      if ( atY < M3_SLIDE_RANGE )  update_o.level = Math.floor( atY ) // : slider level
      else
      { 
        if ( atY > (M3_SLIDE_RANGE + ( SLIDER_EQ_HEIGHT * 2 ) ) )  update_o.level = -1    // : hue color monotone
        else if ( atY > (M3_SLIDE_RANGE + SLIDER_EQ_HEIGHT ) ) update_o.level = M3_SLIDE_RANGE   // : maximum opacity 
          // :else update_o.level = Math.floor( 0 ) => default   // : minimum opacity 
      }
      this.setSlider( update_o )
      this._onSelectHandle( update_o )
    }
  }

  setSlider ( update_o )
  {
    let at = 0
    let stop = this._slider_n
    if ( update_o.eq === false )
    {
      at = update_o.arc
      stop = update_o.arc + 1
    }
    for (; at < stop; ++at)
    {
      this._sliders_a[at].slider
        .opacity( update_o.level / M3_SLIDE_RANGE )
      this._sliders_a[at].cursor
        .move( at * this._slideWidth, SLIDER_TOP + update_o.level )
      this._levels_a[at] = update_o.level
    }
  }

  getSlideWidth ()
  {
    return this._slideWidth
  }

  setHit ( hue )
  {
    this._lastHit = hue
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

//========================================================= overlay_splitter.js

class OverlaySplitter
{
  constructor ( splitter_o )
  {
    this._splitter_e = document.getElementById( splitter_o.splitterID )
    this._front_e    = document.getElementById( splitter_o.frontID )
    this._clipClass  = splitter_o.clipClass
    this._clipVar    = splitter_o.clipVar
    this._isOn = false                                                         // ;LOG( `_isOn: ${this._isOn}` ) 
  }

  start ()
  {
    this._front_e.classList.toggle( this._clipClass )
    this.clip()
    this._splitter_e.addEventListener( 'click', this, false )
  }

  pause ()
  {
    this._splitter_e.removeEventListener( 'mousemove', this, false )
  }

  stop ()
  {
    this.pause()
    this._front_e.classList.toggle( this._clipClass )
  }

  clip ( position )
  {
    const offset = parseInt( window.getComputedStyle( this._front_e).width.replace( 'px', '') )  // ;LOG( `offset: ${offset}` )                 // : optimum sweep in screen center half
    if ( position === undefined ) position = offset * 0.5
    DOM_setRootVar( this._clipVar, `${offset - position}px` )
  }

  handleEvent ( mouse_e )
  {
    if ( mouse_e.type === 'click' )
    {
      if ( !this._isOn )
      {
        this._isOn = true
        this._splitter_e.addEventListener( 'mousemove', this, false )
        return
      }
      this._isOn = false
      this.pause()
      return
    }
    if ( ( mouse_e.type === 'mousemove' ) && this._isOn ) this.clip( mouse_e.clientX )
  }
}

//========================================================= color-burst.js
/**
 * Compare original vs filtered images
 */
class ImageSplitter
{
  constructor ( splitter_o )
  {
    this._splitter_e = document.getElementById( splitter_o.viewID )
    this._front_e    = document.getElementById( splitter_o.frontID )
    this._isOn = false
  }

  handleEvent ( mouse_e )
  {
    const offset = parseInt( window.getComputedStyle( this._front_e).width.replace( 'px', '') ) * 0.66    // : optimum sweep in screen center half
    const delta  = ( mouse_e.clientX - ( offset * 0.5 ) ) * 0.5                                           // : delta between mouse position and center point.
    this._front_e.style.width = `${mouse_e.clientX + offset + delta}px`                                   // : adjust front split width.
  }

  start ()
  {
    if ( !this._isOn )
    {
      this._splitter_e.addEventListener( 'mousemove', this, false )
      this._isOn = true
    }
  }
  stop ()
  {
    if ( this._isOn )
    {
      this._splitter_e.removeEventListener( 'mousemove', this, false )
      this._isOn = false
    }
  }

  isOn ()
  {
    return this._isOn
  }
}

