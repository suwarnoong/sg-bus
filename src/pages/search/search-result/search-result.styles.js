import { StyleSheet } from 'react-native';
import { textColor } from '../../../colors';

export default StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  busStopsContainer: {
    flex: 1,
  },
  busServicesContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    color: textColor,
    marginRight: 7,
  },
  resultCount: {},
});
