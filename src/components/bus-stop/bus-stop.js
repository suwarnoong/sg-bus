import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './bus-stop.styles.js';
import { H1, H2, H3, Label } from '../base/label/index.js';

type Props = {
  busStopCode: string,
  description: string,
  roadName: string,
  distanceKm: number,
};

export default class BusStop extends PureComponent<Props> {
  render() {
    const { busStopCode, description, roadName, distanceKm, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <View style={styles.leftContainer}>
          <H2>{description}</H2>
          <View style={styles.infoContainer}>
            <H3 style={styles.roadName}>{roadName}</H3>
            <Label style={styles.busStopCode}>{busStopCode}</Label>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Label style={styles.distance}>{distanceKm.toFixed(2)}km</Label>
        </View>
      </View>
    );
  }
}