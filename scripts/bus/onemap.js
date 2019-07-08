import { authenticateOneMap, fetchAllBusRoutesOneMap } from './onemap/index';

(async () => {
  console.log('Generating routes polyline (please wait...)');
  const token = await authenticateOneMap();
  await fetchAllBusRoutesOneMap(token);
})();
