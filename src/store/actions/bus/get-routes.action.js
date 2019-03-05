import * as actions from './types';
import { requestLoop } from '../../../utils';

export const getRoutes = force => {
  return async (dispatch, getState) => {
    let routes = getState().bus.routes;
    if (!routes || routes.length === 0 || force) {
      if (force) {
        routes = await requestLoop.get(
          'http://datamall2.mytransport.sg/ltaodataservice/BusRoutes'
        );
      } else {
        routes = require('../../../stubs/bus/routes.json');
      }
    }
    dispatch({ type: actions.UPDATE_ROUTES, routes });
  };
};
