import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createReducer from './create-reducer';
import * as actions from '../actions/types';

import pipe from 'lodash/fp/pipe';
import groupBy from 'lodash/fp/groupBy';
import sortBy from 'lodash/fp/sortBy';
import keyBy from 'lodash/fp/keyBy';
import map from 'lodash/fp/map';

const initialState = {
  persisted: false,
  services: [],
  stops: [],
  routes: [],
  arrivals: {},
  nearest: []
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
    [action.busStopNumber]: action.arrivals
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

const busReducer = createReducer(initialState, {
  [actions.UPDATE_ARRIVALS]: updateArrivals,
  [actions.UPDATE_SERVICES]: updateServices,
  [actions.UPDATE_ROUTES]: updateRoutes,
  [actions.UPDATE_STOPS]: updateStops,
  [actions.UPDATE_NEAREST]: updateNearest
});

const busPersistConfig = {
  key: 'bus',
  storage,
  whitelist: ['services', 'routes', 'stops']
};

const persistedBusReducer = persistReducer(busPersistConfig, busReducer);

export default persistedBusReducer;
