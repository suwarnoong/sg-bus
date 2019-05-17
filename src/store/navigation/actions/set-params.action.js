import { NavigationActions } from 'react-navigation';
import getCurrentRoute from '../../../utils/get-current-route';

export const setParams = params => {
  return (dispatch, getState) => {
    const nav = getState().nav;
    const currentNav = getCurrentRoute(nav);

    dispatch(
      NavigationActions.setParams({
        params,
        key: currentNav.key
      })
    );
  };
};
