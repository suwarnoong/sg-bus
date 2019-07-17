import React, { PureComponent } from 'react';
import styles from './bus-service.styles';
import {
  H1,
  H2,
  H3,
  Label,
  Small,
  TouchableOpacity,
  View
} from '../../../base';
import { IBusService, IBusStop } from '../../../../types.d';

import pick from 'lodash/fp/pick';

type Props = {
  ...IBusService,
  servicesByServiceDirection: { [string]: IBusService },
  stopsByStop: { [string]: IBusStop },
  style: { [string]: mixed }
};

export default class BusStop extends PureComponent<Props> {
  key: string;
  service: IBusService;
  origin: IBusStop;
  destination: IBusStop;

  componentWillMount() {
    const {
      serviceNo,
      direction,
      servicesByServiceDirection,
      stopsByStop
    } = this.props;

    this.key = `${serviceNo}-${direction}`;
    this.service = servicesByServiceDirection[this.key];
    this.origin = stopsByStop[this.service.originCode];
    this.destination = stopsByStop[this.service.destinationCode];
  }

  handlePress = () => {
    this.props.navigate('BusRoute', {
      title: this.service.serviceNo,
      subTitle: this.origin.description,
      serviceNo: this.service.serviceNo,
      busStopCode: this.origin.busStopCode
    });
  };

  render() {
    const { style, onPress } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={this.handlePress}
        delayPressIn={100}
      >
        <View style={styles.routesContainer}>
          <H1 weight={Label.WEIGHT_DEMI_BOLD} style={styles.bus}>
            {this.service.serviceNo}
          </H1>
          <View style={styles.routeInfoContainer}>
            <Label style={styles.from}>{this.origin.roadName}</Label>
            <Label>to</Label>
            <Label style={styles.to}>{this.destination.roadName}</Label>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
