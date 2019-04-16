import { createSelector } from 'reselect';
import { getRouteDirection } from './get-route-direction';
import { getRouteByServiceDirection } from './get-route-by-service-direction';
import { getStopsByStop } from './get-stops-by-stop';
import { distance } from '../../../utils';
import { IBusStop } from '../../../types.d';

const getRouteWDistance = (state, serviceNo, busStopCode) => {
  const direction = getRouteDirection(state, serviceNo, busStopCode);
  const route = getRouteByServiceDirection(state, serviceNo, direction);

  if (route == null) return [];

  const stopsByStop = getStopsByStop(state);
  const currentStop = stopsByStop[busStopCode];
  const currentStopLocation = {
    latitude: currentStop.latitude,
    longitude: currentStop.longitude
  };

  return route.map((r: IBusRoute) => {
    const busStop: IBusStop = stopsByStop[r.busStopCode];
    return {
      ...r,
      distance: distance(currentStopLocation, {
        latitude: busStop.latitude,
        longitude: busStop.longitude
      })
    };
  });
};

export const getRouteWithDistance = createSelector(
  [getRouteWDistance],
  routeWDistance => routeWDistance
);
