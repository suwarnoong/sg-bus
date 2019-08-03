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
<<<<<<< HEAD
      title: i18next.t('search')
=======
      tabBarLabel: i18next.t(navigation.state.key.toLowerCase())
>>>>>>> feat/i18n-settings
    })
  },
  Home: {
    screen: Home,
    path: 'home',
    navigationOptions: ({ navigation, navigationOptions }) => ({
      tabBarIcon: ({ focused, tintColor }) => <NearbyIcon color={tintColor} />,
<<<<<<< HEAD
      title: i18next.t('nearby')
=======
      tabBarLabel: i18next.t(navigation.state.key.toLowerCase())
>>>>>>> feat/i18n-settings
    })
  },
  Favorites: {
    screen: Favorites,
    path: 'favorites',
    navigationOptions: ({ navigation, navigationOptions }) => ({
      tabBarIcon: ({ focused, tintColor }) => <StarIcon color={tintColor} />,
<<<<<<< HEAD
      title: i18next.t('favorites')
=======
      title: i18next.t(navigation.state.key.toLowerCase())
>>>>>>> feat/i18n-settings
    })
  }
};
