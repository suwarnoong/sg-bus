import { reduxConnect } from '../../utils';
import BusRoutes from './bus-routes';

const mapStateToProps = state => ({
  routes: state.bus.routes
});

const mapDispatchToProps = dispatch => ({});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(BusRoutes);
