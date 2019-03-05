const _id = '1594_poussin_losangeles_getty_1650_landscape'
const _w = 4326
const _h = 3215

module.exports =
{
  author:    'A. Dupin',
  id:        `${_id}`,
  artist:    '1594_poussin',
  collector: 'losangeles_getty',
  ref:       '97.PA.60',
  year:      '1650',
  subject:   'Landscape with a Calm (Un Tems calme et serein) -1650..1651-',
  height:    97,
  width:     131,
  sources:   [`${_id}`],
  srcType:   '.jpg',
  framing:   'srosa', // cassetta
  srcalt:    'Landscape with a Calm -1650..1651-',
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
