import * as actions from './types';

export const updateGeolocationError = ({ error }) => {
  return {
    type: actions.UPDATE_GEOLOCATION_ERROR,
    error
  };
};
