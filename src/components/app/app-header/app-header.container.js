import { reduxConnect, getCurrentRoute } from '../../../utils';
import AppHeader from './app-header';

const mapStateToProps = state => {
  const currentRoute = getCurrentRoute(state.nav);
  currentRoute.params = currentRoute.params || {};

  return {
    title: currentRoute.params.title || state.reset.header.title,
    subTitle: currentRoute.params.subTitle || state.reset.header.subTitle,
    backgroundColor: state.reset.header.backgroundColor
  };
};

export default reduxConnect(mapStateToProps)(AppHeader);
