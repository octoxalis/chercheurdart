const _id = '1571_merisi_roma_borghese_1606_sgirolamo'
const _w = 2400
const _h = 1825

module.exports =
{
  author:    'A. Dupin',
  id:        `${_id}`,
  artist:    '1571_merisi',
  collector: 'roma_borghese',
  ref:       '',
  year:      '1606',
  subject:   'San Girolamo',
  height:    0,
  width:     0,
  sources:   [`${_id}`],
  srcType:   '.jpg',
  framing:   'cassetta',
  srcalt:    'Caravaggio: San Girolamo (Roma) - 1606',
  srcWidth:  _w,
  srcHeight: _h,
  srcratio:  `${_w}/${_h}`,
  bgcolor:   'hsla(200, 100%, 100%, 1.0)',
  frames_a:
  `[
    { o:   0, t: [ 1200, 900 ], s: 0.01, p: 0.01 },
    { o:  50, t: [ 1200, 900 ], s: 1, p: 1 },
    { o: 100, t: [ 1200, 900 ], s: 1, p: 0.01 },
  ]`,
    frames_o: `{ delay: 1000*0, duration: 1000*120, iterations: 1 }`,
    frames_o_direction:'normal',
    frames_o_fill:'forwards',
  }
