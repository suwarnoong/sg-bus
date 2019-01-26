import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './bus-stop.styles.js';
import { H1, H2, H3, Label, Small } from '../base/label';
import { BusArrivalCompact } from '../bus-arrival-compact';

type Props = {
  busStopCode: string,
  description: string,
  roadName: string,
  distance: number,
  routes: Array<any>,
};

export default class BusStop extends PureComponent<Props> {
  render() {
    const {
      busStopCode,
      description,
      roadName,
      distance,
      routes,
      style
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <View style={styles.busStopContainer}>
          <View style={styles.row}>
            <H3 style={styles.fill} weight={Label.WEIGHT_DEMI_BOLD}>{description}</H3>
            <Label style={styles.busStopCode}>{busStopCode}</Label>
          </View>
          <View style={styles.row}>
            <Label style={styles.roadName, styles.fill} size={15}>{roadName}</Label>
            <Small style={styles.distance}>{distance.toFixed(2)}km</Small>
          </View>
        </View>
        <View style={styles.routesContainer}>
          {/* {routes && routes.map(({ ServiceNo }) => {
            return (<BusArrivalCompact style={{marginRight: 3}} serviceNo={ServiceNo} key={ServiceNo} />);
          })} */}
          {routes && routes.map(({ ServiceNo }) => {
            return (<Label weight={Label.WEIGHT_BOLD} style={styles.bus} key={ServiceNo}>{ServiceNo}</Label>)
          })}
        </View>
      </View>
    );
  }
}