// @flow
import * as React from 'react';
import LottieView from 'lottie-react-native';
import styles from './star-animate.styles';

type Props = {
  speed: number,
  loop: boolean,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class StarAnimate extends React.PureComponent<Props> {
  static defaultProps = {
    speed: 0.5,
    loop: true
  };

  source = require('../../../../assets/star.json');

  animation = React.createRef();

  componentDidMount() {
    if (this.animation.current) {
      this.animation.current.play();
    }
  }

  render() {
    const { style, speed, loop } = this.props;

    if (!this.source) return;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <LottieView
        ref={this.animation}
        source={this.source}
        loop={loop}
        speed={speed}
        style={containerStyles}
      />
    );
  }
}
