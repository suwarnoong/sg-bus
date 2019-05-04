import fs from 'fs';
import requestLoop from './request-loop';
import { lta } from '../config.json';

const requestStops = async _ => {
  return await requestLoop(lta.busStopsUrl);
};

const fetchStops = async _ => {
  try {
    const stops = await requestStops();

    if (stops) {
      const filePath = 'src/stubs/bus/stops.json';
      fs.writeFileSync(filePath, JSON.stringify(stops, null, 0));
      console.log(`Generated ${filePath}`);
    }
  } catch (ex) {
    console.error('fetchStops', ex);
  }
};

export default fetchStops;
