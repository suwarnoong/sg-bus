import Onboarding from '../pages/onboarding';
import TabNavigator from './tab.navigator';

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
  }
};
