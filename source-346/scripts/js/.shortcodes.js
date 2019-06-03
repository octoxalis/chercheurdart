/*
 * Shortcodes definition module
 * Nunjucks
 */
const CODES_o =
{
  /*
   {% articleToCome %}
  */
  articleToCome__s: () => `<h3 class="ca_text_caution">Cet article est en préparation.</h3>`,

   /*
   {% articleFolder, svgIcon %}
   
   __content__
   
   {% endarticleFolder %}
   */

  articleFolder__s: ( content_s, svgIcon_s ) =>
  {
    const icon_s = svgIcon_s ||
`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewbox="0 0 64 64"
id="ca_svg_icon_ctrl_text" class="ca_svg_icon" title="Déplier-Replier"
onclick="DOMOpenFolderAll()">
<line x1="6" y1="8"  x2="48" y2="8"  />
<line x1="6" y1="20" x2="58" y2="20" />
<line x1="6" y1="32" x2="30" y2="32" />
<line x1="6" y1="44" x2="40" y2="44" />
<line x1="6" y1="56" x2="58" y2="56" />
</svg>
`
    return `<div class="ca_folder_container">
<div id="ca_folder_container_inner">
<div id="ca_folder_opener">${icon_s}</div>
${content_s}
</div>
</div>` // inner <div> is MANDATORY
  },

  /*
   {% contentFolder "__atfold__", "__intertitle__" %}
   
   __content__
   
   {% endcontentFolder %}
   */
  contentFolder__s: ( content_s, fold_n, intertitle_s, norule_s ) =>
`<div id="ca_fold_${fold_n}" class="ca_fold_content">
<h3 class="ca_folder" onclick="DOMOpenFolder( this );">${intertitle_s}</h3>
<div class="ca_fold_content_item">
<div class="ca_fold_xcols${norule_s || ''}">${content_s}</div>
</div></div>`,

  /*
   {% footerNote "__atnote__" %}__content__{% endfooterNote %}
   */
  footerNote__s: ( content_s ) =>
  `<footer><h2 class="visually-hidden" id="ca_footnote_label">notes</h2><ol>${content_s}</ol></footer>`,

  /*
   {% fromFootnote "__atnote__" %}__content__{% endfromFootnote %}
   */
  fromFootnote__s: ( content_s, note_n ) =>
  `<a id="ca_from_note_${note_n}" href="#ca_to_note_${note_n}" aria-describedby="ca_note_label">${content_s}</a>`,

  /*
   {% toFootnote "__atnote__" %}__content__{% endtoFootnote %}
   */
  toFootnote__s: ( content_s, note_n ) =>
  `<li id="ca_to_note_${note_n}"><p class="ca_footnote">${content_s}</p><a href="#ca_from_note_${note_n}" aria-label="ca_back_to_text"></a></li>`,

}

module.exports = config =>
{
  config.addNunjucksShortcode("articleToCome",   () => CODES_o.articleToCome__s() )
  config.addPairedShortcode("articleFolder", ( content_s, svgIcon_s ) => CODES_o.articleFolder__s( content_s, svgIcon_s ) )
  config.addPairedShortcode("contentFolder", ( content_s, fold_n, intertitle_s, norule_s ) => CODES_o.contentFolder__s( content_s, fold_n, intertitle_s, norule_s ) )
  config.addPairedShortcode("footerNote",    ( content_s ) => CODES_o.footerNote__s( content_s ) )
  config.addPairedShortcode("fromFootnote",  ( content_s, note_n ) => CODES_o.fromFootnote__s( content_s, note_n ) )
  config.addPairedShortcode("toFootnote",    ( content_s, note_n ) => CODES_o.toFootnote__s( content_s, note_n ) )
}

