import createReducer from './create-reducer';
import * as actions from '../actions/types';

const initialState = {
  header: {
    title: 'SG Bus',
    subTitle: '',
    backgroundColor: '#1289A7'
  },
  backgroundColor: '#F0F0F0',
  inset: {
    top: true,
    bottom: true
  }
};

const updateBackgroundColor = (state, action) => {
  return {
    ...state,
    backgroundColor: action.backgroundColor
  };
};

const updateHeaderTitle = (state, action) => {
  return {
    ...state,
    header: {
      ...state.header,
      title: action.title,
      subTitle: action.subTitle || ''
    }
  };
};

const updateHeaderBackgroundColor = (state, action) => {
  return {
    ...state,
    header: {
      ...state.header,
      backgroundColor: action.backgroundColor
    }
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

const reset = (state, action) => {
  return {
    ...initialState,
    header: { ...initialState.header },
    inset: { ...initialState.inset }
  };
};

const appReducer = createReducer(initialState, {
  [actions.UPDATE_BACKGROUND_COLOR]: updateBackgroundColor,
  [actions.UPDATE_HEADER_TITLE]: updateHeaderTitle,
  [actions.UPDATE_HEADER_BACKGROUND_COLOR]: updateHeaderBackgroundColor,
  [actions.UPDATE_INSET]: updateInset,
  [actions.RESET]: reset
});

export default appReducer;
