import { reduxConnect } from '../../../utils';
import { back } from '../../../store/actions';
import ScreenView from './screen-view';

const mapStateToProps = state => ({
  backgroundColor: state.app.backgroundColor
});

const mapDispatchToProps = dispatch => ({
  back: _ => dispatch(back())
});

export default reduxConnect(mapStateToProps)(ScreenView);
