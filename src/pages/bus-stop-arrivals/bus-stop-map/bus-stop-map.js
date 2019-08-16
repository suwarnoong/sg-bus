// @flow
import * as React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { MapView } from '../../../components';
import { mapboxIcon } from '../../../constants';
import { IBusStop, IBusStopLocation } from '../../../types.d';
import {
  activeTextColor,
  mapClusterColor1,
  mapClusterColor2,
  mapClusterColor3,
  mapClusterColor4,
} from '../../../colors';
import styles from './bus-stop-map.styles';

const stopActiveImage = require('../../../assets/stop-active.png');
const stopImage = require('../../../assets/stop.png');

const mapIconSizes = [
  [mapboxIcon.BUS_STOP, 1],
  [mapboxIcon.ACTIVE_BUS_STOP, 1.2],
];

const mapClusterColors = [
  [5, mapClusterColor1],
  [15, mapClusterColor2],
  [50, mapClusterColor3],
  [100, mapClusterColor4],
];

const mapClusterCircleSizes = [[0, 15], [15, 20], [50, 25], [100, 30]];

const mapStyles = MapboxGL.StyleSheet.create({
  icon: {
    iconImage: '{icon}',
    iconSize: MapboxGL.StyleSheet.source(
      mapIconSizes,
      'icon',
      MapboxGL.InterpolationMode.Categorical
    ),
    iconAnchor: MapboxGL.IconAnchor.Center,
    iconAllowOverlap: true,
  },
  clusteredPoints: {
    circlePitchAlignment: 'map',
    circleColor: MapboxGL.StyleSheet.source(
      mapClusterColors,
      'point_count',
      MapboxGL.InterpolationMode.Exponential
    ),
    circleRadius: MapboxGL.StyleSheet.source(
      mapClusterCircleSizes,
      'point_count',
      MapboxGL.InterpolationMode.Exponential
    ),
    circleOpacity: 0.84,
    circleStrokeWidth: 5,
    circleStrokeColor: activeTextColor,
  },
  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
    textColor: activeTextColor,
  },
});

type Props = {
  busStopCode: string,
  stops: Array<IBusStop>,
  stopsByStop: { [string]: mixed },
  stopsGeojson: Array<any>,
  contentInset: Array<number>,
  style?: { [string]: mixed },
};

export default class BusStopMap extends React.PureComponent<Props> {
  _map;

  handleZoom = async (zoom: number) => {
    const centerCoordinate = await this._map.getCenter();
    this._map.setCamera({
      centerCoordinate,
      zoom,
      duration: 1000,
    });
  };

  handleLocate = async (centerCoordinate: Array<number>) => {
    const zoom = await this._map.getZoom();
    this._map.setCamera({
      centerCoordinate,
      zoom,
      duration: 1000,
    });
  };

  renderBusStop = (coordinates: Array<number>) => {
    const { busStopCode } = this.props;

    const featureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: busStopCode,
          properties: {
            icon: mapboxIcon.ACTIVE_BUS_STOP,
          },
          geometry: {
            type: 'Point',
            coordinates,
          },
        },
      ],
    };

    return (
      <MapboxGL.ShapeSource
        id={`shape-${busStopCode}`}
        shape={featureCollection}
        images={{ [mapboxIcon.ACTIVE_BUS_STOP]: stopActiveImage }}>
        <MapboxGL.SymbolLayer
          id={`sym-${busStopCode}`}
          style={mapStyles.icon}
        />
      </MapboxGL.ShapeSource>
    );
  };

  renderAllBusStops = (excludeStop: string) => {
    const { stops, stopsGeojson } = this.props;

    const featureCollection = {
      type: 'FeatureCollection',
      features: stopsGeojson.filter(s => s.id !== excludeStop),
    };

    return (
      <MapboxGL.ShapeSource
        id="shape-all-stops"
        shape={featureCollection}
        images={{ [mapboxIcon.BUS_STOP]: stopImage }}
        cluster
        clusterRadius={40}
        clusterMaxZoomLevel={13}
        onPress={() => {}}>
        <MapboxGL.SymbolLayer id="symCount" style={mapStyles.clusterCount} />
        <MapboxGL.CircleLayer
          id="clusteredPoints"
          belowLayerID="symCount"
          filter={['has', 'point_count']}
          style={mapStyles.clusteredPoints}
        />
        <MapboxGL.SymbolLayer id="symAllStops" style={mapStyles.icon} />
      </MapboxGL.ShapeSource>
    );
  };

  render() {
    const { busStopCode, contentInset, stopsByStop, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const busStop: IBusStopLocation = stopsByStop[busStopCode];
    if (busStop == null) return null;

    const coordinates: Array<number> = busStop
      ? [busStop.longitude, busStop.latitude]
      : [0, 0];

    return (
      <MapView
        style={containerStyles}
        mapRef={c => (this._map = c)}
        centerCoordinate={coordinates}
        showUserLocation={true}
        contentInset={contentInset}
        onZoom={this.handleZoom}
        onLocate={() => this.handleLocate(coordinates)}>
        {this.renderAllBusStops(busStopCode)}
        {this.renderBusStop(coordinates)}
      </MapView>
    );
  }
}
