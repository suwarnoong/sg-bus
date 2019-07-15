import React from 'react';
import Home from '../pages/home';
import Search from '../pages/search';
import Favorites from '../pages/favorites';
import { SearchIcon, NearbyIcon, StarIcon } from '../icons';

export default {
  Search: {
    screen: Search,
    path: 'search',
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => <SearchIcon color={tintColor} />,
      title: 'Search'
    }
  },
  Home: {
    screen: Home,
    path: 'home',
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
  }
};
