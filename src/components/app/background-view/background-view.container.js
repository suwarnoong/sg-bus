import { reduxConnect } from '../../../utils';
import BackgroundView from './background-view';

const mapStateToProps = state => ({
  backgroundColor: state.reset.backgroundColor,
  headerBackgroundColor: state.reset.header.backgroundColor
});

export default reduxConnect(mapStateToProps)(BackgroundView);
