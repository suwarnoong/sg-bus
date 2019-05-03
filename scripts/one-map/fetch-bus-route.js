const axios = require('axios');
const { decode } = require('@mapbox/polyline');
const fs = require('fs');

const { oneMap } = require('../config.json');

const request = axios.create();

module.exports = async (token, serviceNo, direction) => {
  if (!token) return;

  const { getBusRouteUrl } = oneMap;
  const url = getBusRouteUrl
    .replace('{ServiceNo}', serviceNo)
    .replace('{BusDirection}', direction)
    .replace('{AccessToken}', token);

  try {
    const response = await request.get(url);

    let routeLine = [];
    const sequences =
      response.data[
        `BUS_DIRECTION_${String(direction) === '1' ? 'ONE' : 'TWO'}`
      ];
    if (!sequences) return;

    sequences.forEach(seq => {
      routeLine = routeLine.concat(
        decode(seq.GEOMETRIES).map(c => c.reverse())
      );
    });

    console.log('Success', 'getBusRouteUrl', serviceNo, direction);
    return routeLine;
  } catch (ex) {
    console.log('Error', 'getBusRouteUrl', serviceNo, direction);
  }
};
