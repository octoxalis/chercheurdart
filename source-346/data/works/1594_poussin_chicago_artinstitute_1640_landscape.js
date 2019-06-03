const _id = '1594_poussin_chicago_artinstitute_1640_landscape'
const _w = 3000
const _h = 2220

module.exports =
{
  author:    'A. Dupin',
  id:        `${_id}`,
  artist:    '1594_poussin',
  collector: 'chicago_artinstitute',
  ref:       '1930.500',
  year:      '1650',
  subject:   'Landscape with Saint John on Patmos -1640-',
  height:    100,
  width:     136,
  sources:   [`${_id}`],
  srcType:   '.jpg',
  framing:   'srosa', // cassetta
  srcalt:    'Landscape with Saint John on Patmos -1640-',
  srcWidth:   _w,
  srcHeight:  _h,
  srcratio:  `${_w}/${_h}`,
  frames_a:
  `[
    { o:   0, t: [ 1500, 1100 ], s: 0.01, p: 0.01 },
    { o:  50, t: [ 1500, 1100 ], s: 1, p: 1 },
    { o: 100, t: [ 1500, 1100 ], s: 1, p: 0.01 },
  ]`,
    frames_o: `{ delay: 1000*0, duration: 1000*120, iterations: 1 }`,
    frames_o_direction:'normal',
    frames_o_fill:'forwards',
  }
