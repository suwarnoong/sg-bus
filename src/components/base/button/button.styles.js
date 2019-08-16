import { StyleSheet } from 'react-native';
import {
  primaryColor,
  warningColor,
  dangerColor,
  textColor,
  lightTextColor,
  activeTextColor,
  backgroundColor1,
  strokeColor,
  buttonBorderColor,
} from '../../../colors';

export default StyleSheet.create({
  container: {
    minHeight: 45,
    minWidth: 45,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultContainer: {
    borderWidth: 1,
    borderColor: primaryColor,
    backgroundColor: primaryColor,
  },
  warningContainer: {
    borderWidth: 1,
    borderColor: warningColor,
    backgroundColor: warningColor,
  },
  dangerContainer: {
    borderWidth: 1,
    borderColor: dangerColor,
    backgroundColor: dangerColor,
  },
  plainContainer: {
    borderWidth: 1,
    borderColor: buttonBorderColor,
    backgroundColor: backgroundColor1,
  },
  clearContainer: {
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  disabledContainer: {
    borderWidth: 1,
    borderColor: strokeColor,
    backgroundColor: strokeColor,
  },
  topIconContainer: {
    flexDirection: 'column',
  },
  label: {
    color: activeTextColor,
  },
  defaultLabel: {
    color: activeTextColor,
  },
  plainLabel: {
    color: textColor,
  },
  clearLabel: {
    color: textColor,
  },
  warningLabel: {
    color: activeTextColor,
  },
  dangerLabel: {
    color: activeTextColor,
  },
  disabledLabel: {
    color: lightTextColor,
  },
  leftIconLabel: {
    marginLeft: 7,
  },
  rightIconLabel: {
    marginRight: 7,
  },
  topIconLabel: {
    marginTop: 7,
  },
  icon: {},
});
