import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Label, H1 } from '../../base/label';
import styles from './bus-arrival-old.styles';
import { ArrivalTime } from '../arrival-time';

type Props = {
  serviceNo: string,
  destinationCode: string,
  estimatedArrival1: string,
  estimatedArrival2: string,
  estimatedArrival3: string,
  load1: string,
  load2: string,
  load3: string
};

export default class BusArrival extends PureComponent<Props> {
  render() {
    const {
      serviceNo,
      destinationCode,
      estimatedArrival1,
      estimatedArrival2,
      estimatedArrival3,
      load1,
      load2,
      load3,
      style
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <View style={styles.titleContainer}>
          <H1>{serviceNo}</H1>
          <Label style={{ color: '#999' }}>{destinationCode}</Label>
        </View>
        <View style={styles.arrivalContainer}>
          <ArrivalTime estTime={estimatedArrival1} load={load1} />
          <ArrivalTime estTime={estimatedArrival2} load={load2} />
          <ArrivalTime estTime={estimatedArrival3} load={load3} />
        </View>
      </View>
    );
  }
}
