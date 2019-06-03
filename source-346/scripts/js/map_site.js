const fs = require('fs-extra')

const MAP_SITE_o =
{
  author_s:    'A. Dupin',
  dir_s:       'map/',
  tags_s:      'TAGS=',
  ord_s:       'ORD',
  mark_s:      'mark',
  data_s:      'data-tag',
  mchar_s:     '~',
  schar_s:     '°',
  separator_s: '|',
}

/**
 * 
 * @param {*} code_s 
 */
const parse__a = ( code_s ) =>
{
  const tag_re = new RegExp( `${MAP_SITE_o.mchar_s}([A-Z]+?)?${MAP_SITE_o.schar_s}(.+?)${MAP_SITE_o.schar_s}${MAP_SITE_o.mchar_s}`, 'g' )
  let tag_a
  let tag_s = MAP_SITE_o.tags_s
  let buffer_s = ''
  const offset_n = MAP_SITE_o.tags_s.length
  while ( ( tag_a = tag_re.exec( code_s ) ) !== null )
  {
    const tag = tag_a[1] || MAP_SITE_o.ord_s
    if ( tag_s.includes( tag, offset_n ) === false ) tag_s += `${tag}${MAP_SITE_o.separator_s}`
    buffer_s += `${tag}=${tag_a[2]}\n`
  }
  tag_s = ( tag_s.length === offset_n ) ? '' : tag_s.slice( 0, tag_s.length - 1 )
  return [ tag_s, buffer_s ]
}

/**
 * 
 * @param {*} code_s
 */
const tag__s = ( code_s ) =>
{
  const tag_re = new RegExp( `~°`, 'g' )    //: No tag
  const open_re = new RegExp( `${MAP_SITE_o.mchar_s}([A-Z]+?)?${MAP_SITE_o.schar_s}`, 'g' )
  const close_re = new RegExp( `${MAP_SITE_o.schar_s}${MAP_SITE_o.mchar_s}`, 'g' )
  return code_s
    .replace( tag_re, `~${MAP_SITE_o.ord_s}°` )
    .replace( open_re, `<${MAP_SITE_o.mark_s} ${MAP_SITE_o.data_s}="$1">` )
    .replace( close_re, `</${MAP_SITE_o.mark_s}>` )
  //xx const tag_re = `\/([A-Z]+?)?${MAP_SITE_o.schar_s}(.+?)${MAP_SITE_o.schar_s}\/`
  //xx return code_s.replace( tag_re, ( match, p1, p2 ) => `<mark data-tag="${p1}">${p2}</mark>` )
}

/**
 * 
 * @param {*} code_s 
 * @param {*} head_o: { permalink:'permalink', title:'title', date:'2019-01-01', author:'author' }
 */
const mapSite__s = ( code_s, head_o ) =>
{
  if ( !head_o.permalink ) return code_s    //: no content
  let [ tag_s, buffer_s ] = parse__a( code_s )
  const srcpath = head_o.permalink.slice( 0, -5 )    //: strip '.html' at end
  const despath = `./${MAP_SITE_o.dir_s}${srcpath.slice( srcpath.lastIndexOf( '/' ) + 1 )}.ini`    //: skip '/' (lastIndexOf === -1 ? 0)
  const header = `PATH=${srcpath}\nDATE=${head_o.date}\nTITLE=${head_o.title}\nSUB=${head_o.subtitle}\nABS=${head_o.abstract}\nAUTH=${head_o.author}\nIMG=${head_o.img}\n`
  fs.outputFile( despath, `${header}${tag_s}\n${buffer_s}`, err => { console.log (err + ` !!! NO CONTENT in ${despath}` ) } )
  console.log( `Writing ${despath} from ./${head_o.permalink}` )
  if ( buffer_s ) code_s = tag__s( code_s )
  return code_s
}

module.exports = mapSite__s
