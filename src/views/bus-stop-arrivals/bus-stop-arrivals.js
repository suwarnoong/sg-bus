import React, { PureComponent } from 'react';
import {
  ArrivalTimes,
  BusStopRoadInfo,
  BusArrivalList,
  Card,
  H3,
  Label,
  ScreenView,
  Small
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
