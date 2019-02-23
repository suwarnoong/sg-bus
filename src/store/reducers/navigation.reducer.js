import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { NavigationActions } from 'react-navigation';
import createReducer from './create-reducer';
import RootNavigator from '../../routes/root.navigator';

const initialState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams('Home')
);

const updateNavigation = (state, action) => {
  return RootNavigator.router.getStateForAction(action, state);
};

const navigationReducer = createReducer(initialState, {
  [NavigationActions.BACK]: updateNavigation,
  [NavigationActions.INIT]: updateNavigation,
  [NavigationActions.NAVIGATE]: updateNavigation,
  [NavigationActions.SET_PARAMS]: updateNavigation
});

export default navigationReducer;
