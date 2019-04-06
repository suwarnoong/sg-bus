import React, { PureComponent } from 'react';
import { BusStopList, View, Label } from '../../../components';
import styles from './nearest-bus-stops.styles';

type Props = {};

export default class NearestBusStops extends PureComponent<Props> {
  componentDidMount() {
    const { persisted, getNearestStops, geolocation } = this.props;
    if (persisted) {
      getNearestStops(geolocation);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.persisted) {
      const { getNearestStops, geolocation } = this.props;
      const locationChanged =
        nextProps.geolocation.latitude != this.props.geolocation.latitude ||
        nextProps.geolocation.longitude != this.props.geolocation.longitude;

      if (locationChanged) {
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
