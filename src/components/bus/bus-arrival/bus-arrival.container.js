import { reduxConnect } from '../../../utils';
import { addToSaved, removeFromSaved } from '../../../store/actions';
import { getStopsByStop } from '../../../store/selectors';
import BusArrival from './bus-arrival';

const mapStateToProps = state => ({
  saved: state.bus.saved,
  stopsByStop: getStopsByStop(state.bus)
});

const mapDispatchToProps = dispatch => ({
  addToSaved: ({ busStopCode, serviceNo }) =>
    dispatch(addToSaved({ busStopCode, serviceNo })),
  removeFromSaved: ({ busStopCode, serviceNo }) =>
    dispatch(removeFromSaved({ busStopCode, serviceNo }))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(BusArrival);
