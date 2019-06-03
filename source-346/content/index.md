---js
{
  layout:    `layouts/home/item.njk`,
  permalink: `index.html`,
  //tags:      [ `` ],
  areas:     [ `menu` ,`home` ,`gallery` /*,`media_1` ,`media_2` ,`media_3` ,`media_4`*/ ],
  active:    `gallery`,
  
  //image:   `home_00.jpg`,
  title:     `Chercheur d'Art`,
  subtitle:  `Un laboratoire pour la peinture`,
  author:    `A. Dupin`,
  date:      `2019-01-23`,
  hdates:     [ `23 janvier 2019` ],
  abstract:  `Découvrir chercheurd.art`,
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

{% contentFolder 1, "Peinture et technologie" %}

Chercheur d'Art est avant tout un laboratoire pour examiner la peinture avec les instruments que les technologies du Web les plus récentes mettent à notre disposition. Il revêt, de ce fait, un caractère (hautement) expérimental, tant dans sa forme que dans son contenu.{ .ca_txt }

Dans sa forme: pour que les images puissent être détaillées avec la plus grande résolution possible, en occupant toute la surface disponible de l'écran. Ainsi, chaque page du site est compartimentée en plusieurs zones isolant le texte et les images. Le conventionnel bouton de menu, apparaissant sur demande dans le coin supérieur gauche de la fenêtre donne accès à une vue globale de la page avec ses différentes zones afin de basculer rapidement de l'une à l'autre. Cette forme de présentation à pour but de concentrer l'attention tour à tour ou sur le texte ou sur l'image, au profit de cette {% fromFootnote "1" %}dernière{%endfromFootnote %}.{ .ca_txt }

Expérimental dans son contenu, car les ~°peintures°~ reproduites sont disponibles sous de multiples formes interactives.{ .ca_txt }

{% endcontentFolder %}

{% contentFolder 2, "Voir et agir" %}

Présentation sous forme de galerie, tout d'abord, afin de rassembler et comparer les images du même artiste, ou de plusieurs artistes, placées côte à côte, tout en donnant la possibilité de magnifier chacune, afin de l'examiner plus en détail.{ .ca_txt }

Pour les images dont la définition excède les dimensions de l'écran, le déplacement dans l'image utilise deux techniques, l'une passive, l'autre active: le "parcours" animé, avec effets de rapprochement ou d'éloignement (effet vidéo de [~PER°Ken Burns°~](https://fr.wikipedia.org/wiki/Effet_Ken_Burns){target="_blank" rel="noreferrer"}), parcours immuable puisque programmé à l'avance; l'autre technique est plus conventionnelle: c'est celle du glisser-déposer, afin de placer la partie visible de l'image selon son désir.{ .ca_txt }

L'aide des lignes diagonales et médiatrices superposées à l'image, masquables à volonté, le pivotement et l'inversion en miroir, sont des moyens également très utiles pour étudier la composition des volumes, suivre les lignes directrices, étudier les proportions d'une {% fromFootnote "2" %}œuvre{%endfromFootnote %}.{ .ca_txt }

L'analyse colorimétrique est sans doute l'aspect le plus novateur élaboré pour le site. Elle s'appuie sur le modèle de représentation des couleurs imaginé par le peintre américain [~PER°Albert Henry Munsell°~](https://en.wikipedia.org/wiki/Albert_Henry_Munsell){target="_blank" rel="noreferrer"} à la fin du XIXème siècle, lequel permet d'analyser chaque point de l'image en séparant ses composantes en ~°teinte°~, ~°saturation°~ et ~°luminosité°~ (~°hue°~, ~°saturation°~, ~°luminosity°~ ou [HSL](https://fr.wikipedia.org/wiki/Teinte_saturation_lumi%C3%A8re){target="_blank" rel="noreferrer"}). Il est ainsi possible de sélectionner des teintes précises afin de ne plus faire apparaître que les points de l'image qui leur correspondent et de quantifier la répartition des couleurs sous forme de diagrammes. Ce type de présentation originale est extrêmement précieux (et particulièrement spectaculaire) car il singularise immédiatement la palette des couleurs employées par le {% fromFootnote "3" %}peintre{%endfromFootnote %}.{ .ca_txt }

Les [pages][chercheurdart_tech] du site consacrées aux aspects techniques mis en œuvre fournissent de plus amples détails sur les méthodologies et les algorithmes utilisés (d'autant que ceux-ci font appel aux technologies les plus innovantes du Web), dans l'optique d'une diffusion de ces techniques, mais aussi, je l'espère, de {% fromFootnote "4" %}collaboration{%endfromFootnote %} à l'évolution de Chercheurd.art.{ .ca_txt }

{% endcontentFolder %}

{% contentFolder 3, "Avec quel outil?" %}

La taille des images haute résolution utilisées et la puissance de calcul nécessaire pour les traiter impliquent que ces outils d'analyse ne puissent être disponibles, ou, plus exactement, ne puissent être réellement fonctionnels, que sur un ordinateur de type {% fromFootnote "5" %}portable ou _desktop_{%endfromFootnote %} disposant d'une importante puissance de calcul et d'un dispositif précis de pointage.{ .ca_txt }

Chercheurd.art privilégie donc les dispositifs caractéristiques de ce type de machine: {% fromFootnote "6" %}grand écran{%endfromFootnote %} et pointeur précis (souris ou pavé tactile), tout en offrant aux dispositifs tactiles la possibilité de consulter la partie texte de chaque page dans une mise en page adaptée.{ .ca_txt }

Par ailleurs, la plupart des fonctionnalités développées pour le traitement numérique des images reposent sur les protocoles du Web que seules les toutes dernières versions des navigateurs les plus évolués ont {% fromFootnote "7" %}mis en pratique{%endfromFootnote %}. L'usage du navigateur [~WEB°Chrome°~](https://www.google.com/intl/fr/chrome/){target="_blank" rel="noreferrer"} (ou, avec cependant quelques restrictions, [~WEB°Firefox°~](https://www.mozilla.org/fr/firefox/){target="_blank" rel="noreferrer"}) est donc incontournable afin bénéficier de toutes les fonctions de visualisation proposées.{ .ca_txt }

{% endcontentFolder %}

{% contentFolder 3, "Chercheur... d'or" %}

La matière première du site est aussi simple qu'abondante: ce sont les images de peintures qui s'affichent aujourd'hui sur le Web par millions, certains grands musées, tels le ~COL°Prado°~ de Madrid, la ~COL°Brera°~ de Milan, le ~COL°Metropolitan°~ de New-York, proposant de façon systématique des images haute-définition de leurs collections, utilisables à des fins non-commerciales (souhaitons que le ~COL°Louvre°~ emprunte, dans un avenir prochain, cette voie de diffusion).{ .ca_txt }

Ainsi, quelle que soit la thématique des articles publiés, les peintures référencées par le texte sont regroupées dans quatre types de répertoire: répertoire des [artistes][chercheurdart_artists], des [peintures][chercheurdart_works] et des [collections][chercheurdart_collectors] {% fromFootnote "8" %}privées ou publiques{%endfromFootnote %}, auxquels s'adjoint une [bibliographie][chercheurdart_biblio] reliant le texte aux études d'histoire de l'art dont il s'inspire.{ .ca_txt }

Quant au champ thématique, inutile de dissimuler qu'il se place très largement sous l'influence de mes goûts {% fromFootnote "9" %}peronnels{%endfromFootnote %} de collectionneur pour les siècles d'or de la peinture européenne: ceux qui s'étendent du XVIème au XVIIIème siècles, non sans toutefois négliger d'aller parfois prospecter dans des contrées plus proches de nous...{ .ca_txt }

C'est, en effet, aux ~°collectionneurs°~ que je cherche avant tout à m'adresser, car je partage leurs envies, leurs ambitions, leur perplexité et parfois leurs déceptions, quant la perle convoitée nous échappe ou quand, après coup, l'acquisition se révèle décevante, très rarement heureusement. Mais je ne compte nullement négliger, pour autant, tous ceux qui animent ou provoquent la perpétuelle métamorphose des ~°collections privées et publiques°~. J'espère donc accueillir ici les confidences de ces acteurs souvent silencieux qui vivent au rythme du marché de l'art: ~°commissaires-priseurs°~, ~°marchands°~, ~°experts°~, ~°restaurateurs°~, ~°spécialistes°~ et <q>virtuoses</q> de l'~°attribution°~.{ .ca_txt }

{% endcontentFolder %}

{% contentFolder 3, "Pli selon pli" %}

Enfin, outre le modèle du "dépliant" adopté pour la présentation de la partie texte, exposant d'emblée la liste de ses paragraphes successifs, ce site n'est pas une version figée et définitive que l'on consulte pour faire autorité, mais, à l'image des outils de références apparus avec l'essor du Web et de ses bases de connaissance, il se veut aussi évolutif que possible.{ .ca_txt }

Ainsi, avant même qu'ils ne soient "déployés", les articles dont j'envisage la rédaction sont annoncés et leurs grandes lignes exposées, afin de susciter, c'est un vœu, les réactions de ceux que le thème intéresse. Et pour se repérer dans les modifications apportées, à la fin de chaque texte, une rubrique liste les états de ses versions successives.{ .ca_txt }

Mais Chercheurd.art se veut aussi le plus ~°collaboratif°~ possible et intègre donc, sur chaque page, le service de commentaires Hypothes.is, afin que chaque visiteur puisse, après accréditation, ajouter ses remarques sur les aspects incomplets, inexacts, voire erronés, du contenu publié.{ .ca_txt }

Ce {% fromFootnote "10" %}~°service d'annotation°~{%endfromFootnote %} me parait à la fois beaucoup plus discret, plus flexible et surtout plus constructif que la portion d'interventions venant habituellement alourdir le bas des pages des sites ouverts aux commentaires, car il permet de sélectionner et de "marquer" les mots ou paragraphes référencés et d'utiliser texte, image, voire vidéo, pour annoter telle ou telle partie ou totalité du contenu publié, images incluses.{ .ca_txt }

{% endcontentFolder %}

[comment]: # (======== Footnotes ========)

{% contentFolder 201, "NOTES | VERSIONS" %}

{% footerNote %}
{% toFootnote 1 %}

De plus, tous les élements pouvant distraire le regard de l'image sont automatiquement "escamotés" par transparence: l'image, rien que l'image!

Ainsi la rampe d'ascenseur qui permet habituellement de faire défiler la page cède la place à une "barre" de ~°navigation°~ située sur le bord droit de la fenêtre (voir la page d'[aide][chercheurdart_annotation] pour plus de précisions sur les fonctions de navigation du site).

{% endtoFootnote %}

{% toFootnote 2 %}

Ultérieurement, l'adjonction d'outils interactifs supplémentaires (règles, compas, etc.) mesurant avec précision les distances et les surfaces permettront d'approfondir l'~°analyse de la composition°~ d'une peinture avec toute la souplesse requise.

{% endtoFootnote %}

{% toFootnote 3 %}

Cette ~°palette°~ se révèle bien souvent beaucoup plus restreinte qu'il n'y parait à l'œil, notablement plus sensible aux gradations de ~°luminosité°~ que de ~°chromatisme°~.

{% endtoFootnote %}

{% toFootnote 4 %}

Cette [page][chercheurdart_collaboration] de Chercheurd.art est destinée à accueillir les propositions et les appels à toute forme de ~°collaboration°~.

{% endtoFootnote %}

{% toFootnote 5 %}

Quel serait, en effet, l'utilité d'examiner une image de plusieurs milliers de pixels de côté sur un écran de moins de 1000 pixels de large piloté par un ~°processeur°~ aux capacités de calcul limitées?

{% endtoFootnote %}

{% toFootnote 6 %}

L'utilisation de la fonction plein écran (touche F11) est, de surcroît, fort appréciable pour magnifier l'image.

{% endtoFootnote %}

{% toFootnote 7 %}

Certaines ne sont même disponibles que sur le navigateur [~WEB°Chrome°~](https://www.google.com/intl/fr/chrome/){target="_blank" rel="noreferrer"}, qui offre au programmeur des techniques de ~°traitement des images°~ particulièrement performantes.

{% endtoFootnote %}

{% toFootnote 8 %}

~°Collections°~ tant actuelles qu'anciennes: les ~°inventaires°~ des magnifiques ~°galeries°~, comme celle de ~PER°Scipion Borghese°~, sont non seulement précieux pour retracer l'historique d'une peinture mais font encore et toujours rêver le collectionneur d'aujourd'hui.

{% endtoFootnote %}

{% toFootnote 9 %}

Il s'agit bien d'un ~°blog personnel°~, non?

{% endtoFootnote %}

{% toFootnote 10 %}

Hypothes.is s'appuie sur les recommandations du [~WEB°W3C Web Annotation Working Group°~](https://www.w3.org/blog/news/archives/6156){target="_blank" rel="noreferrer"}.
Consulter la section consacrée à l'utilisation des [~°annotations°~][chercheurdart_annotation].

{% endtoFootnote %}

{% endfooterNote %}

[comment]: # (======== Historique ========)

### Versions { .ca_version_title }

1. **23 janvier 2019**  
Rédaction initiale.{ .ca_version_entry }
{ .ca_version_list }

{% endcontentFolder %}
{% endarticleFolder %}

[comment]: # (======== Links ========)

[chercheurdart_annotation]:    https://www.chercheurd.art/site/items/2019-31-03-annotation.html
[chercheurdart_collaboration]: https://www.chercheurd.art/site/items/2019-31-03-collaboration.html
[chercheurdart_tech]:          https://www.chercheurd.art/tech/list_0.html
[chercheurdart_artists]:       https://www.chercheurd.art/artists/list_0.html
[chercheurdart_works]:         https://www.chercheurd.art/works/list_0.html
[chercheurdart_collectors]:    https://www.chercheurd.art/collectors/list_0.html
[chercheurdart_biblio]:        https://www.chercheurd.art/biblio/list_0.html
