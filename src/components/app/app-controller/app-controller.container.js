import { reduxConnect } from '../../../utils';
import AppController from './app-controller';

const mapStateToProps = state => ({
  showSettings: state.reset.showSettings
});

export default reduxConnect(mapStateToProps)(AppController);
