const _id = '1488_vecelli_paris_louvre_1515_femme_miroir'
const _w = 4000
const _h = 4881

module.exports =
{
  author:    'A. Dupin',
  id:        `${_id}`,
  artist:    '1488_vecelli',
  collector: 'paris_louvre',
  year:      '1515',
  subject:   'La femme au miroir -1515-',
  sources:   [`${_id}`],
  srcType:   '.jpg',
  framing:   'cassetta', // srosa
  srcalt:    'La femme au miroir -1515-',
  srcWidth:   _w,
  srcHeight:  _h,
  frames_a:
`[
  { o:   0, t: [ 0, 0 ], s: 1, p: 1 },
  { o: 100, t: [ 0, 0 ], }
]`,
  frames_o: `{ delay: 1000*1, duration: 1000*1, iterations: 1}`,
  frames_o_direction:'normal',
  frames_o_fill:'forwards',
}
