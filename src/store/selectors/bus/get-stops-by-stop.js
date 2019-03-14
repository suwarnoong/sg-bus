import { createSelector } from 'reselect';

const getStops = state => state.stops;

export const getStopsByStop = createSelector(
  [getStops],
  stops => {
    const stopsByStop = {};
    stops.forEach(s => {
      stopsByStop[s.busStopCode] = s;
    });

    return stopsByStop;
  }
);
