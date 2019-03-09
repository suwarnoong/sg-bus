import { reduxConnect } from '../../../../utils';
import { addToSaved, removeFromSaved } from '../../../../store/actions';
import BusArrival from './bus-arrival';

const mapStateToProps = state => ({
  saved: state.bus.saved
});

const mapDispatchToProps = dispatch => ({
  addToSaved: ({ busStopCode, serviceNo }) =>
    dispatch(addToSaved({ busStopCode, serviceNo })),
  removeFromSaved: ({ busStopCode, serviceNo }) =>
    dispatch(removeFromSaved({ busStopCode, serviceNo }))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(BusArrival);
