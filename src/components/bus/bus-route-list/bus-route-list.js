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

  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      currentBusStopCode: null
    };
  }

  handleScroll = event => {
    const { nativeEvent } = event;
    const { list } = this.props;

    const scrollY = nativeEvent.contentOffset.y;

    const item = list[parseInt(scrollY / 80)];
    if (item) {
      this.setState({ selected: item });
    }
  };

  handleLocationPress = ({ busStopCode, longitude, latitude }) => {
    this.setState({ currentBusStopCode: busStopCode });
  };

  renderItem = ({ item, index }) => {
    const { list } = this.props;
    const { currentBusStopCode } = this.state;
    const isFirst = index === 0;
    const isLast = index === list.length - 1;

    return (
      <BusRoute
        busStopCode={item.busStopCode}
        distance={item.distance}
        isFirst={isFirst}
        isLast={isLast}
        onLocationPress={this.handleLocationPress}
        isCurrentLocation={item.busStopCode === currentBusStopCode}
      />
    );
  };

  render() {
    const { Container, list, style } = this.props;
    const { selected, currentBusStopCode } = this.state;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles} padding={0}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => `${index}`}
          extraData={currentBusStopCode}
          decelerationRate={0}
          snapToInterval={80}
          snapToAlignment="start"
          scrollEventThrottle={1000}
          onScroll={this.handleScroll}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}
