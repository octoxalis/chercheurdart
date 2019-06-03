//;console.log( `user_collection.js` )
const USER_COLLECTION_o =
{
  lazy_n:    8,    //: only load the first lazy_n images, then lazy load others
  itemId_e:  null,
  itemTag_e: null,
  dialogs_o:
  {
    open_s: `<form class="ca_form_inputbox">
    <label class="ca_form_inputbox_label">`,
    close_s: `</label></form>`,
    itemDelete_s:    `Voulez-vous vraiment supprimer cette image de votre galerie?`,
    galleryDelete_s: `Voulez-vous vraiment supprimer la totalité des images de cette galerie?`,
  }
}

const userCollectionDescriptionToDOM = ( items_a ) =>    //: [ { key_n:, file_s:, tag_s: } ]
{
  let images_n = 0
  for ( let at_s in items_a ) images_n += items_a[at_s].length
  const todom_e    = document.getElementById('ca_user_collection_description_list')
  const template_e = document.getElementById('ca_user_collection_description_template')
  const clone_e    = document.importNode( template_e.content, true )
  const item_e     = clone_e.querySelector( `dl#ca_user_collection_description_item` )
  const dt_e       = clone_e.querySelector( 'dt.ca_user_gallery_descriptor' )

  const input_e = clone_e.querySelector( 'input#ca_user_gallery_descriptor_input' )
  input_e.setAttribute( 'id', `ca_user_gallery_description_item_input` )
  dt_e.appendChild( input_e )
  const label_e = clone_e.querySelector( 'label.ca_inputbox_label_solo' )
  label_e.setAttribute( 'for', `ca_user_gallery_descriptor_input` )
  let plural_s = Object.keys( items_a ).length > 1 ? 's' : ''
  label_e.textContent = `${Object.keys( items_a ).length} galerie${plural_s}`
  dt_e.appendChild( label_e )
  item_e.appendChild( dt_e )
  let dd_e = clone_e.querySelector( 'dd.ca_user_gallery_descriptor' )
  plural_s = images_n > 1 ? 's' : ''
  dd_e.textContent = `${images_n} image${plural_s}`
  item_e.appendChild( dd_e )
  dd_e = clone_e.getElementById( 'ca_user_collection_add' )
  item_e.appendChild( dd_e )
  todom_e.appendChild( item_e )
}

const userCollectionDescriptionEvents = () =>
{
  const gallery_e = document.getElementById( 'ca_user_collection_description_list' ).parentElement
  gallery_e.addEventListener( 'click', event_o =>
  {
    const target_e = event_o.target
    if ( target_e.id === 'ca_user_gallery_descriptor_label' )
    {
      const tag_s = null
      USER_o.galleryIdb_i.set( 'tag_s', tag_s )
      userGalleryInit( tag_s )
      AreaSwap( 'text', 'gallery' )
      return
    }
    if ( target_e.id === 'ca_user_collection_add_label' || target_e.classList.contains( 'ca_svg_icon' ) )
    {
      contextDialog( 'user_file' )
      return
    }
  } )
}

const userGalleryDescriptionToDOM = ( items_a ) =>    //: [ { key_n:, file_s:, tag_s:, size:, } ]
{
  const todom_e    = document.getElementById('ca_user_gallery_description_list')
  const template_e = document.getElementById('ca_user_gallery_description_list_template')
  let clone_e, item_e, dt_e, dd_e, dd_a, input_e, label_e
  let id_n = -1    //: ID iterator
  for ( let at_s in items_a )
  {
    ++id_n
    let length_n = items_a[at_s].length
    let tag_s  = items_a[at_s][0].tag_s    //: take first gallery descriptor to get tag_s and key_n
    let key_n  = items_a[at_s][0].key_n
    let now_s, locale_s
    ( { now_s, locale_s } = dateAsLocale__o( key_n ) )

    clone_e = document.importNode( template_e.content, true )
    item_e = clone_e.querySelector( `dl#ca_user_gallery_description_item` )
    item_e.setAttribute( 'id', `ca_user_gallery_description_item_${id_n}` )
    dt_e = clone_e.querySelector( 'dt.ca_user_gallery_descriptor' )
    item_e.appendChild( dt_e )
    input_e = clone_e.querySelector( 'input#ca_user_gallery_description_item_input' )
    input_e.setAttribute( 'id', `ca_user_gallery_description_item_input_${id_n}` )
    dt_e.appendChild( input_e )
    label_e = clone_e.querySelector( 'label.ca_inputbox_label_solo' )
    label_e.setAttribute( 'for', `ca_user_gallery_description_item_input_${id_n}` )
    label_e.setAttribute( 'data-tag', tag_s )
    label_e.textContent = `${tag_s}`
    dt_e.appendChild( label_e )
    dd_a = clone_e.querySelectorAll( 'dd.ca_user_gallery_descriptor' )
    let plural_s = length_n > 1 ? 's' : ''
    dd_a[0].textContent = `${length_n} image${plural_s}`
    item_e.appendChild( dd_a[0] )
    dd_a[1].textContent = `${locale_s}`
    item_e.appendChild( dd_a[1] )
    todom_e.appendChild( item_e )
  }
}

