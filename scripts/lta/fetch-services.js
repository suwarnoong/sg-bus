import fs from 'fs';
import requestLoop from './request-loop';
import { lta } from '../config.json';

const requestServices = async _ => {
  return await requestLoop(lta.busServicesUrl);
};

const fetchServices = async _ => {
  try {
    const services = await requestServices();

    if (services) {
      const filePath = 'src/stubs/bus/services.json';
      fs.writeFileSync(filePath, JSON.stringify(services, null, 0));
      console.log(`Generated ${filePath}`);
    }
  } catch (ex) {
    console.error('fetchServices', ex);
  }
};

export default fetchServices;
