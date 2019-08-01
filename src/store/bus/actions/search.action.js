import * as actions from './types';
import { getStopsByStop, getServicesByServiceDirection } from '../selectors';
import { isGeolocationEmpty, calculateDistance } from '../../../utils';
import groupBy from 'lodash/groupBy';

const getSearchable = (dispatch, getState) => {
  let searchable = getState().bus.searchable;
  if (!searchable || searchable.length === 0) {
    searchable = require('../../../stubs/bus/searchable.json');
    dispatch({ type: actions.UPDATE_SEARCHABLE, searchable });
  }
  return searchable;
};

const filterText = (item, searchText) => {
  return item.tags.some(t => {
    let match = false;

    if (Array.isArray(t)) {
      const text = t[t.length - 1];
      const indices = t.slice(0, t.length - 1);

      match = indices.some(i => {
        if (i === 'exact')
          return text.toLowerCase() === searchText.toLowerCase();
        if (i === 'any')
          return text.toLowerCase().includes(searchText.toLowerCase());
        if (i === 'start')
          return text.toLowerCase().startsWith(searchText.toLowerCase());
        if (i === 'end')
          return text.toLowerCase().endsWith(searchText.toLowerCase());
      });
    } else {
      match = t.toLowerCase().includes(searchText.toLowerCase());
    }

    return match;
  });
};

const getScores = (full, part) => {
  if (full.toLowerCase() === part.toLowerCase()) {
    return 1;
  } else if (full.toLowerCase().startsWith(part.toLowerCase())) {
    return 0.5;
  }
};

const applyScores = (item, searchText, position) => {
  if (item.type === 'stop') {
    if (!isGeolocationEmpty(position) && !isGeolocationEmpty(item.location)) {
      const distance = calculateDistance(position, item.location);
      const scores = 2 - distance;
      return Object.assign({}, item, { distance, scores });
    }
  } else {
    let scores = 0;
    item.tags.every(t => {
      if (Array.isArray(t)) {
        const text = t.slice(-1)[0];
        scores = getScores(text, searchText);
      } else {
        scores = getScores(t, searchText);
      }
      if (scores > 0) return false;
    });

    if (scores > 0) return Object.assign({}, item, { scores });
  }
  return item;
};

const sorting = (a, b) => {
  return a.scores < b.scores ? 1 : a.scores > b.scores ? -1 : 0;
};

export const search = (text, position) => {
  return (dispatch, getState) => {
    const searchable = getSearchable(dispatch, getState);
    const { stops, nearbyDistance } = getState().bus;

    let filtered = searchable
      .filter(s => filterText(s, text))
      .map(s => applyScores(s, text, position))
      .sort(sorting);

    /* show top 10 nearby stops or less */
    const distances = [...new Set(filtered.map(f => f.distance))];
    const limit = distances.length < 20 ? distances.length : 10;
    filtered = filtered.filter(
      s => s.distance == null || s.distance <= distances[limit - 1]
    );

    const found = groupBy(filtered, 'type');

    if (found.stop && found.stop.length > 0) {
      const stopsByStop = getStopsByStop(getState().bus);
      found.stop = found.stop.map(f => ({
        ...stopsByStop[f.key],
        distance: f.distance
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
