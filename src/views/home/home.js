import React, { PureComponent } from 'react';
import {
  H1,
  Label,
  TextInput,
  SelectSwitch,
  ScreenView,
  View
} from '../../components';
import NearestBusStops from './nearest-bus-stops';
import FavoriteServiceStop from './favorite-service-stop';
import styles from './home.styles';

type Props = {
  routes: Array<mixed>,
  services: Array<mixed>,
  stops: Array<mixed>,
  getRoutes: () => void,
  getServices: () => void,
  getStops: () => void,
  style: { [string]: mixed }
};

type State = {
  selectedTab: string
};

export default class Home extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedTab: 'S'
    };
  }

  componentWillMount() {
    this.props.getRoutes();
    this.props.getServices();
    this.props.getStops();
  }

  renderTabs = (initialTab: number = 0) => {
    return (
      <View style={{ alignItems: 'flex-start', paddingBottom: 10 }}>
        <View style={{ width: 200 }}>
          <SelectSwitch
            initial={initialTab}
            onPress={({ value }) => this.setState({ selectedTab: value })}
            options={[
              { label: 'SAVED', value: 'S' },
              { label: 'NEAREST', value: 'N' }
            ]}
          />
        </View>
      </View>
    );
  };

  render() {
    const { style, favoriteServiceStop } = this.props;
    const { selectedTab } = this.state;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles}>
        <H1 style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
          Bus Arrivals
        </H1>
        {this.renderTabs(favoriteServiceStop.length > 0 ? 0 : 1)}
        <View style={{ flex: 1 }}>
          {selectedTab === 'S' && <FavoriteServiceStop />}
          {selectedTab === 'N' && <NearestBusStops />}
        </View>
      </ScreenView>
    );
  }
}
