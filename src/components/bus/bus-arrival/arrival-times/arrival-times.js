import React, { PureComponent } from 'react';
import i18next from 'i18next';
import { parse, differenceInMinutes } from 'date-fns';
import { Label, View } from '../../../base';
import { IArrivalTime } from '../../../../types.d';
import styles from './arrival-times.styles';

const busLoadColorMapping = {
  LSD: '#EA2027', // Limited Standing
  SDA: '#F79F1F', // Standing Available
  SEA: '#009432' // Seat Available
};

type Props = {
  nextBus: IArrivalTime,
  nextBus2: IArrivalTime,
  nextBus3: IArrivalTime
};

const arrivalWidth = 35;

export default class ArrivalTimes extends PureComponent<Props> {
  getDisplayTime = time => {
    let displayTime = time;

    if (parse(displayTime)) {
      displayTime = differenceInMinutes(displayTime, Date.now());
    }

    if (isNaN(displayTime)) {
      displayTime = '';
    } else if (displayTime <= 0) {
      displayTime = i18next.t('arrivingShortForm');
    }

    return displayTime;
  };

  renderArrivalTime = (key, time, load) => {
    const borderColor = busLoadColorMapping[load];
    return (
      <View key={key} style={{ alignItems: 'center', width: arrivalWidth }}>
        <Label weight={Label.WEIGHT_DEMI_BOLD}>
          {this.getDisplayTime(time)}
        </Label>
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 15,
            borderWidth: 4,
            borderColor,
            backgroundColor: 'white'
          }}
        />
      </View>
    );
  };

  renderArrivals = _ => {
    const { nextBus, nextBus2, nextBus3 } = this.props;
    const arr = ['nextBus', 'nextBus2', 'nextBus3'];
    const arrivals = { nextBus, nextBus2, nextBus3 };
    let count = 0;

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        {arr.map(index => {
          const arrival = arrivals[index];
          if (arrival && arrival.estimatedArrival !== '') {
            count++;
            return this.renderArrivalTime(
              index,
              arrival.estimatedArrival,
              arrival.load
            );
          } else {
            return <View key={index} width={arrivalWidth} />;
          }
        })}
        <View
          style={{
            position: 'absolute',
            bottom: 6,
            left: arrivalWidth / 2,
            right:
              count === 3 ? arrivalWidth / 2 : count === 2 ? '50%' : '100%',
            height: 2,
            backgroundColor: '#979797',
            zIndex: -1
          }}
        />
      </View>
    );
  };

  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return <View style={containerStyles}>{this.renderArrivals()}</View>;
  }
}
