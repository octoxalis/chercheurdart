const _id = '2019_user_location_collection_2019_image'
const _w = 2000
const _h = 1283

module.exports =
{
  isUser:    true,
  author:    'A. Dupin',
  id:        `${_id}`,
  artist:    '2019_user',
  collector: 'location_collection',
  ref:       '',
  year:      '2019',
  subject:   'Collection privée',
  height:    0,
  width:     0,
  sources:   [`${_id}`],
  srcType:   '.jpg',
  framing:   'srosa',
  srcalt:    'Collection privée',
  srcWidth:   _w,
  srcHeight:  _h,
  srcratio:  `${_w}/${_h}`,
  bgcolor:   'hsla(200, 100%, 100%, 1.0)',
  frames_a:
  `[
    { o:   0, t: [ 1000, 1000 ], s: 0.01, p: 0.01 },
    { o:  50, t: [ 1000, 1000 ], s: 1, p: 1 },
    { o: 100, t: [ 1000, 1000 ], s: 0.5, p: 0.01 },
  ]`,
  frames_o: `{ delay: 1000*0, duration: 1000*120, iterations: 1}`,
  frames_o_direction:'normal',
  frames_o_fill:'forwards'
}
