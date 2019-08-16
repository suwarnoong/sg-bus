import { StyleSheet } from 'react-native';
import {
  primaryColor,
  backgroundColor1,
  backgroundColor2,
} from '../../../colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 40,
    backgroundColor: backgroundColor2,
  },
  sectionTitle: {
    color: primaryColor,
  },
  itemContainer: {
    backgroundColor: backgroundColor1,
  },
  firstItemContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lastItemContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
