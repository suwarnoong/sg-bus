import { createSelector } from 'reselect';
import { calculateDistance } from '../../../utils';
import { getStopsByStop } from './get-stops-by-stop';

const getFavorites = (state, location) => state.favorites;

const getLocation = (state, location) => location;

const getNearbyDistance = (state, location) => state.nearbyDistance;

export const getNearestFavoriteStops = createSelector(
  [getFavorites, getStopsByStop, getLocation, getNearbyDistance],
  (favorites, stopsByStop, location, nearbyDistance) => {
    return Array.from(
      new Set(
        favorites
          .map(f => ({
            busStopCode: f.busStopCode,
            distance: calculateDistance(location, {
              latitude: stopsByStop[f.busStopCode].latitude,
              longitude: stopsByStop[f.busStopCode].longitude
            })
          }))
          .filter(busStop => busStop.distance < nearbyDistance)
          .map(f => f.busStopCode)
      )
    );
  }
);
