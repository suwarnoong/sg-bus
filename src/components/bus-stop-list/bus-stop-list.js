import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { BusStop } from '../bus-stop';
import { Card } from '../base/card';
import styles from './bus-stop-list.styles.js';
import { FlatList } from 'react-native-gesture-handler';

type Props = {
  Wrapper: React.Element,
  list: Array<{
    BusStopCode: string,
    RoadName: string,
    Description: string,
    distance: number
  }>,
  onPress: Function
};

export default class BusStopList extends PureComponent<Props> {
  static defaultProps = {
    Wrapper: Card
  };

  handlePress = item => {
    const { onPress } = this.props;
    if (typeof onPress === 'function') {
      onPress(item);
    }
  };

  render() {
    const { Wrapper, list, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Wrapper style={containerStyles}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => item.BusStopCode}
          renderItem={({ item }) => (
            <BusStop
              busStopCode={item.BusStopCode}
              description={item.Description}
              roadName={item.RoadName}
              distance={item.distance}
              routes={item.routes}
              onPress={() => this.handlePress(item)}
            />
          )}
        />
      </Wrapper>
    );
  }
}
