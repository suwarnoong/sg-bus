/**
 * @format
 */

// @flow
import { AppRegistry, Platform, UIManager } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import App from './src/app';
import { app, mapbox } from './app.config';

MapboxGL.setAccessToken(mapbox.token);
AppRegistry.registerComponent(app.name, () => App);

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
