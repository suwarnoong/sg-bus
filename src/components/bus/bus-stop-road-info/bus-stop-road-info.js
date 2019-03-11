import React, { PureComponent } from 'react';
import { Label, Small, View } from '../../../components/base';
import styles from './bus-stop-road-info.styles.js';

type Props = {
  description: string,
  busStopCode: string,
  roadName: string,
  distance: number
};

export default class BusStopRoadInfo extends PureComponent<Props> {
  render() {
    const { description, busStopCode, roadName, distance, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <View style={styles.row}>
          <Label style={styles.fill} weight={Label.WEIGHT_MEDIUM}>
            {description}
          </Label>
          {busStopCode && (
            <Label style={styles.busStopCode} weight={Label.WEIGHT_MEDIUM}>
              {busStopCode}
            </Label>
          )}
        </View>
        <View style={styles.row}>
          <Label style={(styles.roadName, styles.fill)} size={15}>
            {roadName}
          </Label>
          {distance && (
            <Small style={styles.distance}>{distance.toFixed(2)}km</Small>
          )}
        </View>
      </View>
    );
  }
}
