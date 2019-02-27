import { reduxConnect } from '../../utils';
import { getArrivals, updateHeader } from '../../store/actions';
import BusStopArrivals from './bus-stop-arrivals';

const mapStateToProps = state => ({
  arrivals: state.bus.arrivals
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopNumber => dispatch(getArrivals(busStopNumber)),
  updateHeader: (title, subTitle = '') =>
    dispatch(updateHeader(title, subTitle))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  BusStopArrivals
);
