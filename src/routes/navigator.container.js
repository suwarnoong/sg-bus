import { createReduxContainer } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import RootNavigator from './root.navigator';

const NavigatorContainer = createReduxContainer(RootNavigator, 'RootNavigator');

const mapStateToProps = state => ({
  state: state.nav
});

export default connect(mapStateToProps)(NavigatorContainer);
