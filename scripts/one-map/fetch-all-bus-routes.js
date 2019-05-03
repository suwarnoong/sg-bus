const fs = require('fs');
const fetchBusRoute = require('./fetch-bus-route');
import sleep from '../../src/utils/sleep';

module.exports = async token => {
  if (!token) return;

  const routesCoords = {};
  const services = JSON.parse(fs.readFileSync('src/stubs/bus/services.json'));

  for (let s = 0; s < services.length; s++) {
    const service = services[s];
    const key = `${service.serviceNo}-${service.direction}`;
    routesCoords[key] = await fetchBusRoute(
      token,
      service.serviceNo,
      service.direction
    );
    await sleep(10);
  }

  if (routesCoords) {
    const filePath = 'src/stubs/routes/onemapsg/routes-coords.json';
    fs.writeFileSync(filePath, JSON.stringify(routesCoords, null, '\t'));
    console.log(`Generated ${filePath}`);
  }
};
