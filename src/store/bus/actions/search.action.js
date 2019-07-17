import * as actions from './types';
import { getStopsByStop, getServicesByServiceDirection } from '../selectors';
import groupBy from 'lodash/groupBy';

const getSearchable = (dispatch, getState) => {
  let searchable = getState().bus.searchable;
  if (!searchable || searchable.length === 0) {
    searchable = require('../../../stubs/bus/searchable.json');
    dispatch({ type: actions.UPDATE_SEARCHABLE, searchable });
  }
  return searchable;
};

const simpleCompare = (item, searchText) => {
  if (item.tags.some(t => t.toLowerCase() === searchText.toLowerCase())) {
    return Object.assign({}, item, { closest: 1 });
  } else if (item.tags.some(t => t.indexOf(searchText) === 0)) {
    return Object.assign({}, item, { closest: 0.5 });
  } else {
    return Object.assign({}, item, { closest: 0.1 });
  }
};

const sorting = (a, b) => {
  if (a.priority === b.priority) {
    return a.closest < b.closest ? 1 : a.closest > b.closest ? -1 : 0;
  } else {
    return a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0;
  }
};

export const search = text => {
  return (dispatch, getState) => {
    const searchable = getSearchable(dispatch, getState);
    const filtered = searchable
      .filter(s => s.tags.some(t => t.indexOf(text) >= 0))
      .map(s => simpleCompare(s, text))
      .sort(sorting);

    const found = groupBy(filtered, 'type');

    if (found.stop && found.stop.length > 0) {
      const stopsByStop = getStopsByStop(getState().bus);
      found.stop = found.stop.map(f => ({
        ...stopsByStop[f.key]
      }));
    }

    if (found.service && found.service.length > 0) {
      const servicesByServiceDirection = getServicesByServiceDirection(
        getState().bus
      );
      found.service = found.service.map(f => ({
        ...servicesByServiceDirection[f.key]
      }));
    }

    dispatch({ type: actions.UPDATE_FOUND, found });
  };
};
