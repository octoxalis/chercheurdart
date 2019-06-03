---js
{
layout:    `layouts/partials/_item_.njk`,
permalink: `collectors/items/paris_louvre.html`,
tags:      [ `collector` ],
areas:     [ `menu` ,`text` ,`gallery` ],
active:    `text`,
itemDir:   `collector`,
itemImg:   true,
  
  id:        `paris_louvre`,
  image:     `1488_vecelli_paris_louvre_1515_femme_miroir.jpg`,
  title:     `Louvre`,
  subtitle:  `Louvre - Paris`,
  author:    `A. Dupin`,
  date:      `2019-01-30`,
  hdates:    [ `30 janvier 2019` ],
  abstract:  `Un des plus riche musée du monde, miroir de l'art occidental`,
  annotations:  true,
}
---
[comment]: # (======== Article ========)

{% articleFolder %}

{% contentFolder 1, "Des collections royales au musée le plus fréquenté du monde" %}

Le _museum_ imaginé par Dominique-Vivant Denon à l'aube du XIXème siècle est aujourd'hui le point de passge de plus de huit millions de visiteurs par an (2017).{ .ca_txt }

{% endcontentFolder %}

{% contentFolder 10, "Site Web" %}

{ .ca_txt }

[Louvre](https://www.louvre.fr/){target="_blank" rel="noreferrer"}

Comment le musée le plus fréquenté du monde peut-il se satisfaire d'un site Web totalement obsolète? **Pas d'image en haute-définition**: uniquement de minuscules vignettes (moins de 200px de large); dimensions immuables des pages (940px de large), totalement inadaptées aux écrans de dimensions courantes; utilisation de technologies abandonnées par une grande majorité de sites depuis plusieurs années (Flash) ou sur le déclin (Drupal). Il serait temps de faire peau neuve!{ .ca_txt }

{% endcontentFolder %}

[comment]: # (======== Footnotes ========)

{% contentFolder 201, "NOTES | VERSIONS" %}
{% footerNote %}


{% endfooterNote %}

[comment]: # (======== Historique ========)

### Versions { .ca_version_title }

1. **1er février 2019**  
  Ébauche initiale{ .ca_version_entry }
{ .ca_version_list }

{% endcontentFolder %}
{% endarticleFolder %}
