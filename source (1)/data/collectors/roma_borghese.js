const _id = 'roma_borghese'

module.exports =
{
  id:       `${_id}`,
  place:    'Roma',
  country:  'Italia',
  location: 'Galleria Borghese',

  worksId:   require( '../../tools/getWorksByID.js' )( _id, 2 )
}
