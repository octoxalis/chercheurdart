const _id = 'paris_louvre'

module.exports =
{
  author:   'A. Dupin',
  id:       `${_id}`,
  place:    'Paris',
  country:  'France',
  location: 'Louvre',

  worksId:   require( '../../tools/getWorksByID.js' )( _id, 2 )
}
