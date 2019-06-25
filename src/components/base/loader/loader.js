// @flow
import * as React from 'react';
import LottieView from 'lottie-react-native';
import { Label, View } from '../native';
import styles from './loader.styles';

type Props = {
  source: object,
  speed: number,
  loop: boolean,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class Loader extends React.PureComponent<Props> {
  static defaultProps = {
    speed: 1,
    loop: true
  };

  animation = React.createRef();

  componentDidMount() {
    if (this.animation.current) {
      this.animation.current.play();
    }
  }

  render() {
    const { style, source, speed, loop } = this.props;

    if (!source) return;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <LottieView
        ref={this.animation}
        source={source}
        loop={loop}
        speed={speed}
        style={containerStyles}
      />
    );
  }
}
