import { reduxConnect } from '../../../utils';
import { getArrivals } from '../../../store/actions';
import { getArrivalsFull } from '../../../store/selectors';
import BusArrivalList from './bus-arrival-list';

const mapStateToProps = (state, props) => ({
  arrivals: getArrivalsFull(state.bus, props.busStopCode)
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopCode => dispatch(getArrivals(busStopCode))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  BusArrivalList
);
