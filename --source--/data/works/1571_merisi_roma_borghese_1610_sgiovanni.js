const _id = `1571_merisi_roma_borghese_1610_sgiovanni`
const _w = 7323
const _h = 9094

module.exports =
{
  id:        `${_id}`,
  artist:    `1571_merisi`,
  collector: `roma_borghese`,
  ref:       '',
  year:      `1610`,
  subject:   `San Giovanni`,
  height:    0,
  width:     0,
  sources:   [`${_id}`],
  srcType:   '.jpg',
  framing:   'cassetta',
  srcalt:    `Caravaggio: San Giovanni (1610)`,
  srcWidth:  _w,
  srcHeight: _h,
  srcratio:  `${_w}/${_h}`,
  bgcolor:   `hsla(100, 100%, 50%, 1.0)`,
  frames_a:
`[
  { o:   0, t: [ 0, 0 ], s: 1, p: 1 },
  { o: 100, t: [ 0, 0 ], }
]`,
  frames_o: `{ delay: 1000*1, duration: 1000*60, iterations: 1}`,
  frames_o_direction:'normal',
  frames_o_fill:'forwards'
}
