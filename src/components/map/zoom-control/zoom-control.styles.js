import { StyleSheet } from 'react-native';
import { shadowStyles } from '../../../constants';

export default StyleSheet.create({
  container: {
    opacity: 0.8,
    borderWidth: 2,
    ...shadowStyles,
  },
});
