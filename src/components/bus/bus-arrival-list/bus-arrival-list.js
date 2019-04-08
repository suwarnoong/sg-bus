import React, { PureComponent } from 'react';
import { Card, FlatList } from '../../base';
import { Timer } from '../../services';
import BusArrival from '../bus-arrival';
import { IBusArrival } from '../../../types.d';
import styles from './bus-arrival-list.styles';

type Props = {
  Container: React.Element,
  busStopCode: string,
  arrivals: { [string]: Array<mixed> },
  getArrivals: (busStopCode: string) => void,
  onLayout: Function
};

export default class BusArrivalList extends PureComponent<Props> {
  static defaultProps = {
    Container: Card
  };

  handleTick = () => {
    this.props.getArrivals(this.props.params.busStopCode);
  };

  render() {
    const {
      Container,
      busStopCode,
      arrivals,
      favorites,
      style,
      onLayout
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const arrivalList = arrivals[busStopCode];

    return (
      <Container style={containerStyles} padding={0} onLayout={onLayout}>
        <Timer onTick={this.handleTick} />
        <FlatList
          data={arrivalList}
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
