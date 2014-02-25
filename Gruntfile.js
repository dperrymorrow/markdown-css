module.exports = function(grunt) {

  grunt.registerTask('build', 'Make build', function () {

    var 
      uglifycss = require('uglifycss'),
      fs        = require('fs'),
      less      = require('less'),
      lessFile  = fs.readFileSync('src/markdown.less').toString('utf8'),
      markdown  = require( "markdown" ).markdown;

    pageTemplate    = fs.readFileSync('src/page-template.html').toString('utf8');
    markdownContent = fs.readFileSync('src/markdown-example.md').toString('utf8');

    fs.writeFileSync('index.html', pageTemplate.replace("{{markdown-example}}", markdown.toHTML(markdownContent)));

    less.render(lessFile, function (err, css) {
      if (err) throw err;
      fs.writeFileSync("markdown.css", css);
      fs.writeFileSync("markdown.min.css", uglifycss.processString(css));
    });
  });
};