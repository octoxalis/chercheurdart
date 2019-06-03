const newEntries = require( './newEntries' )

const biblio_o =
{
  author:   `A. Dupin`,
  forename: `Stéphane`,
  name:     `Loire`,
  title:    `la collection Motais de Narbonne, Tableaux français et italiens des XVIIème et XVIIIème siècles`,
  year:     `2010`,
  place:    `Paris`,
  country:  `France`,
  isbn:     `9782757203637`,
  page:     ``,
  image:    ``
}
newEntries.createBiblio( biblio_o )
