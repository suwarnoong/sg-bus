// @flow
import React, { PureComponent } from 'react';
import styles from './bus-routes.styles';
import { BusRouteList, MapView, ScreenView } from '../../components';
import { SCREEN_HEIGHT } from '../../constants';
import { IBusStopLocation, ICoordinate } from '../../types.d';

type Props = {
  params: { [string]: string },
  style: { [string]: mixed },
  geolocation: ICoordinate
};

type State = {
  mapBottomInset: number
};

export default class BusRoutes extends PureComponent<Props, State> {
  _map;

  constructor(props: Props) {
    super(props);

    this.state = {
      mapBottomInset: SCREEN_HEIGHT / 2
    };
  }

  calculateHeight = (event: any) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ mapBottomInset: height });
  };

  handleLocate = async (busStopLocation: IBusStopLocation) => {
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

  handleZoom = async (zoom: number) => {
    const centerCoordinate = await this._map.getCenter();
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

    const { mapBottomInset } = this.state;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const coordinates = [geolocation.longitude, geolocation.latitude];

    return (
      <ScreenView style={containerStyles}>
        {geolocation && (
          <MapView
            style={styles.mapView}
            mapRef={c => (this._map = c)}
            centerCoordinate={coordinates}
            showUserLocation={true}
            contentInset={[0, 0, mapBottomInset, 0]}
            onZoom={this.handleZoom}
            showLocateControl={false}
          />
        )}
        <BusRouteList
          style={styles.routeList}
          serviceNo={serviceNo}
          onLocate={this.handleLocate}
          onLayout={this.calculateHeight}
        />
      </ScreenView>
    );
  }
}
