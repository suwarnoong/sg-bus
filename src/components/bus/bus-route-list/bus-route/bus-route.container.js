import { reduxConnect } from '../../../../utils';
import BusRoute from './bus-route';

const mapStateToProps = state => ({
  stopsByStop: state.bus.stopsByStop
});

export default reduxConnect(mapStateToProps)(BusRoute);
