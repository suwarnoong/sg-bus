const isGeolocationEmpty = geolocation => {
  return (
    geolocation == null ||
    (geolocation.latitude === 0 && geolocation.longitude === 0)
  );
};

export default isGeolocationEmpty;
