import { getNearestStops } from '../../store/actions';
import reduxConnect from '../../utils/redux-connect';
import NearestBusStops from './nearest-bus-stops';

const mapStateToProps = state => ({
  nearest: state.bus.nearest,
  nav: state.nav
});

const mapDispatchToProps = dispatch => ({
  getNearestStops: position => dispatch(getNearestStops(position))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  NearestBusStops
);
