import React, { PureComponent } from 'react';
import { View } from 'react-native';
import {
  H1,
  Label,
  TextInput,
  SelectSwitch,
  ScreenView
} from '../../components';
import NearestBusStops from '../../fragments/nearest-bus-stops';
import styles from './home.styles.js';

type Props = {};

export default class Home extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'S'
    };
  }

  renderTabs = (initialTab = 0) => {
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
