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

const getSearchable = () => {
  const stopsFilePath = 'src/stubs/bus/stops.json';
  const servicesFilePath = 'src/stubs/bus/services.json';

  if (!isFileExists(stopsFilePath)) return;
  if (!isFileExists(servicesFilePath)) return;

  const stopsJson = fs.readFileSync(stopsFilePath);
  const stops = JSON.parse(stopsJson);
  const stopsByStop = getStopsByStop(stops);

  const servicesJson = fs.readFileSync(servicesFilePath);
  const services = JSON.parse(servicesJson);

  const searchable = [];

  if (stops) {
    stops.forEach(s => {
      searchable.push({
        type: 'stop',
        key: s.busStopCode,
        tags: [s.busStopCode, s.roadName, s.description],
        priority: 2
      });
    });
  }

  if (services) {
    services.forEach(s => {
      // const origin = stopsByStop[s.originCode];
      // const destination = stopsByStop[s.destinationCode];

      // let description = '';
      // if (origin) description += origin.description;
      // if (destination) description += ` to ${destination.description}`;

      searchable.push({
        type: 'service',
        key: `${s.serviceNo}-${s.direction}`,
        tags: [s.serviceNo],
        priority: 1
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