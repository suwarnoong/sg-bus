import Home from '../views/home';
import BusStopArrivals from '../views/bus-stop-arrivals';
import BusRoute from '../views/bus-route';

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
  BusRoute: {
    screen: BusRoute,
    path: 'bus-route'
  }
};
