import { StyleSheet } from 'react-native';
import { activeTextColor, warningColor } from '../../../colors';

export default StyleSheet.create({
  container: {
    backgroundColor: warningColor,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    color: activeTextColor,
    paddingVertical: 5,
  },
});
