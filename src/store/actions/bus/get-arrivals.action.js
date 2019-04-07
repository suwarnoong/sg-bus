import * as actions from './types';
import { request } from '../../../utils';
import { lta } from '../../../constants';

export const getArrivals = busStopCode => {
  return (dispatch, getState) => {
    request
      .get(lta.BUS_ARRIVALS_URL.replace('{BusStopCode}', busStopCode))
      .then(data => {
        dispatch({
          type: actions.UPDATE_ARRIVALS,
          busStopCode,
          arrivals: data.services
        });
      });
  };
};
