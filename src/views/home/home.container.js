import Home from './home';
import reduxConnect from '../../utils/redux-connect';
import { updateInset } from '../../store/actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Home);
