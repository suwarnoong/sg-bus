import React, { PureComponent } from 'react';
import { ServiceStopList } from '../../../components';
import styles from './favorite-service-stop.styles.js';

import uniq from 'lodash/fp/uniq';

type Props = {};

export default class FavoriteServiceStop extends PureComponent<Props> {
  render() {
    const { favoriteServiceStop, style } = this.props;

    const favoriteStops = uniq(favoriteServiceStop.map(b => b.busStopCode));
    favoriteStops.forEach(b => this.props.getArrivals(b));

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
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
    );
  }
}
