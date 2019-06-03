var CA_media_o =
{
  M_img_e: null,
  M1_input__v: null,
  M2_input_f: null,
  M3_input_f: null,
  M3_scan_i: null,
  SLIDE_RANGE: 256,
}

//========================================================= media_1
const M1_process = () =>
{
  try
  {
    let M1_drag = null
    let M1_anim = null
    let M1_frames = null
    let M1_animForward_b = true
    
    let M1_img_e = document.getElementById( 'ca_media_1_img' )
    let M1_play_pause_a = document.getElementById( 'ca_media_1_control_play_pause' )
      .querySelectorAll( '.ca_layout_switch' )
    let M1_drag_stop_a = document.getElementById( 'ca_media_1_control_drag_stop' )
      .querySelectorAll( '.ca_layout_switch' )
    let M1_processor_e = document.getElementById( 'ca_media_1_processor_anim' )
    
    const M1_startDrag = () =>
    {
      if ( M1_drag === null ) M1_drag = new DragElement( M1_img_e )
      M1_drag.start()
      DOMRootVar( '--M1_CURSOR', 'move' )
    }
    
    const M1_playAnimation = () =>
    {
      if ( M1_anim === null ) M1_anim_f()
      else M1_anim.play()
      M1_setPlay_PauseIcon()
      if ( M1_isDragActive() ) M1_setDrag_StopIcon()
    }
    
    const M1_pauseAnimation = () =>
    {
      M1_anim.pause()
      M1_setPlay_PauseIcon()
    }
    
    const M1_stopAnimation = () =>
    {
      M1_anim.cancel()
      if ( !M1_isPlayActive() ) M1_setPlay_PauseIcon()
      M1_setDrag_StopIcon()
      M1_resetProcessor()
    }
    
    const M1_setPlaybackRate = () =>
    {
      const RATE_STEP = 0.25
      let rate = M1_anim.playbackRate
      rate = ( rate < ( RATE_STEP * 32 ) ) ? rate + RATE_STEP : RATE_STEP    //: rolling rate
      M1_anim.playbackRate = rate
    }
    
    const M1_setPlay_PauseIcon = () =>
    {
      M1_play_pause_a[0].classList.toggle( 'ca_layout_switch_active' )
      M1_play_pause_a[1].classList.toggle( 'ca_layout_switch_active' )
    }
    
    const M1_setDrag_StopIcon = () =>
    {
      M1_drag_stop_a[0].classList.toggle( 'ca_layout_switch_active' )
      M1_drag_stop_a[1].classList.toggle( 'ca_layout_switch_active' )
    }
    
    const M1_resetProcessor = () =>
    {
      M1_img_e.style.setProperty( 'opacity', '1' )
      M1_img_e.style.setProperty( 'transform', `scale( 1 )` )
      M1_processor_e.style.setProperty( 'clip-path', `inset(0px 0px)` )
    }
    
    const M1_anim_f = () =>
    {
      if ( !M1_frames_a || !M1_img_e || !M1_processor_e ) return    //~ TEMPORARY: all works should have a M1_frames_a
      const CLIP_RATIO = 0.1
      let clipH = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * CLIP_RATIO
      let clipV = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * CLIP_RATIO
      let width, height
      ( { width, height } = DOMImgDim__o( 'ca_media_1_img' ) )
      M1_processor_e.style.setProperty( 'clip-path', `inset(${clipV}px ${clipH}px)` )
      M1_frames = new AnimationFrames( width, height, M1_frames_a )
      M1_anim = M1_img_e.animate( M1_frames.getFrames(), M1_anim_o )
      M1_anim.playbackRate = 1
    }
    
    const M1_isPlayActive = () => M1_play_pause_a[0].classList.contains( 'ca_layout_switch_active' )
    const M1_isDragActive = () => M1_drag_stop_a[0].classList.contains( 'ca_layout_switch_active' )
    
    CA_media_o.M1_input__v = ( process_s ) =>
    {
      switch ( process_s )
      {
        case 'PLAY_PAUSE':
        {
          if ( M1_isPlayActive() )
          {
            M1_playAnimation()
            DOMRootVar( '--M1_CURSOR', 'auto' )
          }
          else M1_pauseAnimation()
          break
        }
        case 'DRAG_STOP':
        {
          if ( M1_isDragActive() ) M1_startDrag()
          else M1_stopAnimation()
          
          break
        }
        case 'FAST_BACKWARD':
        {
          if ( M1_anim === null ) break
          if ( M1_animForward_b )
          {
            M1_anim.reverse()
            M1_animForward_b = false
          }
          M1_setPlaybackRate()
          break
        }
        case 'FAST_FORWARD':
        {
          if ( M1_anim === null ) break
          if ( !M1_animForward_b )
          {
            M1_anim.reverse()
            M1_animForward_b = true
          }
          M1_setPlaybackRate()
          break
        }
      }
    }

    document.getElementById( 'ca_media_1_control_pad' )
      .addEventListener('click', event_o =>
      {
      const div_e = event_o.target.closest('.ca_media_control_key')
      if ( div_e.id === 'ca_media_1_control_play_pause' ) return CA_media_o.M1_input__v('PLAY_PAUSE')
      if ( div_e.id === 'ca_media_1_control_drag_stop' ) return CA_media_o.M1_input__v('DRAG_STOP')
      if ( div_e.id === 'ca_media_1_control_forward' ) return CA_media_o.M1_input__v('FAST_FORWARD')
      if ( div_e.id === 'ca_media_1_control_backward' ) return CA_media_o.M1_input__v('FAST_BACKWARD')
      } )
  }
  catch ( error ) { console.log(`ERROR DETECTED @M1_process: ${ error }`) }
}


