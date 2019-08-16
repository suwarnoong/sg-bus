import { StyleSheet } from 'react-native';
import { backgroundColor1 } from '../../../colors';

export default StyleSheet.create({
  container: {
    backgroundColor: backgroundColor1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    zIndex: -1000,
  },
  headerBackdrop: {
    position: 'absolute',
    top: 0,
    height: 50,
    width: '100%',
  },
});
