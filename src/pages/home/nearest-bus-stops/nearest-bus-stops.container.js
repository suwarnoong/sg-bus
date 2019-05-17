import { getNearestStops } from '../../../store/bus';
import { reduxConnect } from '../../../utils';
import NearestBusStops from './nearest-bus-stops';

const mapStateToProps = state => ({
  persisted: state.bus.persisted,
  nearest: state.bus.nearest,
  nav: state.nav,
  geolocation: state.service.geolocation
});

const mapDispatchToProps = dispatch => ({
  getNearestStops: position => dispatch(getNearestStops(position))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  NearestBusStops
);
