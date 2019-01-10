import * as actions from './action-types';
import request from '../../utils/request';

export const getServices = () => {
  return (dispatch, getState) => {
    request.get('http://datamall2.mytransport.sg/ltaodataservice/BusServices')
      .then(data => {
        dispatch({ type: actions.UPDATE_SERVICES, services: data.value });
      });
  }
}