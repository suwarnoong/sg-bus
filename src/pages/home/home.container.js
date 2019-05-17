// @flow
import Home from './home';
import { reduxConnect, getCurrentRoute } from '../../utils';
import {
  getRoutes,
  getServices,
  getStops,
  getNearestFavoriteStops
} from '../../store/bus';

const mapStateToProps = state => ({
  currentNavRoute: getCurrentRoute(state.nav),
  nearestFavoriteStops: getNearestFavoriteStops(
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
