export type ICoordinate = {
  latitude: number,
  longitude: number
};

export type IArrivalTime = {
  estimatedArrival: string,
  load: string
};

export type IBusArrival = {
  serviceNo: string,
  nextBus: Array<IArrivalTime>,
  nextBus2: Array<IArrivalTime>,
  nextBus3: Array<IArrivalTime>
};

export type IBusRoute = {
  serviceNo: string,
  operator: string,
  direction: number,
  stopSequence: number,
  busStopCode: string,
  distance: number,
  wd_FirstBus: string,
  wd_LastBus: string,
  sat_FirstBus: string,
  sat_LastBus: string,
  sun_FirstBus: string,
  sun_LastBus: string
};

export type IBusStop = {
  ...IBusStopLocation,
  roadName: string,
  description: string
};

export type IBusStopLocation = {
  busStopCode: string,
  ...ICoordinate
};
