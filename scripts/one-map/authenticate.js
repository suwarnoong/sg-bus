import { request } from '../../utils';
import { oneMap } from '../config.json';

const authenticate = async () => {
  const { email, password, tokenUrl } = oneMap;

  try {
    const data = await request.post(tokenUrl, { email, password });
    return data.access_token;
  } catch (ex) {
    console.error('authenticate', ex);
  }
};

export default authenticate;
