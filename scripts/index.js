import { authenticateOneMap, fetchAllBusRoutesOneMap } from './one-map';
import { fetchRoutesLta, fetchServicesLta, fetchStopsLta } from './lta';

(async () => {
  await Promise.all([fetchRoutesLta(), fetchServicesLta(), fetchStopsLta()]);

  const token = await authenticateOneMap();
  await fetchAllBusRoutesOneMap(token);
})();
