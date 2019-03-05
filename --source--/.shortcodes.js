/*
 * Shortcodes definition module
 * Nunjucks
 */

const SHORTCODES = {
  /*
   {% articleFolder %}
   
   __innercontent__
   
   {% endarticleFolder %}
   */
  articleFolder: function(innercontent) {
    return `<div class="ca_folder_container"><div class="ca_folder_container_inner">${innercontent}</div></div>`; // inner <div> is MANDATORY
  },

  /*
   {% contentFolder "__atfold__", "__intertitle__" %}
   
   __innercontent__
   
   {% endcontentFolder %}
   */
  contentFolder: function(innercontent, atfold, intertitle) {
    return `<div id="fold-${atfold}" class="ca_fold_content">
    <h3 class="ca_folder"
    onclick="this.nextElementSibling.classList.toggle('ca_is_open');this.parentElement.classList.toggle('ca_has_open');">${intertitle}</h3>
    <div class="ca_fold_content_item">
    <div class="ca_fold_xcols">${innercontent}</div>
    </div></div>`;
  },

  /*
   {% footerNote "__atnote__" %}__innercontent__{% endfooterNote %}
   */
  footerNote: function(innercontent) {
    return `<footer><h2 class="visually-hidden" id="ca_footnote_label">notes</h2><ol>${innercontent}</ol></footer>`;
  },

  /*
   {% fromFootnote "__atnote__" %}__innercontent__{% endfromFootnote %}
   */
  fromFootnote: function(innercontent, atnote) {
    return `<a id="ca_from_note_${atnote}" href="#ca_to_note_${atnote}" aria-describedby="ca_note_label">${innercontent}</a>`;
  },

  /*
   {% toFootnote "__atnote__" %}__innercontent__{% endtoFootnote %}
   */
  toFootnote: function(innercontent, atnote) {
    return `<li id="ca_to_note_${atnote}"><p class="ca_footnote">${innercontent}</p><a href="#ca_from_note_${atnote}" aria-label="ca_back_to_text">↩</a></li>`;
  }
};

function shortcodesSet(config) {
  config.addPairedShortcode("articleFolder", function(innercontent) {
    return SHORTCODES.articleFolder(innercontent);
  });
  config.addPairedShortcode("contentFolder", function(innercontent, fold, intertitle) {
    return SHORTCODES.contentFolder(innercontent, fold, intertitle);
  });
  config.addPairedShortcode("footerNote", function(innercontent) {
    return SHORTCODES.footerNote(innercontent);
  });
  config.addPairedShortcode("fromFootnote", function(innercontent, atnote) {
    return SHORTCODES.fromFootnote(innercontent, atnote);
  });
  config.addPairedShortcode("toFootnote", function(innercontent, atnote) {
    return SHORTCODES.toFootnote(innercontent, atnote);
  });
}

module.exports = shortcodesSet;
