import * as actions from './types';
import { calculateDistance } from '../../../utils';

export const getNearestStops = position => {
  return async (dispatch, getState) => {
    const { stops, nearbyDistance } = getState().bus;
    const nearestStops = stops
      .map(s => ({
        ...s,
        distance: calculateDistance(position, {
          latitude: s.latitude,
          longitude: s.longitude
        })
      }))
      .filter(s => s.distance <= nearbyDistance)
      .sort((a, b) => a.distance - b.distance);
    dispatch({ type: actions.UPDATE_NEAREST, nearest: nearestStops });
  };
};
