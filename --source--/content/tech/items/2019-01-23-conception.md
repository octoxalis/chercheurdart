---js
{
  layout:    `layouts/post/item.njk`,
  permalink: `tech/items/2019-01-23-conception.html`,
  tags:      [ `tech` ],
  
  areas:     [ `menu` ,`text` ,`gallery` /*,`media_1` ,`media_2` ,`media_3` ,`media_4`*/ ],
  active:      `text`,
  
  id:        ``,
  image:     `2019_ca_site_tech_0201_burst-@400.jpg`,
  title:     `Conception et construction`,
  subtitle:  `Concevoir, construire`,
  abstract:  `Conception et construction d'un site expérimental`,
  author:    `A. Dupin`,
  date:      `2019-01-23`,
  hdates:     [`23 janvier 2019` ],
  comments:  true,

  media:
  [
    {
      src:      `home-3-@400.jpg`,
      alt:      `__ALT__`,
      title:    `__TITLE__`,
      abstract: `__ABSTRACT__`,
    },
  ],

}
---

[comment]: # (======== Article ========)

{% articleFolder %}
{% contentFolder 1, "Concevoir" %}

L'élaboration du site Chercheurd.art s'est étendu sur près d'une année, en partant de quelques idées qui me semblaient intéressantes à développer, à savoir: comment tirer parti de toutes les technologies foisonnant sur le Web pour apporter de nouveaux outils logiciels à une discipline qui est, il faut bien l'avouer, assez peu enclin à réévaluer ses méthodologies et ses outils de recherche?{ .ca_txt }

Je ne suis nullement un professionnel du développement Web, même si le premier site que j'ai mis en ligne, totalement programmé "à la main" comme de règle à l'époque, remonte à déjà vingt ans. Je ne suis pas plus un professionnel de l'histoire de l'art, même si une partie de mes études s'est déroulée à la Sorbonne, lorsque André Chastel y enseignait encore. Toutefois, la fréquentation régulière des salles de ventes, afin de débusquer les perles rares que tout collectionneur ne peut s'empêcher de poursuivre inlassablement, m'a conduit à l'étude permanente de certains domaines de l'histoire de l'art, non seulement afin d'alimenter la recherche d'authenticité ou d'attribution que chaque acquisition ne manque pas de susciter, mais aussi d'élargir sans relâche le champ de connaissances que tout collectionneur se doit de posséder. En effet, quel meilleur terrain de mise en pratique du savoir et de la {% fromFootnote 0 %}perspicacité{% endfromFootnote %} que celui de la vente aux enchères?{ .ca_txt }

C'est la visite quotidienne du Web qui m'a progressivement amené à mettre en place des procédures de recherche, de comparaison et d'analyse des reproductions d'œuvres que je voulais étudier, comme un expert doit le faire pour s'assurer de la valeur d'une peinture. Et c'est en poursuivant cette méthodologie que les outils d'investigation dont dispose le site ont été mis au point. Leur nombre peut sembler encore restreint, mais d'autres sont en cours de développement, tant sur le plan du traitement des informations que de celui des images. Qu'il me suffise de dire que le principal objectif est de mettre au point un traitement statistique des données recueillies afin de dégager des tendances, voire des invariants, dans les données colorimétriques que l'on peut accumuler à partir des images des peintures.{ .ca_txt }

Pour ne prendre qu'un exemple, celui de l'analyse scientifique des peintures à l'aide des techniques, aujourd'hui devenues "classiques", que sont la radiographie, la fluorescence, la réflectographie, la spectrométrie par fluorescence X, l'analyse stratigraphique de la couche picturale, l'analyse chimique des pigments, etc., appliquée aux œuvres de Caravaggio, telle qu'elle a été {% fromFootnote 1 %}conduite{% endfromFootnote %} depuis près d'une dizaine d'années pour déboucher sur l'exposition {% fromFootnote 2 %}_Dentro Caravaggio_{% endfromFootnote %} du Palazzo Ducale de Milan en 2017-2018: a-t-on seulement envisagé, avant que de procéder à des analyses dispendieuses, à l'utilisation d'outils logiciels de traitement des images numériques en haute définition dont cette campagne de recherches visant le maître lombard disposait?  Ce n'est pas le cas. Et je comprends fort bien la perplexité d'un Gianni Papi lorsqu'il soulève des {% fromFootnote "3" %}réserves{% endfromFootnote %} sur les résultats d'analyses aussi sophistiquées alors qu'aucune synthèse sur l'ensemble de la pratique picturale du milieu romain, et caravagesque en tout premier lieu, n'a été jusqu'alors entreprise.{ .ca_txt }

