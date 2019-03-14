import { reduxConnect } from '../../../utils';
import BookmarkList from './bookmark-list';

const mapStateToProps = state => ({
  arrivals: state.bus.arrivals
});

export default reduxConnect(mapStateToProps)(BookmarkList);
