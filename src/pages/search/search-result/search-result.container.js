// @flow
import SearchResult from './search-result';
import { getStopsByStop } from '../../../store/bus';
import { reduxConnect } from '../../../utils';

const mapStateToProps = state => ({
  found: state.bus.found,
  stopsByStop: getStopsByStop(state.bus)
});

export default reduxConnect(mapStateToProps)(SearchResult);
