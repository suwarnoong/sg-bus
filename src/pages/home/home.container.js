// @flow
import Home from './home';
import { reduxConnect } from '../../utils';
import { getRoutes, getServices, getStops } from '../../store/bus';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getRoutes: _ => dispatch(getRoutes()),
  getServices: _ => dispatch(getServices()),
  getStops: _ => dispatch(getStops())
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Home);
