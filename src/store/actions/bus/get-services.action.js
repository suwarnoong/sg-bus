import * as actions from './types';
import { requestLoop } from '../../../utils';

export const getServices = force => {
  return async (dispatch, getState) => {
    let services = getState().bus.services;
    if (!services || services.length === 0 || force) {
      if (force) {
        services = await requestLoop.get(
          'http://datamall2.mytransport.sg/ltaodataservice/BusServices'
        );
      } else {
        services = require('../../../stubs/bus/services.json');
      }
    }
    dispatch({ type: actions.UPDATE_SERVICES, services });
  };
};
