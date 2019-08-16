import { StyleSheet } from 'react-native';
import { dangerColor, backgroundColor2 } from '../../../colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: backgroundColor2,
  },
  row: {
    flexDirection: 'row',
  },
  fill: {
    flex: 1,
  },
  serviceNo: {
    width: 83,
  },
  busStopRoad: {
    marginTop: 5,
  },
  noArrivals: {
    fontSize: 18,
    color: dangerColor,
    alignSelf: 'center',
  },
});
