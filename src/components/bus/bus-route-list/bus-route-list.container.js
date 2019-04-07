import { reduxConnect } from '../../../utils';
import { getRoutesByService, getStopsByStop } from '../../../store/selectors';
import BusRouteList from './bus-route-list';

const mapStateToProps = state => ({
  geolocation: state.service.geolocation,
  persisted: state.bus.persisted,
  routesByService: getRoutesByService(state.bus),
  stopsByStop: getStopsByStop(state.bus)
});

export default reduxConnect(mapStateToProps)(BusRouteList);
