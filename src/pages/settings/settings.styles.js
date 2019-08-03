import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    paddingHorizontal: 40
  },
  infoIconMask: {
    borderRadius: 200,
    overflow: 'hidden',
    marginBottom: 20,
    height: 200
  },
  infoIcon: {
    width: 300,
    height: 300
  },
  infoTitle: {
    fontSize: 24,
    color: '#1289A7',
    textAlign: 'center',
    marginBottom: 30
  },
  infoDesc: {
    textAlign: 'center'
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  languageOption: {
    width: 140,
    height: 90,
    margin: 10,
    borderColor: '#FFFFFF',
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  languageLabel: {
    textAlign: 'center',
    fontSize: 18
  }
});
