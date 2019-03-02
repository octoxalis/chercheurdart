const _id = 'princeton_university'

module.exports =
{
  id:       `${_id}`,
  place:    'Princeton',
  country:  'United States of America',
  location: 'Princeton University Art Museum',

  worksId:   require( '../../tools/getWorksByID.js' )( _id, 2 )
}
