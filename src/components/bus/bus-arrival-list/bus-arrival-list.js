import React, { PureComponent } from 'react';
import { Card, FlatList } from '../../base';
import { BusArrival } from '../bus-arrival';
import { ArrivalTime } from '../../../types.d';
import styles from './bus-arrival-list.styles.js';

type Props = {
  Container: React.Element,
  list: Array<{
    ServiceNo: string,
    NextBus: Array<ArrivalTime>,
    NextBus2: Array<ArrivalTime>,
    NextBus3: Array<ArrivalTime>
  }>,
  onPress: Function
};

export default class BusArrivalList extends PureComponent<Props> {
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
    const { Container, list, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles} padding={0}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => item.ServiceNo}
          renderItem={({ item }) => (
            <BusArrival
              serviceNo={item.ServiceNo}
              nextBus={item.NextBus}
              nextBus2={item.NextBus2}
              nextBus3={item.NextBus3}
              onPress={() => this.handlePress(item)}
            />
          )}
        />
      </Container>
    );
  }
}
