import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { AppHeader } from '../components';
import rootRoutes from './root.routes';

export default createStackNavigator(rootRoutes, {
  initialRouteName: 'Home',
  headerMode: 'screen',
  defaultNavigationOptions: ({ navigation }) => ({
    header: (
      <AppHeader
        title={`${navigation.state.params.title}`}
        subTitle={`${navigation.state.params.subTitle}`}
      />
    )
  })
});
