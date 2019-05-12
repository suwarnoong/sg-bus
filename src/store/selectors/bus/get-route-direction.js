import { createSelector } from 'reselect';

const getRoutes = (state, serviceNo, busStopCode) => state.routes;

const getParams = (state, serviceNo, busStopCode) => ({
  serviceNo,
  busStopCode
});

export const getRouteDirection = createSelector(
  [getRoutes, getParams],
  (routes, params) => {
    const { serviceNo, busStopCode } = params;
    const route = routes.find(
      r => r.serviceNo === serviceNo && r.busStopCode === busStopCode
    );
    if (route) return route.direction;
  }
);
