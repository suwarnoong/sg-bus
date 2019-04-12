// @flow
import React, { PureComponent } from 'react';
import styles from './bus-route.styles';
import { BusRouteList, ScreenView } from '../../components';
import BusRouteMap from './bus-route-map';
import { SCREEN_HEIGHT } from '../../constants';
import { IBusStop, IBusStopLocation, ICoordinate } from '../../types.d';

type Props = {
  stopsByStop: { [string]: Array<IBusStop> },
  geolocation: ICoordinate,
  params: { [string]: string },
  style: { [string]: mixed }
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

  componentWillMount() {
    const {
      params: { busStopCode },
      stopsByStop
    } = this.props;

    const stop: IBusStop = stopsByStop[busStopCode];
    const { latitude, longitude } = stop;
    this.setState({ coordinates: [longitude, latitude] });
  }

  calculateHeight = (event: any) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ mapBottomInset: height });
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
      params: { serviceNo, busStopCode },
      style,
      geolocation
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
          busStopCode={busStopCode}
          centerCoordinate={coordinates}
          contentInset={[0, 0, mapBottomInset, 0]}
        />
        <BusRouteList
          style={styles.routeList}
          serviceNo={serviceNo}
          busStopCode={busStopCode}
          geolocation={geolocation}
          onLocate={this.locateBusStop}
          onLayout={this.calculateHeight}
        />
      </ScreenView>
    );
  }
}
