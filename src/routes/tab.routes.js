import React from 'react';
import i18next from 'i18next';
import Home from '../pages/home';
import Search from '../pages/search';
import Favorites from '../pages/favorites';
import { SearchIcon, NearbyIcon, StarIcon } from '../icons';

export default {
  Search: {
    screen: Search,
    path: 'search',
    navigationOptions: ({ navigation, navigationOptions }) => ({
      tabBarIcon: ({ focused, tintColor }) => <SearchIcon color={tintColor} />,
      title: i18next.t(navigation.state.key.toLowerCase())
    })
  },
  Home: {
    screen: Home,
    path: 'home',
    navigationOptions: ({ navigation, navigationOptions }) => ({
      tabBarIcon: ({ focused, tintColor }) => <NearbyIcon color={tintColor} />,
      title: i18next.t(navigation.state.key.toLowerCase())
    })
  },
  Favorites: {
    screen: Favorites,
    path: 'favorites',
    navigationOptions: ({ navigation, navigationOptions }) => ({
      tabBarIcon: ({ focused, tintColor }) => <StarIcon color={tintColor} />,
      title: i18next.t(navigation.state.key.toLowerCase())
    })
  }
};
