import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../views/home';
import BusStopArrivals from '../views/bus-stop-arrivals';

export default createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home',
        header: null
      }
    },
    BusStopArrivals: {
      screen: BusStopArrivals
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    transparentCard: true,
    cardShadowEnabled: true,
    cardOverlayEnabled: true,
    headerStyle: {
      backgroundColor: '#F0F0F0'
    },
    headerBackground: '#F0F0F0',
    defaultNavigationOptions: {}
  }
);
