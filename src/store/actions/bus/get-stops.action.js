import * as actions from './types';
import { requestLoop } from '../../../utils';

export const getStops = force => {
  return async (dispatch, getState) => {
    let stops = getState().bus.stops;
    if (!stops || stops.length === 0 || force) {
      if (force) {
        stops = await requestLoop.get(
          'http://datamall2.mytransport.sg/ltaodataservice/BusStops'
        );
      } else {
        stops = require('../../../stubs/bus/stops.json');
      }
    }
    dispatch({ type: actions.UPDATE_STOPS, stops });
  };
};
