import { reduxConnect } from '../../utils';
import { getArrivals, addToSaved, removeFromSaved } from '../../store/actions';
import BusStopArrivals from './bus-stop-arrivals';

const mapStateToProps = state => ({
  arrivals: state.bus.arrivals,
  saved: state.bus.saved
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopCode => dispatch(getArrivals(busStopCode)),
  addToSaved: ({ busStopCode, serviceNo }) =>
    dispatch(addToSaved({ busStopCode, serviceNo })),
  removeFromSaved: ({ busStopCode, serviceNo }) =>
    dispatch(removeFromSaved({ busStopCode, serviceNo }))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  BusStopArrivals
);
