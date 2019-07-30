function deg2Rad(deg) {
  return (deg * Math.PI) / 180;
}

export default (position1, position2) => {
  lat1 = deg2Rad(position1.latitude);
  lat2 = deg2Rad(position2.latitude);
  lng1 = deg2Rad(position1.longitude);
  lng2 = deg2Rad(position2.longitude);
  const R = 6371; // km
  const x = (lng2 - lng1) * Math.cos((lat1 + lat2) / 2);
  const y = lat2 - lat1;
  const d = Math.sqrt(x * x + y * y) * R;
  return Math.round(d * 1000000) / 1000000;
};
