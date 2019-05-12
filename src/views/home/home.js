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
import NearestFavorites from './nearest-favorites';
import styles from './home.styles';

type Props = {
  currentNavRoute: any,
  favoritesCount: number,
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

  switchSelected = ({ value }) => this.setState({ selectedTab: value });

  renderTabs = (initialTab: number = 0) => {
    return (
      <View style={{ alignItems: 'flex-start', paddingBottom: 10 }}>
        <View style={{ width: 200 }}>
          <SelectSwitch
            initial={initialTab}
            onPress={this.switchSelected}
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
    const { currentNavRoute, favoritesCount, style } = this.props;
    const { selectedTab } = this.state;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const isActiveRoute = currentNavRoute.routeName === 'Home';

    return (
      <ScreenView style={containerStyles}>
        <H1 style={styles.title}>Bus Arrivals</H1>
        {this.renderTabs(favoritesCount > 0 ? 0 : 1)}
        <View style={{ flex: 1 }}>
          {selectedTab === 'S' && (
            <NearestFavorites timerEnabled={isActiveRoute} />
          )}
          {selectedTab === 'N' && <NearestBusStops />}
        </View>
      </ScreenView>
    );
  }
}
