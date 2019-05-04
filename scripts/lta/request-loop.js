import axios from 'axios';
import { request } from '../../utils';
import { lta } from '../config.json';

const requestLoop = async (url, increaseParam = '$skip', increasedBy = 500) => {
  const config = {
    headers: {
      AccountKey: lta.accountKey,
      Accept: 'application/json'
    },
    toCamelCase: true
  };

  let result = [],
    hasData = false,
    increaseValue = 0;
  do {
    const data = await request.get(
      `${url}`,
      { [increaseParam]: increaseValue },
      config
    );
    hasData = data && data.value && data.value.length > 0;
    increaseValue += increasedBy;

    if (hasData) {
      result = result.concat(data.value);
    }
  } while (hasData);

  return result;
};

export default requestLoop;
