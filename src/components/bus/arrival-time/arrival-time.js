import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Label, Small } from '../../base/label';
import { parse, differenceInMinutes } from 'date-fns';
import styles from './arrival-time.styles.js';

type Props = {
  estTime: string
};

const loadMap = {
  SEA: 'Seat Available',
  SDA: 'Standing Available',
  LSD: 'Limited Standing'
};

export default class ArrivalTime extends PureComponent<Props> {
  getDisplayTime(time) {
    let displayTime = time;

    if (parse(displayTime)) {
      displayTime = differenceInMinutes(displayTime, Date.now());
    }

    if (isNaN(displayTime)) {
      displayTime = '';
    } else if (displayTime <= 0) {
      displayTime = 'Arr';
    }

    return displayTime;
  }

  getDisplayLoad(load) {
    return loadMap[load];
  }

  render() {
    const { estTime, load, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <Label>{this.getDisplayTime(estTime)}</Label>
        <Small color={{ color: '#f6bb38' }}>{this.getDisplayLoad(load)}</Small>
      </View>
    );
  }
}
