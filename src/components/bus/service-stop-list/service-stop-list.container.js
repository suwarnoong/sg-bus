import { reduxConnect } from '../../../utils';
import ServiceStopList from './service-stop-list';
import { getFavoriteServiceStop } from '../../../store/selectors';

const mapStateToProps = state => ({
  favoriteServiceStop: getFavoriteServiceStop(
    state.bus,
    state.service.geolocation
  )
});

export default reduxConnect(mapStateToProps)(ServiceStopList);
