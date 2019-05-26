const SEARCH_W_o =
{
  tagStack_m: null,
  provider_o: null,
  found_o:
  {
    found_a: [],
    at_n:    -1,    //: found_a stack cursor
    reset_b: false,
  },
  separator: '|'
} 
const initMap__a = ( keyval_s ) =>    //: INIT
{
  const search_a = new Map()
  const lines_a = keyval_s.split( '\n' )
  for ( let aline_s of lines_a )
  {
    keyval_a = aline_s.split( '=' )
    search_a.set( keyval_a[0], keyval_a[1] )
  }
  return search_a
}

const setupMap = ( url_s ) =>
{
  fetch( url_s )
  .then( res => res.text() )
  .then( text_s => { SEARCH_W_o.tagStack_m = initMap__a( text_s ) } )
  .catch( error => { console.log( `[ERROR] failed to fetch file <${url_s}> -- ${error}` )})
}

const  searchBMH__n = ( need_s, stack_s ) =>    //: SEARCH
{
  const last_n = need_s.length - 1
  if ( last_n < 0 ) return 0
  const table_a = []
  for ( let at_n = 0; at_n < need_s.length - 1; ++at_n ) table_a[need_s[at_n]] = last_n - at_n
  const offsetMax_n = stack_s.length - need_s.length
  let offset_n = 0
  let scan_n
  while ( offset_n <= offsetMax_n )
  {
      for ( scan_n = last_n; need_s[scan_n] === stack_s[scan_n + offset_n]; --scan_n ) if ( scan_n === 0 ) return offset_n
      offset_n += table_a[stack_s[offset_n + last_n]] || last_n || 1
  }
  return -1
}

const entry__o = ( entry_s, need_s, tag_s ) =>
{
  const entry_a = entry_s.split( SEARCH_W_o.separator )
  const date_a = entry_a[1].split( '-' )
  const date_s = date_a.reverse().join( '-' )
  entry_o =
  {
    tag_s:      tag_s,
    need_s:     need_s,
    path_s:     entry_a[0],
    date_s:     date_s,
    title_s:    entry_a[2],
    subtitle_s: entry_a[3],
    abstract_s: entry_a[4],
    author_s:   entry_a[5],
    image_a:    entry_a[6],
    visited_b:  false,
  }
  return entry_o
}

const entry__a = ( need_s, stack_s ) =>
{
  const entries_a = []
  let foundAt_n = searchBMH__n( need_s, stack_s )
  if ( foundAt_n === -1 ) return entries_a    //: no match at all
  stack_s = stack_s.slice( foundAt_n )    //: strip up to 1st match
  const stack_a = stack_s.split( '}' )
  for ( let part_s of stack_a )
  {
    if ( part_s === '' ) continue
    if ( ( foundAt_n = searchBMH__n( need_s, part_s ) ) === -1 ) continue
    const hash_s = part_s.slice( part_s.indexOf( '{') + 1 )
    entries_a.push( hash_s )
  }
  return entries_a
}

const find__a = ( need_s, tag_s ) =>    //: EXEC 
{
  const found_a = []
  const stack_s = SEARCH_W_o.tagStack_m.get( tag_s )
  if ( stack_s === undefined ) return found_a    //: no stack for this tag => NOT_FOUND
  const entries_a = entry__a( need_s, stack_s )
  for ( hash_s of entries_a ) found_a.push( entry__o( SEARCH_W_o.tagStack_m.get( hash_s ), need_s, tag_s ) )
  return found_a
}

//: SHARED WORKER fromClient --> provider ===================
const sendResult = ( provider_o ) => SEARCH_W_o.provider_o.postMessage( provider_o )

const fromClient = ( client_o ) =>
{
  if ( client_o.task_s === 'INIT' )
  {
    if ( SEARCH_W_o.tagStack_m === null ) setupMap( client_o.url_s )
    //xx client_o.task_s = 'RETRIEVE'    //: NEXT GO TO RETRIEVE
    return
  }
  if ( client_o.task_s === 'RETRIEVE'  )
  {
    if ( SEARCH_W_o.found_o.found_a.length )
    {
      const result_ = ( SEARCH_W_o.found_o.reset_b === false ) ? SEARCH_W_o.found_o.found_a[SEARCH_W_o.found_o.found_a.length - 1] : null
      sendResult( { task_s: 'RETRIEVE', result: result_ } )    //: request the last search
    }
    return
  }
  if ( client_o.task_s === 'SEARCH' )
  {
    if ( SEARCH_W_o.tagStack_m === null )
    {
      setupMap( client_o.url_s )
      return
    }
    else
    {
      const found_a = find__a( client_o.need_s, client_o.tag_s )
      if ( found_a.length )
      {
        SEARCH_W_o.found_o.found_a.push( found_a )    //: update SEARCH_W_o.found_o state
        SEARCH_W_o.found_o.at_n = SEARCH_W_o.found_o.found_a.length - 1
        SEARCH_W_o.found_o.reset_b = false
      }
      sendResult( { task_s: 'SEARCH', result: found_a } )
      return
    }
  }
  if ( client_o.task_s === 'VISIT_URL' )
  {
    SEARCH_W_o.found_o.found_a[SEARCH_W_o.found_o.found_a.length - 1][client_o.entry].visited_b = true
    return
  }
  if ( client_o.task_s === 'RESET' )
  {
    SEARCH_W_o.found_o.at_n = SEARCH_W_o.found_o.found_a.length - 1    //: position at last found_a
    SEARCH_W_o.found_o.reset_b = true
    return
  }
  if ( client_o.task_s === 'PREVIOUS' )
  {
    if ( SEARCH_W_o.found_o.at_n > 0 )
    {
      SEARCH_W_o.found_o.at_n--;
      sendResult( { task_s: 'RETRIEVE', result: SEARCH_W_o.found_o.found_a[SEARCH_W_o.found_o.at_n] } )
    }
    return
  }
  if ( client_o.task_s === 'NEXT' )
  {
    if ( SEARCH_W_o.found_o.at_n < SEARCH_W_o.found_o.found_a.length - 1 )
    {
      SEARCH_W_o.found_o.at_n++;
      sendResult( { task_s: 'RETRIEVE', result: SEARCH_W_o.found_o.found_a[SEARCH_W_o.found_o.at_n] } )
    }
    return
  }
}

//: fromProvider --> client ===================
//: const provider_o = { task_s: 'DONE', result: found_a }
//: SEARCH_W_o.provider_o.postMessage( provider_o )

// ================== INIT WORKER ======================
//let SEARCH_W_o.provider_o = null
onconnect = connect_e =>
{
  SEARCH_W_o.provider_o = connect_e.ports[0]
  SEARCH_W_o.provider_o.onmessageerror = err => console.log( `PROVIDER ERROR: ${err.message}` )
  SEARCH_W_o.provider_o.onmessage = client_e => { fromClient( client_e.data ) }
  SEARCH_W_o.provider_o.start()
}
