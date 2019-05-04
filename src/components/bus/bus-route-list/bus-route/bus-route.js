import * as React from 'react';
import { Label, Image, Small, TouchableOpacity, View } from '../../../base';
import { BusStopRoad } from '../../../bus/bus-stop-road';
import { IBusStopLocation } from '../../../../types.d';
import styles from './bus-route.styles';

import pick from 'lodash/fp/pick';

const stopActiveImage = require('../../../../assets/stop-active.png');
const stopDisabledImage = require('../../../../assets/stop-disabled.png');
const stopImage = require('../../../../assets/stop.png');

type Props = {
  busStopCode: string,
  distance: number,
  stopsByStop: Array<mixed>,
  routeType: string,
  isFirst: boolean,
  isLast: boolean,
  isSelected: boolean,
  onPress: Function
};

export default class BusRoute extends React.PureComponent<Props> {
  handlePress = (busStopLocation: IBusStopLocation) => {
    const { onPress } = this.props;
    if (typeof onPress === 'function') {
      onPress(busStopLocation);
    }
  };

  isValidRoute = () => {
    const { routeType } = this.props;
    return ['mid', 'start', 'end'].includes(routeType);
  };

  renderBullet = () => {
    const { isSelected } = this.props;

    let image = stopDisabledImage;
    if (isSelected) {
      image = stopActiveImage;
    } else if (this.isValidRoute()) {
      image = stopImage;
    }
    return <Image source={image} style={styles.bullet} />;
  };

  renderConnector = () => {
    const { isFirst, isLast, routeType } = this.props;

    const topRouteConnectorStyles = [];
    const bottomRouteConnectorStyles = [];

    if (!isFirst) {
      topRouteConnectorStyles.push([
        styles.routeConnector,
        styles.routeConnectorTop,
        ['mid', 'end'].includes(routeType) && styles.routeConnectorActive
      ]);
    }

    if (!isLast) {
      bottomRouteConnectorStyles.push([
        styles.routeConnector,
        styles.routeConnectorBottom,
        ['mid', 'start'].includes(routeType) && styles.routeConnectorActive
      ]);
    }

    return (
      <View>
        <View style={topRouteConnectorStyles} />
        <View style={bottomRouteConnectorStyles} />
      </View>
    );
  };

  render() {
    const { busStopCode, distance, routeType, stopsByStop, style } = this.props;

    const { description, roadName, longitude, latitude } = stopsByStop[
      busStopCode
    ];

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const roadContainerStyles = [styles.roadContainer];
    if (!this.isValidRoute()) roadContainerStyles.push(styles.roadDisabled);

    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={() => this.handlePress({ busStopCode, longitude, latitude })}
        delayPressIn={100}
      >
        <BusStopRoad
          style={roadContainerStyles}
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
