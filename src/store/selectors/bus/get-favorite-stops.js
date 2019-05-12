import { createSelector } from 'reselect';

const getFavorites = state => state.favorites;

export const getFavoriteStops = createSelector(
  [getFavorites],
  favorites => Array.from(new Set(favorites.map(f => f.busStopCode)))
);
