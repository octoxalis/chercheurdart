---js
{
  layout:    `layouts/work/item.njk`,
  permalink:  `user/items/2019-05-08-collection_item.html`,
  tags:       [ `user` ],
  areas:      [ `menu` ,`text` ,`gallery` ,`media_1` ,`media_2` ,`media_3` ,`media_4` ],
  active:     `gallery`,
  itemDir:    `work`,
  itemImg:    true,
  isUser:     true,
  isUserItem: true,
  
  id:        `2019_user_location_collection_2019_image`,
  image:     `2019_user_location_collection_2019_image-@400.jpg`,
  title:     `Analyse de l'image`,
  subtitle:  `Analysez`,
  abstract:  `Les images de votre collection`,
  author:    ``,
  date:      `2019-05-08`,
  hdates:    [ `8 mai 2019` ],
  annotations:  true,
}
---

[comment]: # (======== Article ========)

{% articleFolder %}

{% contentFolder 1, "Descriptif", 'norule' %}

!!!include( html/_collection_item_notes_.html )!!!

{% endcontentFolder %}

{% endarticleFolder %}
