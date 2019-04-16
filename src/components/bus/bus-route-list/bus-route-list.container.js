import { reduxConnect } from '../../../utils';
import { getRouteWithDistance } from '../../../store/selectors';
import BusRouteList from './bus-route-list';

const mapStateToProps = (state, props) => ({
  persisted: state.bus.persisted,
  routeWithDistance: getRouteWithDistance(
    state.bus,
    props.serviceNo,
    props.busStopCode
  )
});

export default reduxConnect(mapStateToProps)(BusRouteList);
