import * as actions from './types';

export const getStops = _ => {
  return (dispatch, getState) => {
    let stops = getState().bus.stops;
    if (!getState().bus.persisted) {
      if (!stops || stops.length === 0) {
        stops = require('../../../stubs/bus/stops.json');
      }
      dispatch({ type: actions.UPDATE_STOPS, stops });
    }
  };
};
