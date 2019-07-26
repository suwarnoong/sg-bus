import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 40,
    paddingHorizontal: 40
  },
  infoIconMask: {
    borderRadius: 200,
    overflow: 'hidden',
    marginBottom: 20
  },
  infoIcon: {
    width: 200,
    height: 200
  },
  infoTitle: {
    fontSize: 24,
    color: '#1289A7',
    textAlign: 'center',
    marginBottom: 30
  },
  infoDesc: {
    textAlign: 'center'
  }
});
