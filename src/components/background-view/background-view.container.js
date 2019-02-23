import reduxConnect from '../../utils/redux-connect';
import BackgroundView from './background-view';

const mapStateToProps = state => ({
  backgroundColor: state.app.backgroundColor
});

export default reduxConnect(mapStateToProps)(BackgroundView);
