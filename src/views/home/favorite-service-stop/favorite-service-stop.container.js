import FavoriteServiceStop from './favorite-service-stop';
import { reduxConnect } from '../../../utils';
import { getArrivals } from '../../../store/actions';
import {
  getFavoriteServiceStop,
  getFavoriteStops
} from '../../../store/selectors';

const mapStateToProps = state => ({
  favoriteServiceStop: getFavoriteServiceStop(
    state.bus,
    state.service.geolocation
  ),
  favoriteStops: getFavoriteStops(state.bus)
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopCode => dispatch(getArrivals(busStopCode))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  FavoriteServiceStop
);