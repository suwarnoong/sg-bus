import { connect } from 'react-redux';
import { navigate, back, setParams } from '../store/navigation';
import getCurrentRoute from './get-current-route';

export default (mapStateToProps, mapDispatchToProps) => {
  const stateToProps = (state, props) => {
    const newState = {
      params: state.nav ? getCurrentRoute(state.nav).params : null
    };

    return mapStateToProps
      ? {
          ...mapStateToProps(state, props),
          ...newState
        }
      : newState;
  };

  const dispatchToProps = dispatch => {
    const newDispatcher = {
      back: _ => dispatch(back()),
      navigate: (routeName, params) => dispatch(navigate(routeName, params)),
      setParams: params => dispatch(setParams(params))
    };

    return mapDispatchToProps
      ? {
          ...mapDispatchToProps(dispatch),
          ...newDispatcher
        }
      : newDispatcher;
  };

  return connect(
    stateToProps,
    dispatchToProps
  );
};
