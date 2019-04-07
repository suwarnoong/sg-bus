import * as actions from './types';
import { requestLoop } from '../../../utils';
import { lta } from '../../../constants';

const fetchServices = async _ => {
  return await requestLoop.get(lta.BUS_SERVICES_URL);
};

export const getServices = force => {
  return async (dispatch, getState) => {
    let services = getState().bus.services;
    if (!services || services.length === 0 || force) {
      if (lta.FETCH_REMOTE) {
        services = await fetchServices();
      } else {
        services = require('../../../stubs/bus/services.json');
      }
    }
    dispatch({ type: actions.UPDATE_SERVICES, services });
  };
};
