import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { BackgroundView, MainView, Geolocation } from './components';
import NavigatorContainer from './routes';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Geolocation enabled={true} />
          <BackgroundView />
          <MainView>
            <NavigatorContainer />
          </MainView>
        </PersistGate>
      </Provider>
    );
  }
}
