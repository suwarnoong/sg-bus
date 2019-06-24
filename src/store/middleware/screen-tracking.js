import { NavigationActions } from 'react-navigation';
import { REHYDRATE } from 'redux-persist';
import { getCurrentRoute } from '../../utils';
import { reset, updateHeaderBackgroundColor } from '../app';
import rootRoutes from '../../routes/root.routes';
import routesConfig from '../../routes/routes.config';

const onScreenChanged = (nav, dispatch) => {
  if (!nav) return;

  const screen = getCurrentRoute(nav);
  const config = routesConfig[screen.routeName] || {};

  if (config.headerBackgroundColor)
    dispatch(updateHeaderBackgroundColor(config.headerBackgroundColor));
};

const isRehydratingNavigation = action =>
  action.type === REHYDRATE && action.key === 'nav';

const isBack = action => action.type === NavigationActions.BACK;

const isNavigateOrBack = action =>
  action.type === NavigationActions.NAVIGATE || isBack(action);

const screenTracking = ({ getState, dispatch }) => next => action => {
  if (isRehydratingNavigation(action)) {
    const nav = action.payload || getState().nav;
    onScreenChanged(nav, dispatch);
    return next(action);
  } else if (isNavigateOrBack(action)) {
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
