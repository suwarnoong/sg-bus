import { reduxConnect, getCurrentRoute } from '../../utils';
import { getStopsByStop, getStopsGeojson } from '../../store/bus';
import BusStopArrivals from './bus-stop-arrivals';

const mapStateToProps = (state, props) => ({
  currentNavRoute: getCurrentRoute(state.nav),
  stops: state.bus.stops,
  stopsByStop: getStopsByStop(state.bus),
  stopsGeojson: getStopsGeojson(state.bus)
});

export default reduxConnect(mapStateToProps)(BusStopArrivals);
