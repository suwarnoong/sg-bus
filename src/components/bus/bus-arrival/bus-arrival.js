import React, { PureComponent } from 'react';
import { Button, Label, TouchableOpacity, View } from '../../base';
import { StarOutlineIcon, StarFilledIcon } from '../../../icons';
import ArrivalTimes from './arrival-times';
import { IArrivalTime } from '../../../types.d.js';
import styles from './bus-arrival.styles.js';

import find from 'lodash/fp/find';

type Props = {
  busStopCode: string,
  serviceNo: string,
  nextBus: IArrivalTime,
  nextBus2: IArrivalTime,
  nextBus3: IArrivalTime,
  favorites: Array<mixed>,
  stopsByStop: Array<mixed>,
  addToFavorites: Function,
  removeFromFavorites: Function,
  style: { [string]: mixed }
};

export default class BusArrival extends PureComponent<Props> {
  isSaved = () => {
    const { busStopCode, serviceNo, favorites } = this.props;
    return !!find({ busStopCode, serviceNo }, favorites) ? true : false;
  };

  handleSaved = () => {
    const {
      busStopCode,
      serviceNo,
      addToFavorites,
      removeFromFavorites
    } = this.props;

    !this.isSaved()
      ? addToFavorites({ busStopCode, serviceNo })
      : removeFromFavorites({ busStopCode, serviceNo });
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
