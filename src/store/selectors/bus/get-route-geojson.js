import { createSelector } from 'reselect';
import { getRoutesByService } from './get-routes-by-service';
import { getStopsByStop } from './get-stops-by-stop';
import { mapboxIcon } from '../../../constants';

const getRouteByService = (state, serviceNo) => {
  return getRoutesByService(state)[serviceNo];
};

export const getRouteGeojson = createSelector(
  [getRouteByService, getStopsByStop],
  (routeByService, stopsByStop) => {
    if (routeByService == null) return;

    const features = routeByService.map(r => {
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
