import * as actions from './action-types';
import request from '../../utils/request';

export const getArrivals = (busStopNo) => {
  return (dispatch, getState) => {
    request.get(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopNo}`)
      .then(data => {
        dispatch({ type: actions.UPDATE_ARRIVALS, arrivals: data.Services });
      });
  }
}