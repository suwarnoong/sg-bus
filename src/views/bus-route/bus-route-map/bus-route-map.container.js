import { reduxConnect } from '../../../utils';
import { getRouteGeojson, getStopsByStop } from '../../../store/selectors';
import BusRouteMap from './bus-route-map';

const mapStateToProps = (state, props) => ({
  routeGeojson: getRouteGeojson(
    state.bus,
    props.serviceNo,
    state.bus.routeStop
  ),
  routeStop: state.bus.routeStop,
  selectedRouteStop: state.bus.selectedRouteStop,
  stopsByStop: getStopsByStop(state.bus)
});

export default reduxConnect(mapStateToProps)(BusRouteMap);
