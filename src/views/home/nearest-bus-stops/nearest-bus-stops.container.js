import { connect } from 'react-redux';
import { getNearestStops } from '../../../store/actions';
import NearestBusStops from './nearest-bus-stops';

const mapStateToProps = state => ({
  nearest: state.bus.nearest,
});

const mapDispatchToProps = dispatch => ({
  getNearestStops: position => dispatch(getNearestStops(position))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NearestBusStops)