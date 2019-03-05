---js
{
  layout:    `layouts/post/item.njk`,
  permalink: `site/items/recherche.html`,
  tags:      [ `site` ],
  
  areas:     [ `menu` ,`text` /*,`gallery` ,`media_1` ,`media_2` ,`media_3` ,`media_4`*/ ],
  active:      `text`,
  
  id:        ``,
  image:     `home_04_@550.jpg`,
  title:     `Rechercher sur le site`,
  subtitle:  `Rechercher sur le site`,
  abstract:  `Rechercher sur le site`,
  author:    `A. Dupin`,
  date:      `2019-01-23`,
  hdates:     [`23 janvier 2019` ],
  comments:  true,

  //media:
  //[
  //  {
  //    src:      'home/cell_center.jpg',
  //    alt:      `__ALT__`,
  //    title:    `__TITLE__`,
  //    abstract: `__ABSTRACT__`,
  //  },
  //],

}
---

[comment]: # (======== Article ========)

{% articleFolder %}
{% contentFolder 1, "Comment rechercher" %}

Cette fonction de recherche n'est pas encore disponible. { .ca_txt }

{% endcontentFolder %}

{% endarticleFolder %}

[comment]: # (======== Footnotes ========)

{% contentFolder 201, "NOTES | VERSIONS" %}
{#% footerNote %#}
{#% toFootnote 1 %#}
{#% endtoFootnote %#}
{#% endfooterNote %#}

[comment]: # (======== Historique ========)

### Versions { .ca_version_title }

1. **25 janvier 2019**  
  Ébauche initiale. { .ca_version_entry }
{ .ca_version_list }

{% endcontentFolder %}
