import {
  updateGeolocation,
  updateGeolocationError
} from '../../../store/actions';
import { reduxConnect } from '../../../utils';
import Geolocation from './geolocation';

const mapStateToProps = state => ({
  geolocation: state.service.geolocation
});

const mapDispatchToProps = dispatch => ({
  updateGeolocation: position => dispatch(updateGeolocation(position)),
  updateGeolocationError: position => dispatch(updateGeolocationError(position))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Geolocation);
