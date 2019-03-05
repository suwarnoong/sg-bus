import * as actions from './types';
import { request } from '../../../utils';

export const getArrivals = busStopCode => {
  return (dispatch, getState) => {
    request
      .get(
        `http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}`
      )
      .then(data => {
        dispatch({
          type: actions.UPDATE_ARRIVALS,
          busStopCode,
          arrivals: data.services
        });
      });
  };
};
