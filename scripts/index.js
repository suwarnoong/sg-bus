import { authenticateOneMap, fetchAllBusRoutesOneMap } from './one-map';
import { fetchRoutesLta, fetchServicesLta, fetchStopsLta } from './lta';

(async () => {
  console.log('Generating services, stops and routes...');
  await Promise.all([fetchRoutesLta(), fetchServicesLta(), fetchStopsLta()]);

  console.log('Generating routes polyline (please wait...)');
  const token = await authenticateOneMap();
  await fetchAllBusRoutesOneMap(token);
})();
