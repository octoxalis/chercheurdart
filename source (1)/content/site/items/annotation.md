---js
{
  layout:    `layouts/post/item.njk`,
  permalink: `site/items/annotation.html`,
  tags:      [ `site` ],
  
  areas:     [ `menu` ,`text` /*,`gallery` ,`media_1` ,`media_2` ,`media_3` ,`media_4`*/ ],
  active:      `text`,

  id:        `2019_chercheurdart_0002_home`,
  image:     `home_02_@550.jpg`,
  title:     `Annotation`,
  subtitle:  `Annotations & commentaires`,
  abstract:  `Les étapes à suivre pour annoter le texte ou les images figurant sur le site`,
  author:    `A. Dupin`,
  date:      `2019-01-28`,
  hdates:     [ `28 janvier 2019` ],
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
{% contentFolder 1, "Hypothesis Project" %}

Ce projet a été conçu pour répondre aux besoins croissants de la communauté scientifique de commenter les publications en ligne qu'elle suscite. Un groupe de travail placé sous l'égide du [W3C](https://www.w3.org/Consortium/){target="_blank"} (l'organisation internationale coordonnant le développement de spécifications standard pour le World Wide Web: **WWW**), le _Web Annotation Working Group_, a publié en 2017 les recommandations à suivre pour fournir la couche logicielle permettant à tout un chacun d'apporter des commentaires sur les pages d'un site du Web.{ .ca_txt }

Le Projet Hypothesis implémente cette couche logicielle, intégrée à Chercheurd.art, afin de donner une valeur ajoutée aux données qui sont mis en ligne ici. La marche à suivre pour apporter des annotations à n'importe quelle page est simple et ne nécessite qu'une seule autorisation préalable: l'enregistrement d'un nom d'intervenant ainsi qu'une adresse e-mail valide. Tous les détails du processus peuvent être consultés sur le site **Hypothes.is** (en anglais) et je les résume dans le paragrpahe suivant.{ .ca_txt }

{% endcontentFolder %}

{% contentFolder 2, "Inscrivez-vous..." %}

L'inscription au service Hypothesis ne prend que quelques instants:
+ sélectionnez sur une page de Chercheurd.art un mot ou un groupe de mots;
+ un petit menu contextuel apparaît immédiatement avec deux options: "_Annotate_" et "_Highlight_" (Annoter ou Surligner);
+ une barre latérale surgit alors sur la droite de la fenêtre présentant deux options marquées en rouge dans le coin supérieur droit: "_Sign up_" et "_Log in_" (S'enregistrer et Se loger );
  - choisissez l'option "_Sign up_" si vous n'êtes pas encore accrédité auprès du service d'annotation Hypothesis;
    * dans les champs de dialogue sur la page du site Hypothesis où vous êtes redirigé, entrez votre nom d'utilisateur,
    * votre adresse e-mail,
    * un mot de passe de votre choix,
    * après avoir coché la case d'acceptation des conditions d'inscription,
    * cliquez sur le bouton "_Sign up_" pour finaliser votre enregistrement;
  - sinon, choisissez l'option "_Log in_" si vous n'êtes pas encore logé pour votre session de visite du site Chercheurd.art;
+ vous pouvez dès lors introduire vos commentaires dans l'une des deux parties réservées à cet effet:
  - commentaire concernant une partie de la page visitée ("_Annotations_");
  - commentaire se rapportant à l'ensemble de la page ("Page Notes").

Les parties du texte sélectionnées pour l'annotation sont surlignées en jaune et ne sont visibles que par vous, en revanche, les commentaires adjoints sont consultables par tous sans inscription préalable.{ .ca_txt }

{% endcontentFolder %}

{% contentFolder 3, "Annotez" %}

Le service d'annotation permet quatre types d'annotation:
+ **surlignage** (une partie du texte):  
  une partie du texte de la page est surlignée (en jaune) afin d'être mise en évidence, mais {% fromFootnote "1" %}visible{%endfromFootnote %} uniquement (par défaut) par celui qui surligne;
+ **annotation** (une partie du texte):  
  le surlignage est complété par un commentaire rédigé par l'auteur de l'annotation; il est visible par {% fromFootnote "2" %}tous les visiteurs{%endfromFootnote %} du site;
+ **note de page** (la page entière):  
  un commentaire (sans surlignage) concerne la totalité de la page visitée; comme l'annotation, la note est consultable par tous; pour la créer, il faut cliquer sur le bouton "+New note" situé dans l'espace d'annotation;
+ **réponse** à un commentaire:  
  un commentaire est destiné à répondre à un commentaire dejà publié; il est également visible publiquement.

{% endcontentFolder %}

{% contentFolder 4, "Confidentialité" %}

La **politique de confidentialité** du service d'annotation Hypothesis est [consultable](https://web.hypothes.is/privacy/) (en anglais) sur le site Hypothes.is.
Quant au site Chercheurd.art, il n'a **aucun accès à l'adresse e-mail communiquée** lors de l'enregistrement sur Hypothesis et ne peut donc l'utiliser à quelque moment que ce soit: **Chercheurd.art ne dispose d'aucune donnée personnelle enregistrable**. Vous pouvez ainsi intervenir en toute liberté d'esprit, avec toutes les règles de courtoisie qui s'imposent, quel que soit l'objet de vos propos.{ .ca_txt }

**Toutes les interventions sont "modérées" par le responsable de Chercheurd.art**.{ .ca_txt }

Le service d'annotation intégré à Sur Chercheurd.art peut être utiisé aussi bien pour apporter des rectifications ou compléments d'information que des commentaires de tout type. Il permet notamment d'adjoindre des images ou des vidéos. N'hésitez donc pas à y avoir recours...{ .ca_txt }

{% endcontentFolder %}

{% endarticleFolder %}

[comment]: # (======== Footnotes ========)

{% contentFolder 201, "NOTES | VERSIONS" %}

{% footerNote %}

{% toFootnote 1 %}

Par défaut, le surlignage n'est pas activé lorsque la page est à nouveau consultée. Il est activé en faisant apparaître la barre d'annotation, donc en sélectionnant n'importe quelle partie de la page.
{% endtoFootnote %}

{% toFootnote 2 %}

Il est possible de définir des groupes de visiteurs et de poster des commentaires uniquement visibles par les membres dudit groupe (voir sur le site hypothes.is les [modalités](https://web.hypothes.is/blog/introducing-groups/) d'utilisation).
{% endtoFootnote %}

{% endfooterNote %}

[comment]: # (======== Historique ========)

### Versions{ .ca_version_title }
  1. **28 janvier 2019**
  Version initiale.{ .ca_version_entry }
{ .ca_version_list }

{% endcontentFolder %}

[comment]: # (======== Links ========)

[chercheurdart_posts]: https://www.chercheurd.art/posts/items/2019-news.html
