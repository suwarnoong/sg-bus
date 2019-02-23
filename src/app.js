import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './views/home';
import { store, persistor } from './store';
import { BackgroundView, MainView } from './components';
import NavigatorContainer from './routes';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1 }}>
            <MainView style={{ flex: 1 }}>
              <NavigatorContainer style={{ flex: 1 }} />
            </MainView>
            <BackgroundView />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
