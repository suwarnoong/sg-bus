import { reduxConnect } from '../../../utils';
import { getRouteWithDistance } from '../../../store/selectors';
import { updateSelectedRouteStop } from '../../../store/actions';
import BusRouteList from './bus-route-list';

const mapStateToProps = (state, props) => ({
  persisted: state.bus.persisted,
  routeWithDistance: getRouteWithDistance(
    state.bus,
    props.serviceNo,
    state.bus.routeStop
  ),
  routeStop: state.bus.routeStop,
  selectedRouteStop: state.bus.selectedRouteStop
});

const mapDispatchToProps = dispatch => ({
  updateSelectedRouteStop: busStopCode =>
    dispatch(updateSelectedRouteStop(busStopCode))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(BusRouteList);
