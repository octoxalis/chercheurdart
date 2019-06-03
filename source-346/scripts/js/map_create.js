const fs    = require('fs-extra')
const klaw  = require( 'klaw-sync' )

const cyb   = require( './hash' )
const ldate = require( './dateLocale' )

let now_s, locale_s
( { now_s, locale_s } = ldate.dateLocale__o() )

const SITE_URL     = 'https://www.chercheurd.art'
const MAP_DIR      = `map`
const MAP_INI_FILE = `../site/search.ini`
const MAP_XML_FILE = `../site/sitemap.xml`
const MAP_MD_FILE  = `./content/site/items/sitemap.md`
const IMAGE_DIR    = 'static/media/images'

//: sitemap.xml
const MAP_XML_OPEN = `<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:ca="http://www.chercheurd.art/schemas/ca_schema">\n`
const MAP_XML_CLOSE = `</urlset>`

//: sitemap.md
const MAP_MD_OPEN = `---js
{
  layout:    'layouts/post/item.njk',
  permalink: 'site/items/sitemap.html',
  tags:      [ 'site' ],
  areas:     [ 'menu' ,'text' ],
  active:    'text',
  title:     'Plan du site Chercheurd.art',
  subtitle:  'Plan de navigation',
  author:    'A. Dupin',
  date:      '${now_s}',
  hdates:     [ '${locale_s}' ],
  abstract:  'Toutes les pages du site Chercheurd.art',
  annotations:  true,
  
}
---
[comment]: # (======== Plan ========)
{% articleFolder %}\n`

const TAGS_SECTION = 'TAGS='
const SEPARATOR = '|'
const NEW_LINE = '\n\n'
const BR_LINE = '<br>'

const SECTIONS_o =
{
  artists:    'artistes',
  biblio:     'bibliographie',
  collectors: 'collections',
  works:      'œuvres',
  posts:      'articles',
  site:       'site',
  tech:       'technologie',
  user:       'votre collection',
}

/*
const urlToXML = ( ...args ) =>
{
  const title    = args[2].replace( '&', '&amp;' ).replace( '"', '&quot;' ).replace( "'", '&apos;' )
  const subtitle = args[3].replace( '&', '&amp;' ).replace( '"', '&quot;' ).replace( "'", '&apos;' )
  const abstract = args[4].replace( '&', '&amp;' ).replace( '"', '&quot;' ).replace( "'", '&apos;' )
  const author   = args[5].replace( '&', '&amp;' ).replace( '"', '&quot;' ).replace( "'", '&apos;' )
  let xml_s = 
`  <url>
    <loc>${SITE_URL}/${args[0]}.html</loc>
    <lastmod>${args[1]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <ca:title>${title}</ca:title>
    <ca:subtitle>${subtitle}</ca:subtitle>
    <ca:abstract>${abstract}</ca:abstract>
    <ca:author>${author}</ca:author>\n`
  if ( args[6] ) xml_s += `    <ca:image>${SITE_URL}/${IMAGE_DIR}/${args[6]}</ca:image>\n`
  return xml_s + `  </url>\n`
}
*/
const urlToXML = ( ...args ) =>
{
  return `  <url>
    <loc>${SITE_URL}/${args[0]}.html</loc>
    <lastmod>${args[1]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>\n`
}

