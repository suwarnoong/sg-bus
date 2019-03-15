import { createSelector } from 'reselect';

import uniq from 'lodash/fp/uniq';

const getFavorites = state => state.favorites;

export const getFavoriteStops = createSelector(
  [getFavorites],
  favorites => uniq(favorites.map(f => f.busStopCode))
);
