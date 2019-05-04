import * as actions from './types';
import { request } from '../../../utils';
import { lta } from '../../../../app.config';

export const getArrivals = busStopCode => {
  return (dispatch, getState) => {
    const url = lta.busArrivalUrl.replace('{BusStopCode}', busStopCode);
    request.get(url, null, lta.requestConfig).then(data => {
      dispatch({
        type: actions.UPDATE_ARRIVALS,
        busStopCode,
        arrivals: data.services
      });
    });
  };
};
