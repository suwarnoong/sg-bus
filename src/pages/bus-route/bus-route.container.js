import { reduxConnect } from '../../utils';
import BusRoute from './bus-route';
import { getStopsByStop, updateRouteStop } from '../../store/bus';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  updateRouteStop: (busStopCode, serviceNo) =>
    dispatch(updateRouteStop(busStopCode, serviceNo))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(BusRoute);
