/**
 * Read a ini file
 *   ; COMMENT LINE
 *   [section1]
 *   SKIP BLANK LINE
 *   key1=value1
 *   [section2]
 *   key2=value2
 * return
 *   {
 *   section1: { key1: value1 },
 *   section2: { key2: value2 },
 *   }
*/
const iniParser = ( data ) =>
{
  const regex =
  {
    section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
    entry:   /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
    comment: /^\s*;.*$/
  }
  const lines = data.split(/[\r\n]+/)
  let ini_o = {}
  let section = null

  lines.forEach( (line) =>
  {
    if ( regex.comment.test( line ) ) return    //: COMMENT
    if ( regex.entry.test( line ) )             //: ENTRY
    {
      const match_a = line.match( regex.entry )
      if ( section ) ini_o[section][match_a[1]] = match_a[2]
      else ini_o[match_a[1]] = match_a[2]
      return
    }
    if ( regex.section.test( line ) )           //: SECTION
    {
      const match_a = line.match( regex.section )
      ini_o[match_a[1]] = {}
      section = match_a[1]
      // xx return
    }
    //: skip blank line or malformed line
  })
  return ini_o
}

module.exports = iniParser