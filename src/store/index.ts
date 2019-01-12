import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middlewares = applyMiddleware(thunk);

let store;

if (__DEV__) {
  // Reactotron
  const Reactotron = require('../../reactotron').default;
  store = Reactotron.createStore(rootReducer, middlewares);
} else {
  store = createStore(
    rootReducer,
    middlewares,
  );
}

const persistor = persistStore(store);
// persistor.purge();

export { store, persistor };