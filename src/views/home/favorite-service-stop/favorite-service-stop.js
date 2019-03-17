import React, { PureComponent } from 'react';
import { ServiceStopList, View, Timer } from '../../../components';
import styles from './favorite-service-stop.styles.js';

type Props = {};

export default class FavoriteServiceStop extends PureComponent<Props> {
  handleTick = () => {
    const { favoriteStops } = this.props;
    favoriteStops.forEach(b => this.props.getArrivals(b));
  };

  render() {
    const { favoriteServiceStop, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View>
        <ServiceStopList
          list={favoriteServiceStop}
          onPress={item => {
            this.props.navigate('BusStopArrivals', {
              title: item.description,
              subTitle: `${item.roadName}    ${item.busStopCode}`,
              busStopCode: item.busStopCode
            });
          }}
          style={containerStyles}
        />
        <Timer autoStart={true} interval={5000} onTick={this.handleTick} />
      </View>
    );
  }
}
