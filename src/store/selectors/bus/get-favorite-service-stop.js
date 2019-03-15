import { createSelector } from 'reselect';
import { distance } from '../../../utils';
import { getStopsByStop } from './get-stops-by-stop';

import uniq from 'lodash/fp/uniq';

const getFavorites = state => state.favorites;

export const getFavoriteServiceStop = createSelector(
  [getFavorites, getStopsByStop],
  (favorites, stopsByStop) => {
    const names = uniq(favorites.map(f => f.name));

    return names.map(n => ({
      name: n,
      data: favorites
        .filter(f => f.name === n)
        .map(f => ({
          ...f,
          ...stopsByStop[f.busStopCode]
          // distance: distance(position, {
          //   latitude: stopsByStop[b].latitude,
          //   longitude: stopsByStop[b].longitude
          // })
        }))
    }));
  }
);
