import { StyleSheet } from 'react-native';
import { primaryColor, backgroundColor2, textColor } from '../../../../colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: backgroundColor2,
  },
  bus: {
    color: primaryColor,
    marginRight: 9,
  },
  routesContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  routeInfoContainer: {
    flexDirection: 'row',
  },
  from: {
    color: textColor,
    marginRight: 5,
  },
  to: {
    color: textColor,
    marginLeft: 5,
  },
});
