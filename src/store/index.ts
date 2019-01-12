import { applyMiddleware, createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { busReducer } from './reducers';

const rootPersistConfig = {
  key: 'SGPocket',
  storage,
  whitelist: [],
};

const busPersistConfig = {
  key: 'bus',
  storage,
  whitelist: ['services'],
}

const rootReducer = combineReducers({
  bus: persistReducer(busPersistConfig, busReducer),
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const middlewares = applyMiddleware(thunk);

let store;

if (__DEV__) {
  // Reactotron
  const Reactotron = require('../../reactotron').default;
  store = Reactotron.createStore(persistedReducer, middlewares);
} else {
  store = createStore(
    persistedReducer,
    middlewares,
  );
}

const persistor = persistStore(store);
// persistor.purge();

export { store, persistor };