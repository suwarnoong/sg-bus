import * as actions from './types';

const getSearchable = (dispatch, getState) => {
  let searchable = getState().bus.searchable;
  if (!searchable || searchable.length === 0) {
    searchable = require('../../../stubs/bus/searchable.json');
    dispatch({ type: actions.UPDATE_SEARCHABLE, searchable });
  }
  return searchable;
};

export const search = text => {
  return (dispatch, getState) => {
    const searchable = getSearchable(dispatch, getState);
    console.log('searchable', text, searchable);
    const found = searchable.filter(s => s.name.indexOf(text) >= 0);
    console.log('found', found);
    dispatch({ type: actions.UPDATE_FOUND, found });
  };
};
