import { createSelector } from 'reselect';
import { distance } from '../../../utils';
import { getStopsByStop } from './get-stops-by-stop';

const getFavorites = state => state.favorites;

export const getFavoriteServiceStop = createSelector(
  [getFavorites, getStopsByStop],
  (favorites, stopsByStop) => {
    return favorites.map(s => ({
      ...s,
      ...stopsByStop[s.busStopCode]
      // distance: distance(position, {
      //   latitude: stopsByStop[b].latitude,
      //   longitude: stopsByStop[b].longitude
      // })
    }));
  }
);
