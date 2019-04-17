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
  roadDisabled: {
    backgroundColor: '#FFFFFF',
    opacity: 0.5
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
    borderColor: '#EEEEEE',
    backgroundColor: 'white'
  },
  bulletRoute: {
    borderColor: '#1289A7'
  },
  bulletSelected: {
    borderColor: '#d35400'
  },
  routeConnector: {
    width: routeLineSize,
    position: 'absolute',
    left: (bulletSize - routeLineSize) / 2,
    backgroundColor: '#EEEEEE',
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
