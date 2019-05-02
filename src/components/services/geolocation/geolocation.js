import React, { PureComponent } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import NativeGeo from 'react-native-geolocation-service';
import { AppState } from '../../services/app-state';
import { requestAndroidPermission } from '../../../utils';

type Props = {
  enabled: boolean,
  enableHighAccuracy: boolean,
  timeout: number,
  maximumAge: number,
  distanceFilter: number,
  updateGeolocation: Function,
  updateGeolocationError: Function
};

export default class Geolocation extends PureComponent<Props> {
  static defaultProps = {
    enabled: false,
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000,
    distanceFilter: 20
  };

  _watchId;
  _appStatePaused: boolean = false;

  componentDidMount() {
    if (Platform.OS === 'android') {
      requestAndroidPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }

    // NativeGeo.requestAuthorization();
    // navigator.geolocation.getCurrentPosition(
    //   this.onLocationSuccess,
    //   this.onLocationError,
    //   { enableHighAccuracy: true }
    // );

    if (this.props.enabled) {
      this.startWatch();
    }
  }

  componentWillReceiveProps(nextProps) {
    const enabledChanged = nextProps.enabled !== this.props.enabled;
    if (enabledChanged) {
      nextProps.enabled ? this.startWatch() : this.stopWatch();
    }
  }

  componentWillUnmount() {
    this.stopWatch();
  }

  startWatch = () => {
    console.log('geolc start');
    const {
      enableHighAccuracy,
      timeout,
      maximumAge,
      distanceFilter
    } = this.props;

    this.stopWatch();

    this._watchId = NativeGeo.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log('geolc tick', this._watchId, latitude, longitude);
        this.props.updateGeolocation({
          latitude,
          longitude
        });
      },
      ({ message }) => {
        this.props.updateGeolocationError({ error: message });
      },
      {
        enableHighAccuracy,
        timeout,
        maximumAge,
        distanceFilter
      }
    );
  };

  stopWatch = () => {
    if (this.isRunning()) {
      console.log('geolc stop', this._watchId);
      NativeGeo.clearWatch(this._watchId);
      this._watchId = null;
    }
  };

  handleAppStateChange = (state: ?string) => {
    const isActive = state === 'active';
    if (!isActive) {
      if (this.isRunning()) {
        this._appStatePaused = true;
        this.stopWatch();
      }
    } else {
      if (this._appStatePaused) {
        this.startWatch();
      }
    }
  };

  isRunning = () => {
    return !isNaN(this._watchId) && Number(this._watchId) >= 0;
  };

  render() {
    return <AppState onChange={this.handleAppStateChange} />;
  }
}
