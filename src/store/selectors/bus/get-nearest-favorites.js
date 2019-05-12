import { createSelector } from 'reselect';
import { distance } from '../../../utils';
import { NEAREST_DISTANCE } from '../../../constants';
import { getStopsByStop } from './get-stops-by-stop';

const getFavorites = (state, location) => state.favorites;

const getLocation = (state, location) => location;

export const getNearestFavorites = createSelector(
  [getFavorites, getStopsByStop, getLocation],
  (favorites, stopsByStop, location) => {
    const names = favorites
      .map(f => ({
        name: f.name,
        distance: distance(location, {
          latitude: stopsByStop[f.busStopCode].latitude,
          longitude: stopsByStop[f.busStopCode].longitude
        })
      }))
      .filter(busStop => busStop.distance < NEAREST_DISTANCE)
      .sort((a, b) => a.distance - b.distance)
      .map(f => f.name);

    return Array.from(new Set(names)).map(n => ({
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
