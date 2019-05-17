import { reduxConnect } from '../../../utils';
import { getRouteGeojson, getStopsByStop } from '../../../store/bus';
import BusRouteMap from './bus-route-map';

const mapStateToProps = (state, props) => ({
  routeGeojson: getRouteGeojson(state.bus),
  routeStop: state.bus.routeStop,
  selectedRouteStop: state.bus.selectedRouteStop,
  routeService: state.bus.routeService,
  stopsByStop: getStopsByStop(state.bus)
});

export default reduxConnect(mapStateToProps)(BusRouteMap);
