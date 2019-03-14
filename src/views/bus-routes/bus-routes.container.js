import { reduxConnect } from '../../utils';
import { getRoutesByService } from '../../store/selectors';
import BusRoutes from './bus-routes';

const mapStateToProps = state => ({
  persisted: state.bus.persisted,
  routesByService: getRoutesByService(state.bus)
});

const mapDispatchToProps = dispatch => ({});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(BusRoutes);
