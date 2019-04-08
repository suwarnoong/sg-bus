import React, { PureComponent } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import NativeGeo from 'react-native-geolocation-service';
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
    distanceFilter: 10
  };

  constructor(props) {
    super(props);

    this.state = {
      watchId: null
    };
  }
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
    if (nextProps.enabled) {
      this.startWatch();
    } else {
      this.stopWatch();
    }
  }

  componentWillUnmount() {
    this.stopWatch();
  }

  startWatch = () => {
    const {
      enableHighAccuracy,
      timeout,
      maximumAge,
      distanceFilter
    } = this.props;

    const watchId = NativeGeo.watchPosition(
      ({ coords: { latitude, longitude } }) => {
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
        // maximumAge,
        distanceFilter
      }
    );

    this.setState({ watchId });
  };

  stopWatch = () => {
    NativeGeo.clearWatch(this.state.watchId);
  };

  render() {
    return null;
  }
}