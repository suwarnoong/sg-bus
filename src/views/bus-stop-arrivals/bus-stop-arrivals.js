import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { Label, TextInput } from '../../components';

export default class BusStopArrivals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busStopNumber: '11141'
    };

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.getArrivals(this.state.busStopNumber);
  }

  render() {
    return (
      <View>
        <Label size="large">Testing</Label>
        <TextInput
          value={this.state.busStopNumber}
          onChangeText={(busStopNumber) => {
            this.setState({ busStopNumber });
          }} />
        <Button onPress={this.handlePress} title="Dispatch" />
      </View>
    );
  }
}