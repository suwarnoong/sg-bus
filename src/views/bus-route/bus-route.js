// @flow
import React, { PureComponent } from 'react';
import styles from './bus-route.styles';
import { BusRouteList, ScreenView } from '../../components';
import BusRouteMap from './bus-route-map';
import { SCREEN_HEIGHT } from '../../constants';
import { IBusStop, IBusStopLocation, ICoordinate } from '../../types.d';

type Props = {
  params: { [string]: string },
  style: { [string]: mixed },
  geolocation: ICoordinate
};

type State = {
  coordinates: Array<number>,
  mapBottomInset: number
};

export default class BusRoute extends PureComponent<Props, State> {
  _map;

  constructor(props: Props) {
    super(props);

    this.state = {
      coordinates: [0, 0],
      mapBottomInset: SCREEN_HEIGHT / 2
    };
  }

  calculateHeight = (event: any) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ mapBottomInset: height });
  };

  nearestStopFound = (stop: IBusStop) => {
    this.setState({ coordinates: [stop.longitude, stop.latitude] });
  };

  locateBusStop = async (busStopLocation: IBusStopLocation) => {
    const zoom = await this._map.getZoom();

    const centerCoordinate = [
      busStopLocation.longitude,
      busStopLocation.latitude
    ];

    this._map.setCamera({
      centerCoordinate,
      zoom,
      duration: 1000
    });
  };

  render() {
    const {
      geolocation,
      params: { serviceNo },
      style
    } = this.props;

    const { coordinates } = this.state;
    const { mapBottomInset } = this.state;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles}>
        <BusRouteMap
          style={styles.mapView}
          mapRef={c => (this._map = c)}
          serviceNo={serviceNo}
          centerCoordinate={coordinates}
          contentInset={[0, 0, mapBottomInset, 0]}
        />
        <BusRouteList
          style={styles.routeList}
          serviceNo={serviceNo}
          onLocate={this.locateBusStop}
          onLayout={this.calculateHeight}
          onNearestStopFound={this.nearestStopFound}
        />
      </ScreenView>
    );
  }
}
