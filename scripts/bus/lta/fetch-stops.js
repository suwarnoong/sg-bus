import fs from 'fs';
import requestLoop from './request-loop';
import { lta } from '../../../app.config';
import { writeJsonToFile } from '../../utils';

const requestStops = async _ => {
  return await requestLoop(lta.busStopsUrl);
};

const fetchStops = async _ => {
  try {
    const stops = await requestStops();
    if (stops) writeJsonToFile('src/stubs/bus/stops.json', stops);
  } catch (ex) {
    console.error('fetchStops', ex);
  }
};

export default fetchStops;
