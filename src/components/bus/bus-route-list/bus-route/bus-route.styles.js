import { StyleSheet } from 'react-native';
import { BUS_ROUTE_HEIGHT } from '../../../../constants';

const height = BUS_ROUTE_HEIGHT;
const bulletSize = 20;
const routeLineSize = 3;

export default StyleSheet.create({
  container: {
    height,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  roadContainer: {
    paddingVertical: 15,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: 70
  },
  bullet: {
    width: bulletSize,
    height: bulletSize,
    marginRight: 10,
    borderRadius: bulletSize,
    borderWidth: 6,
    borderColor: '#9B9B9B',
    backgroundColor: 'white'
  },
  bulletActive: {
    borderColor: '#d35400'
  },
  bulletRoute: {
    borderColor: '#1289A7'
  },
  routeConnector: {
    width: routeLineSize,
    position: 'absolute',
    left: (bulletSize - routeLineSize) / 2,
    backgroundColor: '#9B9B9B',
    zIndex: -1
  },
  routeConnectorTop: {
    top: -(height - bulletSize) / 2,
    height: (height - bulletSize) / 2
  },
  routeConnectorBottom: {
    top: 0,
    height
  },
  routeConnectorActive: {
    backgroundColor: '#1289A7'
  }
});
