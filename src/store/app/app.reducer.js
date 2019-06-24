import createReducer from '../reducers/create-reducer';
import * as actions from './actions/types';

const initialState = {
  header: {
    title: 'SG Bus',
    subTitle: '',
    backgroundColor: '#1289A7'
  },
  backgroundColor: '#F0F0F0',
  inset: {
    top: true,
    bottom: false
  }
};

const updateBackgroundColor = (state, action) => {
  return Object.assign({}, state, {
    backgroundColor: action.backgroundColor
  });
};

const updateHeaderTitle = (state, action) => {
  const header = Object.assign({}, state.header, {
    title: action.title,
    subTitle: action.subTitle || ''
  });

  return Object.assign({}, state, { header });
};

const updateHeaderBackgroundColor = (state, action) => {
  const header = Object.assign({}, state.header, {
    backgroundColor: action.backgroundColor
  });

  return Object.assign({}, state, { header });
};

const updateInset = (state, action) => {
  const inset = Object.assign({}, state.inset, {
    [action.inset.type]: action.inset.value
  });
  return Object.assign({}, state, { inset });
};

const reset = (state, action) => {
  const header = Object.assign({}, initialState.header);
  const inset = Object.assign({}, initialState.inset);
  return Object.assign({}, initialState, { header, inset });
};

const appReducer = createReducer(initialState, {
  [actions.UPDATE_BACKGROUND_COLOR]: updateBackgroundColor,
  [actions.UPDATE_HEADER_TITLE]: updateHeaderTitle,
  [actions.UPDATE_HEADER_BACKGROUND_COLOR]: updateHeaderBackgroundColor,
  [actions.UPDATE_INSET]: updateInset,
  [actions.RESET]: reset
});

export default appReducer;