//========================================================= media_2
const M2_process = () =>
{
  try
  {
                                                                          // ;LOG(`M2_img_e has loaded: ${performance.now()}`)
    const M2_image_e = document.getElementById( 'ca_media_2_img' )
    let width, height
    ( { width, height } = DOMImgDim__o( 'ca_media_2_img' ) )
    DOMRootVar( '--MEDIA_PROCESSOR_DIM', ( width < height ) ? '75vmin' : '90vmin' )
  
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
    CA_media_o.M2_input_f = ( process_s ) =>
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
          line_e.style.opacity = ( line_e.style.opacity === '0' ) ? '1' : '0'
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

    document.getElementById( 'ca_media_2_control_pad' )
    .addEventListener('click', event_o =>
    {
      const media_s = 'media_2'
      const div_e = event_o.target.closest('.ca_media_control_key')
      if ( div_e.id === `ca_${media_s}_control_rotate_cw` ) return CA_media_o.M2_input_f('ROTATE_CW')
      if ( div_e.id === `ca_${media_s}_control_lines_v` ) return CA_media_o.M2_input_f('lines_v')
      if ( div_e.id === `ca_${media_s}_control_rotate_cw_r` ) return CA_media_o.M2_input_f('ROTATE_CW_R')
      if ( div_e.id === `ca_${media_s}_control_lines_lr` ) return CA_media_o.M2_input_f('lines_lr')
      if ( div_e.id === `ca_${media_s}_control_undo` ) return CA_media_o.M2_input_f('UNDO')
      if ( div_e.id === `ca_${media_s}_control_lines_rl` ) return CA_media_o.M2_input_f('lines_rl')
      if ( div_e.id === `ca_${media_s}_control_flip_cw` ) return CA_media_o.M2_input_f('FLIP_CW')
      if ( div_e.id === `ca_${media_s}_control_lines_hz` ) return CA_media_o.M2_input_f('lines_hz')
      if ( div_e.id === `ca_${media_s}_control_flip_cw_r` ) return CA_media_o.M2_input_f('FLIP_CW_R')
    } )
  }
  catch ( error ) { console.log(`ERROR DETECTED @M2_process: ${ error }`) }
}

