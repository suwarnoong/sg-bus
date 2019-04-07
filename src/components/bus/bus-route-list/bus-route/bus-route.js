import * as React from 'react';
import { Label, Small, TouchableOpacity, View } from '../../../base';
import { BusStopRoad } from '../../../bus/bus-stop-road';
import { IBusStopLocation } from '../../../../types.d';
import styles from './bus-route.styles';

import pick from 'lodash/fp/pick';

type Props = {
  busStopCode: string,
  distance: number,
  stopsByStop: Array<mixed>,
  isFirst: boolean,
  isLast: boolean,
  isActive: boolean,
  onPress: Function
};

export default class BusRoute extends React.PureComponent<Props> {
  handlePress = (busStopLocation: IBusStopLocation) => {
    const { onPress } = this.props;
    if (typeof onPress === 'function') {
      onPress(busStopLocation);
    }
  };

  render() {
    const {
      busStopCode,
      distance,
      isActive,
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
    if (isActive) bulletStyles.push(styles.currentBullet);

    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={() => this.handlePress({ busStopCode, longitude, latitude })}
        delayPressIn={100}
      >
        <BusStopRoad
          style={styles.roadContainer}
          {...pick(['description', 'roadName'], stopsByStop[busStopCode])}
        />
        <View style={styles.distanceContainer}>
          <View>
            <View style={bulletStyles} />
            <View style={routeConnectorStyles} />
          </View>
          <Small weight={Label.WEIGHT_MEDIUM}>{distance.toFixed(1)}</Small>
        </View>
      </TouchableOpacity>
    );
  }
}
