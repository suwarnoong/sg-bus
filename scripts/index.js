const authenticateOneMap = require('./one-map/authenticate');
const fetchAllBusRoutesOneMap = require('./one-map/fetch-all-bus-routes');

(async () => {
  const token = await authenticateOneMap();
  fetchAllBusRoutesOneMap(token);
})();
