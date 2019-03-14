import React, { PureComponent } from 'react';
import { Card, FlatList } from '../../base';
import BusArrival from '../bus-arrival';
import { ArrivalTime } from '../../../types.d';
import styles from './bus-arrival-list.styles.js';

type Props = {
  Container: React.Element,
  busStopCode: string,
  list: Array<{
    serviceNo: string,
    nextBus: Array<ArrivalTime>,
    nextBus2: Array<ArrivalTime>,
    nextBus3: Array<ArrivalTime>
  }>
};

export default class BusArrivalList extends PureComponent<Props> {
  static defaultProps = {
    Container: Card
  };

  render() {
    const { Container, busStopCode, list, saved, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles} padding={0}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => item.serviceNo}
          extraData={saved}
          renderItem={({ item }) => (
            <BusArrival
              busStopCode={busStopCode}
              serviceNo={item.serviceNo}
              nextBus={item.nextBus}
              nextBus2={item.nextBus2}
              nextBus3={item.nextBus3}
              onSaved={this.handleSaved}
            />
          )}
        />
      </Container>
    );
  }
}
