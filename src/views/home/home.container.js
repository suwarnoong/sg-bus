import Home from './home';
import { reduxConnect } from '../../utils';
import { getRoutes, getServices, getStops } from '../../store/actions';

const mapStateToProps = state => ({
  services: state.bus.services,
  routes: state.bus.routes,
  stops: state.bus.stops
});

const mapDispatchToProps = dispatch => ({
  getRoutes: _ => dispatch(getRoutes()),
  getServices: _ => dispatch(getServices()),
  getStops: _ => dispatch(getStops())
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Home);
