const _id = '1697_canal_newyork_metropolitan_1740_salute_5938'
const _w = 3811
const _h = 2296

module.exports =
{
  author:    'A. Dupin',
  id:        `${_id}`,
  artist:    '1697_canal',
  collector: 'newyork_metropolitan',
  year:      '1740',
  subject:   'Santa Maria della Salute -1740-',
  sources:   [`${_id}`],
  srcType:   '.jpg',
  framing:   'srosa', // cassetta
  srcalt:    'Santa Maria della Salute -1740-',
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
