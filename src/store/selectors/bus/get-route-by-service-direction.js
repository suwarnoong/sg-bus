import { createSelector } from 'reselect';

const getRoute = (state, serviceNo, direction) => {
  return state.routes.filter(
    r => r.serviceNo === serviceNo && r.direction === direction
  );
};

export const getRouteByServiceDirection = createSelector(
  [getRoute],
  route => route
);
