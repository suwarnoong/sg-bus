// @flow
import * as React from 'react';
import { Animated, View } from '../native';

type Props = {
  start: boolean,
  effect: string,
  duration: number,
  delay: number,
  style?: { [string]: mixed },
  children?: React.Node
};

type State = {
  anim: any
};

export default class FadeView extends React.PureComponent<Props, State> {
  static defaultProps = {
    effect: 'fadein',
    duration: 500,
    delay: 1200
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      anim: new Animated.Value(props.effect === 'fadein' ? 0 : 1)
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const { effect, start, delay, duration } = this.props;
    if (nextProps.start === true && nextProps.start !== start) {
      Animated.timing(this.state.anim, {
        toValue: effect === 'fadein' ? 1 : 0,
        duration,
        delay,
        useNativeDriver: true
      }).start();
    }
  }

  render() {
    const { style, children } = this.props;

    const containerStyles = [{ opacity: this.state.anim }];
    if (style) containerStyles.push(style);

    return <Animated.View style={containerStyles}>{children}</Animated.View>;
  }
}
