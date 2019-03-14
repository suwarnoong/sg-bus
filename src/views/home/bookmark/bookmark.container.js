import Bookmark from './bookmark';
import { reduxConnect } from '../../../utils';
import { getArrivals } from '../../../store/actions';
import { getBookmarks, getBookmarksStops } from '../../../store/selectors';

const mapStateToProps = state => ({
  bookmarks: getBookmarks(state.bus)
});

const mapDispatchToProps = dispatch => ({
  getArrivals: busStopCode => dispatch(getArrivals(busStopCode))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Bookmark);
