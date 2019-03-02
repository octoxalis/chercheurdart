---js
{
  layout:    `layouts/post/item.njk`,
  permalink: `site/items/aide.html`,
  tags:      [ `site` ],
  
  areas:     [ `menu` ,`text` ,`gallery` ,/*`media_1` ,`media_2` ,`media_3` ,`media_4`*/ ],
  active:    `text`,

  id:        `2019_chercheurdart_0002_home`,
  image:     `home_01_@550.jpg`,
  title:     `Aide`,
  subtitle:  `FAQ`,
  abstract:  `Tout ce que vous souhaitez savoir pour naviguer "au plus près" sur le site`,
  author:    `A. Dupin`,
  date:      `2019-01-23`,
  hdates:     [ `23 janvier 2019` ],
  comments:  true,
  
  media:
  [
    {
      src:      `2018_chercheurdart_0001_home.jpg`,
      alt:      `Chercheur d'Art - Page d'accueil`,
      title:    `Page d'accueil`,
      abstract: ``,
    },
  ],

}
---

[comment]: # (======== Article ========)

{% articleFolder %}
{% contentFolder 1, "FAQ" %}

[comment]: # (using data)

{% endcontentFolder %}

{% endarticleFolder %}

[comment]: # (======== Footnotes ========)

{% contentFolder 201, "NOTES | VERSIONS" %}

{% footerNote %}

{% endfooterNote %}

[comment]: # (======== Historique ========)

### Versions { .ca_version_title }

1. **23 janvier 2019**  
  Ébauche initiale. { .ca_version_entry }
{ .ca_version_list }

{% endcontentFolder %}
