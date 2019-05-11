import { createSelector } from 'reselect';
import { distance } from '../../../utils';
import { NEAREST_DISTANCE } from '../../../constants';
import { getStopsByStop } from './get-stops-by-stop';

const getFavorites = (state, location) =>
  state.favorites.map(f => ({ ...f, location }));

export const getFavoriteServiceStop = createSelector(
  [getFavorites, getStopsByStop],
  (favorites, stopsByStop) => {
    const names = favorites
      .map(f => ({
        ...f,
        ...stopsByStop[f.busStopCode],
        distance: distance(f.location, {
          latitude: stopsByStop[f.busStopCode].latitude,
          longitude: stopsByStop[f.busStopCode].longitude
        })
      }))
      .filter(busStop => busStop.distance < NEAREST_DISTANCE)
      .sort((a, b) => a.distance - b.distance)
      .map(f => f.name);

    const distinctNames = [...new Set(names)];
    return distinctNames.map(n => ({
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
