import * as actions from './types';

export const updateRouteStop = (busStopCode, serviceNo) => {
  return {
    type: actions.UPDATE_ROUTE_STOP,
    routeStop: busStopCode,
    routeService: serviceNo
  };
};
