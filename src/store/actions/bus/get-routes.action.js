import * as actions from './types';

export const getRoutes = _ => {
  return (dispatch, getState) => {
    let routes = getState().bus.routes;
    if (!routes || routes.length === 0) {
      routes = require('../../../stubs/bus/routes.json');
    }
    dispatch({ type: actions.UPDATE_ROUTES, routes });
  };
};
