import React, { PureComponent } from 'react';
import { Button, Label, TouchableOpacity, View } from '../../base';
import { StarOutlineIcon, StarFilledIcon } from '../../../icons';
import ArrivalTimes from './arrival-times';
import { ArrivalTime } from '../../../types.d.js';
import styles from './bus-arrival.styles.js';

import find from 'lodash/fp/find';

type Props = {
  busStopCode: string,
  serviceNo: string,
  nextBus: ArrivalTime,
  nextBus2: ArrivalTime,
  nextBus3: ArrivalTime,
  saved: Array<mixed>,
  stopsByStop: Array<mixed>,
  addToSaved: Function,
  removeFromSaved: Function,
  style: { [string]: mixed }
};

export default class BusArrival extends PureComponent<Props> {
  isSaved = () => {
    const { busStopCode, serviceNo, saved } = this.props;
    return !!find({ busStopCode, serviceNo }, saved) ? true : false;
  };

  handleSaved = () => {
    const { busStopCode, serviceNo, addToSaved, removeFromSaved } = this.props;

    !this.isSaved()
      ? addToSaved({ busStopCode, serviceNo })
      : removeFromSaved({ busStopCode, serviceNo });
  };

  handlePress = () => {
    const { busStopCode, serviceNo, stopsByStop } = this.props;
    const busStop = stopsByStop[busStopCode];
    this.props.navigate('BusRoutes', {
      title: serviceNo,
      subTitle: `${busStop.description}`,
      serviceNo,
      busStopCode
    });
  };

  render() {
    const { serviceNo, nextBus, nextBus2, nextBus3, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <View style={styles.row}>
          <View style={[styles.row, styles.fill]}>
            <TouchableOpacity onPress={this.handlePress}>
              <Label
                size={30}
                weight={Label.WEIGHT_DEMI_BOLD}
                style={styles.serviceNo}
              >
                {serviceNo}
              </Label>
            </TouchableOpacity>
            <Button
              Icon={this.isSaved() ? StarFilledIcon : StarOutlineIcon}
              iconSize={20}
              type={Button.TYPE_CLEAR}
              onPress={this.handleSaved}
            />
          </View>

          <ArrivalTimes
            nextBus={nextBus}
            nextBus2={nextBus2}
            nextBus3={nextBus3}
          />
        </View>
      </View>
    );
  }
}
