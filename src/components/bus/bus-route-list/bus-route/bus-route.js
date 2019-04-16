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
  routeType: string,
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

  renderBullet() {
    const { isActive, routeType } = this.props;

    const bulletStyles = [styles.bullet];
    if (['F', '1', '2'].includes(routeType))
      bulletStyles.push(styles.bulletRoute);
    if (isActive) bulletStyles.push(styles.bulletActive);

    return <View style={bulletStyles} />;
  }

  renderConnector() {
    const { isFirst, isLast, routeType } = this.props;

    const topRouteConnectorStyles = [];
    const bottomRouteConnectorStyles = [];

    if (!isFirst)
      topRouteConnectorStyles.push([
        styles.routeConnector,
        styles.routeConnectorTop,
        ['F', '2'].includes(routeType) && styles.routeConnectorActive
      ]);

    if (!isLast)
      bottomRouteConnectorStyles.push([
        styles.routeConnector,
        styles.routeConnectorBottom,
        ['F', '1'].includes(routeType) && styles.routeConnectorActive
      ]);

    return (
      <View>
        <View style={topRouteConnectorStyles} />
        <View style={bottomRouteConnectorStyles} />
      </View>
    );
  }

  render() {
    const { busStopCode, distance, stopsByStop, style } = this.props;

    const { description, roadName, longitude, latitude } = stopsByStop[
      busStopCode
    ];

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={() => this.handlePress({ busStopCode, longitude, latitude })}
        delayPressIn={100}
      >
        <BusStopRoad
          style={styles.roadContainer}
          {...pick(
            ['description', 'roadName', 'busStopCode'],
            stopsByStop[busStopCode]
          )}
          layout={2}
        />
        <View style={styles.distanceContainer}>
          <View>
            {this.renderConnector()}
            {this.renderBullet()}
          </View>
          <Small weight={Label.WEIGHT_MEDIUM}>{distance.toFixed(1)}</Small>
        </View>
      </TouchableOpacity>
    );
  }
}
