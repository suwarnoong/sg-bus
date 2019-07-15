import * as actions from './types';

export const getServices = _ => {
  return (dispatch, getState) => {
    let services = getState().bus.services;
    if (!getState().bus.persisted) {
      if (!services || services.length === 0) {
        services = require('../../../stubs/bus/services.json');
      }
      dispatch({ type: actions.UPDATE_SERVICES, services });
    }
  };
};
