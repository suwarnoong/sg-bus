import React, { PureComponent } from 'react';
import { BusStopList, View, Label } from '../../../components';
import { isGeolocationEmpty } from '../../../utils';
import styles from './nearest-bus-stops.styles';

type Props = {};

export default class NearestBusStops extends PureComponent<Props> {
  componentDidMount() {
    const { persisted, getNearestStops, geolocation } = this.props;
    if (persisted && !isGeolocationEmpty(geolocation)) {
      getNearestStops(geolocation);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { getNearestStops, geolocation, persisted } = this.props;

    const locationChanged =
      nextProps.geolocation.latitude != geolocation.latitude ||
      nextProps.geolocation.longitude != geolocation.longitude;
    const persistedChanged = nextProps.persisted && !persisted;

    if (persistedChanged || locationChanged) {
      if ('geolocation' in nextProps) {
        getNearestStops(nextProps.geolocation);
      } else {
        getNearestStops(geolocation);
      }
    }
  }

  render() {
    const { nearest, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <BusStopList
        list={nearest}
        onPress={item => {
          this.props.navigate('BusStopArrivals', {
            title: item.description,
            subTitle: `${item.roadName}    ${item.busStopCode}`,
            busStopCode: item.busStopCode
          });
        }}
        style={containerStyles}
      />
    );
  }
}
