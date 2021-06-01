// Featured games
const featuredGames = collectionApi => {
  return collectionApi.getFilteredByTag('featured').reverse();
};

// All games
const games = collectionApi => {
  return collectionApi.getFilteredByGlob('games/**').reverse();
};

// Games that are not featured
const unfeaturedGames = collectionApi => {
  return collectionApi.getFilteredByGlob('games/**').reverse()
    .filter(g => {
      const tags = g.data.tags || [];
      return !tags.includes('featured');
    });
}

export { featuredGames, games, unfeaturedGames };
