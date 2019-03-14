import React, { PureComponent } from 'react';
import { Label, Small, TouchableOpacity, View } from '../../../base';
import { BusStopRoad } from '../../../bus/bus-stop-road';
import styles from './bus-route.styles.js';

import pick from 'lodash/fp/pick';

type Props = {
  busStopCode: string,
  distance: number,
  stopsByStop: Array<mixed>,
  isFirst: boolean,
  isLast: boolean,
  isCurrentLocation: boolean,
  onLocationPress: Function
};

export default class BusRoute extends PureComponent<Props> {
  handleBulletPress = ({ busStopCode, longitude, latitude }) => {
    const { onLocationPress } = this.props;
    if (typeof onLocationPress === 'function') {
      onLocationPress({ busStopCode, longitude, latitude });
    }
  };

  render() {
    const {
      busStopCode,
      distance,
      isCurrentLocation,
      isFirst,
      isLast,
      stopsByStop,
      style
    } = this.props;

    const { description, roadName, longitude, latitude } = stopsByStop[
      busStopCode
    ];

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const routeConnectorStyles = [styles.routeConnector];
    if (isFirst) routeConnectorStyles.push(styles.firstRouteConnector);
    if (isLast) routeConnectorStyles.push(styles.lastRouteConnector);

    const bulletStyles = [styles.bullet];
    if (isCurrentLocation) bulletStyles.push(styles.currentBullet);

    return (
      <View style={containerStyles}>
        <BusStopRoad
          style={styles.roadContainer}
          {...pick(['description', 'roadName'], stopsByStop[busStopCode])}
        />
        <View style={styles.distanceContainer}>
          <View>
            <TouchableOpacity
              style={bulletStyles}
              onPress={() =>
                this.handleBulletPress({ busStopCode, longitude, latitude })
              }
            />
            <View style={routeConnectorStyles} />
          </View>
          <Small weight={Label.WEIGHT_MEDIUM}>{distance.toFixed(1)}</Small>
        </View>
      </View>
    );
  }
}
