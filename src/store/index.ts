import { applyMiddleware, compose, createStore } from 'redux';
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

export default store;