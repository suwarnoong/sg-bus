import { reduxConnect } from '../../../utils';
import ScreenView from './screen-view';

const mapStateToProps = state => ({
  backgroundColor: state.app.backgroundColor
});

export default reduxConnect(mapStateToProps)(ScreenView);
