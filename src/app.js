import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import BusStopArrivals from './views/bus-stop-arrivals';
import { store, persistor } from './store';
import { BackgroundView } from './components';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ height:'100%' }}>
            <SafeAreaView>
              <BusStopArrivals></BusStopArrivals>
            </SafeAreaView>
            <BackgroundView></BackgroundView>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
