import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createReducer from './create-reducer';
import * as actions from '../actions/types';

import map from 'lodash/fp/map';
import concat from 'lodash/fp/concat';
import filter from 'lodash/fp/filter';

const initialState = {
  persisted: false,
  services: [],
  stops: [],
  routes: [],
  arrivals: {},
  nearest: [],
  favorites: []
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
  return Object.assign({}, state, { nearest: action.nearest });
};

const addToFavorites = (state, action) => {
  const favorites = concat(state.favorites, [
    {
      name: action.name,
      busStopCode: action.busStopCode,
      serviceNo: action.serviceNo
    }
  ]);
  return Object.assign({}, state, { favorites });
};

const removeFromFavorites = (state, action) => {
  const favorites = filter(
    f =>
      !(
        f.name === action.name &&
        f.busStopCode === action.busStopCode &&
        f.serviceNo === action.serviceNo
      )
  )(state.favorites);
  return Object.assign({}, state, { favorites });
};

const busReducer = createReducer(initialState, {
  [actions.UPDATE_ARRIVALS]: updateArrivals,
  [actions.UPDATE_SERVICES]: updateServices,
  [actions.UPDATE_ROUTES]: updateRoutes,
  [actions.UPDATE_STOPS]: updateStops,
  [actions.UPDATE_NEAREST]: updateNearest,
  [actions.ADD_TO_FAVORITES]: addToFavorites,
  [actions.REMOVE_FROM_FAVORITES]: removeFromFavorites
});

const busPersistConfig = {
  key: 'bus',
  storage,
  whitelist: ['services', 'stops', 'favorites'] // 'routes',
};

const persistedBusReducer = persistReducer(busPersistConfig, busReducer);

export default persistedBusReducer;
