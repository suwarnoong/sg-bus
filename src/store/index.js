import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import screenTracking from './middleware/screen-tracking';

import rootReducer from './reducers';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'RootNavigator'
);

const middlewares = applyMiddleware(
  thunk,
  navigationMiddleware,
  screenTracking
);

// if (__DEV__) {
//   // Reactotron
//   const Reactotron = require('../../reactotron').default;
//   store = createStore(rootReducer, middlewares, Reactotron.createEnhancer());
// } else {
//   store = createStore(rootReducer, middlewares);
// }
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(middlewares));

const persistor = persistStore(store);
// persistor.purge();

export { store, persistor };
