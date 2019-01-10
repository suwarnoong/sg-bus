import { connect } from 'react-redux';
import { getArrivals, getServices } from '../../store/actions';
import BusStopArrivals from './bus-stop-arrivals';

const mapStateToProps = state => ({
  arrivals: state.bus.arrivals,
  services: state.bus.services,
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopNumber => dispatch(getArrivals(busStopNumber)),
  getServices: _ => dispatch(getServices()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusStopArrivals)