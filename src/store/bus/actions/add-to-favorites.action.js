import * as actions from './types';

export const addToFavorites = ({ name, busStopCode, serviceNo }) => {
  return {
    type: actions.ADD_TO_FAVORITES,
    name,
    busStopCode,
    serviceNo
  };
};
