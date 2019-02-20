import { connect } from 'react-redux';
import MainView from './main-view';

const mapStateToProps = state => ({
  inset: state.app.inset,
});

export default connect(
  mapStateToProps,
)(MainView)