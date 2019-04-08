import { reduxConnect } from '../../utils';
// import { updateInset } from '../../store/actions';
import { getStopsByStop, getStopsGeojsonFeatures } from '../../store/selectors';
import BusStopArrivals from './bus-stop-arrivals';

const mapStateToProps = (state, props) => ({
  stops: state.bus.stops,
  stopsByStop: getStopsByStop(state.bus),
  stopsGeojsonFeatures: getStopsGeojsonFeatures(state.bus)
});

const mapDispatchToProps = dispatch => ({
  // updateInset: (type, value) => dispatch(updateInset(type, value))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  BusStopArrivals
);
