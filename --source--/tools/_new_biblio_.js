const newEntries = require( '../../tools/newEntries' )

const biblio_o =
{
  author:   `A. Dupin`,
  forename: `Pierre`,
  name:     `Rosenberg`,
  title:    `Dictionnaire amoureux du Louvre`,
  year:     `2007`,
  place:    `Paris`,
  country:  `France`,
  isbn:     `9782259204033`,
  page:     ``,
  image:    ``
}
newEntries.createBiblio( biblio_o )
