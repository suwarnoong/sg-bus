import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import {
  BackgroundView,
  MainView,
  Geolocation,
  AppController
} from './components';
import NavigatorContainer from './routes';
import './locales/i18next';

import i18next from './locales/i18next';
import { updateLocale } from './store/app';

type Props = {};

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React, { include: /^FavoriteList/ });
// }

i18next.on('languageChanged', lang => {
  store.dispatch(updateLocale(lang));
});

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Geolocation enabled={true} />
          <BackgroundView />
          <MainView>
            <NavigatorContainer />
            <AppController />
          </MainView>
        </PersistGate>
      </Provider>
    );
  }
}
