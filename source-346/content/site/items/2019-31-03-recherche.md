---js
{
  layout:    `layouts/post/item.njk`,
  permalink: `site/items/2019-31-03-recherche.html`,
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
  annotations:  true,

  //media:
  //[
  //  {
  //    type:     `img`,
  //    src:      `home/post-writer-@400.jpg`,
  //    alt:      `__ALT__`,
  //    title:    `__TITLE__`,
  //    abstract: `__ABSTRACT__`,
  //  },
  //],

}
---

[comment]: # (======== Article ========)

{% articleFolder %}
{% contentFolder 1, "Recherche sémantique" %}

Chercheurd.art dispose d'une ~WEB°fonction de recherche°~ d'un genre particulier qui s'apparente à la ~WEB°recherche sémantique°~, sans toutefois avoir recours à un moteur de recherche tel que ~WEB°Bing°~, ~WEB°DuckDuckGo°~, ~WEB°Yahoo°~ ou ~WEB°Google°~. Il s'agit donc d'un outil totalement dédié, présentant le double avantage de ne laisser aucune trace dans des ~WEB°moteurs de recherche°~ pouvant se révéler trop intrusif dans le domaine de la ~WEB°confidentialité°~, mais aussi et surtout d'être en parfaite adéquation avec l'esprit et le contenu du site. { .ca_txt }

Ce type de recherche est en effet directement guidé par le ~WEB°balisage°~ des pages du site mis en place au moment de la rédaction du contenu. Le choix des mots ou expressions qui pourront faire aboutir une recherche est donc du ressort du rédacteur du contenu et toute ~WEB°requête°~ ne correspondant pas aux mots ou expressions choisis ne pouront être trouvés par le visiteur. Ce choix réduit donc le ~WEB°champ de recherche°~ a parcourir lors de chaque ~WEB°requête°~, ce qui accélère le processus de manière significative, mais donne également la possibilité de signaler de façon spécifique les occurences des termes recherchés sur les pages où ils ont été trouvés. { .ca_txt }

{% endcontentFolder %}

{% contentFolder 2, "Une question de champ" %}

La procédure de requête nécessite donc de définir deux composantes: le ou les termes recherchés, aussi bien nom communs que noms propres, puis de sélectionner le ~WEB°champ sémantique°~ qui délimitera la recherche. { .ca_txt }

Ces champs sémantiques sont, bien évidemment, fonction de la teneur spécifique du site et correspondent aux catégories suivantes:
  + **Nom de personne**, n'incluant pas les noms d'artistes;
  + **Nom d'artiste**, à l'exception des noms propres de la catégorie précédente;
  + **Œuvre d'art**, titre ou partie de titre;
  + **Collection**, publique ou privée;
  + **Bibliographie**, titre (ou partie) de la référence;
  + **Technologie & Web**, sites, programmes, systèmes, ou technologies de l'image numérique;
  + **Localisation**, ville, pays, etc;
  + **Date**, année, siècle, période, etc;
  + **Non spécifié**, afin de rechercher les termes plus {% fromFootnote 1 %}généraux{% endfromFootnote %};

Si le besoin s'en fait sentir ultérieurement, le nombre de catégories pourra être enrichi.{ .ca_txt }

Afin d'indiquer les deux composantes de la recherche et de présenter le résultat obtenu, un section spécifique est accessible sur chaque page du site: le formulaire <q>Recherche</q>.

{% endcontentFolder %}

{% contentFolder 3, "Requête et résultat" %}

Les éléments de la recherche unene fois déterminés, le processus est initié en clicquant sur le bouton <q>Rechecher</q> du formulaire de requête et le résultat s'affiche sous la forme d'une liste de pages contenant les termes recherchés.{ .ca_txt }

Chacune de ces pages est décrite par son titre, sa date de mise en ligne, son auteur et un bref résumé du contenu. Le titre sert de lien pour accéder directement à la page, en ouvrant un nouvel onglet du navigateur. Et là, la magie d'un système de recherche dédié commence...{ .ca_txt }

En effet, à la différence des moteurs de recherche externes au site, qui stoppent leurs services après avoir affiché la liste de liens trouvés, le système dédié de Chercheurd.art accompagne le visiteur dans sa consultation en surlignant les occurences des termes trouvés. De plus, chaque page correspondant au résultat de la requête dispose, elle aussi, de liste des résultats de la recherche en cours, ce qui permet de naviguer de page en page en parcourant l'ensemble du résultat. Au fur et à mesure que les pages concernées sont visitées, les entrées de la liste correspondantes sont signalées parun surlignage spécifique.{ .ca_txt }

Enfin, le formulaire de recherche comporte également des boutons de contrôle permettant de retrouver la liste des résultats d'une requête antérieure puis de reparcourir les résultats les plus récents. Cette fonctionnalité avancée est une des caractéristiques uniques de la recherche du contenu du site Chercheurd.art. Par ailleurs, autre singularité de ce système de recherche, les requêtes sont effectuées sans {% fromFootnote 2 %}bloquer{% endfromFootnote %} les actions de navigation. { .ca_txt }
{% endcontentFolder %}

[comment]: # (======== Footnotes ========)

{% contentFolder 201, "NOTES | VERSIONS" %}

{% footerNote %}

{% toFootnote 1 %}

Afin de ne pas multiplier le nombre d'entités sémantiques, au-delà de ce qui est nécessaire (pour reprendre l'excellente formule de ~PER°Guillaume d'Ockam°~).

{% endtoFootnote %}

{% toFootnote 2 %}

Je consacrerai un article complet sur les aspects techniques du système de recherche développé pour ce site.

{% endtoFootnote %}

{% endfooterNote %}


[comment]: # (======== Historique ========)

### Versions { .ca_version_title }

1. **25 janvier 2019**  
  Ébauche initiale. { .ca_version_entry }
{ .ca_version_list }

2. **23 avril 2019**  
  Version beta de la recherche sémantique. { .ca_version_entry }
{ .ca_version_list }

{% endcontentFolder %}
{% endarticleFolder %}
