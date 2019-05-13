import React, { PureComponent } from 'react';
import { FavoriteList, View, Timer } from '../../../components';
import styles from './nearest-favorites.styles';

type Props = {
  timerEnabled: boolean,
  nearestFavoriteStops: Array<string>,
  nearestFavorites: Array<{ name: string, data: mixed }>
};

export default class NearestFavorites extends PureComponent<Props> {
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
      <View>
        <Timer
          id="fav-service-stop"
          onTick={this.handleTick}
          enabled={timerEnabled}
        />
        <FavoriteList
          list={nearestFavorites}
          onPress={this.handlePress}
          style={containerStyles}
        />
      </View>
    );
  }
}
