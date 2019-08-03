import { persistReducer } from 'redux-persist';
import storage from 'redux-persist-filesystem-storage';
import createReducer from '../reducers/create-reducer';
import * as actions from './actions/types';

const initialState = {
  locale: 'en'
};

const updateLocale = (state, action) => {
  return Object.assign({}, state, {
    locale: action.locale
  });
};

const appReducer = createReducer(initialState, {
  [actions.UPDATE_LOCALE]: updateLocale
});

const appPersistConfig = {
  key: 'app',
  storage
};

const persistedAppReducer = persistReducer(appPersistConfig, appReducer);

export default persistedAppReducer;
