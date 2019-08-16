import { StyleSheet } from 'react-native';
import { backgroundColor1 } from '../../../colors';
import { shadowStyles } from '../../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: backgroundColor1,
    borderRadius: 10,
    margin: 20,
    overflow: 'hidden',
  },
  shadow: {
    ...shadowStyles,
  },
});
