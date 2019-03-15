import * as actions from './types';

export const removeFromFavorites = ({ busStopCode, serviceNo }) => {
  return {
    type: actions.REMOVE_FROM_FAVORITES,
    busStopCode,
    serviceNo
  };
};
