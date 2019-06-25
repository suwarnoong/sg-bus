import NearestFavorites from './nearest-favorites';
import { reduxConnect } from '../../../utils';
import {
  getArrivals,
  getNearestFavoriteStops,
  getNearestFavorites
} from '../../../store/bus';

const mapStateToProps = state => ({
  nearestFavoriteStops: getNearestFavoriteStops(
    state.bus,
    state.service.geolocation
  ),
  geolocation: state.service.geolocation,
  nearestFavorites: getNearestFavorites(state.bus, state.service.geolocation)
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopCode => dispatch(getArrivals(busStopCode))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  NearestFavorites
);
