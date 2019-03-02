// : NPM modules
const { DateTime } = require("luxon");
shortcodesSet   = require("./.shortcodes.js");

module.exports = function(eleventyConfig) {
  //---------- CONFIG
  let settings =
  {
    // : If your site lives in a different subdirectory, change this.
    // : Leading or trailing slashes are all normalized away, so don’t worry about it.
    // : If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // : This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    dir:
    {
      input:    ".",
      includes: "includes",
      parts:    "includes/content",
      data:     "data",
      output:   "../site"
    },

    passthroughFileCopy:    true,

    markdownTemplateEngine: "njk",
    htmlTemplateEngine:     "njk",
    dataTemplateEngine:     "njk",
    templateFormats:        ["md","njk","html"]
    };

  //---------- STATIC FILES
  eleventyConfig.addPassthroughCopy("static");
  
  //---------- ALIAS
  // : eleventyConfig.addLayoutAlias("post", "layouts/post.njk");


  //---------- FILTERS
  // : Filter skeleton
  // : eleventyConfig.addFilter("anyfilter", function(anyarg) {return "anyresult";});

  // : Date filter
  eleventyConfig.addFilter("readableDate", dateObj => { return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy"); });
  
  // : css minify filter
  const CleanCSS = require("clean-css");
    eleventyConfig.addFilter("cssmin", code => { return new CleanCSS({}).minify(code).styles });

  // : js minify filter (using uglify-es for ES2016 compat)
  const UglifyJS = require("uglify-es");
  eleventyConfig.addFilter("jsmin", code =>
  {
    let minified = UglifyJS.minify(code)
    if( minified.error )
    {
        console.log("UglifyJS error: ", minified.error)
        return code
    }

    return minified.code
  });
  
  //---------- MARKDOWN PLUGINS
  let markdownIt = require("markdown-it")
  let markdownOptions =
  {
    html:        true,
    linkify:     true,
    typographer: true
  };
  let markdownLib = markdownIt(markdownOptions)
    .use(require("markdown-it-attrs"))
    .use(require("markdown-it-deflist"))
    .use(require("markdown-it-include"), settings.dir.parts);
  eleventyConfig.setLibrary("md", markdownLib);

  //---------- NUNJUCKS TEMPLATES
  eleventyConfig.setLibrary("njk", require("nunjucks").configure(['includes/layouts', 'includes/static']));

 //---------- SHORTCODES
 shortcodesSet(eleventyConfig);

//---------- COLLECTIONS
  eleventyConfig.addCollection("post", function(collection) {
    return collection.getFilteredByTag("post").reverse();
  });
  eleventyConfig.addCollection("site", function(collection) {
    return collection.getFilteredByTag("site").reverse();
  });
  eleventyConfig.addCollection("tech", function(collection) {
    return collection.getFilteredByTag("tech").reverse();
  });
  eleventyConfig.addCollection("artist", function(collection) {
    return collection.getFilteredByTag("artist").reverse();
  });
  eleventyConfig.addCollection("work", function(collection) {
    return collection.getFilteredByTag("work").reverse();
  });
  eleventyConfig.addCollection("collector", function(collection) {
    return collection.getFilteredByTag("collector").reverse();
  });
  eleventyConfig.addCollection("biblio", function(collection) {
    return collection.getFilteredByTag("biblio").reverse();
  });

  // : return the config object for further customization
  return settings;
};
