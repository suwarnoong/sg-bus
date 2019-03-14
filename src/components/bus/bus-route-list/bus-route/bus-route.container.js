import { reduxConnect } from '../../../../utils';
import { getStopsByStop } from '../../../../store/selectors';
import BusRoute from './bus-route';

const mapStateToProps = state => ({
  stopsByStop: getStopsByStop(state.bus)
});

export default reduxConnect(mapStateToProps)(BusRoute);
