import { connect } from 'react-redux';
import { navigate, back, setParams } from '../store/actions';

export default (mapStateToProps, mapDispatchToProps) => {
  const stateToProps = state => {
    const newState = {};
    return mapStateToProps
      ? {
          ...mapStateToProps(state),
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
