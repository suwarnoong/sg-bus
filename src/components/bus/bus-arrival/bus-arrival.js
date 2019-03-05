import React, { PureComponent } from 'react';
import { Button, Label, View } from '../../base';
import { StarOutlineIcon, StarFilledIcon } from '../../../icons';
import { ArrivalTimes } from '../arrival-times';
import { ArrivalTime } from '../../../types.d.js';
import styles from './bus-arrival.styles.js';

import find from 'lodash/fp/find';

type Props = {
  busStopCode: string,
  serviceNo: string,
  nextBus: ArrivalTime,
  nextBus2: ArrivalTime,
  nextBus3: ArrivalTime,
  savedList: Array<{ busStopCode: string, serviceNo: string }>,
  style: { [string]: mixed }
};

export default class BusArrival extends PureComponent<Props> {
  handleSaved = () => {
    const { onSaved, busStopCode, serviceNo } = this.props;
    if (typeof onSaved === 'function') {
      const isSaving = !this.isSaved();
      onSaved(isSaving, { busStopCode, serviceNo });
    }
  };

  isSaved = () => {
    const { busStopCode, serviceNo, savedList } = this.props;
    return !!find({ busStopCode, serviceNo })(savedList) ? true : false;
  };

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
