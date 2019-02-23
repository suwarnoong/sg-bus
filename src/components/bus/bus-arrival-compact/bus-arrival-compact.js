import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Small } from '../../base/label';
import styles from './bus-arrival-compact.styles.js';

type Props = {
  serviceNo: string,
  destinationCode: string,
  estimatedArrival1: string,
  load1: string
};

export default class BusArrivalCompact extends PureComponent<Props> {
  render() {
    const {
      serviceNo,
      destinationCode,
      estimatedArrival1,
      load1,
      style
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <Small style={styles.serviceNo}>{serviceNo}</Small>
        <Small style={styles.estimatedArrival}>{estimatedArrival1}</Small>
      </View>
    );
  }
}
