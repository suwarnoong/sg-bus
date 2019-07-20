import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 40
  },
  busArrivalImage: {
    flex: 1,
    height: 75
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 40,
    paddingHorizontal: 70
  },
  infoIcon: {
    marginBottom: 20
  },
  infoTitle: {
    fontSize: 24,
    color: '#1289A7',
    textAlign: 'center',
    marginBottom: 5
  },
  infoDesc: {
    textAlign: 'center'
  },
  sampleContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative'
  },
  star: {
    position: 'absolute',
    top: 0,
    left: '12.3%',
    width: '45%',
    height: '45%'
  }
});
