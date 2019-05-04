import axios from 'axios';
import { request } from '../../utils';
import { lta } from '../../app.config';

const requestLoop = async (url, increaseParam = '$skip', increasedBy = 500) => {
  let result = [],
    hasData = false,
    increaseValue = 0;
  do {
    const params = { [increaseParam]: increaseValue };
    const data = await request.get(url, params, lta.requestConfig);
    hasData = data && data.value && data.value.length > 0;
    increaseValue += increasedBy;

    if (hasData) {
      result = result.concat(data.value);
    }
  } while (hasData);

  return result;
};

export default requestLoop;
