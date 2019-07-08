import fs from 'fs';
import fetchBusRoute from './fetch-bus-route';
import { sleep } from '../../../utils';
import { writeJsonToFile } from '../../utils';

const fetchBusRoutesFromAllServices = async token => {
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
    await sleep(5);
  }

  return routesCoords;
};

const fetchAllBusRoutes = async token => {
  if (!token) return;

  const routesCoords = await fetchBusRoutesFromAllServices(token);

  if (routesCoords) {
    writeJsonToFile('src/stubs/bus/routes-polyline.json', routesCoords);
  }
};

export default fetchAllBusRoutes;
