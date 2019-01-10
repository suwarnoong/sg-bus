import createReducer from './create-reducer';
import * as actions from '../actions/action-types';

const initialState = {
  arrivals: [],
  services: [],
};

const updateArrivals = (state, action) => {
  console.log(action.arrivals);
  return {
    ...state,
    arrivals: action.arrivals,
  };
};

const updateServices = (state, action) => {
  console.log(action.services);
  return {
    ...state,
    services: action.services,
  };
};

export const busReducer = createReducer(initialState, {
  [actions.UPDATE_ARRIVALS]: updateArrivals,
  [actions.UPDATE_SERVICES]: updateServices,
});