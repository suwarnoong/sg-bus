import { createSelector } from 'reselect';
import { distance } from '../../../utils';
import { getStopsByStop } from './get-stops-by-stop';

import uniq from 'lodash/fp/uniq';

const getFavorites = (state, location) =>
  state.favorites.map(f => ({ ...f, location }));

const getNearestDistance = state => state.nearestDistance;

export const getFavoriteServiceStop = createSelector(
  [getFavorites, getStopsByStop, getNearestDistance],
  (favorites, stopsByStop, nearestDistance) => {
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
        .filter(busStop => busStop.distance < nearestDistance)
        .sort((a, b) => a.distance - b.distance)
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
