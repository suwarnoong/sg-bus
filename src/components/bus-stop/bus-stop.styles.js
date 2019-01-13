import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginHorizontal: 10,
    // marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    // borderRadius: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
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
});