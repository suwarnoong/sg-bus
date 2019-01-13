import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createReducer from './create-reducer';
import * as actions from '../actions/types';
import arrayToObject from '../../utils/array-to-object';

const initialState = {
  arrivals: [],
  services: [],
  routes: [],
  stops: [],
};

const updateArrivals = (state, action) => {
  return {
    ...state,
    arrivals: action.arrivals,
  };
};

const updateServices = (state, action) => {
  return {
    ...state,
    services: action.services,
  };
};

const updateRoutes = (state, action) => {
  return {
    ...state,
    routes: arrayToObject(action.routes, 'ServiceNo', 'Direction', 'BusStopCode'),
  };
};

const updateStops = (state, action) => {
  return {
    ...state,
    stops: action.stops,
    // stops: arrayToObject(action.stops, 'BusStopCode'),
  };
};

const busReducer = createReducer(initialState, {
  [actions.UPDATE_ARRIVALS]: updateArrivals,
  [actions.UPDATE_SERVICES]: updateServices,
  [actions.UPDATE_ROUTES]: updateRoutes,
  [actions.UPDATE_STOPS]: updateStops,
});

const busPersistConfig = {
  key: 'bus',
  storage,
  whitelist: ['services', 'routes', 'stops'],
};

const persistedBusReducer = persistReducer(busPersistConfig, busReducer);

export default persistedBusReducer;