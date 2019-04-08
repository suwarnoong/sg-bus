// @flow
import { Dimensions, Platform } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';

const { height, width } = Dimensions.get('window');
export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;

export const BUS_ROUTE_HEIGHT = 80;

export const lta = {
  FETCH_REMOTE: false,
  BUS_ROUTES_URL: 'http://datamall2.mytransport.sg/ltaodataservice/BusRoutes',
  BUS_SERVICES_URL:
    'http://datamall2.mytransport.sg/ltaodataservice/BusServices',
  BUS_STOPS_URL: 'http://datamall2.mytransport.sg/ltaodataservice/BusStops',
  BUS_ARRIVALS_URL:
    'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode={BusStopCode}'
};

export const mapboxIcon = {
  BUS_STOP: 'stop',
  ACTIVE_BUS_STOP: 'activeStop'
};
