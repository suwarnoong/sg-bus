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
  return item.tags.some(tag => {
    let match = false;

    if (Array.isArray(tag)) {
      const ciText = tag[tag.length - 1].toLowerCase();
      const ciSearchText = searchText.toLowerCase();
      const ciTag = tag.toLowerCase();
      const indices = tag.slice(0, tag.length - 1);

      match = indices.some(i => {
        if (i === 'exact') return ciText === ciSearchText;
        if (i === 'any') return ciText.includes(ciSearchText);
        if (i === 'start') return ciText.startsWith(ciSearchText);
        if (i === 'end') return ciText.endsWith(ciSearchText);
      });
    } else {
      match = ciTag.includes(ciSearchText);
    }

    return match;
  });
};

const getScores = (full, part) => {
  const ciFull = full.toLowerCase();
  const ciPart = part.toLowerCase();
  if (ciFull === ciPart) {
    return 1;
  } else if (ciFull.startsWith(ciPart)) {
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

    if (distances.length == 1 && distances[0] == undefined) {
      filtered = filtered.slice(0, filtered.length > 10 ? 10 : filtered.length);
    } else {
      filtered = filtered.filter(
        s => s.distance == null || s.distance <= distances[limit - 1]
      );
    }

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
