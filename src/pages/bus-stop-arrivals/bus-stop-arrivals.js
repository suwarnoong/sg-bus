// @flow
import * as React from 'react';
import {
  BusArrivalList,
  InteractionManager,
  Label,
  Placeholder,
  ScreenView,
  View
} from '../../components';
import { SCREEN_HEIGHT } from '../../constants';
import BusStopMap from './bus-stop-map';

import styles from './bus-stop-arrivals.styles';

type Props = {
  currentNavRoute: any,
  params: { [string]: string },
  style: { [string]: mixed }
};

type State = {
  mapBottomInset: number,
  didFinishInitialAnimation: boolean
};

export default class BusStopArrivals extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      mapBottomInset: SCREEN_HEIGHT / 2,
      didFinishInitialAnimation: false
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ didFinishInitialAnimation: true });
    });
  }

  calculateHeight = (event: any) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ mapBottomInset: height });
  };

  renderContent = () => {
    const {
      currentNavRoute,
      params: { busStopCode }
    } = this.props;
    const { mapBottomInset } = this.state;

    const isActiveRoute = currentNavRoute.routeName === 'BusStopArrivals';

    return (
      <View style={styles.contentWrapper}>
        <BusStopMap
          style={styles.mapView}
          busStopCode={busStopCode}
          contentInset={[0, 0, mapBottomInset, 0]}
        />
        <BusArrivalList
          style={styles.arrivalList}
          busStopCode={busStopCode}
          onLayout={this.calculateHeight}
          timerEnabled={isActiveRoute}
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
