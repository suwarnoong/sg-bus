import axios from 'axios';
import fs from 'fs';
import { request } from '../../utils';
import { oneMap } from '../../app.config';

const requestBusRoute = async (token, serviceNo, direction) => {
  const { busRouteUrl } = oneMap;
  const url = busRouteUrl
    .replace('{ServiceNo}', serviceNo)
    .replace('{BusDirection}', direction)
    .replace('{AccessToken}', token);

  return await request.get(url);
};

const fetchBusRoute = async (token, serviceNo, direction) => {
  if (!token) return;

  try {
    const data = await requestBusRoute(token, serviceNo, direction);

    let routeLine = [];
    const sequences =
      data[`BUS_DIRECTION_${String(direction) === '1' ? 'ONE' : 'TWO'}`];
    if (!sequences) return;

    sequences.forEach(seq => {
      routeLine = routeLine.concat(seq.GEOMETRIES);
    });

    return routeLine;
  } catch (ex) {
    console.error('fetchBusRoute', serviceNo, direction, ex);
  }
};

export default fetchBusRoute;
