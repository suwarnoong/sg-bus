import { NavigationActions, StackActions } from 'react-navigation';
import { PERSIST, REHYDRATE } from 'redux-persist';
import { getCurrentRoute } from '../../utils';
import { reset, updateHeaderBackgroundColor } from '../actions';
import rootRoutes from '../../routes/root.routes';

const onScreenChanged = (nav, dispatch) => {
  if (!nav) return;

  const screen = getCurrentRoute(nav);
  const data =
    (rootRoutes[screen.routeName] && rootRoutes[screen.routeName].data) || {};

  if (data.headerBackgroundColor)
    dispatch(updateHeaderBackgroundColor(data.headerBackgroundColor));
};

const screenTracking = ({ getState, dispatch }) => next => action => {
  if (action.type === REHYDRATE && action.key === 'nav') {
    onScreenChanged(action.payload, dispatch);
    return next(action);
  } else if (
    action.type === NavigationActions.NAVIGATE ||
    action.type === NavigationActions.BACK
  ) {
    const currentScreen = getCurrentRoute(getState().nav);
    const result = next(action);
    const nextScreen = getCurrentRoute(getState().nav);
    if (nextScreen.routeName !== currentScreen.routeName) {
      dispatch(reset());
      onScreenChanged(getState().nav, dispatch);
    }
    return result;
  } else {
    return next(action);
  }
};

export default screenTracking;
