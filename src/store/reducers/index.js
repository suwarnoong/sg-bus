import { combineReducers } from 'redux';
import { busReducer } from './bus.reducer';

export default combineReducers({
  bus: busReducer,
});