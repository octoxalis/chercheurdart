module.exports =
{
  //develop:     false,
  develop:     true,
  siteUrl:     'https://www.chercheurd.art/',
  //devUrl:      'http://192.168.1.67:5500/',
  devUrl:      'http://127.0.0.1:5500/',

  distDirs:
  {
    input:      '.',
    output:     '../site',
    includes:   'includes/',
    data:       'data/',
    scripts:    'static/scripts/',
    styles:     'static/styles/',
    images:     'static/media/images/',
    videos:     'static/media/videos/',
  },

  tagDirs:
  {
    artists:    'artists/',
    works:      'works/',
    collectors: 'collectors/',
    biblio:     'biblio/',
    posts:      'posts/',
    site:       'site/',
    tech:       'tech/',

    items:      'items/',
  },

  search:    //: Must be equivalent to SEARCH_o.settings_o (search.js)
  {
    tags:
    [
      'ORD',
      'PER',
      'ART',
      'WORK',
      'COL',
      'BIB',
      'WEB',
      'LOC',
      'DATE',
    ],
    titles:
    [
      `NON SPÉCIFIÉ`,
      `NOM DE PERSONNE`,
      `NOM D'ARTISTE`,
      `OEUVRE D'ART`,
      `COLLECTION`,
      `BIBLIOGRAPHIE`,
      `TECHNOLOGIE`,
      `LOCALISATION`,
      'DATE',
    ],
  },

  bgImg:        'backg.jpg',
  media_min:    '-@400'
}
