import { createSelector } from 'reselect';

const getServices = state => state.services;

export const getServicesByServiceDirection = createSelector(
  [getServices],
  services => {
    const servicesByServiceDirection = {};
    services.forEach(s => {
      servicesByServiceDirection[`${s.serviceNo}-${s.direction}`] = s;
    });
    return servicesByServiceDirection;
  }
);
