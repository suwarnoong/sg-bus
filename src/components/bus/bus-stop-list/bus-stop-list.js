import React, { PureComponent } from 'react';
import { BusStop } from '../bus-stop';
import { Card, FlatList, View } from '../../base';
import styles from './bus-stop-list.styles.js';

type Props = {
  Container: React.Element,
  list: Array<{
    busStopCode: string,
    roadName: string,
    description: string,
    distance: number
  }>,
  onPress: Function
};

export default class BusStopList extends PureComponent<Props> {
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
          keyExtractor={(item, index) => item.busStopCode}
          renderItem={({ item }) => (
            <BusStop
              busStopCode={item.busStopCode}
              description={item.description}
              roadName={item.roadName}
              distance={item.distance}
              onPress={() => this.handlePress(item)}
            />
          )}
        />
      </Container>
    );
  }
}
