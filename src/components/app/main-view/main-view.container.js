import reduxConnect from '../../../utils/redux-connect';
import MainView from './main-view';

const mapStateToProps = state => ({
  inset: state.app.inset
});

export default reduxConnect(mapStateToProps)(MainView);
