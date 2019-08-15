import { reduxConnect } from '../../../utils';
import { updateIsOnline } from '../../../store/app';
import OfflineNotice from './offline-notice';

const mapStateToProps = state => ({
  showOfflineNotice: state.app.showOfflineNotice,
  isOnline: state.app.isOnline,
});

const mapDispatchToProps = dispatch => ({
  updateIsOnline: isOnline => dispatch(updateIsOnline(isOnline)),
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(OfflineNotice);
