import { fetchRoutesLta, fetchServicesLta, fetchStopsLta } from './lta/index';

(async () => {
  console.log('Generating services, stops and routes...');
  await Promise.all([fetchRoutesLta(), fetchServicesLta(), fetchStopsLta()]);
})();
