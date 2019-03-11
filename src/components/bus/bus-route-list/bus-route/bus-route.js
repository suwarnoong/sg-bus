import React, { PureComponent } from 'react';
import { Label, Small, View } from '../../../base';
import { BusStopRoadInfo } from '../../../bus/bus-stop-road-info';
import styles from './bus-route.styles.js';

import pick from 'lodash/fp/pick';

type Props = {
  busStopCode: string,
  distance: number,
  stopsByStop: Array<mixed>,
  isFirst: boolean,
  isLast: boolean
};

export default class BusRoute extends PureComponent<Props> {
  render() {
    const {
      busStopCode,
      distance,
      isFirst,
      isLast,
      stopsByStop,
      style
    } = this.props;

    const { description, roadName } = stopsByStop[busStopCode];

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const routeConnectorStyles = [styles.routeConnector];
    if (isFirst) routeConnectorStyles.push(styles.firstRouteConnector);
    if (isLast) routeConnectorStyles.push(styles.lastRouteConnector);

    return (
      <View style={containerStyles}>
        <BusStopRoadInfo
          style={styles.roadContainer}
          {...pick(['description', 'roadName'], stopsByStop[busStopCode])}
        />
        <View style={styles.distanceContainer}>
          <View>
            <View style={styles.bullet} />
            <View style={routeConnectorStyles} />
          </View>
          <Small weight={Label.WEIGHT_MEDIUM}>{distance.toFixed(1)}</Small>
        </View>
      </View>
    );
  }
}
