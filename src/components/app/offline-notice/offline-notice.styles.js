import { StyleSheet } from 'react-native';
import { OFFLINE_COLOR } from '../../../constants';

const TOP_OFFSET = 4;
const HEIGHT = 23;

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
    color: 'white',
    fontSize: 14,
    top: -TOP_OFFSET,
    height: HEIGHT - TOP_OFFSET
  }
});
