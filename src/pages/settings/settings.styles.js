import { StyleSheet } from 'react-native';
import { primaryColor, backgroundColor1 } from '../../colors';
import { shadowStyles } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor1,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  infoIconMask: {
    overflow: 'hidden',
    marginBottom: 20,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    height: 410,
  },
  infoTitle: {
    fontSize: 24,
    color: primaryColor,
    textAlign: 'center',
  },
  infoDesc: {
    textAlign: 'center',
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  languageOption: {
    width: '40%',
    maxWidth: 150,
    minHeight: 90,
    margin: 10,
    borderColor: backgroundColor1,
    ...shadowStyles,
  },
  languageLabel: {
    textAlign: 'center',
    fontSize: 18,
  },
});
