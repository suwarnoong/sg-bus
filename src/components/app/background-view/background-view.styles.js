import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    zIndex: -1000
  },
  headerBackdrop: {
    position: 'absolute',
    top: 0,
    height: 50,
    width: '100%'
  }
});
