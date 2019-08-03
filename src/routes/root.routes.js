import Onboarding from '../pages/onboarding';
import TabNavigator from './tab.navigator';
import BusStopArrivals from '../pages/bus-stop-arrivals';
import BusRoute from '../pages/bus-route';
import Settings from '../pages/settings';

export default {
  Onboarding: {
    screen: Onboarding,
    path: 'onboarding'
  },
  TabNavigator: {
    screen: TabNavigator,
    path: 'tab-navigator',
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
  },
  Settings: {
    screen: Settings,
    path: 'settings'
  }
};
