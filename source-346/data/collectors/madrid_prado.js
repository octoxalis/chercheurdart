const _id = 'madrid_prado'

module.exports =
{
  author:   'A. Dupin',
  id:       `${_id}`,
  place:    'Madrid',
  country:  'España',
  location: 'Museo del Prado',

  worksId:   require( '../../scripts/js/getWorksByID.js' )( _id, 2 )
}
