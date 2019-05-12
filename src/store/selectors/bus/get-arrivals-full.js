import { createSelector } from 'reselect';
import { getRoutesByStop } from './get-routes-by-stop';
import { isArrivalEmpty } from '../../../utils';

const getArrivals = (state, busStopCode) => state.arrivals;

const getBusStopCode = (state, busStopCode) => busStopCode;

export const getArrivalsFull = createSelector(
  [getArrivals, getRoutesByStop, getBusStopCode],
  (arrivals, routeByStop, busStopCode) => {
    if (arrivals == null) return [];
    if (routeByStop == null) return [];

    const arrival = arrivals[busStopCode];
    const services = routeByStop[busStopCode];

    if (services == null) return [];

    return services
      .map(s => ({
        ...(arrival && arrival.find(a => a.serviceNo === s.serviceNo)),
        busStopCode: s.busStopCode,
        serviceNo: s.serviceNo
      }))
      .sort((a, b) => {
        if (isArrivalEmpty(a.nextBus)) return 1;
        if (isArrivalEmpty(b.nextBus)) return -1;
        return a.serviceNo > b.serviceNo ? 1 : -1;
      });
  }
);
