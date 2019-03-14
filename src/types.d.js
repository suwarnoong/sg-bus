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
