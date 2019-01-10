/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import BusStopArrivals from './views/bus-stop-arrivals';
import { store, persistor } from './store';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView>
            <BusStopArrivals></BusStopArrivals>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}
