import { StyleSheet } from 'react-native';
import { primaryColor, strokeColor, activeTextColor } from '../../../colors';
export const height = 59;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: strokeColor,
  },
  text: {},
  item: {
    flex: 1,
    height,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: 100,
    height: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: 'absolute',
    top: -20,
  },
  activeItemIcon: {
    position: 'absolute',
    color: activeTextColor,
  },
  activeItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
