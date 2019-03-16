import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './app.reducer';
import busReducer from './bus.reducer';
import navigationReducer from './navigation.reducer';
import serviceReducer from './service.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  bus: busReducer,
  nav: navigationReducer,
  service: serviceReducer
});

const rootPersistConfig = {
  key: 'SGPocket',
  storage,
  whitelist: []
};

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedRootReducer;
