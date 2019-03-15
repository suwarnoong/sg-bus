import { reduxConnect } from '../../../utils';
import { addToFavorites, removeFromFavorites } from '../../../store/actions';
import { getStopsByStop } from '../../../store/selectors';
import BusArrival from './bus-arrival';

const mapStateToProps = state => ({
  favorites: state.bus.favorites,
  stopsByStop: getStopsByStop(state.bus)
});

const mapDispatchToProps = dispatch => ({
  addToFavorites: ({ busStopCode, serviceNo }) =>
    dispatch(addToFavorites({ busStopCode, serviceNo })),
  removeFromFavorites: ({ busStopCode, serviceNo }) =>
    dispatch(removeFromFavorites({ busStopCode, serviceNo }))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(BusArrival);
