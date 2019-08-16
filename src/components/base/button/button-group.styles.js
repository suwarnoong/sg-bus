import { StyleSheet } from 'react-native';
import { buttonBorderColor } from '../../../colors';

const borderRadius = 40;

export default StyleSheet.create({
  container: {
    borderRadius,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 0,
    borderColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: buttonBorderColor,
  },
  firstButton: {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  lastButton: {
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomWidth: 0,
  },
});
