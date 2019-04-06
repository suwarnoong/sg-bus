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

let store;
if (__DEV__) {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Reactotron
  const reactotron = require('../../reactotron').default;
  store = createStore(
    rootReducer,
    composeEnhancer(middlewares, reactotron.createEnhancer())
  );
} else {
  store = createStore(rootReducer, middlewares);
}

const persistor = persistStore(store);
// persistor.purge();

export { store, persistor };
