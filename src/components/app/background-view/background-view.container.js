import { reduxConnect } from '../../../utils';
import BackgroundView from './background-view';

const mapStateToProps = state => ({
  backgroundColor: state.app.backgroundColor,
  headerBackgroundColor: state.app.header.backgroundColor
});

export default reduxConnect(mapStateToProps)(BackgroundView);
