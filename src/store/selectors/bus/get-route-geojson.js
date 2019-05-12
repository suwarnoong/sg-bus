import { createSelector } from 'reselect';
import { decode } from '@mapbox/polyline';
import { getRouteDirection } from './get-route-direction';
import { getRouteByServiceDirection } from './get-route-by-service-direction';
import { getStopsByStop } from './get-stops-by-stop';
import { mapboxIcon } from '../../../constants';
import { distance } from '../../../utils';

const getRoute = state =>
  getRouteByServiceDirection(
    state,
    state.routeService,
    getRouteDirection(state, state.routeService, state.routeStop)
  );

const getParams = state => ({
  selectedStopCode: state.selectedRouteStop,
  busStopCode: state.routeStop
});

export const getRouteGeojson = createSelector(
  [getParams, getRoute, getStopsByStop],
  (params, route, stopsByStop) => {
    if (route == null || route.length <= 0) return;

    const { busStopCode, selectedStopCode } = params;

    const startCoord = stopsByStop[busStopCode] && {
      longitude: stopsByStop[busStopCode].longitude,
      latitude: stopsByStop[busStopCode].latitude
    };

    const serviceNo = route[0].serviceNo;
    const direction = route[0].direction;

    const features = route.map(r => {
      const coordinates = stopsByStop[r.busStopCode] && [
        stopsByStop[r.busStopCode].longitude,
        stopsByStop[r.busStopCode].latitude
      ];
      return {
        type: 'Feature',
        properties: {
          icon:
            selectedStopCode === r.busStopCode
              ? mapboxIcon.ACTIVE_BUS_STOP
              : mapboxIcon.BUS_STOP
        },
        geometry: {
          type: 'Point',
          coordinates
        }
      };
    });

    const routesGeometrics = require(`../../../stubs/bus/routes-polyline.json`);
    if (routesGeometrics) {
      let routesCoords = [];
      const key = `${serviceNo}-${direction}`;
      routesGeometrics[key].forEach(g => {
        routesCoords = routesCoords.concat(decode(g).map(c => c.reverse()));
      });

      features.push({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routesCoords
        }
      });
    }

    return features;
  }
);
