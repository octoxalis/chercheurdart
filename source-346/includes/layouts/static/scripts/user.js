// ;console.log( `user.js` )
const USER_o =
{
  img_o: null,
  collectionIdb_i: null,
  galleryIdb_i: null,
  notecyrb53_n: 0,
  dialogs_o:
  {
    format_s: `Le fichier sélectionné n'est pas au format JPEG`,
    size_s:   `La taille de l'image est trop grande: impossible de l'analyser`,
    reader_s: `Une erreur s'est produite en chargeant le fichier image: impossible de l'analyser`,
  },
}

const userImgGetInfo_o = () =>
{
  const info_o =
  {
    id_s:  document.getElementById( 'ca_form_is_user_file_setup_id_s' ).value,
    tag_s: document.getElementById( 'ca_form_is_user_file_setup_tag_s' ).value,
  }
  return info_o 
}

const userImgToDataUrl = ( files_o ) =>
{
  if ( !files_o.files.length ) return
  const badFileType = ( msg_s ) => document.getElementById( 'ca_form_is_user_file_setup_id_s' ).innerHTML = msg_s || ''
  const afile_o = files_o.files[0]
  if ( !afile_o.type.match( 'image/jpeg' ) )
  {
    badFileType( USER_o.dialogs_o.format_s )
    document.getElementById( 'ca_form_is_user_file_img_thumb' ).src = ''
    return
  }

  const reader_i = new FileReader()
  reader_i.onerror = ( _read_e_ ) =>
  {
    reader_i.abort()
    return badFileType( USER_o.dialogs_o.reader_s )
  }

  reader_i.onload = ( read_e ) =>
  {
    const maxdim = DOMRootVar__s( '--MEDIA_USER_IMG_DIM_MAX' )
    const img_e = new Image()
    img_e.onload = ( load_e ) =>
    {
      const width  = load_e.target.naturalWidth
      const height = load_e.target.naturalHeight
      let src_s = ''
      let msg_s = afile_o.name
      if ( (width * height) > (maxdim * maxdim) ) msg_s = USER_o.dialogs_o.size_s
      else src_s = img_e.src
      badFileType( msg_s )
      if ( src_s === '' ) return
      document.getElementById( 'ca_form_is_user_file_img_thumb' ).src = src_s
      USER_o.img_o =
      {
        file_s: afile_o.name,
        id_s:   '',
        tag_s:  '',
        note_s: '',
        width:  width,
        height: height,
        src_s:  read_e.target.result,
      }
    }
    img_e.src = read_e.target.result
  }
  reader_i.readAsDataURL( afile_o )
}

const userImgFileToIDB = ( dialog_s ) =>
{
  if ( !dialog_s || !dialog_s.includes( 'dialog_option_0' ) ) return   //: 'ca_user_file_dialog_option_0' is OK button
  const info_o = userImgGetInfo_o()
  USER_o.img_o.id_s = info_o.id_s
  USER_o.img_o.tag_s = info_o.tag_s || 'collection'    //: we need a tag to be able to update
  const key_n = Date.now()    //: use Date.now as IDB key
  USER_o.collectionIdb_i.set( key_n, USER_o.img_o )
    .then( () => window.location.reload() )
}

const userImgInit = ( init_f ) =>
{
  let max = 0
  USER_o.galleryIdb_i.get( 'key_n' )
  .then( ( key_n ) =>
    {
      USER_o.collectionIdb_i.get( key_n )
        .then( item_o =>
        {
          if ( item_o )
          {
            const img_e = new Image( item_o.width, item_o.height )
            img_e.src = item_o.src_s
            img_e.onload = load_e => init_f( img_e, Object.assign( {}, item_o, { src_s: undefined } ) )
          }
        } )
    } )
    userImgNoteEvents()
}

const userImgNoteEvents = () =>
{
  const note_e = document.getElementById( 'ca_user_collection_note_icons' )
  const edit_e = document.getElementById( 'ca_user_collection_note_edit' )
  const publish_e = document.getElementById( 'ca_user_collection_note_publish' )
  note_e.addEventListener('click', event_o =>
  {
    const icon_e = event_o.target.closest('svg')
    if ( icon_e.id === 'ca_user_collection_note_icon_edit' )
    {
      USER_o.notecyrb53_n = cyrb53__i( edit_e.value )
    }
    if ( icon_e.id === 'ca_user_collection_note_icon_publish' )
    {
      if ( USER_o.notecyrb53_n !== cyrb53__i( edit_e.value ) )
      {
        publish_e.innerHTML = marked( edit_e.value )
        USER_o.galleryIdb_i.get( 'key_n' )
          .then( ( key_n ) => USER_o.collectionIdb_i.update( key_n, 'note_s', edit_e.value ) )
      }

    }
    publish_e.classList.toggle( 'ca_user_collection_note_hide' )
    document.getElementById( 'ca_user_collection_note_icon_edit' )
    .classList.toggle( 'ca_user_collection_note_hide' )
  } )
}

void function ()
{
  if ( USER_o.collectionIdb_i === null ) USER_o.collectionIdb_i = new KVIdb( 'UserCollection', 'collection' )
  if ( USER_o.galleryIdb_i === null ) USER_o.galleryIdb_i = new KVIdb( 'UserGallery', 'gallery' )
} ()
