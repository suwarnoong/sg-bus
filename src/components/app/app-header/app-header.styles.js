import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#1289A7',
    height: 65,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10
  },
  rightPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    position: 'absolute',
    left: 45,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: -1
  },
  title: {
    color: '#FFFFFF'
  },
  subTitle: {
    color: '#DDDDDD',
    marginTop: -3
  },
  backText: {
    color: '#FFFFFF'
  },
  backIcon: {
    marginRight: 3,
    padding: 5
  }
});
