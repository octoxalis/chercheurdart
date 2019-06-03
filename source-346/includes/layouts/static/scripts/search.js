//========================================================= Search.js
//: fromClient --> provider ===================
//: const client_o =
//: {
//:   task_s: 'SEARCH',
//:   need_s: need_s,
//:   tag_s: SEARCH_o.tags_a[SEARCH_o.tag_n],
//: }
//: client_p.postMessage( task_o )

const SEARCH_o =
{
  tags_a:
  [
    'ORD',
    'PER',
    'ART',
    'WORK',
    'COL',
    'BIB',
    'WEB',
    'LOC',
    'DATE',
  ],
  titles_a:
  [
    `NON SPÉCIFIÉ`,
    `NOM DE PERSONNE`,
    `NOM D'ARTISTE`,
    `ŒUVRE D'ART`,
    `COLLECTION`,
    `BIBLIOGRAPHIE`,
    `TECHNOLOGIE`,
    `LOCALISATION`,
    'DATE',
  ],
  need_s: '',
  tag_n:  0,
  tag_s:  '',
  port_o: null,
}

//: fromProvider --> client ===================
const fromProvider = ( provider_o ) =>
{
  const found_a = provider_o.result
  searchFoundToDOM( !found_a ? 'RESET' : found_a.length ? found_a : 'NOT_FOUND' )    //: null for RESET
  if ( provider_o.task_s === 'RETRIEVE' )
  {
    SEARCH_o.need_s = found_a[0].need_s
    SEARCH_o.tag_s  = found_a[0].tag_s
    searchUpdateRequest()
  }
}

// ================== INIT WORKER ======================
( () =>
  {
    const provider_i = new SharedWorker( `${SITE_ROOT_URL}static/scripts/search_w.js` )
    SEARCH_o.port_o = provider_i.port
    SEARCH_o.port_o.onmessageerror = err_e => console.log( `CLIENT ERROR: ${err_e.message}` )
    SEARCH_o.port_o.onmessage = provider_e => { fromProvider( provider_e.data ) }
    SEARCH_o.port_o.start()
    SEARCH_o.port_o.postMessage( { task_s: 'INIT', url_s: `${SITE_ROOT_URL}search.ini`, } )
    SEARCH_o.port_o.postMessage( { task_s: 'RETRIEVE' } )
  }
)()

// ===================== OUTPUT ======================
const searchFoundToDOM = ( entries_ ) =>
{
  const list_e = document.getElementById('ca_search_list')
  while ( list_e.firstChild ) list_e.removeChild( list_e.firstChild )    //: cleaning
  let template_e, clone_e, result_e, result_s
  if ( typeof entries_ === 'string' )
  {
    if ( entries_ === 'RESET' ) return
    template_e = document.getElementById('ca_search_result_entry_void')
    clone_e = document.importNode( template_e.content, true )
    result_e = clone_e.querySelectorAll( 'dt' )
    result_s = ( entries_ === 'NOT_FOUND' ) ?
      `Auncun résultat n'a été trouvé. Essayez avec un autre filtre.`    //: 'NOT_FOUND'
    : `Le terme fourni pour la recherche est invalide!`                  //: 'BAD_ENTRY'
    result_e[0].textContent = result_s
    list_e.appendChild( clone_e )
    return
  }
  //: matches
  template_e = document.getElementById('ca_search_result_entry')
  let div_e, dl_e, dt_e, a_e, dd_e, em_e
  let ate = -1    //: loop iterator
  for ( entry_o in entries_ )    //:  entries_ is Array
  {
    ++ate
    clone_e = document.importNode( template_e.content, true )

    div_e = clone_e.querySelectorAll( 'div.ca_urlentry' )    //: <div class="ca_urlentry">
    if ( entries_[entry_o].visited ) div_e[0].classList.toggle( 'ca_urlentry_mark' )
    dl_e = clone_e.querySelectorAll( 'dl' )
    
    a_e = clone_e.querySelectorAll( 'a' )                  //: <a href="...">_LINK_
    a_e[0].setAttribute( 'href', `${SITE_ROOT_URL}${entries_[entry_o].path_s}.html` )
    a_e[0].setAttribute( 'data-entry', `${ate}` )
    a_e[0].setAttribute( 'onclick', 'searchVisit( this )' )
    a_e[0].textContent = entries_[entry_o].title_s
    dt_e = clone_e.querySelectorAll( 'dt' )                //: <dt>_TITLE_
    dt_e[0].appendChild( a_e[0] )
    dl_e[0].appendChild( dt_e[0] )

    dd_e = clone_e.querySelectorAll( 'dd' )                //: <dd>_DATE_
    dd_e[0].textContent = entries_[entry_o].date_s + ' '
    em_e = document.createElement( 'em' )                 //: <em>_AUTHOR_
    em_e.textContent = entries_[entry_o].author_s
    dd_e[0].appendChild( em_e )
    dl_e[0].appendChild( dd_e[0] )

    dd_e[1].textContent = entries_[entry_o].abstract_s    //: <dd>_ABSTRACT_
    dl_e[0].appendChild( dd_e[1] )

    div_e[0].appendChild( dl_e[0] )
    list_e.appendChild( div_e[0] )
  }
}