const userGalleryDescriptionEvents = () =>
{
  const gallery_e = document.getElementById( 'ca_user_gallery_description_list' ).parentElement
  gallery_e.addEventListener('click', event_o =>
  {
    if ( event_o.target.tagName === 'LABEL' )
    {
      const tag_s = event_o.target.getAttribute( 'data-tag' )
      USER_o.galleryIdb_i.set( 'tag_s', tag_s )
      userGalleryInit( tag_s )
      AreaSwap( 'text', 'gallery' )
    }
  } )
}

const userGalleryImgToDOM = ( items_a ) =>
{
  const todom_e = document.querySelector('.ca_gallery_imgs_list')
  let template_e = document.getElementById('ca_user_gallery_description_template')
  let clone_e, item_e, div_e, img_e, ul_e, li_e, item_o
  let id_n = -1    //: ID iterator
  for ( let at_s in items_a )
  {
    ++id_n
    item_o = items_a[at_s].item_o
    clone_e = document.importNode( template_e.content, true )

    item_e = clone_e.querySelector( `li#ca_user_gallery_list_item` )
    item_e.setAttribute( 'id', `ca_user_gallery_list_item_${id_n}` )
    item_e.setAttribute( 'data-key', items_a[at_s].key_n )
    item_e.setAttribute( 'data-file', item_o.file_s )

    div_e = clone_e.querySelector( 'div.ca_list_imgs_frame' )
    img_e  = clone_e.querySelector( 'img.ca_list_imgs_img' )
    img_e.setAttribute( 'data-src-width', item_o.width )
    img_e.setAttribute( 'data-src-height', item_o.height )
    img_e.setAttribute( 'src', item_o.src_s )
    img_e.setAttribute( 'loading', ( id_n > USER_COLLECTION_o.lazy_n ) ? 'lazy' : 'auto' )
    div_e.appendChild( img_e )
    item_e.appendChild( div_e )

    div_e = clone_e.querySelector( 'div#ca_user_gallery_list_item_trigger' )
    item_e.appendChild( div_e )
    
    ul_e = clone_e.querySelector( 'ul.ca_list_imgs_legend' )
    li_e = clone_e.querySelector( 'li.ca_list_imgs_legend_title' )
    li_e.textContent = item_o.file_s
    ul_e.appendChild( li_e )
    li_e = clone_e.querySelector( 'li.ca_list_imgs_legend_author' )
    li_e.textContent = item_o.id_s
    ul_e.appendChild( li_e )
    li_e = clone_e.querySelector( 'li.ca_list_imgs_legend_collector' )
    li_e.textContent = item_o.tag_s
    ul_e.appendChild( li_e )
    item_e.appendChild( ul_e )

    todom_e.appendChild( item_e )
  }
}

const userGalleryImgEvents = () =>
{
  const gallery_e = document.getElementById( 'ca_gallery_imgs_list' )
  gallery_e.addEventListener('click', event_o =>
  {
    const target = event_o.target
    if ( target.tagName === 'svg' || target.tagName === 'DIV' )    // lowercase for svg not uppercase !!!
    {    //: delete file_s
      const title_e = target.closest('li[data-key]')
      userGalleryItemDelete( title_e.getAttribute( 'data-key' ) )
      return
    }

    if ( target.tagName === 'IMG' )
    {    //: magnify img
      const item_e = target.closest('li[data-file]')
      if ( item_e ) item_e.classList.toggle('ca_list_imgs_islarge')
      return
    }

    if ( target.classList.contains( 'ca_list_imgs_legend_title' ) )
    {    //: scan image
      const dataKey_e = target.closest('li[data-key]')
      USER_o.galleryIdb_i.set( 'key_n', Number( dataKey_e.getAttribute( 'data-key' ) ) )
       .then( () => window.location = `${SITE_ROOT_URL}user/items/2019-05-08-collection_item.html` )
      return
    }

    if ( target.classList.contains( 'ca_list_imgs_legend_author' ) ||
         target.classList.contains( 'ca_list_imgs_legend_collector' ) )
    {    //: update id_s or tag_s
      const docTitle_e = target.closest('li[data-key]')
      const key_n = docTitle_e.getAttribute( 'data-key' )
      const docLegend_e = target.closest('.ca_list_imgs_legend')
      USER_COLLECTION_o.itemId_e = docLegend_e.getElementsByClassName( 'ca_list_imgs_legend_author' )[0]
      const formId_e = document.getElementById( 'ca_form_is_user_file_update_id_s' )
      USER_COLLECTION_o.itemTag_e = docLegend_e.getElementsByClassName( 'ca_list_imgs_legend_collector' )[0]
      const formTag_e = document.getElementById( 'ca_form_is_user_file_update_tag_s' )
      formId_e.setAttribute( 'data-key', key_n )
      formId_e.setAttribute( 'placeholder', USER_COLLECTION_o.itemId_e.innerHTML )    // to check for change
      formId_e.value = USER_COLLECTION_o.itemId_e.innerHTML
      formTag_e.setAttribute( 'data-key', key_n )
      formTag_e.setAttribute( 'placeholder', USER_COLLECTION_o.itemTag_e.innerHTML )    // idem
      formTag_e.value = USER_COLLECTION_o.itemTag_e.innerHTML

      contextDialog( 'user_file_modify', userGalleryItemUpdate )
      return
    }
  } )
}

