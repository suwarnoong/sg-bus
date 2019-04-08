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
  geolocation: ICoordinate,
  persisted: boolean,
  routesByService: { [string]: Array<mixed> },
  stopsByStop: { [string]: mixed },
  onLocate: Function,
  onNearestStopFound: Function,
  onLayout: Function,
  style: { [string]: mixed }
};

type State = {
  currentBusStopCode: string | null
};

export default class BusRouteList extends React.PureComponent<Props, State> {
  static defaultProps = {
    Container: Card
  };

  _list: any;
  routeList: Array<IBusRoute>;

  constructor(props: Props) {
    super(props);

    this.state = {
      currentBusStopCode: null
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

    const { onNearestStopFound, stopsByStop } = this.props;
    const sortedRoutes = this.routeList.sort((a, b) => a.distance - b.distance);

    if (sortedRoutes == null || sortedRoutes.length < 0) return;

    let nearestStop: IBusRoute = sortedRoutes[0];
    const stop: IBusStop = stopsByStop[nearestStop.busStopCode];

    if (stop == null) return;

    nearestStop = {
      ...nearestStop,
      latitude: stop.latitude,
      longitude: stop.longitude
    };

    if (typeof onNearestStopFound === 'function') {
      onNearestStopFound(nearestStop);
    }

    this.setState({ currentBusStopCode: nearestStop.busStopCode });

    const index = this.routeList.findIndex(
      r => r.busStopCode === nearestStop.busStopCode
    );

    this._list.scrollToIndex({ index });
  };

  handleLocationPress = (busStopLocation: IBusStopLocation) => {
    const { onLocate } = this.props;

    this.setState({ currentBusStopCode: busStopLocation.busStopCode });

    if (typeof onLocate === 'function') {
      onLocate(busStopLocation);
    }
  };

  getRouteListWDistance = (): Array<IBusRoute> => {
    const { geolocation, routesByService, stopsByStop, serviceNo } = this.props;

    const routeList = routesByService[serviceNo];
    if (routeList == null) return [];

    return routeList.map((r: IBusRoute) => {
      const busStop: IBusStop = stopsByStop[r.busStopCode];
      return {
        ...r,
        distance: distance(geolocation, {
          latitude: busStop.latitude,
          longitude: busStop.longitude
        })
      };
    });
  };

  renderItem = ({ item, index }: IRenderItem) => {
    const { currentBusStopCode } = this.state;
    const isFirst = index === 0;
    const isLast = index === this.routeList.length - 1;

    return (
      <BusRoute
        busStopCode={item.busStopCode}
        distance={item.distance}
        isFirst={isFirst}
        isLast={isLast}
        isActive={item.busStopCode === currentBusStopCode}
        onPress={this.handleLocationPress}
      />
    );
  };

  render() {
    const { Container, persisted, style, onLayout } = this.props;
    const { currentBusStopCode } = this.state;

    if (!persisted) return null;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    this.routeList = this.getRouteListWDistance();

    return (
      <Container style={containerStyles} padding={0} onLayout={onLayout}>
        <FlatList
          ref={c => (this._list = c)}
          data={this.routeList}
          keyExtractor={(item, index) => `${index}`}
          extraData={currentBusStopCode}
          getItemLayout={this.getItemLayout}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}
