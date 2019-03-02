const _id = `1594_poussin`

module.exports =
{
  author:     'A. Dupin',
  id:         `${_id}`,
  name:       'Poussin',
  forename:   'Nicolas',
  nickname:   '',
  birthdate:  '1594',
  birthplace: 'Les Andelys',
  deathdate:  '1665',
  deathplace: 'Roma',

  worksId:    require( '../../tools/getWorksByID.js' )( _id, 0 )
}
