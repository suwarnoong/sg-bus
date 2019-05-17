import { reduxConnect } from '../../../../utils';
import { getRoutesByStop } from '../../../../store/bus';
import BusStop from './bus-stop';

const mapStateToProps = state => ({
  routesByStop: getRoutesByStop(state.bus)
});

export default reduxConnect(mapStateToProps)(BusStop);
