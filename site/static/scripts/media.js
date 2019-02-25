//========================================================= media_1

M1_process = () =>
{
  try
  {
                                                                                   // ;LOG(`M1_img_e has loaded: ${performance.now()}`)
    const M1_img_e = document.getElementById( 'ca_media_1_img' )
    const M1_anim_f = ( key_e ) =>
    {
      if ( !M1_frames_a ) return    //~ TEMPORARY: all works should have a M1_frames_a
      DOM_setRootVar( '--MEDIA_1_CURSOR', 'var(--CURSOR_PLAY)' )
      // ?? DOM_setRootVar( '--MEDIA_1_FADEIN_COUNT', 2 )
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
      M1_processor_e.style.setProperty( 'clip-path', `inset(${clipV}px ${clipH}px)` )  ; // ;LOG(`clipV: ${clipV} -- clipH: ${clipH}`)
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
    M2_consoleInput = ( process_s ) =>
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
          line_e.style.opacity = ( DOM_getStyle( line_e, 'opacity') === '1' ) ? 0 : 1
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
      
      const M3_toggleSplitter = ( setOn ) =>
      {
        if ( setOn )
        {
          M3_splitter.start()
          return
        }
        M3_splitter.stop()
      }

      const M3_toggleConsole = () =>
      {
        document.getElementById( 'ca_media_3_color_selector' )
         .classList.toggle('ca_media_3_color_selector_mute')
      }

      const M3_toggleColorPicker = ( add_b ) =>
      {
        M3_toggleConsole()
        const canvas_e = document.getElementById( 'ca_media_3_processor_canvas' )
        canvas_e.classList.toggle('ca_media_3_color_picker')
        document.getElementById( 'ca_color_processor_trace' )
         .classList.toggle('ca_color_trace_show')
        if ( add_b )
        {
          canvas_e.addEventListener( 'click', M3_colorPickerInput, false )
          canvas_e.addEventListener( 'mousemove', M3_processorTrace, false)    // : higher order function
        }
        else
        {
          canvas_e.removeEventListener( 'click', M3_colorPickerInput, false )
          canvas_e.removeEventListener( 'mousemove', M3_processorTrace, false)    // : higher order function
        }
      }

      const M3_colorPickerGetRGBA = ( mouse_e ) =>
      {
        const ewidth = DOM_getStyle( 'ca_media_3_processor_canvas', 'width').replace( 'px', '' )
        const cwidth = M3_scan.getCanvasWidth()
        return M3_scan.HSL_RGBA_a( mouse_e.clientX, mouse_e.clientY, cwidth / ewidth )
      }

      const M3_colorPickerGetHSLA = ( mouse_e ) =>
      {
        const ewidth = DOM_getStyle( 'ca_media_3_processor_canvas', 'width').replace( 'px', '' )
        const cwidth = M3_scan.getCanvasWidth()
        return M3_scan.HSL_HSLA_a ( mouse_e.clientX, mouse_e.clientY, cwidth / ewidth )
      }

      const M3_processorTrace = ( mouse_e ) =>
      {
          let h, s, l, a
          ( { h, s, l, a } = M3_colorPickerGetHSLA( mouse_e) )
          document.getElementById( 'ca_color_processor_trace' )
            .innerHTML = `H:${h} S:${Math.floor(s * 100)} L:${Math.floor(l * 100)} A:${Math.floor(a / 255 * 100)}`
      }

      const M3_colorPickerInput = ( mouse_e ) =>
      {
        let r, g, b, a
        ( { r, g, b, a } = M3_colorPickerGetRGBA( mouse_e) )
        M3_hueConsole.setHit( RGB_H( r, g, b ) )
        M3_toggleColorPicker( false )  // : remove event
      }

      M3_consolePadInput = ( input_s, label_e ) =>
      {
        const input_e = document.getElementById( input_s )
        const type = input_e.getAttribute( 'type' )
        const toggle_b = input_e.value === '1' ? '0' : '1'
        if ( type === 'radio' )
        {
          if ( toggle_b === '0' ) return // already active
          document.querySelector( '.ca_media_3_pad_input_radio[value="1"]' ).value = '0'
          document.querySelector( '.ca_media_3_pad_label[value="1"]' ).setAttribute( 'value', '0')
        }
        input_e.value = toggle_b
        label_e.setAttribute( 'value', toggle_b )

        let values_s = DOM_getRootVar( '--M3_FE_MATRIX_RESET' )
        switch ( label_e.id )
        {
          case 'ca_media_3_split_label':
          {
            M3_toggleSplitter( ( toggle_b === '1' ) ? true : false )  // : start || stop
            return
          }
          case 'ca_media_3_hue_label':
          case 'ca_media_3_lum_label':
          {
            document.getElementById( 'ca_media_3_selector_hue_console' )
              .classList.toggle('ca_color_selector_console_active')
            document.getElementById( 'ca_media_3_selector_lum_console' )
              .classList.toggle('ca_color_selector_console_active')
            const slideWidth = ( label_e.id === 'ca_media_3_hue_label' ) ? M3_hueConsole.getSlideWidth() : M3_lumConsole.getSlideWidth()  // ; LOG( `slideWidth: ${slideWidth}` )
            DOM_setRootVar( '--M3_SLIDE_WIDTH', slideWidth )
            return;
          }
          case 'ca_media_3_tone_label':
          {
            if ( toggle_b === '1' ) values_s = H_toMatrix( M3_hueConsole._lastHit )
            break;
          }
          case 'ca_media_3_gray_label':
          {
            if ( toggle_b === '1' ) values_s = H_toMatrix( -1 )
            break;
          }
          case 'ca_media_3_pick_label':
          {            // : M3_FE_MATRIX_RESET already selected
            M3_toggleColorPicker( true )  // : add event
            break;
          }
          default: return  // ?? error
        }
        document.getElementById( 'ca_media_3_filter_matrix' )
          .setAttribute( 'values', values_s )
      }

      const M3_consoleSlideInput = update_o =>    // : event handle
      {
        M3_scan.setDisplay()
        const M3_HUE_MODE = 0
        const M3_LUM_MODE = 1
        const mode = ( document.getElementById( 'ca_media_3_hue_input' ).value === '1' ) ? M3_HUE_MODE : M3_LUM_MODE   // ; LOG( `mode: ${mode}` )
        // .................................................
        if ( !update_o.eq )
        {
          if ( update_o.level >= 0 ) M3_scan.setOpacity( mode, update_o.arc, (M3_SLIDE_RANGE - 1) - update_o.level )
        }
        else
        {
          if ( update_o.level >= 0 )
          {
            const length = update_o.slider_n
            for ( let at = 0; at < length; ++at) M3_scan.setOpacity( mode, at, (M3_SLIDE_RANGE - 1) - update_o.level )
          }
        }
        // .................................................
        M3_scan.setDisplay('inline')
      }
      
      const M3_consoleTrace = ( mouse_e ) =>
      {
        const offsetX = DOM_getStyle( 'ca_media_3_selector_hue_console', 'left').replace( 'px', '' )
        const atX = mouse_e.clientX - offsetX
        const slideW = DOM_getRootVar( '--M3_SLIDE_WIDTH' )
        document.getElementById( 'ca_color_selector_trace' ).innerHTML = `${Math.floor( atX / slideW )}`
      }


      const M3_scanSettings_o =
      {
        canvasId: 'ca_media_3_processor_canvas',
        imageId:  'ca_media_3_img',
        hue_n:     M3_HUE_N,
        lum_n:     M3_LUM_N,
      }
      M3_scan = new ColorScan( M3_scanSettings_o )
      M3_scan
        .setDisplay( 'inline' )
        .scan()

      const M3_hueSettings_o =
      {
        mode:       'hue',
        selectorId: 'ca_media_3_selector_hue_console',
        eqInputId:  'ca_media_3_eq_input',
        slidersId:  'ca_media_3_selector_hue_sliders',
        slideId:    'ca_media_3_selector_slide',
        handle: M3_consoleSlideInput,
        slider_n:   M3_HUE_N,
      }
      const M3_hueConsole = new ColorConsole( M3_hueSettings_o )
      DOM_setRootVar( '--M3_SLIDE_WIDTH', M3_hueConsole.getSlideWidth() )

      const M3_lumSettings_o =
      {
        mode:       'lum',
        selectorId: 'ca_media_3_selector_lum_console',
        eqInputId:  'ca_media_3_eq_input',
        slidersId:  'ca_media_3_selector_lum_sliders',
        slideId:    'ca_media_3_selector_slide',
        handle: M3_consoleSlideInput,
        slider_n:   M3_LUM_N,
      }
      const M3_lumConsole = new ColorConsole( M3_lumSettings_o )

      const M3_splitter_o =
      {
        splitterID:  'ca_media_3_overlay_splitter',
        frontID:     'ca_media_3_processor_canvas',
        clipClass:   'ca_overlay_split_clipping',
        clipVar:     '--M3_OVERLAY_SPLIT_INSET',
      }
      const M3_splitter = new OverlaySplitter( M3_splitter_o )

      document.getElementById( 'ca_media_3_selector_console' )
        .addEventListener( 'mousemove', M3_consoleTrace, false)    // : higher order function
      
      M4_process()    // : chaining: M4_process uses M3_scan
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
    let M4_hue_a = M3_scan.getHue_a()
    let hue_n    = M3_HUE_N
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
        const [ satur_a, lumen_a ] = M3_scan.getSaturLumen_a( hue )
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
        DOM_resetNode( 'ca_media_4_processor_satID' )        // : Saturations
        const saturationBurst = new ColorBurst( { svgId: 'ca_media_4_processor_satID', colors: saturations_a, maxfreq: smaxFreq_n } )
        saturationBurst.draw()
        DOM_resetNode( 'ca_media_4_processor_lumID' )        // : Luminosities
        const lumenBurst = new ColorBurst( { svgId : 'ca_media_4_processor_lumID', colors : luminosities_a, maxfreq: lmaxFreq_n } )
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

//========================================================= media_1234
const M_init = () =>
{
  const src = M_img_e.getAttribute( 'src' )
  const img_a = document.querySelectorAll( '.ca_media_processor_img' )
  for ( let at=0; at < img_a.length; ++at ) img_a[at].setAttribute( 'src', src )

  M1_process()
  M2_process()
  M3_process()    // : => M4_process()
}

//========================================================= main
const M3_HUE_N       = 360    // : range [ 0..359 ]
const M3_LUM_N       = 101    // : range [ 0..100 ]
const M3_SLIDE_RANGE = 256    // : --M3_SLIDE_RANGE

let M2_consoleInput           // : media_2
let M3_consolePadInput         // : media_3
let M3_scan                   // : media_3 + media_4

const M_img_e = document.getElementById( 'ca_gallery_img' )
if ( M_img_e.complete === false ) M_img_e.onload = () => { M_init() }
else M_init()
