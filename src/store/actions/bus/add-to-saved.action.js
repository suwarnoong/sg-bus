import * as actions from './types';

export const addToSaved = ({ busStopCode, serviceNo }) => {
  return {
    type: actions.ADD_TO_SAVED,
    busStopCode,
    serviceNo
  };
};
