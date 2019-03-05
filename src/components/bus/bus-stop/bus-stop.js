import React, { PureComponent } from 'react';
import styles from './bus-stop.styles.js';
import { H1, H2, H3, Label, Small, TouchableOpacity, View } from '../../base';
import { BusStopRoadInfo } from '../bus-stop-road-info/index.js';

type Props = {
  busStopCode: string,
  description: string,
  roadName: string,
  distance: number,
  routes: Array<any>,
  onPress: Function,
  style: { [string]: mixed }
};

export default class BusStop extends PureComponent<Props> {
  handlePress = () => {
    const { onPress } = this.props;
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  render() {
    const {
      busStopCode,
      description,
      roadName,
      distance,
      routes,
      style,
      onPress
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <TouchableOpacity style={containerStyles} onPress={this.handlePress}>
        <BusStopRoadInfo
          style={styles.busStopContainer}
          info={{ description, busStopCode, roadName, distance }}
        />
        <View style={styles.routesContainer}>
          {/* {routes && routes.map(({ ServiceNo }) => {
            return (<BusArrivalCompact style={{marginRight: 3}} serviceNo={ServiceNo} key={ServiceNo} />);
          })} */}
          {routes &&
            routes.map(({ serviceNo }) => {
              return (
                <Label
                  weight={Label.WEIGHT_BOLD}
                  style={styles.bus}
                  key={serviceNo}
                >
                  {serviceNo}
                </Label>
              );
            })}
        </View>
      </TouchableOpacity>
    );
  }
}
