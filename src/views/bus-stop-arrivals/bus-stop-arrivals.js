import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import {
  Card,
  ScreenView,
  Label,
  H3,
  Small,
  ArrivalTimes,
  BusStopRoadInfo,
  BusArrivalList
} from '../../components';
import styles from './bus-stop-arrivals.styles.js';

type Props = {};

export default class BusStopArrivals extends PureComponent<Props> {
  componentDidMount() {
    this.props.getArrivals(this.props.params.busStopCode);
  }

  render() {
    const { arrivals, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const arrivalList = arrivals[this.props.params.busStopCode];

    return (
      <ScreenView style={containerStyles}>
        <BusArrivalList list={arrivalList} />
      </ScreenView>
    );
  }
}
