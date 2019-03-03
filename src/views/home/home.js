import React, { PureComponent } from 'react';
import {
  H1,
  Label,
  TextInput,
  SelectSwitch,
  ScreenView,
  View
} from '../../components';
import NearestBusStops from '../../fragments/nearest-bus-stops';
import styles from './home.styles.js';

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
    if (!this.props.routes || this.props.routes.length == 0)
      this.props.getRoutes();

    if (!this.props.services || this.props.services.length == 0)
      this.props.getServices();

    if (!this.props.stops || this.props.stops.length == 0)
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
    const { style } = this.props;
    const { selectedTab } = this.state;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles}>
        <H1 style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
          Bus Arrivals
        </H1>
        {this.renderTabs(1)}
        <View style={{ flex: 1 }}>
          {selectedTab === 'N' && <NearestBusStops />}
        </View>
      </ScreenView>
    );
  }
}
