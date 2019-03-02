const _id = '1703_boucher_princeton_university_1748_arion'
const _w = 2000
const _h = 1283

module.exports =
{
  id:        `${_id}`,
  artist:    '1703_boucher',
  collector: 'princeton_university',
  ref:       '',
  year:      '1748',
  subject:   'Arion chevauchant son dauphin',
  height:    0,
  width:     0,
  sources:   [`${_id}`],
  srcType:   '.jpg',
  framing:   'srosa',
  srcalt:    'Boucher: Arion (Princeton) - 1748',
  srcWidth:   _w,
  srcHeight:  _h,
  srcratio:  `${_w}/${_h}`,
  bgcolor:   'hsla(200, 100%, 100%, 1.0)',
  frames_a:
`[
  { o:   0, t: [ 1000, 420 ], s: 0.5, p: 0 },
  { o:  10, t: [ 1000, 420 ], s: 1,   p: 1 },
  { o:  20, t: [ 1000, 420 ], s: 1.5       },
  { o:  40, t: [ 1430, 825 ], s: 1         },
  { o:  50, t: [ 1430, 825 ], s: 1.5       },
  { o:  60, t: [  710, 890 ], s: 1         },
  { o:  70, t: [  710, 890 ], s: 1.5       },
  { o:  80, t: [ 1000, 420 ], s: 1         },
  { o:  90, t: [ 1000, 420 ],         p: 1 },
  { o: 100, t: [ 1000, 420 ],         p: 0 }
]`,
  frames_o: `{ delay: 1000*1, duration: 1000*60, iterations: 1}`,
  frames_o_direction:'normal',
  frames_o_fill:'backwards'
}
