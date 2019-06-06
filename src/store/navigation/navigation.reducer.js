import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { NavigationActions } from 'react-navigation';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist-filesystem-storage';
import createReducer from '../reducers/create-reducer';
import RootNavigator from '../../routes/root.navigator';
import rootRoutes from '../../routes/root.routes';

const initialState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams('home')
);

const updateNavigation = (state, action) => {
  return RootNavigator.router.getStateForAction(action, state);
  // let routeName;
  // if (action.type === NavigationActions.NAVIGATE) {
  //   routeName = action.routeName;
  // } else if (action.type === NavigationActions.BACK) {
  //   if (state.routes && state.routes.length > 1) {
  //     routeName = state.routes[state.index - 1].routeName;
  //   }
  // }

  // let newState = state;
  // if (routeName && rootRoutes[routeName] && rootRoutes[routeName].data) {
  //   const routes = state.routes.map(r => {
  //     if (r.routeName === routeName) {
  //       return Object.assign({}, r, { data: rootRoutes[routeName].data });
  //     }
  //     return r;
  //   });
  //   newState = Object.assign({}, state, { routes });
  // }

  // return RootNavigator.router.getStateForAction(action, newState);
};

const navigationReducer = createReducer(initialState, {
  [NavigationActions.BACK]: updateNavigation,
  [NavigationActions.INIT]: updateNavigation,
  [NavigationActions.NAVIGATE]: updateNavigation,
  [NavigationActions.SET_PARAMS]: updateNavigation
});

const navigationPersistConfig = {
  key: 'nav',
  storage
};

const persistedNavigationReducer = persistReducer(
  navigationPersistConfig,
  navigationReducer
);

export default persistedNavigationReducer;
