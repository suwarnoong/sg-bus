import { reduxConnect } from '../../../utils';
import { getArrivals } from '../../../store/actions';
import BusArrivalList from './bus-arrival-list';

const mapStateToProps = state => ({
  arrivals: state.bus.arrivals
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopCode => dispatch(getArrivals(busStopCode))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  BusArrivalList
);
