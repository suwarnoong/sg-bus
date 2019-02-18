import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './views/home';
import { store, persistor } from './store';
import { BackgroundView } from './components';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <Home style={{ flex: 1 }}></Home>
            </SafeAreaView>
            <BackgroundView></BackgroundView>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
