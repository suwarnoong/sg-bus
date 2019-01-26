import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  row: {
    flexDirection: 'row',
  },
  fill: {
    flex: 1,
  },
  roadName: {
    color: '#777',
  },
  bus: {
    color: '#1289A7',
    marginRight: 9,
  },
  busStopCode: {
    color: '#4A4A4A',
    marginLeft: 15,
  },
  distance: {
    color: '#9B9B9B',
  },
  routesContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
});