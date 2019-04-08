// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { View } from '../../base';
import { ZoomControl } from '../zoom-control';
import { GPSLocateControl } from '../gps-locate-control';
import styles from './map-view.styles';

type Props = {
  centerCoordinate: Array<number>,
  pitch: number,
  showUserLocation: boolean,
  zoomEnabled: boolean,
  contentInset: Array<number>,
  showZoomControl: boolean,
  zoomLevel: number,
  minZoomLevel: number,
  maxZoomLevel: number,
  onZoom: Function,
  showLocateControl: boolean,
  onLocate: Function,
  style: { [string]: mixed },
  children: Node,
  mapRef: Function
};

export default class MapView extends PureComponent<Props> {
  static defaultProps = {
    showUserLocation: true,
    showZoomControl: true,
    zoomLevel: 16,
    minZoomLevel: 9,
    maxZoomLevel: 18,
    showLocateControl: true,
    pitch: 0
  };

  _map;

  renderControls = () => {
    const {
      showZoomControl,
      zoomLevel,
      minZoomLevel,
      maxZoomLevel,
      onZoom,
      showLocateControl,
      onLocate
    } = this.props;

    if (!showZoomControl && !showLocateControl) return;
    if (this._map == null) return;

    // const zoomLevel = await this._map.getZoom();

    return (
      <View style={styles.controlContainer}>
        {showZoomControl && (
          <ZoomControl
            style={styles.controlItem}
            zoomLevel={zoomLevel}
            minZoomLevel={minZoomLevel}
            maxZoomLevel={maxZoomLevel}
            onZoom={onZoom}
          />
        )}
        {showLocateControl && (
          <GPSLocateControl style={styles.controlItem} onLocate={onLocate} />
        )}
      </View>
    );
  };

  render() {
    const { mapRef, children, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <MapboxGL.MapView
          ref={c => {
            this._map = c;
            mapRef(c);
          }}
          style={styles.mapView}
          {...this.props}
          logoEnabled={false}
        >
          {children}
        </MapboxGL.MapView>
        {this.renderControls()}
      </View>
    );
  }
}