{% endcontentFolder %}

{% contentFolder 2, "Traitement d'image" %}

À l'heure où les grands musées, le MET de New York, le Prado de Madrid, la National Gallery de Londres, le Rijks Museum d'Amsterdam{% fromFootnote 4 %}etc.{% endfromFootnote %} diffusent les images haute-définition de leurs {% fromFootnote 4b %}collections{% endfromFootnote %}, il devient incompréhensible que les techniques d'imagerie scientifique ne soient pas appliquées à la recherche en histoire de l'art. Car, si l'on considère la sensibilité des [capteurs lumineux](https://fr.wikipedia.org/wiki/Capteur_photographique) dont disposent aujourd'hui les appareils de photographie numérique, il est légitime de penser que, même avec une marge d'incertitude quant à la fidélité des données recueillies par rapport aux qualités physiques lumineuses de l'original, la peinture, l'analyse que l'on peut en obtenir reste dans une marge d'erreur très faible et peut donc servir de point de départ à une étude statistique scientifiquement valable.{ .ca_txt }

Or, ces techniques sont aujourd'hui parfaitement adaptables à l'environnement du Web, grâce à l'évolution de la capacité de traitement de navigateurs Internet tels que Chrome et Firefox. L'analyse du contenu colorimétrique, pixel par pixel, d'une image de 4000 x 4000 pixels de résolution, ne dure qu'environ {% fromFootnote 5 %}une seconde{% endfromFootnote %}, en utilisant l'algorithme de _scanning_ que j'ai développé pour ce site, qui, de plus, par une procédure de découpage et de {% fromFootnote 6 %}traitement en parallèle{% endfromFootnote %}, le temps de calcul peut être réduit et sans blocage de l'interactivité du navigateur.{ .ca_txt }

En dressant la table des caractéristiques de chaque pixel, il devient possible, en modulant la transparence de chacun d'eux, de faire apparaître ou disparaître, totalement ou partiellement, n'importe quel point de l'image et, surtout de façon sélective quant à la composante choisie: teinte (la "couleur" dans le spectre chromatique allant du rouge au violet), saturation (l'intensité de la teinte, en fait, le pourcentage de noir absolu qu'elle contient) et luminosité (la luminance ou "brillance" de la teinte, c'est-à-dire le pourcentage de blanc absolu qu'elle contient).{ .ca_txt }

L'étude de la [physiologie de la vision](https://fr.wikipedia.org/wiki/Vision_humaine){target="_blank"} a déterminé que l'appareil sensitif de l'œil, si cher aux "connaisseurs" du monde de l'art, est beaucoup plus performant pour distinguer les gradations de luminosité que de teinte ou de saturation. Ce qui explique que nombre de spécialistes de l'étude comparative des reproductions de peinture, tel le ô combien sagace Federico Zeri, privilégient les photographies bichromatiques (noir et blanc) aux reproductions en couleurs pour mieux saisir les différences. J'aime à penser que le délicieux historien collectionneur aurait apprécié les outils d'analyse de ce site puisqu'il donne la possibilité d'avoir recours à tous les types de sélection chromatique désirés: bichromatisme noir et blanc, monochromatisme couleur et toutes les {% fromFootnote 7 %}combinaisons{% endfromFootnote %} possibles.{ .ca_txt }

