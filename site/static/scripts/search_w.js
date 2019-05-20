var TagStack_m = null    //: search.ini map
var Found_o =
{
  found_a: [],
  at:      -1,    //: found_a stack cursor
  reset:   false,
}
const SEPARATOR = '|'

const initMap = ( keyval_s ) =>    //: INIT
{
  const searchMap = new Map()
  const lines_a = keyval_s.split( '\n' )
  for ( let aline_s of lines_a )
  {
    keyval_a = aline_s.split( '=' )
    searchMap.set( keyval_a[0], keyval_a[1] )
  }
  return searchMap
}

const getMap = ( url_s ) =>
{
  fetch( url_s )
  .then( res => res.text() )
  .then( text_s => { TagStack_m = initMap( text_s ) } )
  .catch( error => { console.log( `[ERROR] failed to fetch file <${url_s}> -- ${error}` )})
}

const  searchBMH = ( need_s, stack_s ) =>    //: SEARCH
{
  const last = need_s.length - 1
  if ( last < 0 ) return 0
  const bTable = []
  for ( let at = 0; at < need_s.length - 1; ++at ) bTable[need_s[at]] = last - at
  const offsetMax = stack_s.length - need_s.length
  let offset = 0
  let scan
  while (offset <= offsetMax)
  {
      for ( scan = last; need_s[scan] === stack_s[scan + offset]; --scan ) if ( scan === 0 ) return offset
      offset += bTable[stack_s[offset + last]] || last || 1
  }
  return -1
}

const getEntry = ( entry_s, need_s, tag_s ) =>
{
  const entry_a = entry_s.split( SEPARATOR )
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
    visited:    false,
  }
  return entry_o
}

const getEntries = ( need_s, stack_s ) =>
{
  const entries_a = []
  let foundAt = searchBMH( need_s, stack_s )
  if ( foundAt === -1 ) return entries_a    //: no match at all
  stack_s = stack_s.slice( foundAt )    //: strip up to 1st match
  const stack_a = stack_s.split( '}' )
  for ( let part_s of stack_a )
  {
    if ( part_s === '' ) continue
    if ( ( foundAt = searchBMH( need_s, part_s ) ) === -1 ) continue
    const hash_s = part_s.slice( part_s.indexOf( '{') + 1 )
    entries_a.push( hash_s )
  }
  return entries_a
}

const exec = ( need_s, tag_s ) =>    //: EXEC 
{
  const found_a = []
  const stack_s = TagStack_m.get( tag_s )
  if ( stack_s === undefined ) return found_a    //: no stack for this tag => NOT_FOUND
  const entries_a = getEntries( need_s, stack_s )
  for ( hash_s of entries_a ) found_a.push( getEntry( TagStack_m.get( hash_s ), need_s, tag_s ) )
  return found_a
}

//: SHARED WORKER fromClient --> provider ===================
const sendResult = ( provider_o ) => Provider_p.postMessage( provider_o )

const fromClient = ( client_o ) =>
{
  if ( client_o.task_s === 'INIT' )
  {
    if ( TagStack_m === null ) getMap( client_o.url_s )
    //xx client_o.task_s = 'RETRIEVE'    //: NEXT GO TO RETRIEVE
    return
  }
  if ( client_o.task_s === 'RETRIEVE'  )
  {
    if ( Found_o.found_a.length )
    {
      const result_ = ( Found_o.reset === false ) ? Found_o.found_a[Found_o.found_a.length - 1] : null
      sendResult( { task_s: 'RETRIEVE', result: result_ } )    //: request the last search
    }
    return
  }
  if ( client_o.task_s === 'SEARCH' )
  {
    if ( TagStack_m === null )
    {
      getMap( client_o.url_s )
      return
    }
    else
    {
      const found_a = exec( client_o.need_s, client_o.tag_s )
      if ( found_a.length )
      {
        Found_o.found_a.push( found_a )    //: update Found_o state
        Found_o.at = Found_o.found_a.length - 1
        Found_o.reset = false
      }
      sendResult( { task_s: 'SEARCH', result: found_a } )
      return
    }
  }
  if ( client_o.task_s === 'VISIT_URL' )
  {
    Found_o.found_a[Found_o.found_a.length - 1][client_o.entry].visited = true
    return
  }
  if ( client_o.task_s === 'RESET' )
  {
    Found_o.at = Found_o.found_a.length - 1    //: position at last found_a
    Found_o.reset = true
    return
  }
  if ( client_o.task_s === 'PREVIOUS' )
  {
    if ( Found_o.at > 0 )
    {
      Found_o.at--;
      sendResult( { task_s: 'RETRIEVE', result: Found_o.found_a[Found_o.at] } )
    }
    return
  }
  if ( client_o.task_s === 'NEXT' )
  {
    if ( Found_o.at < Found_o.found_a.length - 1 )
    {
      Found_o.at++;
      sendResult( { task_s: 'RETRIEVE', result: Found_o.found_a[Found_o.at] } )
    }
    return
  }
}

//: fromProvider --> client ===================
//: const provider_o = { task_s: 'DONE', result: found_a }
//: Provider_p.postMessage( provider_o )

// ================== INIT WORKER ======================
let Provider_p = null
onconnect = connect_e =>
{
  Provider_p = connect_e.ports[0]
  Provider_p.onmessageerror = err => console.log( `PROVIDER ERROR: ${err.message}` )
  Provider_p.onmessage = client_e => { fromClient( client_e.data ) }
  Provider_p.start()
}
