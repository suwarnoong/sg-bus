import React, { PureComponent } from 'react';
import { Card, FlatList, Label, View } from '../../base';
import BusRoute from './bus-route';
import styles from './bus-route-list.styles.js';

type Props = {
  Container: React.Element,
  serviceNo: string,
  list: Array<{
    busStopCode: string,
    roadName: string,
    description: string,
    distance: number
  }>
};

export default class BusRouteList extends PureComponent<Props> {
  static defaultProps = {
    Container: Card
  };

  render() {
    const { Container, list, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles} padding={0}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => `${index}`}
          decelerationRate={0}
          snapToInterval={80}
          snapToAlignment="start"
          renderItem={({ item, index }) => {
            const isFirst = index === 0;
            const isLast = index === list.length - 1;

            return (
              <BusRoute
                busStopCode={item.busStopCode}
                distance={item.distance}
                isFirst={isFirst}
                isLast={isLast}
              />
            );
          }}
        />
      </Container>
    );
  }
}
