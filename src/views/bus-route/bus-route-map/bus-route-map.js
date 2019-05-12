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
  routeStop: string,
  selectedRouteStop: string,
  routeService: string,
  stopsByStop: { [string]: Array<IBusStop> },
  routeGeojson: Array<any>,
  contentInset: Array<number>,
  style?: { [string]: mixed }
};

const DEFAULT_ZOOM = 15;

export default class BusRouteMap extends React.PureComponent<Props> {
  _map: any;

  componentDidMount() {
    setTimeout(() => this.centerlizeBusStop(this.props.selectedRouteStop, 15));
  }

  componentWillReceiveProps(nextProps: Props) {
    if ('selectedRouteStop' in nextProps) {
      const selectedRouteStopChanged =
        nextProps.selectedRouteStop !== this.props.selectedRouteStop;

      if (selectedRouteStopChanged) {
        this.centerlizeBusStop(nextProps.selectedRouteStop);
      }
    }
  }

  centerlizeBusStop = async (
    busStopCode: string,
    zoomLevel: number | null = null
  ) => {
    const { stopsByStop } = this.props;
    if (stopsByStop) {
      const stop: IBusStop = stopsByStop[busStopCode];
      if (stop) {
        const centerCoordinate = [stop.longitude, stop.latitude];

        const zoom = zoomLevel || (await this._map.getZoom());
        this._map.setCamera({
          centerCoordinate,
          zoom,
          duration: 1000
        });
      }
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

  renderBusRoute = () => {
    const { routeGeojson } = this.props;

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
    const { contentInset, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <MapView
        style={containerStyles}
        mapRef={c => (this._map = c)}
        showUserLocation={true}
        showLocateControl={false}
        contentInset={contentInset}
        zoomLevel={DEFAULT_ZOOM}
        onZoom={this.handleZoom}
      >
        {this.renderBusRoute()}
      </MapView>
    );
  }
}
