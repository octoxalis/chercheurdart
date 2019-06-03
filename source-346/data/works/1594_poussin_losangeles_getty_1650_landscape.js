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
  srcratio:  `${_w}/${_h}`,
  frames_a:
  `[
    { o:   0, t: [ 2100, 1600 ], s: 0.01, p: 0.01 },
    { o:  50, t: [ 2100, 1600 ], s: 1, p: 1 },
    { o: 100, t: [ 2100, 1600 ], s: 1, p: 0.01 },
  ]`,
    frames_o: `{ delay: 1000*0, duration: 1000*120, iterations: 1 }`,
    frames_o_direction:'normal',
    frames_o_fill:'forwards',
  }