Plusieurs modèles de représentation des couleurs ont cours dans le traitement informatique de l'image numérique, le plus usuel étant la représentation "additive" de trois composantes: Rouge, Vert, Bleu. Ce modèle ne singularise donc pas les composantes de luminosité et de saturation, ce qui le rend plus "artificiel" que le modèle, mis au point à partir des travaux du peintre américain [Albert Henry Munsell](https://en.wikipedia.org/wiki/Albert_Henry_Munsell){target="_blank"} à la fin du XIXème siècle, séparant les composantes teinte, saturation et luminosité ({% fromFootnote 8 %}HSL{% endfromFootnote %}). Il est possible de représenter ce modèle sous forme graphique à l'aide d'un cylindre dont la section circulaire forme un cercle chromatique des différentes teintes, partant du rouge et finissant, après une révolution de 360°, à nouveau au rouge, en passant par le vert et le bleu.{ .ca_txt }

{% endcontentFolder %}

{% contentFolder 3, "Construction explosive" %}

C'est ce type de "projection" qui est utilisée pour les histogrammes rayonnants de répartition des teintes. Les histogrammes présentés dans chaque page du répertoire des peintures constituent un des outils d'investigation originaux proposés par Chercheurd.art. Ces modèles "explosifs" quantifient le nombre de pixels de chaque couleur du spectre présents dans l'image d'un tableau en utilisant une {% fromFootnote 10 %}échelle logarithmique{% endfromFootnote %}: chacune des 360 valeurs chromatiques est représentée par sa couleur spécifique (totalement saturée) et, pour chaque teinte, la répartition du nombre d'occurrences des différentes valeurs de luminance et de saturation, allant {% fromFootnote 11 %}de 0 à 100{% endfromFootnote %}, est projetée (en cliquant sur son rayon correspondant) de part et d'autre du cercle central.{ .ca_txt }

Ces histogrammes sont précieux, car l'ampleur de la palette utilisée par le peintre ainsi que la prépondérance ou l'absence de certaines tonalités sont discernables au premier regard, ce qui réserve souvent des surprises. Pour des raisons de commodité, le sélecteur de teintes pilotant la représentation "chromatographique" des images analysées, utilise une bande spectrale plane parcourant les 360 gradations chromatiques du cercle de Munsell et le degré d'opacité de tous les pixels correspondants à la teinte peut être varié dans une amplitude allant de 0 (totalement transparent) à 100 (totalement opaque).{ .ca_txt }

{% endcontentFolder %}

{% contentFolder 4, "À suivre..." %}
{% endcontentFolder %}

{% endarticleFolder %}

[comment]: # (======== Footnotes ========)

{% contentFolder 201, "NOTES | VERSIONS" %}
{% footerNote %}

{% toFootnote 0 %}

> «Je n'ai jamais cessé de m'y rendre. [...] Drouot est une drogue. L'"Hôtel", comme on dit, [...] m'a permis de faire régulièrement mes "gammes attributives". [...] Jeunes conservateurs, n'oubliez pas, n'oubliez jamais de vous rendre quotidiennement à Drouot: c'est votre devoir».

**Pierre Rosenberg**, _Dictionnaire amoureux du Louvre_. [biblio]
{% endtoFootnote %}

{% toFootnote 1 %}

Le résultat des recherches est exposé dans deux ouvrages monumentaux: _Caravaggio, Opere a Roma, Tecnica e stile_, 2016. [biblio]
{% endtoFootnote %}

{% toFootnote 2 %}

_Caravaggio_... [biblio]
{% endtoFootnote %}

{% toFootnote 3 %}

