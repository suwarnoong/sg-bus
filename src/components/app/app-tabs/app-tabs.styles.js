import { StyleSheet } from 'react-native';
export const height = 59;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#CCCCCC'
  },
  text: {},
  item: {
    flex: 1,
    height,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    width: 100,
    height: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: 'absolute',
    top: -20
  },
  activeItemIcon: {
    position: 'absolute',
    color: '#FFFFFF'
  },
  activeItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#1289A7',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
