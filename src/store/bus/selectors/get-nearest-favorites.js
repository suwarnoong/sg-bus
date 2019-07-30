import { createSelector } from 'reselect';
import { calculateDistance } from '../../../utils';
import { getStopsByStop } from './get-stops-by-stop';

const getFavorites = (state, location) => state.favorites;

const getLocation = (state, location) => location;

const getNearbyDistance = (state, location) => state.nearbyDistance;

export const getNearestFavorites = createSelector(
  [getFavorites, getStopsByStop, getLocation, getNearbyDistance],
  (favorites, stopsByStop, location, nearbyDistance) => {
    const names = favorites
      .map(f => ({
        name: f.name,
        distance: calculateDistance(location, {
          latitude: stopsByStop[f.busStopCode].latitude,
          longitude: stopsByStop[f.busStopCode].longitude
        })
      }))
      .filter(busStop => busStop.distance < nearbyDistance)
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
