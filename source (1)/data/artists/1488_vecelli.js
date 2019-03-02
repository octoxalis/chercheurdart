const _id = `1488_vecelli`

module.exports =
{
  author:     'A. Dupin',
  id:         `${_id}`,
  name:       'Vecelli',
  forename:   'Tiziano',
  nickname:   'Titien',
  birthdate:  '1488',
  birthplace: 'Pieve di Cadore',
  deathdate:  '1576',
  deathplace: 'Venezia',

  worksId:    require( '../../tools/getWorksByID.js' )( _id, 0 )
}
