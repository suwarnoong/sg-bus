import React, { PureComponent } from 'react';
import { FavoriteList, View, Timer } from '../../../components';
import { IBusStop, IBusStopLocation, ICoordinate } from '../../../types.d';
import styles from './nearest-favorites.styles';

type Props = {
  timerEnabled: boolean,
  nearestFavoriteStops: Array<string>,
  nearestFavorites: Array<{ name: string, data: mixed }>,
  geolocation: ICoordinate
};

export default class NearestFavorites extends PureComponent<Props> {
  componentWillReceiveProps(nextProps) {
    let nextLat = 0,
      nextLng = 0,
      currLat = 0,
      currLng = 0;

    if (nextProps.geolocation) {
      nextLat = nextProps.geolocation.latitude;
      nextLng = nextProps.geolocation.longitude;
    }
    if (this.props.geolocation) {
      currLat = this.props.geolocation.latitude;
      currLng = this.props.geolocation.longitude;
    }

    if (nextLat != currLat || nextLng != currLng) {
      this.handleTick();
    }
  }

  handleTick = () => {
    const { nearestFavoriteStops } = this.props;
    nearestFavoriteStops.forEach(b => this.props.getArrivals(b));
  };

  handlePress = item => {
    this.props.navigate('BusStopArrivals', {
      title: item.description,
      subTitle: `${item.roadName}    ${item.busStopCode}`,
      busStopCode: item.busStopCode
    });
  };

  render() {
    const { nearestFavorites, timerEnabled, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <Timer
          id="fav-service-stop"
          onTick={this.handleTick}
          enabled={timerEnabled}
        />
        <FavoriteList list={nearestFavorites} onPress={this.handlePress} />
      </View>
    );
  }
}
