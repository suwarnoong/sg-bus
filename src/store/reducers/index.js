import { combineReducers } from 'redux';
import { busStopArrivalsReducer } from './bus-stop-arrivals.reducer';

export default combineReducers({
  busStopArrivals: busStopArrivalsReducer,
});