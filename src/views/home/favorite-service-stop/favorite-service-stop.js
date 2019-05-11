import React, { PureComponent } from 'react';
import { ServiceStopList, View, Timer } from '../../../components';
import styles from './favorite-service-stop.styles';

type Props = {
  timerEnabled: boolean
};

export default class FavoriteServiceStop extends PureComponent<Props> {
  handleTick = () => {
    const { favoriteStops } = this.props;
    favoriteStops.forEach(b => this.props.getArrivals(b));
  };

  handlePress = item => {
    this.props.navigate('BusStopArrivals', {
      title: item.description,
      subTitle: `${item.roadName}    ${item.busStopCode}`,
      busStopCode: item.busStopCode
    });
  };

  render() {
    const { timerEnabled, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View>
        <Timer
          id="fav-service-stop"
          onTick={this.handleTick}
          enabled={timerEnabled}
        />
        <ServiceStopList onPress={this.handlePress} style={containerStyles} />
      </View>
    );
  }
}
