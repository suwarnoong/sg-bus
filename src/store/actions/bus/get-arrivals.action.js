import * as actions from './types';
import { request } from '../../../utils';
import { lta } from '../../../../app.config';

export const getArrivals = busStopCode => {
  return (dispatch, getState) => {
    const url = lta.busArrivalUrl.replace('{BusStopCode}', busStopCode);
    request.get(url, null, lta.requestConfig).then(data => {
      const arrivals = data.services.map(s => ({
        busStopCode,
        serviceNo: s.serviceNo,
        nextBus: {
          estimatedArrival: s.nextBus.estimatedArrival,
          load: s.nextBus.load
        },
        nextBus2: {
          estimatedArrival: s.nextBus2.estimatedArrival,
          load: s.nextBus2.load
        },
        nextBus3: {
          estimatedArrival: s.nextBus3.estimatedArrival,
          load: s.nextBus3.load
        }
      }));

      dispatch({
        type: actions.UPDATE_ARRIVALS,
        busStopCode,
        arrivals
      });
    });
  };
};
