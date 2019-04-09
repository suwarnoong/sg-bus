import { createSelector } from 'reselect';
import { getRouteDirection } from './get-route-direction';
import { getRouteByServiceDirection } from './get-route-by-service-direction';
import { getStopsByStop } from './get-stops-by-stop';
import { mapboxIcon } from '../../../constants';

const getRoute = (state, serviceNo, busStopCode) => {
  return getRouteByServiceDirection(
    state,
    serviceNo,
    getRouteDirection(state, serviceNo, busStopCode)
  );
};

export const getRouteGeojson = createSelector(
  [getRoute, getStopsByStop],
  (route, stopsByStop) => {
    if (route == null) return;

    const features = route.map(r => {
      const coordinates = stopsByStop[r.busStopCode] && [
        stopsByStop[r.busStopCode].longitude,
        stopsByStop[r.busStopCode].latitude
      ];
      return {
        type: 'Feature',
        id: r.busStopCode,
        properties: {
          busStopCode: r.busStopCode,
          coordinates,
          icon: mapboxIcon.BUS_STOP
        },
        geometry: {
          type: 'Point',
          coordinates
        }
      };
    });
    return features;
  }
);
