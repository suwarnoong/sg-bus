import React, { PureComponent } from 'react';
import i18next from 'i18next';
import {
  FavoriteList,
  Image,
  H1,
  Title,
  Label,
  View,
  Timer,
} from '../../../components';
import { BusIcon } from '../../../icons';
import { primaryColor } from '../../../colors';
import { IBusStop, IBusStopLocation, ICoordinate } from '../../../types.d';
import styles from './nearest-favorites.styles';

type Props = {
  timerEnabled: boolean,
  nearestFavoriteStops: Array<string>,
  nearestFavorites: Array<{ name: string, data: mixed }>,
  geolocation: ICoordinate,
};

export default class NearestFavorites extends PureComponent<Props> {
  busArrivalImage = require('../../../assets/bus-arrival.png');

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
      busStopCode: item.busStopCode,
    });
  };

  renderFavorites() {
    const { nearestFavorites, timerEnabled } = this.props;
    if (nearestFavorites && nearestFavorites.length > 0) {
      return (
        <View style={{ flex: 1 }}>
          <Title style={styles.title}>{i18next.t('favoritesTitle')}</Title>
          <Timer
            id="fav-service-stop"
            onTick={this.handleTick}
            enabled={timerEnabled}
          />
          <FavoriteList list={nearestFavorites} onPress={this.handlePress} />
        </View>
      );
    } else {
      return (
        <View style={styles.fill}>
          <View style={styles.infoContainer}>
            <BusIcon style={styles.infoIcon} size={106} color={primaryColor} />
            <H1 style={styles.infoTitle}>{i18next.t('favoritesDesc1')}</H1>
            <Label style={styles.infoDesc}>{i18next.t('favoritesDesc2')}</Label>
          </View>
        </View>
      );
    }
  }

  render() {
    const { nearestFavorites, timerEnabled, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return <View style={containerStyles}>{this.renderFavorites()}</View>;
  }
}
