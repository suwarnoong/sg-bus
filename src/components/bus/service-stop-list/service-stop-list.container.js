import { reduxConnect } from '../../../utils';
import ServiceStopList from './service-stop-list';

const mapStateToProps = state => ({
  arrivals: state.bus.arrivals
});

export default reduxConnect(mapStateToProps)(ServiceStopList);