const searchMarkToDOM = () =>
{
  const need_s = SEARCH_o.need_s
  document.querySelectorAll( `mark[data-tag="${SEARCH_o.tag_s}"]` )
    .forEach( ( item_e ) =>
    {
      if ( item_e.innerText.indexOf( need_s ) > -1 ) item_e.classList.toggle( 'ca_searchentry_mark' )
    })
}

const searchUpdateRequest = () =>
{
  searchMarkToDOM()
  searchSetNeedForm()
  const at_n = SEARCH_o.tags_a.findIndex( atag_s => atag_s === SEARCH_o.tag_s )
  searchSetTagForm( at_n )
}

const searchSetNeedForm = ( need_s ) => document.getElementById( 'ca_form_input_search_needle' ).value = SEARCH_o.need_s

const searchSetTagForm = ( tag_n ) => document.getElementById( 'ca_form_input_search_tag' ).innerHTML = SEARCH_o.titles_a[tag_n]

const searchSetTag = ( tag_n ) =>
{
  SEARCH_o.tag_n = tag_n
  searchSetTagForm( tag_n )
}

const searchVisit = ( entry_e ) =>
{
  SEARCH_o.port_o.postMessage( { task_s: 'VISIT_URL', entry: entry_e.getAttribute( 'data-entry' ) } )
  let parent_e = entry_e.parentNode
  while ( parent_e )    //: find div ancestor with class ca_urlentry
  {
    if ( parent_e.classList.contains( 'ca_urlentry' ) ) break
    parent_e = parent_e.parentNode
  }
  parent_e.classList.toggle( 'ca_urlentry_mark' )
}

const searchSubmit = () =>
{
  const input_s = document.getElementById( 'ca_form_input_search_needle' ).value
  const need_s = input_s.replace( /[^a-zA_Z\d\s&'\-]/gi, '' )    //: sanitize
  if ( need_s.length === 0 ) return searchFoundToDOM( 'BAD_ENTRY' )    //: return is undefined
  const tag_s = SEARCH_o.tags_a[SEARCH_o.tag_n]
  SEARCH_o.port_o.postMessage( { task_s: 'SEARCH', need_s: need_s, tag_s: tag_s } )
}

const searchHistory = ( direction_s ) => SEARCH_o.port_o.postMessage( { task_s: direction_s } )

const searchReset = () =>
{
  searchMarkToDOM()
  searchFoundToDOM( 'RESET' )
  SEARCH_o.need_s = ''
  SEARCH_o.tag_s  = ''
  SEARCH_o.port_o.postMessage( { task_s: 'RESET' } )
}

document.getElementById( 'ca_form_is_search' )
  .addEventListener('click', event_o =>
  {
    let label_e = event_o.target.closest('.ca_form_inputbox_label_button')
    if ( label_e !== null )
    {
      if ( label_e.id === 'ca_form_is_search_submit' ) return searchSubmit()
      if ( label_e.id === 'ca_form_is_search_tags' ) return searchTagsDialog()
    }
    
    label_e = event_o.target.closest('span')
    if ( label_e !== null )
    {
      if ( label_e.id === 'ca_form_is_search_previous' ) return searchHistory( 'PREVIOUS' )
      if ( label_e.id === 'ca_form_is_search_next' ) return searchHistory( 'NEXT' )
      if ( label_e.id === 'ca_form_is_search_reset' ) return searchReset()
    }
  } )

document.getElementById( 'ca_form_is_search_tagSet' )
  .addEventListener('click', event_o =>
  {
  const label_e = event_o.target.closest('.ca_form_optbox_label')
  searchSetTag( label_e.getAttribute( 'data-index' ) )
  } )
