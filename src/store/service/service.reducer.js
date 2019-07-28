import { persistReducer } from 'redux-persist';
import storage from 'redux-persist-filesystem-storage';
import createReducer from '../reducers/create-reducer';
import * as actions from './actions/types';

const initialState = {
  geolocation: {
    latitude: 0,
    longitude: 0,
    error: null
  }
};

const updateGeolocation = (state, action) => {
  const geolocation = Object.assign({}, state.geolocation, {
    latitude: action.latitude,
    longitude: action.longitude,
    error: null
  });

  return Object.assign({}, state, { geolocation });
};

const updateGeolocationError = (state, action) => {
  const geolocation = Object.assign({}, state.geolocation, {
    latitude: 0,
    longitude: 0,
    error: action.error
  });

  return Object.assign({}, state, { geolocation });
};

const serviceReducer = createReducer(initialState, {
  [actions.UPDATE_GEOLOCATION]: updateGeolocation,
  [actions.UPDATE_GEOLOCATION_ERROR]: updateGeolocationError
});

const servicePersistConfig = {
  key: 'service',
  storage
};

const persistedServiceReducer = persistReducer(
  servicePersistConfig,
  serviceReducer
);

export default persistedServiceReducer;
