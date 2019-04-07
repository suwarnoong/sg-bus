// @flow
import * as React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { BusArrivalList, ScreenView, MapView } from '../../components';
import { SCREEN_HEIGHT } from '../../constants';
import { IBusStop, IBusStopLocation } from '../../types.d';

import stopActiveIcon from '../../assets/stop-active.png';
import stopIcon from '../../assets/stop.png';

import styles from './bus-stop-arrivals.styles';

const mapIconSize = [['stop', 0.5], ['stopActive', 0.7]];
const mapIconAnchor = [
  ['stop', MapboxGL.IconAnchor.Center],
  ['stopActive', MapboxGL.IconAnchor.Center]
];

const mapboxStyles = MapboxGL.StyleSheet.create({
  icon: {
    iconImage: '{icon}',
    iconSize: MapboxGL.StyleSheet.source(
      mapIconSize,
      'icon',
      MapboxGL.InterpolationMode.Categorical
    ),
    iconAnchor: MapboxGL.StyleSheet.source(
      mapIconAnchor,
      'icon',
      MapboxGL.InterpolationMode.Categorical
    ),
    iconAllowOverlap: true
  }
});

const initialZoomLevel = 16;

type Props = {
  params: { [string]: string },
  stops: Array<IBusStop>,
  stopsByStop: { [string]: mixed },
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
            icon: 'stopActive'
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
        images={{ stopActive: stopActiveIcon }}
      >
        <MapboxGL.SymbolLayer
          id={`sym-${busStopCode}`}
          style={mapboxStyles.icon}
        />
      </MapboxGL.ShapeSource>
    );
  };

  renderAllBusStops = (excludeStop: string) => {
    const { stops } = this.props;

    const featureCollection = {
      type: 'FeatureCollection',
      features: stops
        .filter(s => s.busStopCode !== excludeStop)
        .map(s => {
          return {
            type: 'Feature',
            id: s.busStopCode,
            properties: {
              icon: 'stop'
            },
            geometry: {
              type: 'Point',
              coordinates: [s.longitude, s.latitude]
            }
          };
        })
    };

    return (
      <MapboxGL.ShapeSource
        id="shape-all-stops"
        shape={featureCollection}
        images={{ stop: stopIcon }}
      >
        <MapboxGL.SymbolLayer id="sym-all-stops" style={mapboxStyles.icon} />
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
