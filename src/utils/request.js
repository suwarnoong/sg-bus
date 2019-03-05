import axios from 'axios';
import toCamelCase from './to-camelcase';

const service = axios.create({
  headers: {
    AccountKey: 'yourltaaccountkey',
    Accept: 'application/json'
  }
});

export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      service
        .get(url, { params })
        .then(res => {
          if (res.status === 200) {
            resolve(toCamelCase(res.data));
          } else {
            reject(res);
          }
        })
        .catch(reject);
    });
  }
};
