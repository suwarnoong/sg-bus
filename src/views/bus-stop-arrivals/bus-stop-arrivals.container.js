import { connect } from 'react-redux';
import { getArrivals } from '../../store/actions/get-arrivals.action';
import BusStopArrivals from './bus-stop-arrivals';

const mapStateToProps = state => ({
  arrivals: state.busStopArrivals.arrivals,
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopNo => dispatch(getArrivals(busStopNo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusStopArrivals)