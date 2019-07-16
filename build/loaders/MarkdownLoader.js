const Markdown = require('markdown-it');

module.exports = function (source) {
  const md = new Markdown({
    html: true,
  });

  this.cacheable && this.cacheable();

  return md.render(source);
};
