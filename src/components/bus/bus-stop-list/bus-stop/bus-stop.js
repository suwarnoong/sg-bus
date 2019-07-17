import React, { PureComponent } from 'react';
import styles from './bus-stop.styles';
import {
  H1,
  H2,
  H3,
  Label,
  Small,
  TouchableOpacity,
  View
} from '../../../base';
import { BusStopRoad } from '../../bus-stop-road/index.js';
import { IBusStop } from '../../../../types.d';

import pick from 'lodash/fp/pick';

type Props = {
  ...IBusStop,
  routesByStop: Array<mixed>,
  onPress: Function,
  style: { [string]: mixed }
};

export default class BusStop extends PureComponent<Props> {
  handlePress = () => {
    const { onPress } = this.props;
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  render() {
    const {
      busStopCode,
      description,
      roadName,
      distance,
      routesByStop,
      style,
      onPress
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const services = routesByStop[busStopCode];

    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={this.handlePress}
        delayPressIn={100}
      >
        <BusStopRoad
          style={styles.busStopContainer}
          {...pick(
            ['description', 'busStopCode', 'roadName', 'distance'],
            this.props
          )}
        />
        <View style={styles.routesContainer}>
          {services &&
            services.map(({ serviceNo }, index) => {
              return (
                <Label
                  weight={Label.WEIGHT_BOLD}
                  style={styles.bus}
                  key={index}
                >
                  {serviceNo}
                </Label>
              );
            })}
        </View>
      </TouchableOpacity>
    );
  }
}
