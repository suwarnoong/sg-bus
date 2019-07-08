import fs from 'fs';
import requestLoop from './request-loop';
import { lta } from '../../../app.config';
import { writeJsonToFile } from '../../utils';

const requestServices = async _ => {
  return await requestLoop(lta.busServicesUrl);
};

const fetchServices = async _ => {
  try {
    const services = await requestServices();
    if (services) writeJsonToFile('src/stubs/bus/services.json', services);
  } catch (ex) {
    console.error('fetchServices', ex);
  }
};

export default fetchServices;
