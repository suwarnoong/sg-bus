import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  busStopContainer: {
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  roadName: {
    color: '#777',
  },
  busStopCode: {
    color: '#777',
    marginLeft: 15,
  },
  distance: {
    color: '#999',
  },
  routesContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
});