import * as actions from './types';

export const updateGeolocation = ({ latitude, longitude }) => {
  return {
    type: actions.UPDATE_GEOLOCATION,
    latitude,
    longitude
  };
};
