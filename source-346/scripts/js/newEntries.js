const fs = require('fs-extra')
const klaw = require( 'klaw-sync' )
const ldate = require( './dateLocale' )

const fileExists = ( path_s, id_s ) =>
{
  const files_a = klaw( path_s, {nodir: true} )
  let atpath, atid
  for ( let at=0; at < files_a.length; ++at )
  {
    atpath = files_a[at].path
    atid = atpath.substring( atpath.lastIndexOf( '/' ) + 1 ).split('.')[0]
    if ( id_s === atid )
    {
      console.log( `${atid}.js exists: no need to create`)
      return true
    }
  }
  return false
}

module.exports =
{
  createArtist: ( artist_o ) =>
  {
    const artist      = artist_o.artist.toLowerCase()
    const artistID    = `${artist_o.a_date}_${artist}`
    const collector   = artist_o.collector.toLowerCase()
    const place       = artist_o.c_place.toLowerCase()
    const collectorID = `${place}_${collector}`
    const subject     = artist_o.subject.toLowerCase()
    const subjectID   = `${artist_o.s_date}_${subject}`
    const workId      = `${artistID}_${collectorID}_${subjectID}`    //;console.log( `workId: ${workId}`)
    if ( fileExists( 'data/artists', artistID ) ) return

    let now_s, locale_s
    ( { now_s, locale_s } = ldate.dateLocale__o() )
    const read_o  = {encoding:'utf-8', flag:'r'}
    const write_o = {encoding:'utf-8', flag:'w'}

    let srcpath = `../prototypes/data/_artist_.js`
    let buffer = fs.readFileSync( srcpath, read_o )
    buffer = buffer
      .replace( /_AUTHOR_/g,    artist_o.author )
      .replace( /_ARTIST_ID_/g, artistID )
      .replace( /_NAME_/g,      artist_o.artist )
      .replace( /_FORENAME_/g,  artist_o.forename )
      .replace( /_BIRTH_/g,     artist_o.a_date )
    let despath = `data/artists/${artistID}.js`
    fs.writeFileSync( despath, buffer, write_o )    ;console.log( `<${artistID}.js> file created` )
    
    srcpath = `../prototypes/content/YYYY_artist.md`
    buffer = fs.readFileSync( srcpath, read_o )
    buffer = buffer
      .replace( /_AUTHOR_/g,    artist_o.author )
      .replace( /_ARTIST_ID_/g, artistID )
      .replace( /_WORK_ID_/g,   workId )
      .replace( /_NAME_/g,      artist_o.artist )
      .replace( /_FORENAME_/g,  artist_o.forename )
      .replace( /_DATE_/g,      now_s )
      .replace( /_TODAY_/g,     locale_s )
    despath = `content/artists/items/${artistID}.md`
    fs.writeFileSync( despath, buffer, write_o )    ;console.log( `<${artistID}.md> file created` )          
  },

  createWork: ( work_o ) =>
  {
    const artist      = work_o.artist.toLowerCase()
    const artistID    = `${work_o.a_date}_${artist}`
    const collector   = work_o.collector.toLowerCase()
    const place       = work_o.c_place.toLowerCase()
    const collectorID = `${place}_${collector}`
    const subject     = work_o.subject.toLowerCase()
    const subjectID   = `${work_o.s_date}_${subject}`
    const workId      = `${artistID}_${collectorID}_${subjectID}`    //;console.log( `workId: ${workId}`)
    if ( fileExists( 'data/works', workId ) ) return

    let now_s, locale_s
    ( { now_s, locale_s } = ldate.dateLocale__o() )
    const read_o  = {encoding:'utf-8', flag:'r'}
    const write_o = {encoding:'utf-8', flag:'w'}
    let srcpath = `../prototypes/data/_work_.js`
    let buffer = fs.readFileSync( srcpath, read_o )
    buffer = buffer
      .replace( /_AUTHOR_/g,    work_o.author )
      .replace( /_WORK_ID_/g,   workId )
      .replace( /_WIDTH_/g,     work_o.w )
      .replace( /_HEIGHT_/g,    work_o.h )
      .replace( /_ARTIST_/g,    artistID )
      .replace( /_COLLECTOR_/g, collectorID )
      .replace( /_YEAR_/g,      work_o.s_date )
      .replace( /_SUBTITLE_/g,  `${work_o.subject} -${work_o.s_date}-` )
    let despath = `data/works/${workId}.js`
    fs.writeFileSync( despath, buffer, write_o )    ;console.log( `<${workId}.js> file created` )
  
    srcpath = `../prototypes/content/YYYY_artist_place_collector_YYYY_work.md`
    buffer = fs.readFileSync( srcpath, read_o )
    buffer = buffer
      .replace( /_AUTHOR_/g,   work_o.author )
      .replace( /_WORK_ID_/g,  workId )
      .replace( /_NAME_/g,     work_o.artist )
      .replace( /_FORENAME_/g, work_o.forename )
      .replace( /_YYYY_/g,     work_o.s_date )
      .replace( /_SUBJECT_/g,  work_o.subject )
      .replace( /_DATE_/g,     now_s )
      .replace( /_TODAY_/g,    locale_s )
    despath = `content/works/items/${workId}.md`
    fs.writeFileSync( despath, buffer, write_o )    ;console.log( `<${workId}.md> file created` )
  },
  
  createCollector: ( collector_o ) =>
  {
    const artist      = collector_o.artist.toLowerCase()
    const artistID    = `${collector_o.a_date}_${artist}`
    const collector   = collector_o.collector.toLowerCase()
    const place       = collector_o.c_place.toLowerCase()
    const collectorID = `${place}_${collector}`
    const subject     = collector_o.subject.toLowerCase()
    const subjectID   = `${collector_o.s_date}_${subject}`
    const workId      = `${artistID}_${collectorID}_${subjectID}`    //;console.log( `workId: ${workId}`)
    if ( fileExists( 'data/collectors', collectorID ) ) return

    let now_s, locale_s
    ( { now_s, locale_s } = ldate.dateLocale__o() )
    const read_o  = {encoding:'utf-8', flag:'r'}
    const write_o = {encoding:'utf-8', flag:'w'}
    let srcpath = `../prototypes/data/_collector_.js`
    let buffer = fs.readFileSync( srcpath, read_o )
    buffer = buffer
      .replace( /_AUTHOR_/g,       collector_o.author )
      .replace( /_COLLECTOR_ID_/g, collectorID )
      .replace( /_PLACE_/g,        collector_o.c_place )
      .replace( /_LOCATION_/g,     collector_o.collector )
    let despath = `data/collectors/${collectorID}.js`
    fs.writeFileSync( despath, buffer, write_o )    ;console.log( `<${collectorID}.js> file created` )
  
    srcpath = `../prototypes/content/place_collector.md`
    buffer = fs.readFileSync( srcpath, read_o )
    buffer = buffer
      .replace( /_AUTHOR_/g,       collector_o.author )
      .replace( /_COLLECTOR_ID_/g, collectorID )
      .replace( /_WORK_ID_/g,      workId )
      .replace( /_PLACE_/g,        collector_o.c_place )
      .replace( /_LOCATION_/g,     collector_o.collector )
      .replace( /_DATE_/g,         now_s )
      .replace( /_TODAY_/g,        locale_s )
    despath = `content/collectors/items/${collectorID}.md`
    fs.writeFileSync( despath, buffer, write_o )    ;console.log( `<${collectorID}.md> file created` )          
  },

  createBiblio: ( biblio_o ) =>
  {
    const name     = biblio_o.name.toLowerCase()
    const biblioID = `${biblio_o.year}_${name}`
    if ( fileExists( 'data/biblio', biblioID ) ) return

    let now_s, locale_s
    ( { now_s, locale_s } = ldate.dateLocale__o() )
    const read_o  = {encoding:'utf-8', flag:'r'}
    const write_o = {encoding:'utf-8', flag:'w'}
    let srcpath = `../prototypes/data/_biblio_.js`
    let buffer = fs.readFileSync( srcpath, read_o )
    buffer = buffer
      .replace( /_BIBLIO_ID_/g,    biblioID )
      .replace( /_AUTHOR_/g,       biblio_o.author )
      .replace( /_FORENAME_/g,     biblio_o.forename )
      .replace( /_NAME_/g,         biblio_o.name )
      .replace( /_TITLE_/g,        biblio_o.title )
      .replace( /_YEAR_/g,         biblio_o.year )
      .replace( /_PLACE_/g,        biblio_o.place )
      .replace( /_COUNTRY_/g,      biblio_o.country )
      .replace( /_ISBN_/g,         biblio_o.isbn )
      .replace( /_PAGE_/g,         biblio_o.page || '' )
    let despath = `data/biblio/${biblioID}.js`
    fs.writeFileSync( despath, buffer, write_o )    ;console.log( `<${biblioID}.js> file created` )
  
    srcpath = `../prototypes/content/YYYY_biblio.md`
    buffer = fs.readFileSync( srcpath, read_o )
    buffer = buffer
      .replace( /_AUTHOR_/g,       biblio_o.author )
      .replace( /_BIBLIO_ID_/g,    biblioID )
      .replace( /_WORK_ID_/g,      biblio_o.image )
      .replace( /_AUTHOR_/g,       biblio_o.author )
      .replace( /_FORENAME_/g,     biblio_o.forename )
      .replace( /_NAME_/g,         biblio_o.name )
      .replace( /_TITLE_/g,        biblio_o.title )
      .replace( /_YEAR_/g,         biblio_o.year )
      .replace( /_PLACE_/g,        biblio_o.place )
      .replace( /_COUNTRY_/g,      biblio_o.country )
      .replace( /_DATE_/g,         now_s )
      .replace( /_TODAY_/g,        locale_s )
    despath = `content/biblio/items/${biblioID}.md`
    fs.writeFileSync( despath, buffer, write_o )    ;console.log( `<${biblioID}.md> file created` )          
  },
  
}