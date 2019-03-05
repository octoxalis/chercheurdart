const _klaw = require( 'klaw-sync' )

/**
 * Return works selected by artist ID (index = 0) or collector ID (index = 2)
 */
module.exports = function ( id, index )
{
  const workFiles_a = _klaw( 'data/works', {nodir: true} )
  var ids_a = []
  for ( var at=0; at < workFiles_a.length; ++at )
  {
    const atpath = workFiles_a[at].path
    const atid = atpath.substring( atpath.lastIndexOf( '/' ) + 1 ).split('.')[0]
    const atparts = atid.split('_')
    if ( id === `${atparts[index]}_${atparts[index+1]}` ) ids_a.push( atid )
  }
  return ids_a
}
