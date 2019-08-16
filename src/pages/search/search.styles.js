import { StyleSheet } from 'react-native';
import { primaryColor, backgroundColor2 } from '../../colors';

export default StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  infoContainer: {
    alignItems: 'center',
    paddingTop: 110,
    paddingBottom: 40,
    paddingHorizontal: 70,
  },
  infoIcon: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 24,
    color: primaryColor,
    textAlign: 'center',
    marginBottom: 5,
  },
  infoDesc: {
    textAlign: 'center',
  },
  searchInputContainer: {
    backgroundColor: backgroundColor2,
    paddingVertical: 10,
  },
  searchResult: {
    flex: 1,
  },
});
