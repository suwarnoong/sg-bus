import { reduxConnect } from '../../../utils';
import { getArrivals, getArrivalsByStop } from '../../../store/bus';
import BusArrivalList from './bus-arrival-list';

const mapStateToProps = (state, props) => ({
  arrivals: getArrivalsByStop(state.bus, props.busStopCode)
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopCode => dispatch(getArrivals(busStopCode))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  BusArrivalList
);
