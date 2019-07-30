import { createSelector } from 'reselect';
import { getRouteDirection } from './get-route-direction';
import { getRouteByServiceDirection } from './get-route-by-service-direction';
import { getStopsByStop } from './get-stops-by-stop';
import { calculateDistance } from '../../../utils';
import { IBusStop } from '../../../types.d';

const getRoute = state => {
  const direction = getRouteDirection(
    state,
    state.routeService,
    state.routeStop
  );
  return getRouteByServiceDirection(state, state.routeService, direction);
};

const getBusStopCode = state => state.routeStop;

export const getRouteWithDistance = createSelector(
  [getRoute, getStopsByStop, getBusStopCode],
  (route, stopsByStop, busStopCode) => {
    if (route == null) return [];

    const currentStop = stopsByStop[busStopCode];

    if (currentStop == null) return [];

    const currentStopLocation = {
      latitude: currentStop.latitude,
      longitude: currentStop.longitude
    };

    let isRouteStarting = false;
    return route.map((r: IBusRoute) => {
      const busStop: IBusStop = stopsByStop[r.busStopCode];
      let routeType = null;
      if (busStopCode === r.busStopCode) {
        isRouteStarting = true;
        routeType = 'start';
      } else if (isRouteStarting) {
        const isLast = route.indexOf(r) === route.length - 1;
        routeType = isLast ? 'end' : 'mid';
      }

      return {
        ...r,
        routeType,
        distance: calculateDistance(currentStopLocation, {
          latitude: busStop.latitude,
          longitude: busStop.longitude
        })
      };
    });
  }
);
