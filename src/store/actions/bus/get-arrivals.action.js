import * as actions from './types';
import request from '../../../utils/request';

export const getArrivals = (busStopNumber) => {
  return (dispatch, getState) => {
    request.get(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopNumber}`)
      .then(data => {
        dispatch({ type: actions.UPDATE_ARRIVALS, busStopNumber, arrivals: data.Services });
      });
  }
}