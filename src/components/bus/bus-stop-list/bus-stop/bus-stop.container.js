import { reduxConnect } from '../../../../utils';
import BusStop from './bus-stop';

const mapStateToProps = state => ({
  routesByStop: state.bus.routesByStop
});

export default reduxConnect(mapStateToProps)(BusStop);
