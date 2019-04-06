import { createSelector } from 'reselect';
import { distance } from '../../../utils';
import { getStopsByStop } from './get-stops-by-stop';

import uniq from 'lodash/fp/uniq';

const getFavorites = (state, location) =>
  state.favorites.map(f => ({ ...f, location }));

export const getFavoriteServiceStop = createSelector(
  [getFavorites, getStopsByStop],
  (favorites, stopsByStop) => {
    const names = uniq(
      favorites
        .map(f => ({
          ...f,
          ...stopsByStop[f.busStopCode],
          distance: distance(f.location, {
            latitude: stopsByStop[f.busStopCode].latitude,
            longitude: stopsByStop[f.busStopCode].longitude
          })
        }))
        .filter(busStop => busStop.distance < 0.3)
        .sort((a, b) => (a.distance < b.distance ? -1 : 1))
        .map(f => f.name)
    );

    return names.map(n => ({
      name: n,
      data: favorites
        .filter(f => f.name === n)
        .map(f => ({
          ...f,
          ...stopsByStop[f.busStopCode]
        }))
    }));
  }
);
