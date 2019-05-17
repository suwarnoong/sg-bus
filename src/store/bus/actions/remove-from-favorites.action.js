import * as actions from './types';

export const removeFromFavorites = ({ name, busStopCode, serviceNo }) => {
  return {
    type: actions.REMOVE_FROM_FAVORITES,
    name,
    busStopCode,
    serviceNo
  };
};
