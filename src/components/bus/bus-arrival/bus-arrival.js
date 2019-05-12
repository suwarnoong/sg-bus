import React, { PureComponent } from 'react';
import { Button, Label, TouchableOpacity, View } from '../../base';
import { StarOutlineIcon, StarFilledIcon } from '../../../icons';
import { isArrivalEmpty } from '../../../utils';
import ArrivalTimes from './arrival-times';
import { IArrivalTime, IBusArrival } from '../../../types.d.js';
import styles from './bus-arrival.styles';

import find from 'lodash/fp/find';

type Props = {
  busStopCode: string,
  serviceNo: string,
  arrival: IBusArrival,
  favorites: Array<mixed>,
  stopsByStop: Array<mixed>,
  hideFavorite: boolean,
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
      stopsByStop,
      serviceNo,
      addToFavorites,
      removeFromFavorites
    } = this.props;

    const { description: name } = stopsByStop[busStopCode];

    !this.isSaved()
      ? addToFavorites({ name, busStopCode, serviceNo })
      : removeFromFavorites({ name, busStopCode, serviceNo });
  };

  handlePress = () => {
    const { busStopCode, serviceNo, stopsByStop, navigate } = this.props;

    const busStop = stopsByStop[busStopCode];
    navigate('BusRoute', {
      title: serviceNo,
      subTitle: `${busStop.description}`,
      serviceNo,
      busStopCode
    });
  };

  render() {
    const { serviceNo, arrival, hideFavorite, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <View style={styles.row}>
          <View style={[styles.row, styles.fill]}>
            <TouchableOpacity onPress={this.handlePress} delayPressIn={100}>
              <Label
                size={30}
                weight={Label.WEIGHT_DEMI_BOLD}
                style={styles.serviceNo}
              >
                {serviceNo}
              </Label>
            </TouchableOpacity>
            {!hideFavorite && (
              <Button
                Icon={this.isSaved() ? StarFilledIcon : StarOutlineIcon}
                iconSize={20}
                type={Button.TYPE_CLEAR}
                onPress={this.handleSaved}
              />
            )}
          </View>

          {!arrival || isArrivalEmpty(arrival.nextBus) ? (
            <Label weight={Label.WEIGHT_DEMI_BOLD} style={styles.noArrivals}>
              Not Operating
            </Label>
          ) : (
            <ArrivalTimes
              nextBus={arrival.nextBus}
              nextBus2={arrival.nextBus2}
              nextBus3={arrival.nextBus3}
            />
          )}
        </View>
      </View>
    );
  }
}
