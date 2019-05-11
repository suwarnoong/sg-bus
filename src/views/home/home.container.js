// @flow
import Home from './home';
import { reduxConnect, getCurrentRoute } from '../../utils';
import { getRoutes, getServices, getStops } from '../../store/actions';

const mapStateToProps = state => ({
  currentNavRoute: getCurrentRoute(state.nav),
  favoritesCount: state.bus.favorites.length
});

const mapDispatchToProps = dispatch => ({
  getRoutes: _ => dispatch(getRoutes()),
  getServices: _ => dispatch(getServices()),
  getStops: _ => dispatch(getStops())
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Home);
