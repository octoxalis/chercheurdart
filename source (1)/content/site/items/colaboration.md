---js
{
  layout:    `layouts/post/item.njk`,
  permalink: `site/items/collaboration.html`,
  tags:      [ `site` ],
  
  areas:     [ `menu` ,`text` /*,`gallery` ,`media_1` ,`media_2` ,`media_3` ,`media_4`*/ ],
  active:      `text`,

  id:        `2019_chercheurdart_0002_home`,
  image:     `home_03_@550.jpg`,
  title:     `Collaboration`,
  subtitle:  `Participer ou collaborer`,
  abstract:  `L'aide de tous pour faire évoluer ce site est la bienvenue`,
  author:    `A. Dupin`,
  date:      `2019-01-26`,
  hdates:     [ `26 janvier 2019` ],
  comments:  true,
  
  //media:
  //[
  //  {
  //    src:      `2018_chercheurdart_0001_home.jpg`,
  //    alt:      `Chercheur d'Art - Page d'accueil`,
  //    title:    `Page d'accueil`,
  //    abstract: ``,
  //  },
  //],

}
---

[comment]: # (======== Article ========)

{% articleFolder %}
{% contentFolder 1, "Participer en informant" %}

Si vous souhaitez me communiquer des informations en rapport avec le contenu de Chercheurd.art, il vous suffit de m'adresser un {% fromFootnote "2" %}courrier{%endfromFootnote %} en indiquant, le cas échéant, le ou les liens à suivre pour prendre connaissance desdites informations. Une [page][chercheurdart_posts] du site est dédiée aux nouvelles et si vous souhaitez être mentionné comme étant à l'origine de l'information, n'hésitez pas à le préciser dans votre courrier.

{% endcontentFolder %}

{% contentFolder 2, " Collaborer" %}

Chercheurd.art repose sur une base de programmation conséquente, exigeante en temps de développement, et qui a vocation à évoluer au gré des innovations du Web, toujours extrêmement rapides et {% fromFootnote "1" %}polymorphes{%endfromFootnote %}. De nombreuses compétences sont nécessaires et la conjonction des efforts permettant de faire progresser rapidement l'interface et les fonctionnalités mises en œuvre initialement est plus que souhaitable. { .ca_txt }

Si donc vous avez déjà une bonne connaissance des technologies du Web, telles que **CSS**, **Javascript**, **Rust**, **WebAssembly** ou **GraphQL**, votre appui sera des plus appréciés. Adressez-moi un {% fromFootnote "2" %}courrier{%endfromFootnote %} afin de me faire savoir dans quelle mesure vous seriez disposé(e) à apporter votre concours à l'évolution du site. Ma reconnaissance vous est d'hors et déjà entièrement acquise. { .ca_txt }

{% endcontentFolder %}

{% endarticleFolder %}

[comment]: # (======== Footnotes ========)

{% contentFolder 201, "NOTES | VERSIONS" %}
{% footerNote %}

{% toFootnote 1 %}

Voir, par exemple, la technique, particulièrement innovante, des [_polyfill_](https://polyfill.io/v3){target="_blank"}.
{% endtoFootnote %}

{% toFootnote 2 %}

[](#){ .ca_adupin_mail }

{% endtoFootnote %}

{% endfooterNote %}

[comment]: # (======== Historique ========)

### Versions { .ca_version_title }

1. **26 janvier 2019**  
Ébauche initiale. { .ca_version_entry }
{ .ca_version_list }

{% endcontentFolder %}

[comment]: # (======== Links ========)

[chercheurdart_posts]: https://www.chercheurd.art/posts/items/2019-news.html
