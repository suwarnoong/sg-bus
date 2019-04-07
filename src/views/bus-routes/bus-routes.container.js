import { reduxConnect } from '../../utils';
import BusRoutes from './bus-routes';

const mapStateToProps = state => ({
  geolocation: state.service.geolocation
});

export default reduxConnect(mapStateToProps)(BusRoutes);
