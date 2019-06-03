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
  srcratio:  `${_w}/${_h}`,
  frames_a:
`[
  { o:   0, t: [ 1900, 1100 ], s: 0.01, p: 0.01 },
  { o:  50, t: [ 1900, 1100 ], s: 1, p: 1 },
  { o: 100, t: [ 1900, 1100 ], s: 0.5, p: 0.01 },
]`,
  frames_o: `{ delay: 1000*0, duration: 1000*120, iterations: 1 }`,
  frames_o_direction:'normal',
  frames_o_fill:'forwards',
}
