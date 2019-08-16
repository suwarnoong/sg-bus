import { StyleSheet } from 'react-native';
import { textColor, lightTextColor } from '../../../colors';

export default StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },
  roadName: {
    color: lightTextColor,
  },
  busStopCode: {
    color: textColor,
  },
  distance: {
    color: lightTextColor,
  },
});
