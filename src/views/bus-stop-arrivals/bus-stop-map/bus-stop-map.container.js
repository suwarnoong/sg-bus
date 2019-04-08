import { reduxConnect } from '../../../utils';
import {
  getStopsByStop,
  getStopsGeojsonFeatures
} from '../../../store/selectors';
import BusStopMap from './bus-stop-map';

const mapStateToProps = (state, props) => ({
  stops: state.bus.stops,
  stopsByStop: getStopsByStop(state.bus),
  stopsGeojsonFeatures: getStopsGeojsonFeatures(state.bus)
});

export default reduxConnect(mapStateToProps)(BusStopMap);
