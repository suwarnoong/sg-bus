import { reduxConnect } from '../../../utils';
import { getRouteGeojson } from '../../../store/selectors';
import BusRouteMap from './bus-route-map';

const mapStateToProps = (state, props) => ({
  routeGeojson: getRouteGeojson(state.bus, props.serviceNo)
});

export default reduxConnect(mapStateToProps)(BusRouteMap);
