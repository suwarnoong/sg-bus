import { reduxConnect } from '../../../../utils';
import { getRoutesByStop } from '../../../../store/selectors';
import BusStop from './bus-stop';

const mapStateToProps = state => ({
  routesByStop: getRoutesByStop(state.bus)
});

export default reduxConnect(mapStateToProps)(BusStop);
