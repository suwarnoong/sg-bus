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
  direction: string,
  busStopCode: string,
  distance: number,
  weekday: Array<number>,
  saturday: Array<number>,
  sunday: Array<number>
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
