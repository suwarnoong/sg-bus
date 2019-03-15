import React, { PureComponent } from 'react';
import ServiceStop from './service-stop';
import { Card, FlatList, View } from '../../base';
import { IBusArrival } from '../../../types.d';
import styles from './service-stop-list.styles.js';

import pick from 'lodash/fp/pick';

type Props = {
  Container: React.Element,
  list: Array<{
    serviceNo: string,
    busStopCode: string,
    roadName: string,
    description: string,
    distance: number
  }>,
  arrivals: Array<IBusArrival>,
  onPress: Function
};

export default class ServiceStopList extends PureComponent<Props> {
  static defaultProps = {
    Container: Card
  };

  handlePress = item => {
    const { onPress } = this.props;
    if (typeof onPress === 'function') {
      onPress(item);
    }
  };

  render() {
    const { Container, list, arrivals, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    console.log('arrivals', arrivals);

    return (
      <Container style={containerStyles} padding={0}>
        <FlatList
          data={list}
          keyExtractor={(item, index) =>
            `${item.busStopCode}|${item.serviceNo}`
          }
          renderItem={({ item }) => {
            const busArrival =
              arrivals &&
              arrivals[item.busStopCode] &&
              arrivals[item.busStopCode].find(
                a => a.serviceNo === item.serviceNo
              );

            return (
              <ServiceStop
                {...item}
                arrivals={busArrival}
                onPress={() => this.handlePress(item)}
              />
            );
          }}
        />
      </Container>
    );
  }
}
