import * as actions from './types';

export const updateRouteStop = busStopCode => {
  return {
    type: actions.UPDATE_ROUTE_STOP,
    routeStop: busStopCode
  };
};
