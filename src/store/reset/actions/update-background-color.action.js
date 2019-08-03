import * as actions from './types';

export const updateBackgroundColor = (backgroundColor) => {
  return {
    type: actions.UPDATE_BACKGROUND_COLOR,
    backgroundColor
  };
}