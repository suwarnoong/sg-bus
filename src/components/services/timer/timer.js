import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

type Props = {
  autoStart: boolean,
  interval: number,
  onTick: Function
};

export default class Timer extends PureComponent<Props> {
  static defaultProps = {
    autoStart: false,
    interval: 1000 // miliseconds
  };

  constructor(props) {
    super(props);

    this.state = {
      timerId: null
    };
  }

  componentDidMount() {
    if (this.props.autoStart) {
      this.start();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  tick = () => {
    const { onTick } = this.props;
    if (typeof onTick === 'function') {
      console.log('tick');
      onTick();
    }
  };

  start = () => {
    console.log('start');
    if (!isNaN(this.state.timerId) && this.state.timerId >= 0) {
      clearInterval(this.state.timerId);
    }
    const timerId = setInterval(this.tick, this.props.interval);
    this.setState({ timerId });
  };

  stop = () => {
    console.log('stop');
    if (!isNaN(this.state.timerId) && this.state.timerId >= 0) {
      clearInterval(this.state.timerId);
      this.setState({ timerId: null });
    }
  };

  render() {
    return null;
  }
}
