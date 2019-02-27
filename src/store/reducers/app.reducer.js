import createReducer from './create-reducer';
import * as actions from '../actions/types';

const initialState = {
  title: 'SG Bus',
  subTitle: '',
  backgroundColor: '#F0F0F0',
  inset: {
    top: true,
    bottom: true
  }
};

const updateHeader = (state, action) => {
  return {
    ...state,
    title: action.title,
    subTitle: action.subTitle || ''
  };
};

const updateBackgroundColor = (state, action) => {
  return {
    ...state,
    backgroundColor: action.backgroundColor
  };
};

const updateInset = (state, action) => {
  return {
    ...state,
    inset: {
      ...state.inset,
      [action.inset.type]: action.inset.value
    }
  };
};

const appReducer = createReducer(initialState, {
  [actions.UPDATE_HEADER]: updateHeader,
  [actions.UPDATE_BACKGROUND_COLOR]: updateBackgroundColor,
  [actions.UPDATE_INSET]: updateInset
});

export default appReducer;
