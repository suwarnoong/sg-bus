import * as actions from './types';
import { distance } from '../../../utils';
import { NEAREST_DISTANCE } from '../../../constants';

export const getNearestStops = position => {
  return async (dispatch, getState) => {
    const busStops = getState().bus.stops;

    const nearestStops = busStops
      .map(busStop => ({
        ...busStop,
        distance: distance(position, {
          latitude: busStop.latitude,
          longitude: busStop.longitude
        })
      }))
      .filter(busStop => busStop.distance <= NEAREST_DISTANCE)
      .sort((a, b) => a.distance - b.distance);

    dispatch({ type: actions.UPDATE_NEAREST, nearest: nearestStops });
  };
};
