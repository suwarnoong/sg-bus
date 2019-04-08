// @flow
import * as React from 'react';
import { AppState as NativeAppState } from 'react-native';

type Props = {
  onChange: Function
};
type State = {
  appState: ?string
};

export default class AppState extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      appState: NativeAppState.currentState
    };
  }

  componentDidMount() {
    NativeAppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    NativeAppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState: ?string) => {
    const { onChange } = this.props;
    const stateChanged = this.state.appState !== nextAppState;

    if (stateChanged) {
      if (typeof onChange === 'function') {
        onChange(nextAppState);
      }
      this.setState({ appState: nextAppState });
    }
  };

  render() {
    return null;
  }
}
