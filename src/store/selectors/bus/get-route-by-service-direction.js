import { createSelector } from 'reselect';

const getRoutes = (state, serviceNo, direction) => state.routes;

const getParams = (state, serviceNo, direction) => ({ serviceNo, direction });

export const getRouteByServiceDirection = createSelector(
  [getRoutes, getParams],
  (routes, params) => {
    const { serviceNo, direction } = params;
    return routes.filter(
      r => r.serviceNo === serviceNo && r.direction === direction
    );
  }
);
