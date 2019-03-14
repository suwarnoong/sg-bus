import { createSelector } from 'reselect';
import { distance } from '../../../utils';
import { getStopsByStop } from './get-stops-by-stop';

const getSaved = state => state.saved;

export const getBookmarks = createSelector(
  [getSaved, getStopsByStop],
  (saved, stopsByStop) => {
    return saved.map(s => ({
      ...s,
      ...stopsByStop[s.busStopCode]
      // distance: distance(position, {
      //   latitude: stopsByStop[b].latitude,
      //   longitude: stopsByStop[b].longitude
      // })
    }));
  }
);
