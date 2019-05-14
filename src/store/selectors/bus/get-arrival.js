import { createSelector } from 'reselect';

const getArrivals = state => state.arrivals;

const getParams = (state, busStopCode, serviceNo) => ({
  busStopCode,
  serviceNo
});

export const getArrival = createSelector(
  [getArrivals, getParams],
  (arrivals, params) => {
    const { busStopCode, serviceNo } = params;

    if (!arrivals[busStopCode]) return null;

    return {
      ...arrivals[busStopCode].find(a => a.serviceNo === serviceNo),
      busStopCode,
      serviceNo
    };
  }
);
