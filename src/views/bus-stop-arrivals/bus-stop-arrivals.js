import React, { PureComponent } from 'react';
import {
  ArrivalTimes,
  BusStopRoadInfo,
  BusArrivalList,
  Card,
  H3,
  Label,
  ScreenView,
  Small,
  Button,
  ButtonIconLeft,
  ButtonIconRight,
  ToolbarItem,
  View
} from '../../components';
import styles from './bus-stop-arrivals.styles.js';
import {
  StarFilledIcon,
  StarOutlineIcon,
  ChevronDownIcon,
  ArrowRightIcon
} from '../../icons';

type Props = {
  params: { [string]: mixed },
  arrivals: { [string]: Array<mixed> },
  getArrivals: (busStopCode: string) => void,
  style: { [string]: mixed }
};

export default class BusStopArrivals extends PureComponent<Props> {
  componentWillMount() {
    this.props.getArrivals(this.props.params.busStopCode);
  }

  handleSaved = (isSaving, { busStopCode, serviceNo }) => {
    const { addToSaved, removeFromSaved } = this.props;
    isSaving
      ? addToSaved({ busStopCode, serviceNo })
      : removeFromSaved({ busStopCode, serviceNo });
  };

  render() {
    const {
      arrivals,
      saved,
      style,
      params: { busStopCode }
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const arrivalList = arrivals[this.props.params.busStopCode];

    return (
      <ScreenView style={containerStyles}>
        <BusArrivalList
          style={styles.fill}
          list={arrivalList}
          savedList={saved}
          busStopCode={busStopCode}
          onSaved={this.handleSaved}
        />
      </ScreenView>
    );
  }
}
