import { reduxConnect } from '../../utils';
import BusRoute from './bus-route';
import { getStopsByStop } from '../../store/selectors';

const mapStateToProps = state => ({
  stopsByStop: getStopsByStop(state.bus)
});

export default reduxConnect(mapStateToProps)(BusRoute);
