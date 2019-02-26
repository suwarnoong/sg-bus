import * as actions from './types';
import { requestLoop } from '../../../utils';

export const getStops = () => {
  return async (dispatch, getState) => {
    const data = await requestLoop.get(
      'http://datamall2.mytransport.sg/ltaodataservice/BusStops'
    );
    dispatch({ type: actions.UPDATE_STOPS, stops: data });
  };
};
