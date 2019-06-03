/*
 * Collections definition module
 * Nunjucks
 */
const configureCollections = config_o =>
{
  config_o
    .addCollection('post', collection_a => collection_a.getFilteredByTag('post').reverse() )
  config_o
    .addCollection('site', collection_a => collection_a.getFilteredByTag('site').reverse() )
  config_o
    .addCollection('tech', collection_a => collection_a.getFilteredByTag('tech').reverse() )
    config_o
    .addCollection('user', collection_a => collection_a.getFilteredByTag('user').reverse() )
  config_o
    .addCollection('artist', collection_a => collection_a.getFilteredByTag('artist').reverse() )
  config_o
    .addCollection('work', collection_a => collection_a.getFilteredByTag('work').reverse() )
  config_o
    .addCollection('collector', collection_a => collection_a.getFilteredByTag('collector').reverse() )
  config_o
    .addCollection('biblio', collection_a => collection_a.getFilteredByTag('biblio').reverse() )
  config_o
    .addCollection('menu', collection_a => collection_a.getFilteredByTag('menu') )
}

module.exports = configureCollections
