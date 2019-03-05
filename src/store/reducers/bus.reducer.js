import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createReducer from './create-reducer';
import * as actions from '../actions/types';

import pipe from 'lodash/fp/pipe';
import groupBy from 'lodash/fp/groupBy';
import sortBy from 'lodash/fp/sortBy';
import keyBy from 'lodash/fp/keyBy';
import map from 'lodash/fp/map';
import concat from 'lodash/fp/concat';
import find from 'lodash/fp/find';
import filter from 'lodash/fp/filter';

const initialState = {
  persisted: false,
  services: [],
  stops: [],
  routes: [],
  arrivals: {},
  nearest: [],
  saved: []
};

const updateServices = (state, action) => {
  const persisted =
    action.services &&
    action.services.length > 0 &&
    (state.stops && state.stops.length > 0) &&
    (state.routes && Object.keys(state.routes).length > 0)
      ? true
      : false;

  return Object.assign({}, state, {
    services: action.services,
    persisted
  });
};

const updateRoutes = (state, action) => {
  const persisted =
    action.routes &&
    action.routes.length > 0 &&
    (state.stops && state.stops.length > 0) &&
    (state.services && state.services.length > 0)
      ? true
      : false;

  return Object.assign({}, state, {
    routes: action.routes,
    persisted
  });
};

const updateStops = (state, action) => {
  const persisted =
    action.stops &&
    action.stops.length > 0 &&
    (state.routes && Object.keys(state.routes).length > 0) &&
    (state.services && state.services.length > 0)
      ? true
      : false;

  return Object.assign({}, state, {
    stops: action.stops,
    persisted
  });
};

const updateArrivals = (state, action) => {
  const arrivals = Object.assign({}, state.arrivals, {
    [action.busStopCode]: action.arrivals
  });

  return Object.assign({}, state, { arrivals });
};

const updateNearest = (state, action) => {
  const nearest = map(item =>
    Object.assign({}, item, {
      routes: state.routes.filter(i => i.BusStopCode === item.BusStopCode)
    })
  )(action.nearest);

  return Object.assign({}, state, { nearest });
};

const addToSaved = (state, action) => {
  const saved = concat(state.saved, [
    { busStopCode: action.busStopCode, serviceNo: action.serviceNo }
  ]);
  return Object.assign({}, state, { saved });
};

const removeFromSaved = (state, action) => {
  const saved = filter(
    i =>
      i.busStopCode !== action.busStopCode || i.serviceNo !== action.serviceNo
  )(state.saved);
  return Object.assign({}, state, { saved });
};

const busReducer = createReducer(initialState, {
  [actions.UPDATE_ARRIVALS]: updateArrivals,
  [actions.UPDATE_SERVICES]: updateServices,
  [actions.UPDATE_ROUTES]: updateRoutes,
  [actions.UPDATE_STOPS]: updateStops,
  [actions.UPDATE_NEAREST]: updateNearest,
  [actions.ADD_TO_SAVED]: addToSaved,
  [actions.REMOVE_FROM_SAVED]: removeFromSaved
});

const busPersistConfig = {
  key: 'bus',
  storage,
  whitelist: ['services', 'routes', 'stops']
};

const persistedBusReducer = persistReducer(busPersistConfig, busReducer);

export default persistedBusReducer;