const usergalleryDelete = ( tag_s ) =>
{
  const content_s =`${USER_COLLECTION_o.dialogs_o.open_s}${USER_COLLECTION_o.dialogs_o.galleryDelete_s}${USER_COLLECTION_o.dialogs_o.close_s}`
  confirmDialog( content_s, ( dialog_s ) =>
  {
    if ( !dialog_s || !dialog_s.includes( 'dialog_option_0' ) ) return   //: 'ca_user_file_dialog_option_0' is OK button
    USER_o.collectionIdb_i.deleteAll( item_o => !tag_s || tag_s === item_o.tag_s )
      .then( () => 
      {
        //??? window.location.reload()
      } )
      .catch( ( error_e ) =>
      {
          console.log( `ERROR IDB: delete ${tag_s} failed`)    //!!! TEMPORARY?
      } )
  } )
}

const userGalleryItemUpdate = ( dialog_s ) =>
{
  if ( !dialog_s || !dialog_s.includes( 'dialog_option_0' ) ) return   //: 'ca_user_file_dialog_option_0' is OK button
  const id_e = document.getElementById( 'ca_form_is_user_file_update_id_s' )
  const key_n = Number( id_e.getAttribute( 'data-key' ) )
  const id_s = id_e.value
  const tag_e = document.getElementById( 'ca_form_is_user_file_update_tag_s' )
  const tag_s = tag_e.value
  if ( id_s !== id_e.getAttribute( 'placeholder' ) )
  {
    USER_o.collectionIdb_i.update( key_n, 'id_s', id_s )
    USER_COLLECTION_o.itemId_e.innerHTML = id_s
  }
  if ( tag_s !== tag_e.getAttribute( 'placeholder' ) )
  {
    USER_o.collectionIdb_i.update( key_n, 'tag_s', tag_s )
    USER_COLLECTION_o.itemTag_e.innerHTML = tag_s
  }
}

const userGalleryItemDelete = ( key_s ) =>
{
  const content_s =`${USER_COLLECTION_o.dialogs_o.open_s}${USER_COLLECTION_o.dialogs_o.itemDelete_s}${USER_COLLECTION_o.dialogs_o.close_s}`
  confirmDialog( content_s, ( dialog_s ) =>
  {
    if ( !dialog_s || !dialog_s.includes( 'dialog_option_0' ) ) return   //: 'ca_user_file_dialog_option_0' is OK button
    USER_o.collectionIdb_i.delete( Number( key_s ) )    //: must be an Int (key_s is a Date.now() value)
      .then( () => 
      {
        const item_e = document.querySelector( `li[data-key="${key_s}"]` )
        if ( item_e ) document.getElementById('ca_gallery_imgs_list').removeChild( item_e )
      } )
      .catch( ( error_e ) =>
      {
          console.log( `ERROR IDB: delete ${key_s} failed`)    //!!! TEMPORARY?
      } )
  } )
}

const userCollectionGalleriesToDOM = () =>
{
  USER_COLLECTION_o.galleries_a = []
  USER_o.collectionIdb_i.walk( ( key_n, item_o ) =>
  {
    const { file_s, tag_s } = item_o
    if ( !USER_COLLECTION_o.galleries_a[ tag_s ] ) USER_COLLECTION_o.galleries_a[ tag_s ] = []
    USER_COLLECTION_o.galleries_a[ tag_s ].push( { key_n: key_n, file_s: file_s, tag_s: tag_s } )
  } )
  .then( () => 
  {
    userCollectionDescriptionToDOM( USER_COLLECTION_o.galleries_a )
    userCollectionDescriptionEvents()
    userGalleryDescriptionToDOM( USER_COLLECTION_o.galleries_a )
    userGalleryDescriptionEvents()
    USER_o.galleryIdb_i.get( 'tag_s' )
      .then( tag_s => userGalleryInit( tag_s ) )
} )
}

const userGalleryItemsToDOM = ( tag_s ) =>
{
  let items_a = []
  USER_o.collectionIdb_i.walk( ( key_n, item_o ) =>
  {
    if ( !tag_s || tag_s === item_o.tag_s ) items_a.push( { key_n: key_n, item_o: item_o } )
  } )
  .then( () => userGalleryImgToDOM( items_a ) )
}

const userGalleryInit = ( tag_s ) =>
{
  DOMResetNode( 'ca_gallery_imgs_list' )
  userGalleryItemsToDOM( tag_s )
  userGalleryImgEvents()
}

window.onload = () => userCollectionGalleriesToDOM()
