import Home from './home';
import { reduxConnect } from '../../utils';
import { updateHeaderBackgroundColor } from '../../store/actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  updateHeaderBackgroundColor: backgroundColor =>
    dispatch(updateHeaderBackgroundColor(backgroundColor))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Home);
