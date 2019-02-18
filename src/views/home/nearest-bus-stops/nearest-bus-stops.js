import React, { PureComponent } from 'react';
import { View, Platform } from 'react-native';
import { BusStopList } from '../../../components';
import styles from './nearest-bus-stops.styles.js';

type Props = {};


export default class NearestBusStops extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      watchId: null,
      latitude: null,
      longitude: null,
      locationError: null,
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android')
      requestAndroidPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    // navigator.geolocation.requestAuthorization();
    // navigator.geolocation.getCurrentPosition(this.onLocationSuccess, this.onLocationError, { enableHighAccuracy: true });
    this.watchGeolocation();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchId);
  }

  watchGeolocation() {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude }}) => {
        this.setState({
          latitude,
          longitude,
        });

        this.props.getNearestStops({ latitude, longitude });
      },
      ({ message }) => {
        this.setState({ locationError: message });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
    );

    this.setState({ watchId });
  }

  render() {
    const { nearest, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <BusStopList list={nearest} style={{ margin: 0 }} />
      </View>
    );
  }
}