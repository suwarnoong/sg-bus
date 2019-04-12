import { reduxConnect } from '../../utils';
import BusRoute from './bus-route';
import { getStopsByStop } from '../../store/selectors';

const mapStateToProps = state => ({
  geolocation: state.service.geolocation,
  stopsByStop: getStopsByStop(state.bus)
});

export default reduxConnect(mapStateToProps)(BusRoute);
