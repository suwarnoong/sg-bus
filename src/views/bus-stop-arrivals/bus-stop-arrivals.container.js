import reduxConnect from '../../utils/redux-connect';
import {
  getArrivals,
  getNearestStops,
  getRoutes,
  getServices,
  getStops
} from '../../store/actions';
import BusStopArrivals from './bus-stop-arrivals';

const mapStateToProps = state => ({
  arrivals: state.bus.arrivals,
  services: state.bus.services,
  routes: state.bus.routes,
  stops: state.bus.stops,
  nearest: state.bus.nearest
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopNumber => dispatch(getArrivals(busStopNumber)),
  getServices: _ => dispatch(getServices()),
  getRoutes: _ => dispatch(getRoutes()),
  getStops: _ => dispatch(getStops()),
  getNearestStops: position => dispatch(getNearestStops(position))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  BusStopArrivals
);
