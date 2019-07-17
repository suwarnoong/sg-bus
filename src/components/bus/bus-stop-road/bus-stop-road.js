import React, { PureComponent } from 'react';
import { Label, Small, View } from '../../base';
import styles from './bus-stop-road.styles';

type Props = {
  description: string,
  busStopCode: string,
  roadName: string,
  distance: number,
  layout: number
};

export default class BusStopRoad extends PureComponent<Props> {
  static defaultProps = {
    layout: 1
  };

  render() {
    const {
      description,
      busStopCode,
      roadName,
      distance,
      layout,
      style
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    if (layout === 1) {
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
            <Label style={[styles.roadName, styles.fill]} size={15}>
              {roadName}
            </Label>
            {distance && (
              <Small style={styles.distance}>{distance.toFixed(2)}km</Small>
            )}
          </View>
        </View>
      );
    } else {
      return (
        <View style={containerStyles}>
          <View style={styles.row}>
            <Label style={styles.fill} weight={Label.WEIGHT_MEDIUM}>
              {description}
            </Label>
          </View>
          <View style={styles.row}>
            <View style={[styles.fill, styles.row]}>
              <Label
                style={styles.busStopCode}
                size={15}
                weight={Label.WEIGHT_MEDIUM}
              >
                {busStopCode}
              </Label>
              <Label style={[styles.roadName, { marginLeft: 10 }]} size={15}>
                {roadName}
              </Label>
            </View>
          </View>
        </View>
      );
    }
  }
}
