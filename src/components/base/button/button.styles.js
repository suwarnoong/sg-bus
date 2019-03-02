import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: 45,
    width: '100%',
    borderRadius: 10,
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
  disabledContainer: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#DDDDDD'
  },
  label: {
    color: '#FFFFFF'
  },
  plainLabel: {
    color: '#4A4A4A'
  },
  disabledLable: {
    color: '#FFFFFF'
  },
  icon: {},
  startIcon: {
    marginRight: 7
  },
  endIcon: {
    marginLeft: 7
  }
});
