import React, { PureComponent } from 'react';
import { Card, FlatList } from '../../base';
import { BusArrival } from '../bus-arrival';
import { ArrivalTime } from '../../../types.d';
import styles from './bus-arrival-list.styles.js';

type Props = {
  Container: React.Element,
  busStopCode: string,
  list: Array<{
    ServiceNo: string,
    NextBus: Array<ArrivalTime>,
    NextBus2: Array<ArrivalTime>,
    NextBus3: Array<ArrivalTime>
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
          keyExtractor={(item, index) => item.ServiceNo}
          extraData={savedList}
          renderItem={({ item }) => (
            <BusArrival
              busStopCode={busStopCode}
              serviceNo={item.ServiceNo}
              nextBus={item.NextBus}
              nextBus2={item.NextBus2}
              nextBus3={item.NextBus3}
              savedList={savedList}
              onSaved={this.handleSaved}
            />
          )}
        />
      </Container>
    );
  }
}
