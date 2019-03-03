import React, { PureComponent } from 'react';
import { Button, Label, View } from '../../base';
import { StarOutlineIcon } from '../../../icons';
import { ArrivalTimes } from '../arrival-times';
import { ArrivalTime } from '../../../types.d.js';
import styles from './bus-arrival.styles.js';

type Props = {
  serviceNo: string,
  nextBus: ArrivalTime,
  nextBus2: ArrivalTime,
  nextBus3: ArrivalTime,
  style: { [string]: mixed }
};

export default class BusArrival extends PureComponent<Props> {
  render() {
    const { serviceNo, nextBus, nextBus2, nextBus3, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <View style={styles.row}>
          <View style={[styles.row, styles.fill]}>
            <Label
              size={30}
              weight={Label.WEIGHT_DEMI_BOLD}
              style={styles.serviceNo}
            >
              {serviceNo}
            </Label>
            <Button
              Icon={StarOutlineIcon}
              iconSize={20}
              type={Button.TYPE_CLEAR}
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
