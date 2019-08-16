import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../colors';
import { shadowStyles } from '../../../constants';

export default StyleSheet.create({
  container: {
    opacity: 0.8,
    borderWidth: 2,
    ...shadowStyles,
  },
  gpsLocate: {
    color: primaryColor,
  },
});
