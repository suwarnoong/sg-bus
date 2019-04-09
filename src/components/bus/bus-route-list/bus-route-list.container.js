import { reduxConnect } from '../../../utils';
import {
  getRouteByServiceDirection,
  getRouteDirection,
  getStopsByStop
} from '../../../store/selectors';
import BusRouteList from './bus-route-list';

const mapStateToProps = (state, props) => ({
  geolocation: state.service.geolocation,
  persisted: state.bus.persisted,
  stopsByStop: getStopsByStop(state.bus),
  routeByServiceDirection: getRouteByServiceDirection(
    state.bus,
    props.serviceNo,
    getRouteDirection(state.bus, props.serviceNo, props.busStopCode)
  )
});

export default reduxConnect(mapStateToProps)(BusRouteList);