//========================================================= media_3
const M3_process = () =>
{
  try
  {
    // ;LOG(`M3_img_e has loaded: ${performance.now()}`)
    const M3_HUE_N       = 360    // : range [ 0..359 ]
    const M3_LUM_N       = 101    // : range [ 0..100 ]
        
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
      document.getElementById( 'ca_media_3_processor_trace' )
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
      const ewidth = DOMStyle__s( 'ca_media_3_processor_canvas', 'width').replace( 'px', '' )
      const cwidth = CA_media_o.M3_scan_i.getCanvasWidth()
      return CA_media_o.M3_scan_i.HSL_RGBA_a( mouse_e.clientX, mouse_e.clientY, cwidth / ewidth )
    }

    const M3_colorPickerGetHSLA = ( mouse_e ) =>
    {
      const ewidth = DOMStyle__s( 'ca_media_3_processor_canvas', 'width').replace( 'px', '' )
      const cwidth = CA_media_o.M3_scan_i.getCanvasWidth()
      return CA_media_o.M3_scan_i.HSL_HSLA_a ( mouse_e.clientX, mouse_e.clientY, cwidth / ewidth )
    }

    const M3_processorTrace = ( mouse_e ) =>
    {
      let h, s, l, a
      ( { h, s, l, a } = M3_colorPickerGetHSLA( mouse_e) )
      document.getElementById( 'ca_media_3_processor_trace_H_v' )
        .innerHTML = h
      document.getElementById( 'ca_media_3_processor_trace_S_v' )
        .innerHTML = Math.floor(s * 100)
      document.getElementById( 'ca_media_3_processor_trace_L_v' )
        .innerHTML = Math.floor(l * 100)
      document.getElementById( 'ca_media_3_processor_trace_A_v' )
        .innerHTML = Math.floor(a / 255 * 100)
    }
    
    const M3_colorPickerInput = ( mouse_e ) =>
    {
      let r, g, b, a
      ( { r, g, b, a } = M3_colorPickerGetRGBA( mouse_e) )
      M3_hueConsole.setHit( RGB_H__i( r, g, b ) )
      M3_toggleColorPicker( false )  // : remove event
    }
    CA_media_o.M3_input_f = ( label_e ) =>
    {
      const input_e = document.getElementById( label_e.getAttribute( 'for') )
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
      let values_s = DOMRootVar__s( '--M3_FE_MATRIX_RESET' )
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
          DOMRootVar( '--M3_SLIDE_WIDTH', slideWidth )
          return;
        }
        case 'ca_media_3_tone_label':
        {
          if ( toggle_b === '1' ) values_s = HueMatrix__s( M3_hueConsole._lastHit )
          break;
        }
        case 'ca_media_3_gray_label':
        {
          if ( toggle_b === '1' ) values_s = HueMatrix__s( -1 )
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
        CA_media_o.M3_scan_i.setDisplay()
        const M3_HUE_MODE = 0
        const M3_LUM_MODE = 1
        const mode = ( document.getElementById( 'ca_media_3_hue_input' ).value === '1' ) ? M3_HUE_MODE : M3_LUM_MODE   // ; LOG( `mode: ${mode}` )
        // .................................................
        if ( !update_o.eq )
        {
          if ( update_o.level >= 0 ) CA_media_o.M3_scan_i.setOpacity( mode, update_o.arc, (CA_media_o.SLIDE_RANGE - 1) - update_o.level )
        }
        else
        {
          if ( update_o.level >= 0 )
          {
            const length = update_o.slider_n
            for ( let at = 0; at < length; ++at) CA_media_o.M3_scan_i.setOpacity( mode, at, (CA_media_o.SLIDE_RANGE - 1) - update_o.level )
          }
        }
        // .................................................
        CA_media_o.M3_scan_i.setDisplay('inline')
    }
    
    const M3_consoleTrace = ( mouse_e ) =>
    {
      const atX = mouse_e.clientX - document.getElementById( 'ca_media_3_selector_hue_console' ).getBoundingClientRect().left
      const slideW = DOMRootVar__s( '--M3_SLIDE_WIDTH' )
      document.getElementById( 'ca_media_3_trace_label' ).innerHTML = `${Math.floor( atX / slideW )}`
    }

    const scanSettings_o =
    {
      canvasId: 'ca_media_3_processor_canvas',
      imageId:  'ca_media_3_img',
      hue_n:     M3_HUE_N,
      lum_n:     M3_LUM_N,
    }
    CA_media_o.M3_scan_i = new ColorScan( scanSettings_o )
    CA_media_o.M3_scan_i
      .setDisplay( 'inline' )
      .scan()
    
    const M3_hueSettings_o =
    {
      mode:       'hue',
      selectorId: 'ca_media_3_selector_hue_console',
      eqInputId:  'ca_media_3_uni_input',
      slidersId:  'ca_media_3_selector_hue_sliders',
      slideId:    'ca_media_3_selector_slide',
      handle: M3_consoleSlideInput,
      slider_n:   M3_HUE_N,
    }
    const M3_hueConsole = new ColorConsole( M3_hueSettings_o )
    DOMRootVar( '--M3_SLIDE_WIDTH', M3_hueConsole.getSlideWidth() )
    const M3_lumSettings_o =
    {
      mode:       'lum',
      selectorId: 'ca_media_3_selector_lum_console',
      eqInputId:  'ca_media_3_uni_input',
      slidersId:  'ca_media_3_selector_lum_sliders',
      slideId:    'ca_media_3_selector_slide',
      handle: M3_consoleSlideInput,
      slider_n:   M3_LUM_N,
    }
    const M3_lumConsole = new ColorConsole( M3_lumSettings_o )
    const M3_splitter_o =
    {
      splitterID:  'ca_media_3_processor_overlay',
      frontID:     'ca_media_3_processor_canvas',
      clipClass:   'ca_overlay_split_clipping',
      clipVar:     '--M3_OVERLAY_SPLIT_INSET',
    }
    const M3_splitter = new OverlaySplitter( M3_splitter_o )
    
    document.getElementById( 'ca_media_3_selector_pad' )
      .addEventListener('click', event_o => CA_media_o.M3_input_f( event_o.target.closest('.ca_media_3_pad_label') ) )
  
    document.getElementById( 'ca_media_3_selector_console' )
      .addEventListener( 'mousemove', M3_consoleTrace, false)    // : higher order function
    
    M4_process()    // : chaining: M4_process uses CA_media_o.M3_scan_i
  }
  catch ( error ) { console.log(`ERROR DETECTED @M3_process: ${ error }`) }
}

