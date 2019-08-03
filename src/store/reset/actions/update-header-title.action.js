import * as actions from './types';

export const updateHeaderTitle = (title, subTitle = '') => {
  return {
    type: actions.UPDATE_HEADER_TITLE,
    title,
    subTitle
  };
};