/*
    Map()
      val[0]  //: url
      val[1]  //: date
      val[2]  //: title
      val[3]  //: subtitle
      val[4]  //: abstract
      val[5]  //: author
      val[5]  //: image
*/
/*
const urlToMD = ( url_m ) =>
{
  const url2_m = new Map( [...url_m.entries()].sort() )
  let root_m = new Map()
  let atFold = 0
  let url2_s = ''
  let lastkey_s = ''
  for ( let [ key, val ] of url2_m )
  {
    const atkey_a = key.split( '/' )
    if ( atkey_a.length === 1 )    //: site root
    {
      root_m.set( key, val )
      continue
    }
    const key_s = val[0].slice( 0, val[0].indexOf( '/' ) )
    if ( key_s !== lastkey_s )
    {
      ++atFold
      if ( lastkey_s !== '' ) url2_s += `{% endcontentFolder %}${NEW_LINE}`
      const fold_s = val[0].slice( 0, val[0].indexOf( '/' ) )
      url2_s += `{% contentFolder ${atFold}, "${SECTIONS_o[fold_s]}" %}${NEW_LINE}`
      lastkey_s = key_s
    }
    const atval = ( key_s === 'works' ) ? 2 : 3    // use title, not subtitle
    url2_s += `**[${val[atval]}](${SITE_URL}/${val[0]}.html)**  \n`    //: double space + \n
    const date_a = val[1].split( '-' )
    date_a.reverse()
    url2_s += `_${val[4]}_${BR_LINE}${val[5]}, le ${date_a[0]}-${date_a[1]}-${date_a[2]}{ .ca_version_entry }${NEW_LINE}`
}
  //... process root_m
  return `${MAP_MD_OPEN}${url2_s}{% endcontentFolder %}${NEW_LINE}`
}
*/
/*
//: generate Markdown:

//: <div class="ca_url_entries_list">
//:   <div class="ca_urlentry">
//:   [_ENTRYLINK_](__link__)
//:     ~ _ENTRYDATE_ _ENTRYAUTHOR_
//:     ~ _ENTRYABSTRACT_
//:   </div>
//: </div>

//: HTML generated from Markdown

//: <div class="ca_url_entries_list">
//:   <div class="ca_urlentry">
//:     <dl>
//:       <dt><a href="https://www.chercheurd.art/....html">_ENTRYLINK_</a></dt>
//:       <dd>_ENTRYDATE_ <em>_ENTRYAUTHOR_</em></dd>
//:       <dd>_ENTRYABSTRACT_</dd>
//:     </dl>
//:   </div>
//: </div>
*/
const urlToMD = ( url_m ) =>
{
  const url2_m = new Map( [...url_m.entries()].sort() )
  let root_m = new Map()
  let atFold = 0
  let url2_s = ''
  let lastkey_s = ''
  for ( let [ key, val ] of url2_m )
  {
    const atkey_a = key.split( '/' )
    if ( atkey_a.length === 1 )    //: site root
    {
      root_m.set( key, val )
      continue
    }
    const key_s = val[0].slice( 0, val[0].indexOf( '/' ) )
    if ( key_s !== lastkey_s )
    {
      ++atFold
      if ( lastkey_s !== '' ) url2_s += `</div>\n{% endcontentFolder %}${NEW_LINE}`
      const fold_s = val[0].slice( 0, val[0].indexOf( '/' ) )
      url2_s += `{% contentFolder ${atFold}, "${SECTIONS_o[fold_s]}", "_norule" %}\n<div class="ca_url_entries_list">${NEW_LINE}`
      lastkey_s = key_s
    }
    const atval = ( key_s === 'works' ) ? 2 : 3    // use title, not subtitle

    const date_a = val[1].split( '-' )
    date_a.reverse()
    url2_s += `<div class="ca_urlentry">${NEW_LINE}[${val[atval]}](${SITE_URL}/${val[0]}.html)\n  ~ ${date_a[0]}-${date_a[1]}-${date_a[2]} _${val[5]}_\n  ~ ${val[4]}${NEW_LINE}</div>\n`
}
  //... process root_m
  return `${MAP_MD_OPEN}${url2_s}{% endcontentFolder %}
{% endarticleFolder %}${NEW_LINE}`
}

