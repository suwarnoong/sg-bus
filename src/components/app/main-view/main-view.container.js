import { reduxConnect } from '../../../utils';
import MainView from './main-view';

const mapStateToProps = state => ({
  inset: state.app.inset
});

export default reduxConnect(mapStateToProps)(MainView);
