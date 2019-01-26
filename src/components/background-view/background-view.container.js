import { connect } from 'react-redux';
import BackgroundView from './background-view';

const mapStateToProps = state => ({
  backgroundColor: state.app.backgroundColor,
});

export default connect(
  mapStateToProps,
)(BackgroundView)