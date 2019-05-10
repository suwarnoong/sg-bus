import { reduxConnect, getCurrentRoute } from '../../utils';
// import { updateInset } from '../../store/actions';
import { getStopsByStop, getStopsGeojson } from '../../store/selectors';
import BusStopArrivals from './bus-stop-arrivals';

const mapStateToProps = (state, props) => ({
  currentNavRoute: getCurrentRoute(state.nav),
  stops: state.bus.stops,
  stopsByStop: getStopsByStop(state.bus),
  stopsGeojson: getStopsGeojson(state.bus)
});

export default reduxConnect(mapStateToProps)(BusStopArrivals);