const createMap = () =>
{
  const read_o  = { encoding:'utf-8', flag:'r' }
  const files_a = klaw( MAP_DIR, { nodir: true } )
  const path_re = /PATH=(.+?)\n/
  const date_re = /DATE=(.+?)\n/
  const title_re = /TITLE=(.+?)\n/
  const subtitle_re = /SUB=(.+?)\n/
  const abstract_re = /ABS=(.+?)\n/
  const author_re = /AUTH=(.+?)\n/
  const image_re = /IMG=(.+?)\n/
  const tags_re = /TAGS=(.+?)\n/
  const tag_re = /(.+?)=(.+?)\n/g
  let sources_s = ''
  const tags_o = {}
  let mapXML_s = MAP_XML_OPEN
  let mapMD_m  = new Map()
  let tag, tag_a

  for ( let atpath of files_a )
  {
    const atpath_s = atpath.path
    const buffer_s = fs.readFileSync( atpath_s, read_o )
    const path_s     = path_re.exec( buffer_s )[1]
    const date_s     = date_re.exec( buffer_s )[1]
    const title_s    = title_re.exec( buffer_s )[1]
    const subtitle_s = subtitle_re.exec( buffer_s )[1]
    const abstract_s = abstract_re.exec( buffer_s )[1]
    //const author_s   = author_re.exec( buffer_s )[1]
    const author_a    = author_re.exec( buffer_s )
    let author_s      = ( !author_a || author_a[1] === 'undefined' ) ? '' : author_a[1]
    const image_a    = image_re.exec( buffer_s )
    let image_s      = ( !image_a || image_a[1] === 'undefined' ) ? '' : image_a[1]

    mapXML_s += urlToXML( path_s, date_s, title_s, subtitle_s, abstract_s, author_s, image_s )
    mapMD_m.set( path_s, [ path_s, date_s, title_s, subtitle_s, abstract_s, author_s, image_s ] )

    const src_s = `${path_s}${SEPARATOR}${date_s}${SEPARATOR}${title_s}${SEPARATOR}${subtitle_s}${SEPARATOR}${abstract_s}${SEPARATOR}${author_s}${SEPARATOR}${image_s}`
    const hash_s = cyb( src_s )
    sources_s += `${hash_s}=${src_s}\n`
    tag_a = tags_re.exec( buffer_s )
    if ( !tag_a ) continue
    
    const attag_s = tag_a[1]
    const tag_s = buffer_s.slice( buffer_s.indexOf( TAGS_SECTION ) + TAGS_SECTION.length + attag_s.length + 1 )    //: + 1 for \n
    const attags_o = {}
    while ( ( tag_a = tag_re.exec( tag_s ) ) !== null )    //: fetch all tags in this file
    {
      tag = tag_a[1]
      if ( attags_o.hasOwnProperty( tag ) === false ) attags_o[tag] = ''
      attags_o[tag] += `${tag_a[2]}${SEPARATOR}`
    }
    for ( tag in attags_o )    //: merge all tags with already found tags
    {
      attags_o[tag] = attags_o[tag].slice(0, attags_o[tag].lastIndexOf( SEPARATOR ) ) + `{${hash_s}}`    //: add file hash code
      if ( tag in tags_o ) tags_o[tag] += attags_o[tag]    //: this tag has been already found
      else tags_o[tag] = `${tag}=${attags_o[tag]}`         //: 1st time this tag is found
    }
  }

  //: write search.ini
  let ini_s = `DATE=${now_s}\n${sources_s}`
  for ( tag in tags_o ) ini_s += `${tags_o[tag]}\n`
  fs.outputFile( MAP_INI_FILE, ini_s, err => { console.log (err) } )
  ;console.log( `Writing ${MAP_INI_FILE}` )
  
  //: write sitemap.xml
  fs.outputFile( MAP_XML_FILE, `${mapXML_s}${MAP_XML_CLOSE}`, err => { console.log (err) } )
  ;console.log( `Writing ${MAP_XML_FILE}` )

  //: write sitemap.md
  fs.outputFile( MAP_MD_FILE, urlToMD( mapMD_m ), err => { console.log (err) } )
  ;console.log( `Writing ${MAP_MD_FILE}` )
}
createMap()
// ------------------------
// xx module.exports = createMap
