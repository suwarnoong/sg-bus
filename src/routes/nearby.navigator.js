import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { AppHeader } from '../components';
import nearbyRoutes from './nearby.routes';

export default createStackNavigator(nearbyRoutes, {
  initialRouteName: 'Home',
  headerMode: 'screen',
  defaultNavigationOptions: ({ navigation }) => ({
    header: (
      <AppHeader
        title={`${navigation.state.params && navigation.state.params.title}`}
        subTitle={`${navigation.state.params &&
          navigation.state.params.subTitle}`}
      />
    )
  })
});
