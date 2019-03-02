const _id = 'chicago_artinstitute'

module.exports =
{
  author:   'A. Dupin',
  id:       `${_id}`,
  place:    'Chicago',
  country:  'U.S.A.',
  location: 'Art Institute Museum',

  worksId:   require( '../../tools/getWorksByID.js' )( _id, 2 )
}
