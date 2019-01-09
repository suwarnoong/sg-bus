import merge from 'lodash/merge';
import createReducer from './create-reducer';
import * as actions from '../actions/action-types';

const initialState = {
  arrivals: [],
};

const updateArrivals = (state, action) => {
  console.log(action.arrivals);
  return {
    ...state,
    arrivals: action.arrivals,
  };
};

export const busStopArrivalsReducer = createReducer(initialState, {
  [actions.UPDATE_ARRIVALS]: updateArrivals,
});