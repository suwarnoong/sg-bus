import { getNearestStops } from '../../store/actions';
import { reduxConnect } from '../../utils';
import NearestBusStops from './nearest-bus-stops';

const mapStateToProps = state => ({
  persisted: state.bus.persisted,
  nearest: state.bus.nearest,
  nav: state.nav
});

const mapDispatchToProps = dispatch => ({
  getNearestStops: position => dispatch(getNearestStops(position))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  NearestBusStops
);
