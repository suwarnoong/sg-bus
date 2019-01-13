import { connect } from 'react-redux';
import { getArrivals, getRoutes, getServices, getStops } from '../../store/actions';
import BusStopArrivals from './bus-stop-arrivals';

const mapStateToProps = state => ({
  arrivals: state.bus.arrivals,
  services: state.bus.services,
  routes: state.bus.routes,
  stops: state.bus.stops,
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopNumber => dispatch(getArrivals(busStopNumber)),
  getServices: _ => dispatch(getServices()),
  getRoutes: _ => dispatch(getRoutes()),
  getStops: _ => dispatch(getStops()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusStopArrivals)