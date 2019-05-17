import { reduxConnect } from '../../../utils';
import {
  addToFavorites,
  removeFromFavorites,
  getStopsByStop,
  getArrival
} from '../../../store/bus';
import BusArrival from './bus-arrival';

const mapStateToProps = (state, props) => ({
  favorites: state.bus.favorites,
  stopsByStop: getStopsByStop(state.bus),
  arrival: getArrival(state.bus, props.busStopCode, props.serviceNo)
});

const mapDispatchToProps = dispatch => ({
  addToFavorites: ({ name, busStopCode, serviceNo }) =>
    dispatch(addToFavorites({ name, busStopCode, serviceNo })),
  removeFromFavorites: ({ name, busStopCode, serviceNo }) =>
    dispatch(removeFromFavorites({ name, busStopCode, serviceNo }))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(BusArrival);
