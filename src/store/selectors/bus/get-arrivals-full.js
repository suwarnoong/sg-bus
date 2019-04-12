import { createSelector } from 'reselect';
import { getRoutesByStop } from './get-routes-by-stop';
import { isArrivalEmpty } from '../../../utils';

const getArrival = (state, busStopCode) => state.arrivals[busStopCode];
const getStopServices = (state, busStopCode) =>
  getRoutesByStop(state)[busStopCode];

export const getArrivalsFull = createSelector(
  [getArrival, getStopServices],
  (arrival, stopServices) => {
    return (
      stopServices &&
      stopServices
        .map(s => ({
          ...(arrival && arrival.find(a => a.serviceNo === s.serviceNo)),
          busStopCode: s.busStopCode,
          serviceNo: s.serviceNo
        }))
        .sort((a, b) => {
          if (isArrivalEmpty(a.nextBus)) return 1;
          if (isArrivalEmpty(b.nextBus)) return -1;
          return a.serviceNo > b.serviceNo ? 1 : -1;
        })
    );
  }
);
