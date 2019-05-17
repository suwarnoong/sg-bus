import { reduxConnect } from '../../../utils';
import {
  getRouteWithDistance,
  updateSelectedRouteStop
} from '../../../store/bus';
import BusRouteList from './bus-route-list';

const mapStateToProps = (state, props) => ({
  persisted: state.bus.persisted,
  routeWithDistance: getRouteWithDistance(state.bus),
  routeStop: state.bus.routeStop,
  selectedRouteStop: state.bus.selectedRouteStop
});

const mapDispatchToProps = dispatch => ({
  updateSelectedRouteStop: busStopCode =>
    dispatch(updateSelectedRouteStop(busStopCode))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(BusRouteList);
