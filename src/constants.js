// @flow
import { Dimensions, Platform } from 'react-native';
import { shadowColor } from './colors';

export const IS_ANDROID = Platform.OS === 'android';

const { height, width } = Dimensions.get('window');
export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;

export const BUS_ROUTE_HEIGHT = 80;

export const mapboxIcon = {
  BUS_STOP: 'stop',
  ACTIVE_BUS_STOP: 'activeStop',
};

export const languages = [
  {
    key: 'en',
    value: 'English',
  },
  {
    key: 'zh',
    value: '中文',
  },
  {
    key: 'id',
    value: 'Bahasa Indonesia',
  },
  {
    key: 'ta',
    value: 'தமிழ்',
  },
];

export const shadowStyles = {
  shadowColor,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 6,
};
