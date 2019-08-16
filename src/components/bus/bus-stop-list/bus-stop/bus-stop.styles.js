import { StyleSheet } from 'react-native';
import {
  primaryColor,
  backgroundColor1,
  backgroundColor2,
} from '../../../../colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: backgroundColor1,
    borderBottomWidth: 1,
    borderBottomColor: backgroundColor2,
  },
  bus: {
    color: primaryColor,
    marginRight: 9,
  },
  routesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
  },
});
