const _id = 'losangeles_getty'

module.exports =
{
  author:   'A. Dupin',
  id:       `${_id}`,
  place:    'Los Angeles',
  country:  'U.S.A.',
  location: 'J. Paul Getty Museum',

  worksId:   require( '../../scripts/js/getWorksByID.js' )( _id, 2 )
}
