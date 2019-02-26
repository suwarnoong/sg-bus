import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#1289A7',
    height: 56,
    paddingHorizontal: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  rightPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  },
  title: {
    color: '#FFFFFF'
  },
  backText: {
    color: '#FFFFFF'
  },
  backIcon: {
    marginRight: 3
  }
});
