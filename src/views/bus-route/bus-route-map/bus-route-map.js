// @flow
import * as React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { MapView } from '../../../components';
import { mapboxIcon } from '../../../constants';
import { isGeolocationEmpty } from '../../../utils';
import { IBusStop, IBusStopLocation } from '../../../types.d';
import styles from './bus-route-map.styles';

const stopActiveImage = require('../../../assets/stop-active.png');
const stopDisabledImage = require('../../../assets/stop-disabled.png');
const stopImage = require('../../../assets/stop.png');

const mapIconSizes = [
  [mapboxIcon.BUS_STOP, 1],
  [mapboxIcon.ACTIVE_BUS_STOP, 1.2]
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
  },
  line: {
    lineColor: '#1289A7',
    lineWidth: 4
  }
});

type Props = {
  serviceNo: string,
  routeStop: string,
  selectedRouteStop: string,
  stopsByStop: { [string]: Array<IBusStop> },
  centerCoordinate: Array<number>,
  routeGeojson: Array<any>,
  contentInset: Array<number>,
  style?: { [string]: mixed }
};

export default class BusRouteMap extends React.PureComponent<Props> {
  _map;

  componentDidMount() {
    this.centerlizeBusStop(this.props.selectedRouteStop);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRouteStop !== this.props.selectedRouteStop) {
      this.centerlizeBusStop(nextProps.selectedRouteStop);
    }
  }

  centerlizeBusStop = busStopCode => {
    const { stopsByStop } = this.props;
    if (stopsByStop) {
      const stop = stopsByStop[busStopCode];
      this.handleLocate([stop.longitude, stop.latitude]);
    }
  };

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
    const { routeStop, routeGeojson } = this.props;

    if (routeGeojson == null) return;

    const featureCollection = {
      type: 'FeatureCollection',
      features: routeGeojson
    };

    return (
      <MapboxGL.ShapeSource
        id="shape-all-stops"
        shape={featureCollection}
        images={{
          [mapboxIcon.BUS_STOP]: stopImage,
          [mapboxIcon.ACTIVE_BUS_STOP]: stopActiveImage
        }}
        onPress={() => {}}
      >
        <MapboxGL.LineLayer id="line" style={mapStyles.line} />
        <MapboxGL.SymbolLayer id="allStops" style={mapStyles.icon} />
      </MapboxGL.ShapeSource>
    );
  };

  render() {
    const { serviceNo, centerCoordinate, contentInset, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    if (isGeolocationEmpty(centerCoordinate) == null) return null;

    return (
      <MapView
        style={containerStyles}
        mapRef={c => (this._map = c)}
        centerCoordinate={centerCoordinate}
        showUserLocation={true}
        showLocateControl={false}
        contentInset={contentInset}
        zoomLevel={15}
        onZoom={this.handleZoom}
      >
        {this.renderBusRoute()}
      </MapView>
    );
  }
}
