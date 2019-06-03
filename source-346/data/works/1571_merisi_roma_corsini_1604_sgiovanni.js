const _id = '1571_merisi_roma_corsini_1604_sgiovanni'
const _w = 1073
const _h = 774

module.exports =
{
  author:    'A. Dupin',
  id:        `${_id}`,
  artist:    '1571_merisi',
  collector: 'roma_corsini',
  ref:       '',
  year:      '1604',
  subject:   'San Giovanni',
  height:    0,
  width:     0,
  sources:   [`${_id}`],
  srcType:   '.jpg',
  framing:   'cassetta',
  srcalt:    'Caravaggio: San Giovanni (Roma) - 1604',
  srcWidth:   _w,
  srcHeight:  _h,
  srcratio:  `${_w}/${_h}`,
  bgcolor:   'hsla(300, 100%, 100%, 1.0)',
  frames_a:
  `[
    { o:   0, t: [ 550, 380 ], s: 0.01, p: 0.01 },
    { o:  50, t: [ 550, 380 ], s: 1, p: 1 },
    { o: 100, t: [ 550, 380 ], s: 1, p: 0.01 },
  ]`,
    frames_o: `{ delay: 1000*0, duration: 1000*120, iterations: 1 }`,
    frames_o_direction:'normal',
    frames_o_fill:'forwards',
  }
