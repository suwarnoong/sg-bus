import * as actions from './types';

export const updateShowSettings = showSettings => {
  return {
    type: actions.UPDATE_SHOW_SETTINGS,
    showSettings
  };
};
