import { createSelector } from 'reselect';
import { getRoutesByStop } from './get-routes-by-stop';
import { mapboxIcon } from '../../../constants';

const getStops = state => state.stops;
const getRoutes = state => state.routes;

export const getStopsGeojsonFeatures = createSelector(
  [getStops, getRoutesByStop, getRoutes],
  (stops, routesByStop, routes) => {
    const features = stops.map(s => {
      return {
        type: 'Feature',
        id: s.busStopCode,
        properties: {
          busStopCode: s.busStopCode,
          services:
            routesByStop[s.busStopCode] &&
            routesByStop[s.busStopCode].map(r => r.serviceNo),
          name: s.description,
          icon: mapboxIcon.BUS_STOP
        },
        geometry: {
          type: 'Point',
          coordinates: [s.longitude, s.latitude]
        }
      };
    });

    return features;
  }
);
