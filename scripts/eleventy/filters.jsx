// Body class
// Takes a path, e.g. "/posts/my-blog-post", and generates a string
// that can be used as a CSS class, e.g. "page-posts-my-blog-post"
const bodyClass = str => {
  return `page-${str}`.replace(/\//g, ' ').trim().replace(/[-\s]+/g, '-');
};

export { bodyClass };
