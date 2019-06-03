const cyrb53__i = ( string_s, seed_i=0 ) =>
{
  let h1_i = 0xdeadbeef ^ seed_i
  let h2_i = 0x41c6ce57 ^ seed_i
  let char_i
  for ( let at_i = 0; at_i < string_s.length; ++at_i )
  {
    char_i = string_s.charCodeAt( at_i )
    h1_i = Math.imul( h1_i ^ char_i, 2654435761 )
    h2_i = Math.imul( h2_i ^ char_i, 1597334677 )
  }
  h1_i = Math.imul( h1_i ^ h1_i>>>16, 2246822507 ) ^ Math.imul( h2_i ^ h2_i>>>13, 3266489909 )
  h2_i = Math.imul( h2_i ^ h2_i>>>16, 2246822507 ) ^ Math.imul( h1_i ^ h1_i>>>13, 3266489909 )
  return 4294967296 * ( 2097151 & h2_i ) + ( h1_i>>>0 )
}

module.exports = cyrb53__i