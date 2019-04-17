// @flow
import * as React from 'react';
import { Card, FlatList } from '../../base';
import BusRoute from './bus-route';
import { BUS_ROUTE_HEIGHT } from '../../../constants';
import { distance } from '../../../utils';
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
  serviceNo: string,
  busStopCode: string,
  persisted: boolean,
  routeWithDistance: Array<IBusRoute>,
  onLocate: Function,
  onNearestStopFound: Function,
  onLayout: Function,
  style: { [string]: mixed }
};

type State = {
  selectedBusStopCode: string | null
};

export default class BusRouteList extends React.PureComponent<Props, State> {
  static defaultProps = {
    Container: Card
  };

  _list: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedBusStopCode: null
    };
  }

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

    const { busStopCode, routeWithDistance } = this.props;
    this.setState({ selectedBusStopCode: busStopCode });

    const index = routeWithDistance.findIndex(
      r => r.busStopCode === busStopCode
    );
    this._list.scrollToIndex({ index });
  };

  handleLocationPress = (busStopLocation: IBusStopLocation) => {
    const { onLocate } = this.props;

    this.setState({ selectedBusStopCode: busStopLocation.busStopCode });

    if (typeof onLocate === 'function') {
      onLocate(busStopLocation);
    }
  };

  renderItem = ({ item, index }: IRenderItem) => {
    const { routeWithDistance } = this.props;
    const { selectedBusStopCode } = this.state;
    const isFirst = index === 0;
    const isLast = index === routeWithDistance.length - 1;

    return (
      <BusRoute
        busStopCode={item.busStopCode}
        distance={item.distance}
        routeType={item.routeType}
        isFirst={isFirst}
        isLast={isLast}
        isSelected={item.busStopCode === selectedBusStopCode}
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
    const { selectedBusStopCode } = this.state;

    if (!persisted) return null;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles} padding={0} onLayout={onLayout}>
        <FlatList
          ref={c => (this._list = c)}
          data={routeWithDistance}
          keyExtractor={(item, index) => `${index}`}
          extraData={selectedBusStopCode}
          getItemLayout={this.getItemLayout}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}
