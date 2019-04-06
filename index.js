/**
 * @format
 */

// @flow
import { AppRegistry } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import App from './src/app';
import { name as appName, mapboxAccessToken } from './app.json';

MapboxGL.setAccessToken(mapboxAccessToken);
AppRegistry.registerComponent(appName, () => App);
