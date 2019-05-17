import * as actions from './types';

export const updateSelectedRouteStop = busStopCode => {
  return {
    type: actions.UPDATE_SELECTED_ROUTE_STOP,
    selectedRouteStop: busStopCode
  };
};
