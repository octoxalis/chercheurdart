const newPost = require( './newPost' )

const post_o =
{
  id:        `titre`,          // : lowercase-title
  layout:    `post`,           // : post
  plink:     `posts`,          // : posts || tech || site
  tags:      `post`,           // : post  || tech || site
  
  image:     `image-@400.jpg`,  // : 1560_carracci_roma_farnese_1600_bacchus
  title:     `title`,           // : Rome 1600
  subtitle:  `subtitle`,        // : Rome 1600
  author:    `A. Dupin`,
  abstract:  `Blabla`,          // : Blabla
  
  // comment out img_src if no media
  //img_src:      ``,           // : 1581_Zampieri_1628_sgiovanni
  img_alt:      ``,             // : 1581_Zampieri_1628_sgiovanni
  img_title:    ``,             // : San Giovanni
  img_abstract: ``,             // : San Giovanni
  
  // comment out video_src if no media
  //video_src:      ``,           // : 1581_Zampieri_1628_sgiovanni
  video_alt:      ``,             // : 1581_Zampieri_1628_sgiovanni
  video_title:    ``,             // : San Giovanni
  video_abstract: ``,             // : San Giovanni
  
}
newPost.createPost( post_o )
