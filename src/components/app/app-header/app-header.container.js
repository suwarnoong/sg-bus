import { reduxConnect, getCurrentRoute } from '../../../utils';
import AppHeader from './app-header';

const mapStateToProps = state => {
  const currentRoute = getCurrentRoute(state.nav);
  currentRoute.params = currentRoute.params || {};

  return {
    title: currentRoute.params.title || state.app.header.title,
    subTitle: currentRoute.params.subTitle || state.app.header.subTitle,
    backgroundColor: state.app.header.backgroundColor
  };
};

export default reduxConnect(mapStateToProps)(AppHeader);