//========================================================= media_4
const M4_process = () =>
{
  try
  {
                                                                              // ;LOG(`M4_hue_e has loaded: ${performance.now()}`)
    const M4_hue_e = document.getElementById( 'ca_media_4_huesvg' )
    let M4_hue_a = CA_media_o.M3_scan_i.getHue_a()
    let M4_hueCount_a = CA_media_o.M3_scan_i.getHueCount_a()
    let M4_capacity = CA_media_o.M3_scan_i.getCapacity_n()
    let hue_n = M4_hue_a.length
    let hue_a = []
    let freq_n
    for ( let at = 0; at < hue_n; ++at )
    {
      freq_n = M4_hueCount_a[at]
      hue_a[at] = freq_n ? { frequency: freq_n, hsl: `hsl(${at}, 100%, 50%)` } : null
    }

    const M4_processorTrace = ( hue ) =>
    {
      document.getElementById( 'ca_media_4_processor_trace_H_v' )
        .innerHTML = hue
      document.getElementById( 'ca_media_4_processor_trace_P_v' )
        .innerHTML = Number.parseFloat( ( M4_hueCount_a[hue] / M4_capacity ) * 100 ).toFixed(2)
    }

    let M4_ControlSettings_o =
    {
      svgId   : 'ca_media_4_huesvg',
      colors  : hue_a,
      maxfreq:  CA_media_o.M3_scan_i.getHueCountMax,
  
      onHueChange: hue =>    // : event handle
      {
        if ( !M4_hue_a[hue] ||  M4_hue_a[hue].length === 0 ) return
        const [ satur_a, lumen_a ] = CA_media_o.M3_scan_i.getSaturLumen_a( hue )
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
        DOMResetNode( 'ca_media_4_processor_satID' )        // : Saturations
        const saturationBurst = new ColorBurst( { svgId: 'ca_media_4_processor_satID', colors: saturations_a, maxfreq: smaxFreq_n } )
        saturationBurst.draw()
        DOMResetNode( 'ca_media_4_processor_lumID' )        // : Luminosities
        const lumenBurst = new ColorBurst( { svgId : 'ca_media_4_processor_lumID', colors : luminosities_a, maxfreq: lmaxFreq_n } )
        lumenBurst.draw()
      },

      onHueTrace: M4_processorTrace
    }
    let M4_Control = new ColorBurst( M4_ControlSettings_o )
    M4_Control.draw()
  }
  catch ( error ) { console.log(`ERROR DETECTED @M4_hue_e: ${ error }`) }
}

