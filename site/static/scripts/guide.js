const GUIDE_o =
{
  drives_o:
  {
    ca_area_perspective:
    [
    ],

    ca_area_menu:
    [
      {
        element: '.ca_area_selector',
        popover:
        {
          title: 'Menu',
          description: 'Selector',
          position: 'right'
        }
      },
    ],

    ca_area_text:
    [
  
    ],

    ca_area_gallery:
    [
  
    ],

    ca_area_media_1:
    [
  
    ],

    ca_area_media_2:
    [
  
    ],

    ca_area_media_3:
    [
  
    ],

    ca_area_media_4:
    [
  
    ],

    ca_area_search:
    [
  
    ],
  },
}


Guide.driver = new Driver( {allowClose:false} )

Guide.handle = ( key_e ) =>
{
  /*
  if ( key_e.key === 'F9' )
  {
    const area_a = document.getElementsByClassName( 'ca_area_active' )
    const id_s = ( area_a.length > 0 ) ? area_a[0].id : 'ca_area_perspective'    //: no ca_area_active for perspective
    Guide.driver.defineSteps( GUIDE_o.drives_o[id_s] )
    Guide.driver.start()
  }
  */
}
