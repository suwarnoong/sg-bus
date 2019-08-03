import * as actions from './types';

export const updateLocale = locale => {
  return {
    type: actions.UPDATE_LOCALE,
    locale
  };
};
