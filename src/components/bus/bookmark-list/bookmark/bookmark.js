import React, { PureComponent } from 'react';
import styles from './bookmark.styles.js';
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
  busStopCode: string,
  description: string,
  roadName: string,
  distance: number,
  arrivals: Array<IBusArrival>,
  onPress: Function,
  style: { [string]: mixed }
};

export default class Bookmark extends PureComponent<Props> {
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
      arrivals,
      style,
      onPress
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <TouchableOpacity style={containerStyles} onPress={this.handlePress}>
        <BusArrival {...arrivals} />
        <BusStopRoad
          style={styles.busStopContainer}
          {...pick(
            ['description', 'busStopCode', 'roadName', 'distance'],
            this.props
          )}
        />
      </TouchableOpacity>
    );
  }
}
