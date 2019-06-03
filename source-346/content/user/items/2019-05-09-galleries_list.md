---js
{
  layout:    `layouts/post/item.njk`,
  permalink: `user/items/2019-05-09-galleries_list.html`,
  tags:      [ `user` ],
  areas:     [ `menu` ,`text` ,`gallery` /*,`media_1` ,`media_2` ,`media_3` ,`media_4`*/ ],
  active:    `text`,
  itemDir:   `work`,
  itemImg:   true,

  isUser:    true,
  isUserCollection : true,
  
  id:        `2019_user_location_collection_2019_image`,
  image:     `2019_user_location_collection_2019_image-@400.jpg`,
  title:     `Galeries de votre collection`,
  subtitle:  `Collection & Galeries`,
  abstract:  `Organisez les galeries de votre collection avec Chercheurd.art`,
  author:    ``,
  date:      `2019-05-18`,
  hdates:    [ `18 mai 2019` ],
  annotations:  true,
}
---

[comment]: # (======== Article ========)

{% articleFolder %}

{% contentFolder 1, "Collection", 'norule' %}

!!!include( html/_collection_description_.html )!!!

{% endcontentFolder %}

{% contentFolder 2, "Galeries", 'norule' %}

!!!include( html/_gallery_description_.html )!!!

{% endcontentFolder %}

{% endarticleFolder %}
