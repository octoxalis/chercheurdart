const _id = `1703_boucher`

module.exports =
{
  id:        `${_id}`,
  name:       'Boucher',
  forename:   'François',
  nickname:   '',
  birthdate:  '1703',
  birthplace: 'Paris',
  deathdate:  '1770',
  deathplace: 'Paris',

  worksId:    require( '../../scripts/js/getWorksByID.js' )( _id, 0 )
}
