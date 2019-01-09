import merge from 'lodash/merge';
import createReducer from './create-reducer';
import * as actions from '../actions/action-types';

const initialState = {
  arrivals: [],
};

const getArrivals = (state, action) => {
  return merge({}, state, { arrivals: action.arrivals });
};

export const busStopArrivalsReducer = createReducer(initialState, {
  [actions.UPDATE_ARRIVALS]: getArrivals,
});