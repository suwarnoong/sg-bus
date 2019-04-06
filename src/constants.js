// @flow
import { Dimensions, Platform } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';

const { height, width } = Dimensions.get('window');
export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;
