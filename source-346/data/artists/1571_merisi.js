const _id = `1571_merisi`

module.exports =
{
  id:        `${_id}`,
  name:       'Merisi',
  forename:    'Michelangelo',
  nickname:   'Caravaggio',
  birthdate:  '1571',
  birthplace: 'Milano',
  deathdate:  '1610',
  deathplace: 'Porto Ercole',

  worksId:    require( '../../scripts/js/getWorksByID.js' )( _id, 0 )
}
