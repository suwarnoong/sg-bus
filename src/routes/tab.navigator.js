import { createBottomTabNavigator } from 'react-navigation';
import tabRoutes from './tab.routes';
import { AppTabs } from '../components';

export default createBottomTabNavigator(tabRoutes, {
  // order: ['Search', 'Favorites', 'NearbyNavigator'],
  initialRouteName: 'Home',
  tabBarComponent: AppTabs,
  tabBarOptions: {
    activeTintColor: '#FFFFFF',
    inactiveTintColor: '#999999'
    //   activeBackgroundColor: '#1289A7',
    //   inactiveBackgroundColor: '#1289A7',
    //   style: {
    //     height: 59,
    //     backgroundColor: '#1289A7'
    //   },
    //   tabStyle: {
    //     paddingTop: 10
    //   }
  }
});
