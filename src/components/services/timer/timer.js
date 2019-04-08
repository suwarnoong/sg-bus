// @flow
import React, { PureComponent } from 'react';
import { AppState } from '../../services';

type Props = {
  autoStart: boolean,
  interval: number,
  onTick: Function
};

export default class Timer extends PureComponent<Props> {
  static defaultProps = {
    autoStart: true,
    interval: 5000 // miliseconds
  };

  _timerId: ?IntervalID;
  _appStatePaused: boolean = false;

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
      console.log('tick', this._timerId);
      onTick();
    }
  };

  start = () => {
    this.stop();
    this._timerId = setInterval(this.tick, this.props.interval);
    console.log('start', this._timerId);
    this.tick();
  };

  stop = () => {
    if (this.isRunning()) {
      console.log('stop', this._timerId);
      clearInterval(this._timerId);
      this._timerId = null;
    }
  };

  handleAppStateChange = (state: ?string) => {
    const isActive = state === 'active';
    if (!isActive) {
      if (this.isRunning()) {
        this._appStatePaused = true;
        this.stop();
      }
    } else {
      if (this._appStatePaused) {
        this.start();
      }
    }
  };

  isRunning = () => {
    return !isNaN(this._timerId) && Number(this._timerId) >= 0;
  };

  render() {
    return <AppState onChange={this.handleAppStateChange} />;
  }
}
