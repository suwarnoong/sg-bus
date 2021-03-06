import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  placeholder: {
    flex: 1
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  mapView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  arrivalList: {
    flex: 1,
    height: '50%',
    opacity: 0.9
  }
});
