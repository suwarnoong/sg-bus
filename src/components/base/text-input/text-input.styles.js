import { StyleSheet } from 'react-native';
import { primaryColor, backgroundColor1 } from '../../../colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: backgroundColor1,
    paddingHorizontal: 20,
    borderRadius: 50,
    minHeight: 50,
    borderWidth: 1,
    borderColor: backgroundColor1,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: primaryColor,
    marginLeft: 5,
  },
});
