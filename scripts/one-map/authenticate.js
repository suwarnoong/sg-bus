const axios = require('axios');
const { oneMap } = require('../config.json');

const request = axios.create();

module.exports = async () => {
  const { email, password, getTokenUrl } = oneMap;
  const response = await request.post(getTokenUrl, { email, password });

  if (response.status === 200) {
    return response.data.access_token;
  }
};
