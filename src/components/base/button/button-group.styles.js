import { StyleSheet } from 'react-native';

const borderRadius = 40;

export default StyleSheet.create({
  container: {
    borderRadius,
    overflow: 'hidden'
  },
  button: {
    borderRadius: 0,
    borderColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF'
  },
  firstButton: {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius
  },
  lastButton: {
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomWidth: 0
  }
});
