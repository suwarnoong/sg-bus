import Home from '../views/home';
import Demo from '../views/demo';
import BusStopArrivals from '../views/bus-stop-arrivals';
import BusRoutes from '../views/bus-routes';

export default {
  Home: {
    screen: Home,
    path: 'home',
    data: {
      headerBackgroundColor: '#F0F0F0'
    },
    navigationOptions: {
      title: 'Home',
      header: null
    }
  },
  BusStopArrivals: {
    screen: BusStopArrivals,
    path: 'bus-stop-arrivals'
  },
  BusRoutes: {
    screen: BusRoutes,
    path: 'bus-routes'
  },
  Demo: {
    screen: Demo
  }
};
