import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-end'
  },
  mapView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  controlContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'column'
  },
  controlItem: {
    marginBottom: 10
  },
  row: {
    flexDirection: 'row'
  },
  arrivalList: {
    height: '50%',
    opacity: 0.9
  },
  busStopRoad: {
    marginTop: 5
  }
});
