const _id = `1697_canal`

module.exports =
{
  author:     'A. Dupin',
  id:         `${_id}`,
  name:       'Canal',
  forename:   'Antonio',
  nickname:   'Canaletto',
  birthdate:  '1697',
  birthplace: 'Venezia',
  deathdate:  '1768',
  deathplace: 'Venezia',

  worksId:    require( '../../tools/getWorksByID.js' )( _id, 0 )
}
