import fs from 'fs';
import { writeJsonToFile } from '../../utils';

const isFileExists = file => {
  if (fs.existsSync(file)) {
    return true;
  } else {
    console.error(
      `File ${file} is not exist. Please run 'yarn generate:stubs'`
    );
  }
};

const getStopsByStop = stops => {
  const stopsByStop = {};
  stops.forEach(s => {
    stopsByStop[s.busStopCode] = s;
  });
  return stopsByStop;
};

const getRoutesByStop = routes => {
  const routesByStop = {};
  routes.forEach(r => {
    const stop = r.busStopCode;
    routesByStop[stop] = routesByStop[stop] || {};
    routesByStop[stop].services = routesByStop[stop].services || [];
    routesByStop[stop].services.push(r.serviceNo);
  });
  return routesByStop;
};

const getSearchable = () => {
  const stopsFilePath = 'src/stubs/bus/stops.json';
  const servicesFilePath = 'src/stubs/bus/services.json';
  const routesFilePath = 'src/stubs/bus/routes.json';

  if (!isFileExists(stopsFilePath)) return;
  if (!isFileExists(servicesFilePath)) return;

  const stopsJson = fs.readFileSync(stopsFilePath);
  const stops = JSON.parse(stopsJson);
  const stopsByStop = getStopsByStop(stops);

  const servicesJson = fs.readFileSync(servicesFilePath);
  const services = JSON.parse(servicesJson);

  const routesJson = fs.readFileSync(routesFilePath);
  const routes = JSON.parse(routesJson);
  const routesByStop = getRoutesByStop(routes);

  const searchable = [];

  if (stops) {
    stops.forEach(s => {
      searchable.push({
        type: 'stop',
        key: s.busStopCode,
        tags: [
          ['exact', s.busStopCode],
          ['any', s.roadName],
          ['any', s.description],
          ...routesByStop[s.busStopCode].services.map(s => ['start', s])
        ],
        location: {
          latitude: s.latitude,
          longitude: s.longitude
        }
      });
    });
  }

  if (services) {
    services.forEach(s => {
      searchable.push({
        type: 'service',
        key: `${s.serviceNo}-${s.direction}`,
        tags: [['start', s.serviceNo]]
      });
    });
  }

  return searchable;
};

const generateSearchable = async () => {
  const searchable = getSearchable();
  writeJsonToFile('src/stubs/bus/searchable.json', searchable);
};

export default generateSearchable;
