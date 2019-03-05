import * as actions from './types';
import { distance } from '../../../utils';

export const getNearestStops = position => {
  return async (dispatch, getState) => {
    const busStops = getState().bus.stops;

    const nearestStops = busStops
      .map(busStop => ({
        ...busStop,
        distance: distance(position, {
          latitude: busStop.Latitude,
          longitude: busStop.Longitude
        })
      }))
      .filter(busStop => busStop.distance < 0.3)
      .sort((a, b) => (a.distance < b.distance ? -1 : 1));

    dispatch({ type: actions.UPDATE_NEAREST, nearest: nearestStops });
  };
};
