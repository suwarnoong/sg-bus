// @flow
import React, { PureComponent } from 'react';
import { AppState } from '../../services';

type Props = {
  id: string,
  autoStart: boolean,
  interval: number,
  onTick: Function,
  enabled: boolean
};

export default class Timer extends PureComponent<Props> {
  static defaultProps = {
    autoStart: true,
    interval: 5000 // miliseconds
  };

  _timerId: ?TimeoutID;
  _appStatePaused: boolean = false;

  componentDidMount() {
    if (this.props.autoStart) {
      this.start();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { enabled } = this.props;
    const onEnabledChanged = nextProps.enabled !== enabled;
    if (onEnabledChanged) {
      nextProps.enabled ? this.start() : this.stop();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  tick = () => {
    const { onTick, interval } = this.props;
    if (typeof onTick === 'function') {
      onTick();
      this._timerId = setTimeout(() => {
        requestAnimationFrame(this.tick);
      }, interval);
      console.log('tick', this.props.id, this._timerId);
    }
  };

  start = () => {
    console.log('start', this.props.id);
    this.stop();
    this.tick();
  };

  stop = () => {
    if (this.isRunning()) {
      console.log('stop', this.props.id, this._timerId);
      clearTimeout(this._timerId);
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
