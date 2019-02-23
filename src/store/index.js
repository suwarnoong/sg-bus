import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import rootReducer from './reducers';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'RootNavigator'
);

const middlewares = applyMiddleware(thunk, navigationMiddleware);

let store;

if (__DEV__) {
  // Reactotron
  const Reactotron = require('../../reactotron').default;
  store = Reactotron.createStore(rootReducer, middlewares);
} else {
  store = createStore(rootReducer, middlewares);
}

const persistor = persistStore(store);
// persistor.purge();

export { store, persistor };
