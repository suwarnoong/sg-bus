import * as actions from './types';
import { requestLoop } from '../../../utils';
import { lta } from '../../../constants';

const fetchStops = _ => {
  return new Promise(async (resolve, reject) => {
    let stops;
    if (lta.FETCH_REMOTE) {
      stops = await requestLoop.get(lta.BUS_STOPS_URL);
    } else {
      stops = require('../../../stubs/bus/stops.json');
    }
    resolve(stops);
  });
};

export const getStops = force => {
  return async (dispatch, getState) => {
    let stops = getState().bus.stops;
    if (!stops || stops.length === 0 || force) {
      stops = await fetchStops();
    }
    dispatch({ type: actions.UPDATE_STOPS, stops });
  };
};
