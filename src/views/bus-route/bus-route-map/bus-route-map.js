// @flow
import * as React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { MapView } from '../../../components';
import { mapboxIcon } from '../../../constants';
import { isGeolocationEmpty } from '../../../utils';
import { IBusStop, IBusStopLocation } from '../../../types.d';
import styles from './bus-route-map.styles';

const stopActiveImage = require('../../../assets/stop-active.png');
const stopImage = require('../../../assets/stop.png');

const mapIconSizes = [
  [mapboxIcon.BUS_STOP, 1],
  [mapboxIcon.ACTIVE_BUS_STOP, 1]
];

const mapStyles = MapboxGL.StyleSheet.create({
  icon: {
    iconImage: '{icon}',
    iconSize: MapboxGL.StyleSheet.source(
      mapIconSizes,
      'icon',
      MapboxGL.InterpolationMode.Categorical
    ),
    iconAnchor: MapboxGL.IconAnchor.Center,
    iconAllowOverlap: true
  }
});

type Props = {
  mapRef: Function,
  serviceNo: string,
  centerCoordinate: Array<number>,
  routeGeojson: Array<any>,
  contentInset: Array<number>,
  style?: { [string]: mixed }
};

export default class BusRouteMap extends React.PureComponent<Props> {
  _map;

  handleZoom = async (zoom: number) => {
    const centerCoordinate = await this._map.getCenter();
    this._map.setCamera({
      centerCoordinate,
      zoom,
      duration: 1000
    });
  };

  handleLocate = async (centerCoordinate: Array<number>) => {
    const zoom = await this._map.getZoom();
    this._map.setCamera({
      centerCoordinate,
      zoom,
      duration: 1000
    });
  };

  renderBusRoute = () => {
    const { routeGeojson } = this.props;

    const featureCollection = {
      type: 'FeatureCollection',
      features: routeGeojson
    };

    return (
      <MapboxGL.ShapeSource
        id="shape-all-stops"
        shape={featureCollection}
        images={{ [mapboxIcon.BUS_STOP]: stopImage }}
        onPress={() => {}}
      >
        <MapboxGL.SymbolLayer id="symAllStops" style={mapStyles.icon} />
      </MapboxGL.ShapeSource>
    );
  };

  render() {
    const {
      mapRef,
      serviceNo,
      centerCoordinate,
      contentInset,
      style
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    if (isGeolocationEmpty(centerCoordinate) == null) return null;

    return (
      <MapView
        style={containerStyles}
        mapRef={c => {
          this._map = c;
          mapRef(c);
        }}
        centerCoordinate={centerCoordinate}
        showUserLocation={true}
        showLocateControl={false}
        contentInset={contentInset}
        onZoom={this.handleZoom}
      >
        {this.renderBusRoute()}
      </MapView>
    );
  }
}
