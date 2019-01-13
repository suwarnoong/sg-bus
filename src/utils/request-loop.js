import request from './request';

export default {
  get: async (url, increaseParam = '$skip', increasedBy = 500) => {
    let result = [], hasData = false, increaseValue = 0;
    do {
      const data = await request.get(`${url}?${increaseParam}=${increaseValue}`);
      hasData = data && data.value && data.value.length > 0;
      increaseValue += increasedBy;

      if (hasData) {
        result = result.concat(data.value);
      }
    } while (hasData);

    return result;
  }
}