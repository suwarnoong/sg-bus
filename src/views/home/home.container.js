// @flow
import Home from './home';
import { reduxConnect } from '../../utils';
import { getRoutes, getServices, getStops } from '../../store/actions';
import { getFavoriteServiceStop } from '../../store/selectors';

const mapStateToProps = state => ({
  services: state.bus.services,
  routes: state.bus.routes,
  stops: state.bus.stops,
  favoriteServiceStop: getFavoriteServiceStop(
    state.bus,
    state.service.geolocation
  )
});

const mapDispatchToProps = dispatch => ({
  getRoutes: _ => dispatch(getRoutes()),
  getServices: _ => dispatch(getServices()),
  getStops: _ => dispatch(getStops())
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Home);
