import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    minHeight: 45,
    minWidth: 45,
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  defaultContainer: {
    borderWidth: 1,
    borderColor: '#1289A7',
    backgroundColor: '#1289A7'
  },
  warningContainer: {
    borderWidth: 1,
    borderColor: '#F5A623',
    backgroundColor: '#F5A623'
  },
  dangerContainer: {
    borderWidth: 1,
    borderColor: '#D0021B',
    backgroundColor: '#D0021B'
  },
  plainContainer: {
    borderWidth: 1,
    borderColor: '#4A4A4A',
    backgroundColor: '#FFFFFF'
  },
  clearContainer: {
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent'
  },
  disabledContainer: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#DDDDDD'
  },
  topIconContainer: {
    flexDirection: 'column'
  },
  label: {
    color: '#FFFFFF'
  },
  plainLabel: {
    color: '#4A4A4A'
  },
  clearLabel: {
    color: '#4A4A4A'
  },
  warningLabel: {
    color: '#FFFFFF'
  },
  dangerLabel: {
    color: '#FFFFFF'
  },
  disabledLabel: {
    color: '#999999'
  },
  leftIconLabel: {
    marginLeft: 7
  },
  rightIconLabel: {
    marginRight: 7
  },
  topIconLabel: {
    marginTop: 7
  },
  icon: {}
});
