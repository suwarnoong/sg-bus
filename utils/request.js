import axios from 'axios';
import toCamelCase from './to-camel-case';

const request = {
  get: (url, params = {}, config = {}) => {
    const service = axios.create(config);

    return new Promise((resolve, reject) => {
      service
        .get(url, { params })
        .then(res => {
          if (res.status === 200) {
            let data = res.data;
            if (config.toCamelCase === true) {
              data = toCamelCase(data);
            }
            resolve(data);
          } else {
            reject(res);
          }
        })
        .catch(reject);
    });
  },
  post: (url, params = {}, config = {}) => {
    const service = axios.create(config);

    return new Promise((resolve, reject) => {
      service
        .post(url, params)
        .then(res => {
          if (res.status === 200) {
            let data = res.data;
            if (config.toCamelCase === true) {
              data = toCamelCase(data);
            }
            resolve(data);
          } else {
            reject(res);
          }
        })
        .catch(reject);
    });
  }
};

export default request;
