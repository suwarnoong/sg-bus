import { NavigationActions } from 'react-navigation';

export const navigate = (routeName, params) => {
  if (Array.isArray(routeName)) {
    routeName.forEach(NavigationActions.navigate);
  } else {
    return NavigationActions.navigate({ routeName, params });
  }
};
