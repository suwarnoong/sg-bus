const app = {
  name: 'SGBus',
  displayName: 'SGBus'
};

const mapbox = {
  token:
    'yourmapboxtoken'
};

const oneMap = {
  email: 'youronemap@email.com',
  password: 'youronemappassword',
  tokenUrl: 'https://developers.onemap.sg/privateapi/auth/post/getToken',
  busRouteUrl:
    'https://developers.onemap.sg/publicapi/busexp/getOneBusRoute?busNo={ServiceNo}&direction={BusDirection}&token={AccessToken}'
};

const ltaAccountKey = 'yourltaaccountkey';

const lta = {
  accountKey: ltaAccountKey,
  busServicesUrl: 'http://datamall2.mytransport.sg/ltaodataservice/BusServices',
  busStopsUrl: 'http://datamall2.mytransport.sg/ltaodataservice/BusStops',
  busRoutesUrl: 'http://datamall2.mytransport.sg/ltaodataservice/BusRoutes',
  busArrivalUrl:
    'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode={BusStopCode}',
  requestConfig: {
    headers: {
      AccountKey: ltaAccountKey,
      Accept: 'application/json'
    },
    toCamelCase: true
  }
};

export { app, mapbox, oneMap, lta };
