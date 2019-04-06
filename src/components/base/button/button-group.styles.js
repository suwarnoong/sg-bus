import { StyleSheet } from 'react-native';

const borderRadius = 40;

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    borderRadius,
    borderWidth: 2,
    borderColor: '#CCCCCC'
  },
  button: {
    borderRadius: 0,
    borderBottomWidth: 2,
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
