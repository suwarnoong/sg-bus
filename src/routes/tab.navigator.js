import { createBottomTabNavigator } from 'react-navigation';
import tabRoutes from './tab.routes';
import { AppTabs } from '../components';
import { activeTextColor, lightTextColor } from '../colors';

export default createBottomTabNavigator(tabRoutes, {
  initialRouteName: 'Home',
  tabBarComponent: AppTabs,
  tabBarOptions: {
    activeTintColor: activeTextColor,
    inactiveTintColor: lightTextColor,
  },
});
