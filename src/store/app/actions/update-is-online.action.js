import * as actions from './types';

export const updateIsOnline = isOnline => {
  return {
    type: actions.UPDATE_IS_ONLINE,
    isOnline
  };
};
