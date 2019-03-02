const _id = '1594_poussin_madrid_prado_1642_paisaje_P002308'
const _w = 1920
const _h = 1423

module.exports =
{
  author:    'A. Dupin',
  id:        `${_id}`,
  artist:    '1594_poussin',
  collector: 'madrid_prado',
  ref:       'P002308',
  year:      '1642',
  subject:   'Paisaje con ruinas -1642-',
  height:    0,
  width:     0,
  sources:   [`${_id}`],
  srcType:   '.jpg',
  framing:   'srosa', // cassetta
  srcalt:    'Paisaje con ruinas -1642-',
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
