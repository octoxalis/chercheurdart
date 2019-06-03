const _id = 'newyork_metropolitan'

module.exports =
{
  author:   'A. Dupin',
  id:       `${_id}`,
  place:    'New York',
  country:  'U.S.A.',
  location: 'Metropolitan Museum',

  worksId:   require( '../../scripts/js/getWorksByID.js' )( _id, 2 )
}
