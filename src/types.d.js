export type ICoordinate = {
  latitude: number,
  longitude: number
};

export type IArrivalTime = {
  estimatedArrival: string,
  load: string
};

export type IBusArrival = {
  busStopCode: string,
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

export type IBusService = {
  serviceNo: string,
  direction: number,
  originCode: string,
  destinationCode: string
};

export type IBusStop = {
  ...IBusStopLocation,
  roadName: string,
  description: string,
  distance: number
};

export type IBusStopLocation = {
  busStopCode: string,
  ...ICoordinate
};

export type ISearchable = {
  type: string,
  key: string,
  tags: string
};

export type IFound = {
  stop: Array<ISearchable>,
  service: Array<ISearchable>
};
