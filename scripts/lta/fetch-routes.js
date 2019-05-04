import fs from 'fs';
import omit from 'lodash/omit';
import requestLoop from './request-loop';
import { lta } from '../../app.config';

const requestRoutes = async _ => {
  let routes = await requestLoop(lta.busRoutesUrl);
  routes = routes.map(r => {
    const {
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
      seq: stopSequence,
      weekday: [wd_FirstBus, wd_LastBus],
      saturday: [sat_FirstBus, sat_LastBus],
      sunday: [sun_FirstBus, sun_LastBus]
    };
  });

  return routes;
};

const fetchRoutes = async _ => {
  try {
    const routes = await requestRoutes();

    if (routes) {
      const filePath = 'src/stubs/bus/routes.json';
      fs.writeFileSync(filePath, JSON.stringify(routes, null, 0));
      console.log(`Generated ${filePath}`);
    }
  } catch (ex) {
    console.error('fetchRoutes', ex);
  }
};

export default fetchRoutes;
