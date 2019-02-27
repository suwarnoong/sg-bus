import * as actions from './types';

export const updateHeader = (title, subTitle = '') => {
  return {
    type: actions.UPDATE_HEADER,
    title,
    subTitle
  };
};
