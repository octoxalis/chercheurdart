const _id = '1594_poussin_madrid_prado_1648_paisaje_P002310'
const _w = 3051
const _h = 1937

module.exports =
{
  author:    'A. Dupin',
  id:        `${_id}`,
  artist:    '1594_poussin',
  collector: 'madrid_prado',
  ref:       'P002310',
  year:      '1648',
  subject:   'Paisaje con edificios -1648..1650-',
  height:    0,
  width:     0,
  sources:   [`${_id}`],
  srcType:   '.jpg',
  framing:   'srosa', // cassetta
  srcalt:    'Paisaje con edificios -1648..1650-',
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
