import * as actions from './types';

export const addToFavorites = ({ busStopCode, serviceNo }) => {
  return {
    type: actions.ADD_TO_FAVORITES,
    busStopCode,
    serviceNo
  };
};
