import * as actions from './types';

export const updateInset = (type, value) => {
  return {
    type: actions.UPDATE_INSET,
    inset: { type, value }
  };
};
