import { reduxConnect } from '../../utils';
import BusRoute from './bus-route';
import { updateRouteStop } from '../../store/actions';
import { getStopsByStop } from '../../store/selectors';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  updateRouteStop: (busStopCode, serviceNo) =>
    dispatch(updateRouteStop(busStopCode, serviceNo))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(BusRoute);
