import * as actions from './types';
import { requestLoop } from '../../../utils';

export const getRoutes = () => {
  return async (dispatch, getState) => {
    const data = await requestLoop.get(
      'http://datamall2.mytransport.sg/ltaodataservice/BusRoutes'
    );
    dispatch({ type: actions.UPDATE_ROUTES, routes: data });
  };
};
