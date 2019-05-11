import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { BackgroundView, MainView, Geolocation } from './components';
import NavigatorContainer from './routes';

type Props = {};

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React, { include: /^ServiceStop/ });
// }

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
