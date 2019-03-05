const _id = 'roma_corsini'

module.exports =
{
  id:       `${_id}`,
  place:    'Roma',
  country:  'Italia',
  location: 'Galleria Corsini',
  
  worksId:   require( '../../tools/getWorksByID.js' )( _id, 2 )
}
