import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { ScreenView } from '../../components';
import styles from './bus-stop-arrivals.styles.js';

type Props = {};

export default class BusStopArrivals extends PureComponent<Props> {
  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles}>
        <Text>BusStopArrivals rendered</Text>
      </ScreenView>
    );
  }
}
