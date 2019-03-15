import React, { PureComponent } from 'react';
import { Card, FlatList } from '../../base';
import BusArrival from '../bus-arrival';
import { IBusArrival } from '../../../types.d';
import styles from './bus-arrival-list.styles.js';

type Props = {
  Container: React.Element,
  busStopCode: string,
  list: Array<IBusArrival>
};

export default class BusArrivalList extends PureComponent<Props> {
  static defaultProps = {
    Container: Card
  };

  render() {
    const { Container, busStopCode, list, favorites, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles} padding={0}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => item.serviceNo}
          extraData={favorites}
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
