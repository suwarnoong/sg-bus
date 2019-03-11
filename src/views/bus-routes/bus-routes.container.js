import { reduxConnect } from '../../utils';
import BusRoutes from './bus-routes';

const mapStateToProps = state => ({
  persisted: state.bus.persisted,
  routesByService: state.bus.routesByService
});

const mapDispatchToProps = dispatch => ({});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(BusRoutes);
