import { NavigationActions } from 'react-navigation';
import { getCurrentRoute } from '../../utils';
import { reset, updateHeaderBackgroundColor } from '../actions';
import { PERSIST } from 'redux-persist';

const onScreenChanged = ({ getState, dispatch }) => {
  const screen = getCurrentRoute(getState().nav);
  if (screen.headerBackgroundColor)
    dispatch(updateHeaderBackgroundColor(screen.headerBackgroundColor));
};

const screenTracking = ({ getState, dispatch }) => next => action => {
  if (
    action.type !== NavigationActions.NAVIGATE &&
    action.type !== NavigationActions.BACK
  ) {
    return next(action);
  }

  const currentScreen = getCurrentRoute(getState().nav);
  const result = next(action);
  const nextScreen = getCurrentRoute(getState().nav);
  if (nextScreen.routeName !== currentScreen.routeName) {
    dispatch(reset());
    onScreenChanged({ getState, dispatch });
  }
  return result;
};

export default screenTracking;
