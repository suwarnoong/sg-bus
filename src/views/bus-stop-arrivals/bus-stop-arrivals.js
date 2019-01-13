import React, { Component } from 'react';
import { Button, Platform, PermissionAndroid, View, Text } from 'react-native';
import { BusArrival, BusStop, NearestBusStops, H1, Label, TextInput } from '../../components';
import styles from './bus-stop-arrivals.styles';
import requestAndroidPermission from '../../utils/request-android-permission';

const intervalMs = 10000;

export default class BusStopArrivals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busStopNumber: '11149',
      timerId: null,
      watchId: null,
      latitude: null,
      longitude: null,
      locationError: null,
    };

    this.handlePressArrivals = this.handlePressArrivals.bind(this);
    this.watchGeolocation = this.watchGeolocation.bind(this);
    this.tick = this.tick.bind(this);
    this.resetTick = this.resetTick.bind(this);
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

  handlePressArrivals() {
    this.props.getArrivals(this.state.busStopNumber);
    this.resetTick();
  }

  tick() {
    this.props.getArrivals(this.state.busStopNumber);
  }

  resetTick() {
    clearInterval(this.state.timerId);
    const timerId = setInterval(this.tick, intervalMs);
    this.setState({ timerId });
  }

  render() {
    const { arrivals, services, nearest } = this.props;

    console.log('lat', this.state.latitude, 'lng', this.state.longitude);

    return (
      <View style={styles.container}>
        <H1 style={{width: '100%', textAlign: 'center', marginBottom: 10}}>Testing</H1>
        <TextInput
          value={this.state.busStopNumber}
          onChangeText={(busStopNumber) => {
            this.setState({ busStopNumber });
          }} />
        <Button onPress={this.handlePressArrivals} title="Get Arrivals" />

        {
          arrivals && arrivals.map(item => {
            return (
              <BusArrival 
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
          })
        }

        <NearestBusStops stops={nearest} />
      </View>
    );
  }
}