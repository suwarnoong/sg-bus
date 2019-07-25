import * as actions from './types';
import { distance } from '../../../utils';

export const getNearestStops = position => {
  return async (dispatch, getState) => {
    const busStops = getState().bus.stops;
    const nearbyDistance = getState().bus.nearbyDistance;

    const nearestStops = busStops
      .map(busStop => ({
        ...busStop,
        distance: distance(position, {
          latitude: busStop.latitude,
          longitude: busStop.longitude
        })
      }))
      .filter(busStop => busStop.distance <= nearbyDistance)
      .sort((a, b) => a.distance - b.distance);

    dispatch({ type: actions.UPDATE_NEAREST, nearest: nearestStops });
  };
};
