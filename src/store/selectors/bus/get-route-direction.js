import { createSelector } from 'reselect';

const getDirection = (state, serviceNo, busStopCode) => {
  const routeStop = state.routes.find(
    r => r.serviceNo === serviceNo && r.busStopCode === busStopCode
  );
  if (routeStop) return routeStop.direction;
};

export const getRouteDirection = createSelector(
  [getDirection],
  direction => direction
);