Consulter son article en ligne: [_Quale fu veramente l’iter esecutivo di Caravaggio ?_](https://www.aboutartonline.com/quale-fu-veramente-liter-esecutivo-di-caravaggio-gianni-papi-riprende-il-tema-tuttaltro-che-chiuso-dalla-grande-mostra-dentro-caravaggio/){target="_blank"}
{% endtoFootnote %}

{% toFootnote 4 %}

Singulièrement, le Louvre semble ignorer superbement ce mouvement de diffusion international, sans doute pour cause "d'exception culturelle". Les quelques images publiées sur [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:High-resolution_images_from_C2RMF?uselang=fr){target="_blank"} par le {% fromFootnote 9 %}C2RMF{% endfromFootnote %} sont loin de faire le compte.
Il suffit d'ailleurs de consulter la page consacrée à la [colorimétrie](http://technologies.c2rmf.fr/imaging/color){target="_blank"} du site du C2RMF pour jauger l'état de la "recherche" dans ce domaine - qui s'adjoint pourtant les services d'un maître de conférence de l’université de St Etienne, spécialiste de la colorimétrie et du « color management », Philippe Colantoni, dont le site [couleur.org](http://www.couleur.org/){target="_blank"} (en toute simplicité!) est... aux abonnés absents!
Quant à la galerie d'images en haute-définition, elle ne fonctionne tout simplement pas et réclame une version 9 du logiciel Flash Player d'Adobe, non seulement largement tombé en désuétude avec les possibilités d'animation intégrés aux navigateurs, mais, de plus, étant parvenu à une version stable numéro 32!
Les images sont toutefois disponibles sur le site [Wikipedia Commons](https://commons.wikimedia.org/wiki/Category:High-resolution_images_from_C2RMF).
{% endtoFootnote %}

{% toFootnote 4b %}

Sans restrictions pour l'usage particulier tel que ce site, non-commercial et totalement _open source_.
{% endtoFootnote %}

{% toFootnote 5 %}
Mesuré sur le système suivant:
- Processeur Intel(R) Core(TM) i7-6500U CPU @ 2.50GHz; Memoire 8076MB;
- Système d'exploitation Arch Linux Manjaro; Navigateur Google Chrome Version 71.0.3578.98 (Official Build) (64-bit).
{% endtoFootnote %}

{% toFootnote 6 %}

Utilisation de la [_Web Workers API_](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API){target="_blank"}.
{% endtoFootnote %}

{% toFootnote 7 %}

C'est ce que met en exergue la page d'accueil de Chercheurd.art, en exposant, sous forme de vignettes animées, quelques-unes des sélections chromatiques qui peuvent être obtenues à partir de l'[_Arion_][chercheurdart_works_Arion] de François Boucher.

La version bichromatique (noir-blanc ou couleur) du sélecteur de couleur n'est pas à ce jour mise en ligne.
{% endtoFootnote %}

{% toFootnote 8 %}

Hue, Saturation, Luminosity. Il existe de nombreuses variantes du modèle de Munsell, de même que les termes peuvent différer (luminance, etc.), cependant la version HSL est celle qui prévaut dans les applications Web. Par ailleurs, chaque pixel peut être pourvu d'un indice d'opacité allant de l'opaque au transparent (HSLA).
{% endtoFootnote %}

{% toFootnote 9 %}

Centre de Recherche et de Restauration des Musées de France.
{% endtoFootnote %}

{% toFootnote 10 %}

Compte tenu de la grande disparité du nombre de pixels pouvant être relevé pour chaque teinte dans la totalité du cercle chromatique, une échelle linéaire serait totalement inadéquate pour quantifier sur un écran dont la taille la plus commune, dans sa plus petite dimension, est à peine supérieure à un milliers de pixels, des valeurs de plusieurs dizaines ou centaines de milliers d'unités.
{% endtoFootnote %}

{% toFootnote 11 %}

La valeur 0 est le noir et la valeur 100 est le blanc pour la composante de luminance; la valeur 0 est la désaturation totale (gris) de la teinte alors que la valeur 100 est la saturation totale (teinte pure) pour la composante de saturation.
{% endtoFootnote %}

{% endfooterNote %}

[comment]: # (======== Historique ========)

### Versions { .ca_version_title }

1. **23 janvier 2019**  
  Ébauche initiale. { .ca_version_entry }
{ .ca_version_list }

{% endcontentFolder %}

[chercheurdart_works_Arion]:https://www.chercheurd.art/works/items/1703_boucher_princeton_university_1748_arion.html
