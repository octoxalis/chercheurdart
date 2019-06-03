---js
{
  layout:    `layouts/post/item.njk`,
  permalink: `site/items/2019-31-03-collaboration.html`,
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
  annotations:  true,
  
  //media:
  //[
  //  {
  //    type:     `img`,
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

Si vous souhaitez me communiquer des informations en rapport avec le contenu de Chercheurd.art, il vous suffit de m'adresser un [courrier](#){ onclick="mailtoDialog__s()" } en indiquant, le cas échéant, le ou les liens à suivre pour prendre connaissance desdites informations. Une [page][chercheurdart_posts] du site est dédiée aux nouvelles et si vous souhaitez être mentionné comme étant à l'origine de l'information, n'oubliez pas de le préciser dans votre courrier.

{% endcontentFolder %}

{% contentFolder 2, " Collaborer" %}

Chercheurd.art repose sur une base de programmation conséquente, grande consommatrice de temps de développement, en constante évolution pour mettre à profit toutes les innovations du Web, extrêmement rapides et {% fromFootnote "1" %}polymorphes{% endfromFootnote %}. De nombreuses compétences sont nécessaires et la conjonction des efforts permettant de faire progresser rapidement l'interface et les fonctionnalités mises en œuvre initialement est plus que souhaitable. { .ca_txt }

Si donc vous avez déjà une bonne connaissance des technologies du Web, telles que **CSS**, **Javascript**, **Rust**, **WebAssembly** ou **GraphQL**, votre appui sera des plus appréciés. [Contactez-moi](#){ onclick="mailtoDialog__s()" } directement afin de me faire savoir dans quelle mesure vous seriez disposé(e) à apporter votre concours à l'évolution du site. Ma reconnaissance vous est d'hors et déjà entièrement acquise. { .ca_txt }

{% endcontentFolder %}

[comment]: # (======== Footnotes ========)

{% contentFolder 201, "NOTES | VERSIONS" %}

{% footerNote %}

{% toFootnote 1 %}

Voir, par exemple, la technique, particulièrement innovante, des [_polyfill_](https://polyfill.io/v3){target="_blank" rel="noreferrer"}.

{% endtoFootnote %}

{% endfooterNote %}

[comment]: # (======== Historique ========)

### Versions { .ca_version_title }

1. **26 janvier 2019**  
Ébauche initiale. { .ca_version_entry }
{ .ca_version_list }

{% endcontentFolder %}
{% endarticleFolder %}

[comment]: # (======== Links ========)

[chercheurdart_posts]: https://www.chercheurd.art/posts/items/2019-news.html
