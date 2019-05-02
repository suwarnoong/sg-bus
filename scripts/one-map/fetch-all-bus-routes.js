const fs = require('fs');
const fetchBusRoute = require('./fetch-bus-route');

module.exports = async token => {
  if (!token) return;

  const services = JSON.parse(fs.readFileSync('src/stubs/bus/services.json'));
  for (let s = 0; s < services.length; s++) {
    const service = services[s];
    fetchBusRoute(token, service.serviceNo, service.direction);
  }
};
