const currentYear = () => {
  return new Date().getFullYear();
}

const gameLogo = (slug) => {
  return (
    `<div class="${slug}-logo">` +
      svgSprite(slug, `${slug}-logo__svg`) +
    `</div>`
  );
};

// Combine given meta properties with defaults
// Returns HTML string of meta tags
const metaTags = (props = [], defaults = []) => {
  let propsObject = {};
  props.forEach(prop => { propsObject[prop.property] = prop.content });

  let defaultsObject = {};
  defaults.forEach(prop => { defaultsObject[prop.property] = prop.content });
  
  const finalProps = Object.assign({ ...defaultsObject }, propsObject);
  const tags = Object.entries(finalProps).map(prop => `<meta property="${prop[0]}" content="${prop[1]}">`);

  return tags.join("\n");
};

// Nav menu item
const navMenuItem = (label, link) => {
  return (
    `<li class="nav__menu-item js-nav-menu-item">` +
      `<a class="nav__menu-link" href="${link}">${label}</a>` +
    `</li>`
  );
};

// SVG sprite
const svgSprite = (name, classes) => {
  const klass = (classes ? ` class="${classes}"` : '');
  return (
    `<svg${klass}>` +
      `<use xmlns:xlink="http://www.w3.org/1999/xlink"` +
        `xlink:href="/assets/images/sprite.svg#${name}"></use>` +
    `</svg>`
  );
};

export { currentYear, gameLogo, metaTags, navMenuItem, svgSprite };
