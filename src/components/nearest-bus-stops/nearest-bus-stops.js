import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { BusStop } from '../bus-stop';
import styles from './nearest-bus-stops.styles.js';

type Props = {
  stops: Array<{
    BusStopCode: string,
    RoadName: string,
    Description: string,
    distance: number,
  }>
};

export default class NearestBusStops extends PureComponent<Props> {
  render() {
    const { stops, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        {
          stops && stops.map(item => {
            return (
              <BusStop
                key={item.BusStopCode}
                busStopCode={item.BusStopCode}
                description={item.Description}
                roadName={item.RoadName}
                distance={item.distance}
                routes={item.routes}
              />
            );
          })
        }
      </View>
    );
  }
}