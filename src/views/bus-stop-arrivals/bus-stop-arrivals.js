import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { BusArrival, H1, Label, TextInput } from '../../components';
import styles from './bus-stop-arrivals.styles';

const intervalMs = 10000;

export default class BusStopArrivals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busStopNumber: '11149',
      timerId: null,
    };

    this.handlePress = this.handlePress.bind(this);
    this.tick = this.tick.bind(this);
    this.resetTick = this.resetTick.bind(this);
  }

  handlePress() {
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
    const { arrivals } = this.props;

    return (
      <View style={styles.container}>
        <H1 style={{width: '100%', textAlign: 'center', marginBottom: 10}}>Testing</H1>
        <TextInput
          value={this.state.busStopNumber}
          onChangeText={(busStopNumber) => {
            this.setState({ busStopNumber });
          }} />
        <Button onPress={this.handlePress} title="Dispatch" />

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
      </View>
    );
  }
}