import { StyleSheet } from 'react-native';
import { OFFLINE_COLOR } from '../../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: OFFLINE_COLOR,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    paddingVertical: 5,
  },
});
