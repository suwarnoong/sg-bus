import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createReducer from './create-reducer';
import * as actions from '../actions/types';
import arrayToObject from '../../utils/array-to-object';

import pipe from 'lodash/fp/pipe';
import groupBy from 'lodash/fp/groupBy';
import sortBy from 'lodash/fp/sortBy';
import map from 'lodash/fp/map';

const initialState = {
  arrivals: [],
  services: [],
  routes: null,
  stops: [],
  nearest: [],
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
  const routes = pipe(
    sortBy(['BusStopCode', 'ServiceNo']),
    groupBy('BusStopCode')
  )(action.routes);

  return {
    ...state,
    routes,
  };
};

const updateStops = (state, action) => {
  return {
    ...state,
    stops: action.stops,
  };
};

const updateNearest = (state, action) => {
  const nearest = map(
    item => ({ routes: state.routes[item.BusStopCode], ...item })
  )(action.nearest)

  return {
    ...state,
    nearest,
  }
}

const busReducer = createReducer(initialState, {
  [actions.UPDATE_ARRIVALS]: updateArrivals,
  [actions.UPDATE_SERVICES]: updateServices,
  [actions.UPDATE_ROUTES]: updateRoutes,
  [actions.UPDATE_STOPS]: updateStops,
  [actions.UPDATE_NEAREST]: updateNearest,
});

const busPersistConfig = {
  key: 'bus',
  storage,
  whitelist: ['services', 'routes', 'stops'],
};

const persistedBusReducer = persistReducer(busPersistConfig, busReducer);

export default persistedBusReducer;