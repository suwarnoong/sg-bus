import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const persistConfig = {
  key: 'SGPocket',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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

export { store, persistor };