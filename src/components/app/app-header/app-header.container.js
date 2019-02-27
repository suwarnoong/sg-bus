import { reduxConnect } from '../../../utils';
import AppHeader from './app-header';

const mapStateToProps = state => ({
  title: state.app.title,
  subTitle: state.app.subTitle
});

export default reduxConnect(mapStateToProps)(AppHeader);
