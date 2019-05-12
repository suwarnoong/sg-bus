import NearestFavorites from './nearest-favorites';
import memoize from 'memoize-state';
import { reduxConnect } from '../../../utils';
import { getArrivals } from '../../../store/actions';
import {
  getFavoriteStops,
  getNearestFavorites
} from '../../../store/selectors';

const mapStateToProps = memoize(state => ({
  favoriteStops: getFavoriteStops(state.bus),
  nearestFavorites: getNearestFavorites(state.bus, state.service.geolocation)
}));

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopCode => dispatch(getArrivals(busStopCode))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(
  NearestFavorites
);
