import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../views/home';
import Demo from '../views/demo';
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
    },
    Demo: {
      screen: Demo
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    headerStyle: {
      backgroundColor: '#F0F0F0'
    },
    headerBackground: '#F0F0F0',
    defaultNavigationOptions: {}
  }
);
