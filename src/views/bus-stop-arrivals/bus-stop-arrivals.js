// @flow
import * as React from 'react';
import { BusArrivalList, ScreenView } from '../../components';
import { SCREEN_HEIGHT } from '../../constants';
import BusStopMap from './bus-stop-map';

import styles from './bus-stop-arrivals.styles';

type Props = {
  params: { [string]: string },
  style: { [string]: mixed }
};

type State = {
  mapBottomInset: number
};

export default class BusStopArrivals extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      mapBottomInset: SCREEN_HEIGHT / 2
    };
  }

  // componentDidMount() {
  //   this.props.updateInset('bottom', false);
  // }

  calculateHeight = (event: any) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ mapBottomInset: height });
  };

  render() {
    const {
      style,
      params: { busStopCode }
    } = this.props;

    const { mapBottomInset } = this.state;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles}>
        <BusStopMap
          style={styles.mapView}
          busStopCode={busStopCode}
          contentInset={[0, 0, mapBottomInset, 0]}
        />
        <BusArrivalList
          style={styles.arrivalList}
          busStopCode={busStopCode}
          onLayout={this.calculateHeight}
        />
      </ScreenView>
    );
  }
}
