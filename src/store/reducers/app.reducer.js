import createReducer from './create-reducer';
import * as actions from '../actions/types';

const initialState = {
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

const updateInset = (state, action) => {
  return {
    ...state,
    inset: {
      ...state.inset,
      [action.inset.type]: action.inset.value
    }
  };
};

const busReducer = createReducer(initialState, {
  [actions.UPDATE_BACKGROUND_COLOR]: updateBackgroundColor,
  [actions.UPDATE_INSET]: updateInset
});

export default busReducer;
