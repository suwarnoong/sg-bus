// @flow
import * as React from 'react';
import { Card, FlatList } from '../../base';
import BusRoute from './bus-route';
import { BUS_ROUTE_HEIGHT } from '../../../constants';
import {
  IBusRoute,
  IBusStop,
  IBusStopLocation,
  ICoordinate
} from '../../../types.d';
import styles from './bus-route-list.styles';

type IRenderItem = { item: any, index: number };

type Props = {
  Container: React.ElementType,
  routeStop: string,
  persisted: boolean,
  routeWithDistance: Array<IBusRoute>,
  updateSelectedRouteStop: Function,
  selectedRouteStop: string,
  onNearestStopFound: Function,
  onLayout: Function,
  style: { [string]: mixed }
};

export default class BusRouteList extends React.PureComponent<Props> {
  static defaultProps = {
    Container: Card
  };

  _list: any;

  componentDidMount() {
    setTimeout(this.scrollToNearest);
  }

  getItemLayout = (data: any, index: number) => ({
    length: BUS_ROUTE_HEIGHT,
    offset: BUS_ROUTE_HEIGHT * index,
    index
  });

  scrollToNearest = () => {
    if (this._list == null) return;

    const { routeStop, routeWithDistance } = this.props;
    const index = routeWithDistance.findIndex(r => r.busStopCode === routeStop);
    if (index >= 0) this._list.scrollToIndex({ index });
  };

  handleLocationPress = (busStopLocation: IBusStopLocation) => {
    const { updateSelectedRouteStop } = this.props;
    updateSelectedRouteStop(busStopLocation.busStopCode);
  };

  renderItem = ({ item, index }: IRenderItem) => {
    const { routeWithDistance, selectedRouteStop } = this.props;
    const isFirst = index === 0;
    const isLast = index === routeWithDistance.length - 1;

    return (
      <BusRoute
        busStopCode={item.busStopCode}
        distance={item.distance}
        routeType={item.routeType}
        isFirst={isFirst}
        isLast={isLast}
        isSelected={item.busStopCode === selectedRouteStop}
        onPress={this.handleLocationPress}
      />
    );
  };

  render() {
    const {
      Container,
      persisted,
      routeWithDistance,
      style,
      onLayout
    } = this.props;

    if (!persisted) return null;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles} padding={0} onLayout={onLayout}>
        <FlatList
          ref={c => (this._list = c)}
          data={routeWithDistance}
          keyExtractor={(item, index) => `${index}`}
          getItemLayout={this.getItemLayout}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}
