import React, { PureComponent } from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {
  ArrivalTimes,
  BusStopRoad,
  BusArrivalList,
  Card,
  H3,
  Label,
  ScreenView,
  Small,
  Button,
  ButtonIconLeft,
  ButtonIconRight,
  GPSLocateControl,
  ToolbarItem,
  View,
  ZoomControl
} from '../../components';
import {
  StarFilledIcon,
  StarOutlineIcon,
  ChevronDownIcon,
  ArrowRightIcon
} from '../../icons';
import { SCREEN_HEIGHT } from '../../constants';

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
  params: { [string]: mixed },
  stopsByStop: { [string]: mixed },
  style: { [string]: mixed }
};

export default class BusStopArrivals extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      mapBottomInset: SCREEN_HEIGHT / 2
    };
  }

  // componentDidMount() {
  //   this.props.updateInset('bottom', false);
  // }

  calculateHeight = event => {
    const { height } = event.nativeEvent.layout;
    this.setState({ mapBottomInset: height });
  };

  renderControls = () => {
    const {
      stopsByStop,
      params: { busStopCode }
    } = this.props;

    const busStop = stopsByStop[busStopCode];

    return (
      <View style={styles.controlContainer}>
        <ZoomControl
          style={styles.controlItem}
          zoomLevel={initialZoomLevel}
          maxZoomLevel={18}
          minZoomLevel={12}
          onZoom={async zoomLevel => {
            const center = await this._map.getCenter();
            const options = {
              centerCoordinate: center,
              zoom: zoomLevel,
              duration: 1000
            };
            this._map.setCamera(options);
          }}
        />
        <GPSLocateControl
          style={styles.controlItem}
          onLocate={async _ => {
            const zoom = await this._map.getZoom();
            this._map.setCamera({
              centerCoordinate: [busStop.longitude, busStop.latitude],
              zoom: zoom,
              duration: 1000
            });
          }}
        />
      </View>
    );
  };

  renderBusStop = () => {
    const {
      stopsByStop,
      params: { busStopCode }
    } = this.props;

    const busStop = stopsByStop[busStopCode];

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
            coordinates: [busStop.longitude, busStop.latitude]
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

  renderAllBusStops = excludeStop => {
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

    const busStop = stopsByStop[busStopCode];

    return (
      <ScreenView style={containerStyles}>
        {busStop && (
          <MapboxGL.MapView
            style={styles.mapView}
            zoomEnabled={false}
            logoEnabled={false}
            pitch={0}
            ref={c => (this._map = c)}
            centerCoordinate={[busStop.longitude, busStop.latitude]}
            showUserLocation={true}
            contentInset={[0, 0, mapBottomInset, 0]}
          >
            {this.renderAllBusStops(busStopCode)}
            {this.renderBusStop()}
          </MapboxGL.MapView>
        )}
        {this.renderControls()}
        <BusArrivalList
          style={styles.arrivalList}
          busStopCode={busStopCode}
          onLayout={this.calculateHeight}
        />
      </ScreenView>
    );
  }
}
