import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './bus-stop.styles.js';
import { H1, H2, H3, Label, Small } from '../../base/label';

type Props = {
  busStopCode: string,
  description: string,
  roadName: string,
  distance: number,
  routes: Array<any>,
  onPress: Function
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
        <View style={styles.busStopContainer}>
          <View style={styles.row}>
            <H3 style={styles.fill} weight={Label.WEIGHT_DEMI_BOLD}>
              {description}
            </H3>
            <Label style={styles.busStopCode}>{busStopCode}</Label>
          </View>
          <View style={styles.row}>
            <Label style={(styles.roadName, styles.fill)} size={15}>
              {roadName}
            </Label>
            <Small style={styles.distance}>{distance.toFixed(2)}km</Small>
          </View>
        </View>
        <View style={styles.routesContainer}>
          {/* {routes && routes.map(({ ServiceNo }) => {
            return (<BusArrivalCompact style={{marginRight: 3}} serviceNo={ServiceNo} key={ServiceNo} />);
          })} */}
          {routes &&
            routes.map(({ ServiceNo }) => {
              return (
                <Label
                  weight={Label.WEIGHT_BOLD}
                  style={styles.bus}
                  key={ServiceNo}
                >
                  {ServiceNo}
                </Label>
              );
            })}
        </View>
      </TouchableOpacity>
    );
  }
}
