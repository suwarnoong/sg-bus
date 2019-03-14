import { createSelector } from 'reselect';

const getRoutes = state => state.routes;

export const getRoutesByService = createSelector(
  [getRoutes],
  routes => {
    const routesByService = {};
    routes.forEach(r => {
      routesByService[r.serviceNo] = routesByService[r.serviceNo] || [];
      routesByService[r.serviceNo].push(r);
    });

    return routesByService;
  }
);
