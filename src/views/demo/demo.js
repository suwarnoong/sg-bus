import React, { Component } from 'react';
import { Button, Platform } from 'react-native';
import {
  BusArrivalOld,
  BusStop,
  BusStopList,
  H1,
  Label,
  SelectSwitch,
  TextInput,
  View
} from '../../components';
import styles from './demo.styles';
import requestAndroidPermission from '../../utils/request-android-permission';

const intervalMs = 10000;

export default class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busStopNumber: '11149',
      timerId: null,
      watchId: null,
      latitude: null,
      longitude: null,
      locationError: null
    };
  }

  componentWillMount() {
    if (!this.props.services || this.props.services.length == 0)
      this.props.getServices();

    if (!this.props.routes || this.props.routes.length == 0)
      this.props.getRoutes();

    if (!this.props.stops || this.props.stops.length == 0)
      this.props.getStops();
  }

  componentDidMount() {
    if (Platform.OS === 'android')
      requestAndroidPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

    // navigator.geolocation.requestAuthorization();
    // navigator.geolocation.getCurrentPosition(this.onLocationSuccess, this.onLocationError, { enableHighAccuracy: true });
    this.watchGeolocation();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchId);
  }

  watchGeolocation = () => {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          latitude,
          longitude
        });

        this.props.getNearestStops({ latitude, longitude });
      },
      ({ message }) => {
        this.setState({ locationError: message });
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );

    this.setState({ watchId });
  };

  handlePressArrivals = () => {
    this.props.getArrivals(this.state.busStopNumber);
    this.resetTick();
  };

  tick = () => {
    this.props.getArrivals(this.state.busStopNumber);
  };

  resetTick = () => {
    clearInterval(this.state.timerId);
    const timerId = setInterval(this.tick, intervalMs);
    this.setState({ timerId });
  };

  render() {
    const { arrivals, services, nearest } = this.props;
    const { busStopNumber, latitude, longitude } = this.state;

    console.log('lat', latitude, 'lng', longitude);

    return (
      <View style={styles.container}>
        <H1 style={{ width: '100%', textAlign: 'center', marginBottom: 10 }}>
          Testing
        </H1>
        <TextInput
          value={busStopNumber}
          onChangeText={busStopNumber => {
            this.setState({ busStopNumber });
          }}
        />
        <Button onPress={this.handlePressArrivals} title="Get Arrivals" />

        {arrivals &&
          arrivals[busStopNumber] &&
          arrivals[busStopNumber].map(item => {
            return (
              <BusArrivalOld
                key={item.ServiceNo}
                serviceNo={item.ServiceNo}
                destinationCode={item.NextBus.DestinationCode}
                estimatedArrival1={item.NextBus.EstimatedArrival}
                estimatedArrival2={item.NextBus2.EstimatedArrival}
                estimatedArrival3={item.NextBus3.EstimatedArrival}
                load1={item.NextBus.Load}
                load2={item.NextBus2.Load}
                load3={item.NextBus3.Load}
              />
            );
          })}

        <View style={{ alignItems: 'flex-start', paddingHorizontal: 10 }}>
          <View style={{ width: 200 }}>
            <SelectSwitch
              initial={0}
              onPress={value => this.setState({ gender: value })}
              options={[
                { label: 'SAVED', value: 'S' },
                { label: 'NEAREST', value: 'N' }
              ]}
            />
          </View>
        </View>
        <BusStopList list={nearest} />
      </View>
    );
  }
}