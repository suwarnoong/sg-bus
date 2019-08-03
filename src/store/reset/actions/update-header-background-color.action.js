import * as actions from './types';

export const updateHeaderBackgroundColor = backgroundColor => {
  return {
    type: actions.UPDATE_HEADER_BACKGROUND_COLOR,
    backgroundColor
  };
};
