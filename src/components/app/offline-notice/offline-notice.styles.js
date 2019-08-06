import { StyleSheet } from 'react-native';
import { OFFLINE_COLOR } from '../../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: OFFLINE_COLOR,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  label: {
    color: 'white'
  }
});
