import React, { PureComponent } from 'react';
import styles from './service-stop.styles';
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
import BusArrival from '../../bus-arrival';
import { IBusArrival } from '../../../../types.d.js';

import pick from 'lodash/fp/pick';

type Props = {
  serviceNo: string,
  busStopCode: string,
  description: string,
  roadName: string,
  distance: number,
  onPress: Function,
  style: { [string]: mixed }
};

export default class ServiceStop extends PureComponent<Props> {
  handlePress = () => {
    const { onPress, busStopCode, description, roadName } = this.props;
    if (typeof onPress === 'function') {
      onPress({ busStopCode, roadName, description });
    }
  };

  render() {
    const {
      serviceNo,
      busStopCode,
      description,
      roadName,
      distance,
      style,
      onPress
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={this.handlePress}
        delayPressIn={100}
      >
        <BusArrival
          serviceNo={serviceNo}
          busStopCode={busStopCode}
          hideFavorite={true}
        />
      </TouchableOpacity>
    );
  }
}
