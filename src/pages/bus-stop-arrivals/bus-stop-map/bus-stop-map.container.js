import { reduxConnect } from '../../../utils';
import { getStopsByStop, getStopsGeojson } from '../../../store/bus';
import BusStopMap from './bus-stop-map';

const mapStateToProps = (state, props) => ({
  stops: state.bus.stops,
  stopsByStop: getStopsByStop(state.bus),
  stopsGeojson: getStopsGeojson(state.bus)
});

export default reduxConnect(mapStateToProps)(BusStopMap);
