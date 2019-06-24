import React from 'react';
import Home from '../pages/home';
import Search from '../pages/search';
import Favorites from '../pages/favorites';
import NearbyNavigator from './nearby.navigator';
import { SearchIcon, NearbyIcon, StarIcon } from '../icons';

export default {
  NearbyNavigator: {
    screen: NearbyNavigator,
    path: 'nearby-navigator',
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <NearbyIcon color={tintColor} />,
      title: 'Nearby'
    }
  },
  Favorites: {
    screen: Favorites,
    path: 'favorites',
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <StarIcon color={tintColor} />,
      title: 'Favorites'
    }
  },
  Search: {
    screen: Search,
    path: 'search',
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <SearchIcon color={tintColor} />,
      title: 'Search'
    }
  }
};
