import * as actions from './types';
import { requestLoop } from '../../../utils';

export const getServices = () => {
  return async (dispatch, getState) => {
    const data = await requestLoop.get(
      'http://datamall2.mytransport.sg/ltaodataservice/BusServices'
    );
    dispatch({ type: actions.UPDATE_SERVICES, services: data });
  };
};
