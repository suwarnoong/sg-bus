// @flow
import React, { PureComponent } from 'react';
import styles from './bus-route.styles';
import { BusRouteList, ScreenView } from '../../components';
import BusRouteMap from './bus-route-map';
import { SCREEN_HEIGHT } from '../../constants';
import { IBusStop, IBusStopLocation, ICoordinate } from '../../types.d';

type Props = {
  updateRouteStop: Function,
  params: { [string]: string },
  style: { [string]: mixed }
};

type State = {
  mapBottomInset: number
};

export default class BusRoute extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      mapBottomInset: SCREEN_HEIGHT / 2
    };
  }

  componentWillMount() {
    const {
      params: { busStopCode },
      updateRouteStop
    } = this.props;

    updateRouteStop(busStopCode);
  }

  calculateHeight = (event: any) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ mapBottomInset: height });
  };

  render() {
    const {
      params: { serviceNo },
      style
    } = this.props;

    const { mapBottomInset } = this.state;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles}>
        <BusRouteMap
          style={styles.mapView}
          serviceNo={serviceNo}
          contentInset={[0, 0, mapBottomInset, 0]}
        />
        <BusRouteList
          style={styles.routeList}
          serviceNo={serviceNo}
          onLayout={this.calculateHeight}
        />
      </ScreenView>
    );
  }
}
