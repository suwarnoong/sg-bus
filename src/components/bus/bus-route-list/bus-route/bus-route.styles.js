import { StyleSheet } from 'react-native';
import { BUS_ROUTE_HEIGHT } from '../../../../constants';
import {
  primaryColor,
  backgroundColor1,
  backgroundColor2,
  strokeColor,
} from '../../../../colors';

const height = BUS_ROUTE_HEIGHT;
const bulletSize = 25;
const routeLineSize = 4;

export default StyleSheet.create({
  container: {
    height,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  roadContainer: {
    paddingVertical: 15,
    flex: 1,
    backgroundColor: backgroundColor1,
    borderBottomWidth: 1,
    borderBottomColor: backgroundColor2,
  },
  roadDisabled: {
    opacity: 0.5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: 70,
  },
  bullet: {
    width: bulletSize,
    height: bulletSize,
    marginRight: 10,
  },
  routeConnector: {
    width: routeLineSize,
    position: 'absolute',
    left: (bulletSize - routeLineSize) / 2,
    backgroundColor: strokeColor,
    zIndex: -1,
  },
  routeConnectorTop: {
    top: -(height - bulletSize) / 2,
    height: (height - bulletSize) / 2,
  },
  routeConnectorBottom: {
    top: 0,
    height,
  },
  routeConnectorActive: {
    backgroundColor: primaryColor,
  },
});
