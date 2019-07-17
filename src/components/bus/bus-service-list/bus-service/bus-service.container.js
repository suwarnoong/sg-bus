import { reduxConnect } from '../../../../utils';
import {
  getServicesByServiceDirection,
  getStopsByStop
} from '../../../../store/bus';
import BusService from './bus-service';

const mapStateToProps = state => ({
  servicesByServiceDirection: getServicesByServiceDirection(state.bus),
  stopsByStop: getStopsByStop(state.bus)
});

export default reduxConnect(mapStateToProps)(BusService);
