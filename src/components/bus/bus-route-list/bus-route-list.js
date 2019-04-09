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
  geolocation: ICoordinate,
  persisted: boolean,
  stopsByStop: { [string]: mixed },
  routeByServiceDirection: Array<IBusRoute>,
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
  _routeList: Array<IBusRoute>;

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

    const { busStopCode } = this.props;
    this.setState({ currentBusStopCode: busStopCode });

    const index = this._routeList.findIndex(r => r.busStopCode === busStopCode);
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
    const { geolocation, routeByServiceDirection, stopsByStop } = this.props;

    const routeList = routeByServiceDirection;
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
    const isLast = index === this._routeList.length - 1;

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

    // todo: getRouteListWDistance once only
    this._routeList = this.getRouteListWDistance();

    return (
      <Container style={containerStyles} padding={0} onLayout={onLayout}>
        <FlatList
          ref={c => (this._list = c)}
          data={this._routeList}
          keyExtractor={(item, index) => `${index}`}
          extraData={currentBusStopCode}
          getItemLayout={this.getItemLayout}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}
