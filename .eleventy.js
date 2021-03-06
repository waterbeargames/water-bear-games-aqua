require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      { targets: { node: "current" } }
    ],
  ]
});

const {
  featuredGames, games, unfeaturedGames
} = require('./scripts/eleventy/collections.jsx')

const {
  bodyClass
} = require('./scripts/eleventy/filters.jsx');

const {
  currentYear, gameLogo, metaTags, navMenuItem, svgSprite
} = require('./scripts/eleventy/shortcodes.jsx');

module.exports = function(eleventyConfig) {
  // Collections
  eleventyConfig.addCollection('games', games);
  eleventyConfig.addCollection('featuredGames', featuredGames);
  eleventyConfig.addCollection('unfeaturedGames', unfeaturedGames);

  // Filters
  eleventyConfig.addFilter('body_class', bodyClass);

  // Shortcodes
  eleventyConfig.addShortcode('current_year', currentYear);
  eleventyConfig.addShortcode('game_logo', gameLogo);
  eleventyConfig.addShortcode('meta_tags', metaTags);
  eleventyConfig.addShortcode('nav_menu_item', navMenuItem);
  eleventyConfig.addShortcode('svg_sprite', svgSprite);

  // Layouts
  eleventyConfig.addLayoutAlias('default', 'layouts/default.liquid');
  eleventyConfig.addLayoutAlias('game', 'layouts/game.liquid');

  // Passthrough copy
  // Just copy this content into the _site directory
  eleventyConfig.addPassthroughCopy('assets/images/**');

  return {
    passthroughFileCopy: true,
    templateFormats : ['liquid', 'md'],
  }
};