//========================================================= media_1234
const M_initImg = ( img_e, user_o=false ) =>
{
  try
  {
    const src_s = img_e.getAttribute( 'src' )
    if ( user_o )    //: user image
    {
      const gallery_e = document.getElementById( 'ca_gallery_img' )
      gallery_e.setAttribute( 'src', src_s )
      gallery_e.setAttribute( 'data-src-width', user_o.width )
      gallery_e.setAttribute( 'data-src-height', user_o.height )
      const file_s = user_o.file_s.replace( /\.jpe?g/i, '' )
      document.getElementById( 'ca_post_file_user' )
      .innerHTML = file_s
      document.getElementById( 'ca_list_imgs_legend_file_user' )
        .innerHTML = file_s
      const id_s = user_o.id_s
      document.getElementById( 'ca_post_id_user' )
      .innerHTML = id_s
      document.getElementById( 'ca_list_imgs_legend_id_user' )
        .innerHTML = id_s
        const tag_s = user_o.tag_s
      document.getElementById( 'ca_post_tag_user' )
        .innerHTML = tag_s
      document.getElementById( 'ca_list_imgs_legend_tag_user' )
        .innerHTML = tag_s
      const edit_e = document.getElementById( 'ca_user_collection_note_edit' )
      edit_e.value = user_o.note_s
      const publish_e = document.getElementById( 'ca_user_collection_note_publish' )
      publish_e.innerHTML = marked( edit_e.value )
      
    }
    document.querySelectorAll( '.ca_media_processor_img' )
      .forEach( ( animg_e ) =>
      {
        animg_e.setAttribute( 'src', src_s )
        if ( user_o )
        {
          animg_e.setAttribute( 'data-src-width', user_o.width )
          animg_e.setAttribute( 'data-src-height', user_o.height )
        }
    } )
  }
  catch ( error ) { console.log(`ERROR DETECTED @M_init: ${ error }`) }
}

const M_init = ( img_e, user_o=false ) =>
{
  M_initImg( img_e, user_o )
  M1_process()
  M2_process()
  M3_process()    // : => M4_process()
}

//========================================================= main
if ( window.location.pathname.includes( CA_media_userImgUrl_s ) ) userImgInit( M_init )
else
{
  CA_media_o.M_img_e = document.getElementById( 'ca_gallery_img' )
  if ( CA_media_o.M_img_e.complete === false ) CA_media_o.M_img_e.onload = () => M_init( CA_media_o.M_img_e )
  else M_init( CA_media_o.M_img_e )
}
