import { reduxConnect } from '../../utils';
import BusRoute from './bus-route';

const mapStateToProps = state => ({
  geolocation: state.service.geolocation
});

export default reduxConnect(mapStateToProps)(BusRoute);
