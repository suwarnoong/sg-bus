import { secret } from './app.secret';

const app = {
  name: 'SGBus',
  displayName: 'SGBus'
};

const mapbox = {
  token: secret.mapboxToken
};

const oneMap = {
  email: secret.oneMapEmail,
  password: secret.oneMapPassword,
  tokenUrl: 'https://developers.onemap.sg/privateapi/auth/post/getToken',
  busRouteUrl:
    'https://developers.onemap.sg/publicapi/busexp/getOneBusRoute?busNo={ServiceNo}&direction={BusDirection}&token={AccessToken}'
};

const lta = {
  accountKey: secret.ltaAccountKey,
  busServicesUrl: 'http://datamall2.mytransport.sg/ltaodataservice/BusServices',
  busStopsUrl: 'http://datamall2.mytransport.sg/ltaodataservice/BusStops',
  busRoutesUrl: 'http://datamall2.mytransport.sg/ltaodataservice/BusRoutes',
  busArrivalUrl:
    'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode={BusStopCode}',
  requestConfig: {
    headers: {
      AccountKey: secret.ltaAccountKey,
      Accept: 'application/json'
    },
    toCamelCase: true
  }
};

export { app, mapbox, oneMap, lta };
