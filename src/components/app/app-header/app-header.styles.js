import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../colors';

export default StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    height: 65,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  rightPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    paddingLeft: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: -1,
  },
  title: {},
  subTitle: {
    marginTop: -3,
  },
  backIcon: {
    marginRight: 3,
    padding: 5,
  },
});
