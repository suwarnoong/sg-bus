/**
 * @format
 */

// @flow
import { AppRegistry } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import App from './src/app';
import { app, mapbox } from './app.config';

MapboxGL.setAccessToken(mapbox.token);
AppRegistry.registerComponent(app.name, () => App);
