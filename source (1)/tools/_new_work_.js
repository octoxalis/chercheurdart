const newEntries = require( './newEntries' )

// 1697_canal_newyork_met_1740_salute

const work_o =
{
  author    : `A. Dupin`,
  a_date    : `1697`,
  forename  : `Antonio`,
  artist    : `Canal`,
  nickname  : `Canaletto`,
  c_place   : `New York`,
  collector : `Metropolitan`,
  s_date    : `1740`,
  subject   : `Santa Maria della Salute`,
  w         : 3811,
  h         : 2296,
}
newEntries.createWork(work_o )
newEntries.createArtist(work_o )
newEntries.createCollector(work_o )
