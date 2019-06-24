import Home from '../pages/home';
import BusStopArrivals from '../pages/bus-stop-arrivals';
import BusRoute from '../pages/bus-route';

export default {
  Home: {
    screen: Home,
    path: 'home',
    navigationOptions: {
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
