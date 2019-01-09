import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class BusStopArrivals extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.getArrivals('11141');
  }

  render() {
    console.log(`arrivals ${this.props.arrivals}`);
    return (
      <View>
        <Text>Testing</Text>
        <Button onPress={this.handlePress} title="Dispatch" />
      </View>
    );
  }
}