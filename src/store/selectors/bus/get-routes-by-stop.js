import { createSelector } from 'reselect';

const getRoutes = state => state.routes;

export const getRoutesByStop = createSelector(
  [getRoutes],
  routes => {
    const routesByStop = {};
    routes.forEach(r => {
      routesByStop[r.busStopCode] = routesByStop[r.busStopCode] || [];
      routesByStop[r.busStopCode].push(r);
    });

    return routesByStop;
  }
);
