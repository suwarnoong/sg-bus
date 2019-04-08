// @flow
import * as React from 'react';
import { Image } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { BusArrivalList, ScreenView, MapView } from '../../components';
import { SCREEN_HEIGHT, mapboxIcon } from '../../constants';
import { IBusStop, IBusStopLocation } from '../../types.d';

import styles from './bus-stop-arrivals.styles';

const stopActiveImage = require('../../assets/stop-active.png');
const stopImage = require('../../assets/stop.png');

const mapIconSize = [[mapboxIcon.BUS_STOP, 1], [mapboxIcon.ACTIVE_BUS_STOP, 1]];

const mapboxStyles = MapboxGL.StyleSheet.create({
  icon: {
    iconImage: '{icon}',
    iconSize: MapboxGL.StyleSheet.source(
      mapIconSize,
      'icon',
      MapboxGL.InterpolationMode.Categorical
    ),
    iconAnchor: MapboxGL.IconAnchor.Center,
    iconAllowOverlap: true
  },
  clusteredPoints: {
    circlePitchAlignment: 'map',
    circleColor: MapboxGL.StyleSheet.source(
      [[5, '#3073C2'], [15, '#1D599F'], [50, '#0C3E77'], [100, '#012F65']],
      'point_count',
      MapboxGL.InterpolationMode.Exponential
    ),
    circleRadius: MapboxGL.StyleSheet.source(
      [[0, 15], [100, 20], [750, 30]],
      'point_count',
      MapboxGL.InterpolationMode.Exponential
    ),
    circleOpacity: 0.84,
    circleStrokeWidth: 5,
    circleStrokeColor: 'white'
  },
  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
    textColor: 'white'
  }
});

const initialZoomLevel = 16;

type Props = {
  params: { [string]: string },
  stops: Array<IBusStop>,
  stopsByStop: { [string]: mixed },
  stopsGeojsonFeatures: Array<any>,
  style: { [string]: mixed }
};

type State = {
  mapBottomInset: number
};

export default class BusStopArrivals extends React.PureComponent<Props, State> {
  _map;

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

  renderBusStop = (coordinates: Array<number>) => {
    const {
      params: { busStopCode }
    } = this.props;

    const featureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: busStopCode,
          properties: {
            icon: mapboxIcon.ACTIVE_BUS_STOP
          },
          geometry: {
            type: 'Point',
            coordinates
          }
        }
      ]
    };

    return (
      <MapboxGL.ShapeSource
        id={`shape-${busStopCode}`}
        shape={featureCollection}
        images={{ [mapboxIcon.ACTIVE_BUS_STOP]: stopActiveImage }}
      >
        <MapboxGL.SymbolLayer
          id={`sym-${busStopCode}`}
          style={mapboxStyles.icon}
        />
      </MapboxGL.ShapeSource>
    );
  };

  renderAllBusStops = (excludeStop: string) => {
    const { stops, stopsGeojsonFeatures } = this.props;

    const featureCollection = {
      type: 'FeatureCollection',
      features: stopsGeojsonFeatures.filter(s => s.id !== excludeStop)
    };

    return (
      <MapboxGL.ShapeSource
        id="shape-all-stops"
        shape={featureCollection}
        images={{ [mapboxIcon.BUS_STOP]: stopImage }}
        cluster
        clusterRadius={40}
        clusterMaxZoomLevel={13}
        onPress={() => {}}
      >
        <MapboxGL.SymbolLayer id="symCount" style={mapboxStyles.clusterCount} />
        <MapboxGL.CircleLayer
          id="clusteredPoints"
          belowLayerID="symCount"
          filter={['has', 'point_count']}
          style={mapboxStyles.clusteredPoints}
        />
        <MapboxGL.SymbolLayer id="symAllStops" style={mapboxStyles.icon} />
      </MapboxGL.ShapeSource>
    );
  };

  render() {
    const {
      stopsByStop,
      style,
      params: { busStopCode }
    } = this.props;

    const { mapBottomInset } = this.state;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const busStop: IBusStopLocation = stopsByStop[busStopCode];
    const coordinates: Array<number> = busStop
      ? [busStop.longitude, busStop.latitude]
      : [0, 0];

    return (
      <ScreenView style={containerStyles}>
        {busStop && (
          <MapView
            style={styles.mapView}
            mapRef={c => (this._map = c)}
            centerCoordinate={coordinates}
            showUserLocation={true}
            contentInset={[0, 0, mapBottomInset, 0]}
            onZoom={this.handleZoom}
            onLocate={() => this.handleLocate(coordinates)}
          >
            {this.renderAllBusStops(busStopCode)}
            {this.renderBusStop(coordinates)}
          </MapView>
        )}
        <BusArrivalList
          style={styles.arrivalList}
          busStopCode={busStopCode}
          onLayout={this.calculateHeight}
        />
      </ScreenView>
    );
  }
}
