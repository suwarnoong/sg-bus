import * as actions from './types';
import { requestLoop } from '../../../utils';
import { lta } from '../../../constants';

import omit from 'lodash/omit';

const fetchRoutes = async _ => {
  routes = await requestLoop.get(lta.BUS_ROUTES_URL);
  routes = routes.map(r => {
    const {
      direction,
      stopSequence,
      wd_FirstBus,
      wd_LastBus,
      sat_FirstBus,
      sat_LastBus,
      sun_FirstBus,
      sun_LastBus
    } = r;

    return {
      ...omit(r, [
        'operator',
        'distance',
        'stopSequence',
        'wd_FirstBus',
        'wd_LastBus',
        'sat_FirstBus',
        'sat_LastBus',
        'sun_FirstBus',
        'sun_LastBus'
      ]),
      direction: `${direction}-${stopSequence}`,
      weekday: [wd_FirstBus, wd_LastBus],
      saturday: [sat_FirstBus, sat_LastBus],
      sunday: [sun_FirstBus, sun_LastBus]
    };
  });
  return routes;
};

export const getRoutes = force => {
  return async (dispatch, getState) => {
    let routes = getState().bus.routes;
    if (!routes || routes.length === 0 || force) {
      if (lta.FETCH_REMOTE) {
        routes = await fetchRoutes();
      } else {
        routes = require('../../../stubs/bus/routes.json');
      }
    }
    dispatch({ type: actions.UPDATE_ROUTES, routes });
  };
};
