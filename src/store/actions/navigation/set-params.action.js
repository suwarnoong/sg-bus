import { NavigationActions } from 'react-navigation';

export const setParams = params => {
  const getCurrentRoute = nav => {
    if (!!nav && !!nav.routes && nav.index !== undefined)
      return getCurrentRoute(nav.routes[nav.index]);
    return nav;
  };

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
