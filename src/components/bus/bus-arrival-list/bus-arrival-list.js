import React, { PureComponent } from 'react';
import { Card, FlatList } from '../../base';
import { BusArrival } from '../bus-arrival';
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
  }>,
  savedList: Array<{ busStopCode: string, serviceNo: string }>,
  onSaved: Function
};

export default class BusArrivalList extends PureComponent<Props> {
  static defaultProps = {
    Container: Card
  };

  handleSaved = (isSaving, { busStopCode, serviceNo }) => {
    const { onSaved } = this.props;
    if (typeof onSaved === 'function') {
      onSaved(isSaving, { busStopCode, serviceNo });
    }
  };

  render() {
    const { Container, busStopCode, list, savedList, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles} padding={0}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => item.serviceNo}
          extraData={savedList}
          renderItem={({ item }) => (
            <BusArrival
              busStopCode={busStopCode}
              serviceNo={item.serviceNo}
              nextBus={item.nextBus}
              nextBus2={item.nextBus2}
              nextBus3={item.nextBus3}
              savedList={savedList}
              onSaved={this.handleSaved}
            />
          )}
        />
      </Container>
    );
  }
}
