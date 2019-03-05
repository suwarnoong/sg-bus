import * as actions from './types';

export const removeFromSaved = ({ busStopCode, serviceNo }) => {
  return {
    type: actions.REMOVE_FROM_SAVED,
    busStopCode,
    serviceNo
  };
};
