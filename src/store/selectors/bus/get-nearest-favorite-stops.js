import { createSelector } from 'reselect';
import { distance } from '../../../utils';
import { NEAREST_DISTANCE } from '../../../constants';
import { getStopsByStop } from './get-stops-by-stop';

const getFavorites = (state, location) => state.favorites;

const getLocation = (state, location) => location;

export const getNearestFavoriteStops = createSelector(
  [getFavorites, getStopsByStop, getLocation],
  (favorites, stopsByStop, location) => {
    return Array.from(
      new Set(
        favorites
          .map(f => ({
            busStopCode: f.busStopCode,
            distance: distance(location, {
              latitude: stopsByStop[f.busStopCode].latitude,
              longitude: stopsByStop[f.busStopCode].longitude
            })
          }))
          .filter(busStop => busStop.distance < NEAREST_DISTANCE)
          .map(f => f.busStopCode)
      )
    );
  }
);
