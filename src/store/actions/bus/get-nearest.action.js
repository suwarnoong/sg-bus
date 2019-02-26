import * as actions from './types';
import { distance } from '../../../utils';

export const getNearestStops = position => {
  return async (dispatch, getState) => {
    const nearestStops = getState()
      .bus.stops.map(busStop => ({
        distance: distance(position, {
          latitude: busStop.Latitude,
          longitude: busStop.Longitude
        }),
        ...busStop
      }))
      .filter(busStop => busStop.distance < 0.3)
      .sort((a, b) => (a.distance < b.distance ? -1 : 1));

    dispatch({ type: actions.UPDATE_NEAREST, nearest: nearestStops });
  };
};
