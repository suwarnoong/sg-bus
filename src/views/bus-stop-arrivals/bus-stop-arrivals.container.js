import { reduxConnect } from '../../utils';
import { getArrivals } from '../../store/actions';
import BusStopArrivals from './bus-stop-arrivals';

const mapStateToProps = state => ({
  arrivals: state.bus.arrivals
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopNumber => dispatch(getArrivals(busStopNumber))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  BusStopArrivals
);
