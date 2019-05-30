// @flow
import React, { PureComponent } from 'react';
import styles from './bus-route.styles';
import {
  BusRouteList,
  InteractionManager,
  Placeholder,
  ScreenView,
  View
} from '../../components';
import BusRouteMap from './bus-route-map';
import { SCREEN_HEIGHT } from '../../constants';
import { IBusStop, IBusStopLocation, ICoordinate } from '../../types.d';

type Props = {
  updateRouteStop: Function,
  params: { [string]: string },
  style: { [string]: mixed }
};

type State = {
  mapBottomInset: number,
  didFinishInitialAnimation: boolean
};

export default class BusRoute extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      mapBottomInset: SCREEN_HEIGHT / 2,
      didFinishInitialAnimation: false
    };
  }

  componentWillMount() {
    const {
      params: { busStopCode, serviceNo },
      updateRouteStop
    } = this.props;

    updateRouteStop(busStopCode, serviceNo);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ didFinishInitialAnimation: true });
    });
  }

  componentWillUnmount() {
    const { updateRouteStop } = this.props;
    updateRouteStop(null, null);
  }

  calculateHeight = (event: any) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ mapBottomInset: height });
  };

  renderContent = () => {
    const { mapBottomInset } = this.state;

    return (
      <View style={styles.contentWrapper}>
        <BusRouteMap
          style={styles.mapView}
          contentInset={[0, 0, mapBottomInset, 0]}
        />
        <BusRouteList
          style={styles.routeList}
          onLayout={this.calculateHeight}
        />
      </View>
    );
  };

  render() {
    const { style } = this.props;
    const { didFinishInitialAnimation } = this.state;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles}>
        <Placeholder
          style={styles.placeholder}
          isReady={didFinishInitialAnimation}
          whenReadyRender={this.renderContent}
        />
      </ScreenView>
    );
  }
}
